Redwood.controller("SubjectCtrl", ["$rootScope", "$scope", "RedwoodSubject", 'SynchronizedStopWatch', function($rootScope, $scope, rs, SynchronizedStopWatch) {

    var tick_time = 1;        //tick interval of 0.5s
    var tend = 600;             //number of ticks until game ends
    var time = tend;            //remaining time (deprecated as of 3/23)
    var network = {};           //array of all bidders
    var t = 0;                  //time

    var just_started = true;    //if player has made a move yet or not
    var landscape_on = false;   //display landscape/potential line
	var vfc_for_all = false;    //show vfc values of other subjects
	var pot_line;               //landscape/potential line for plotting

	var max_bid;                //max bid
	var max_y = 1;              //upper graph bound
	var min_y = 0;              //lower bound

	var session_payoff_p = [];    //postitive payoff for entire session
	var session_payoff_n = [];    //negative payoffs
	var paid = 0;

	var current_period;         //current period
	var ct_options;             //continuous graph options
	var flow_options;           //flow graph options

	var id = 999;               //subject name
	var time_keeper = 999;      //who synchronizes times during rounds

	var chosen = false;         //checks when time keeper has been chosen
	var totalBidders = 1;       //var k
	var last_bid;               //last submitted bid for subject

	//there is always one less slot than total number of bidders
	var totalSlots = totalBidders - 1;
	 
	var current_slot;           //subject's slot in ad array  

	var ctr = [];               //click through rate of slot i; var a_i
	var pay;                    //payoff value for bidder k
	var curr_rev;               //current revenue being earned by bidder k

	var vfc = [];               //value for click for bidder k
	var gsp = [];               //gsp array
	var vcg = [];               //vcg array

	var auction_func = GSP;           // The function used to update costs
	var opp_pay_vis_en;
	var user_vfc;
	var in_group = [];
	var waiting = 1;

	var redwood_debug = 0;

	var throttler = 30;

	/*
	  bidder 'k'
	  slot 'i'
	  ctr at slot i 'a[i]'
	  value of click for bidder k 's[k]'
	*/

	/*
	  b[i+1] = bid of bidder who won next-most desirable slot
	  a[i] = ctr of slot i 
	*/

	function GSP() {
	  var k = 0;
	  var i = 0;

	  while(k < network.bidders.length - 1) {
	    if(network.bidders[i + 1] === null) {
	      network.bidders[k].cost = 0;
	    } else {
	      var ind = Number(network.bidders[i].ctr * network.bidders[i + 1].bid).toString().indexOf('.');

	      if(ind == -1)
	        network.bidders[k].cost = Number(network.bidders[i].ctr * network.bidders[i + 1].bid);
	      else
	        network.bidders[k].cost = Number((network.bidders[i].ctr * network.bidders[i + 1].bid).toPrecision(ind + 2));

	      if(network.bidders[k].cost < 0) network.bidders[k].cost = 0;
	    
	    }
	    k++;
	    i++;
	  }
	}

	/*
	  b[i+1] = bid of bidder who won next-most desirable slot
	  a[i] = ctr of slot i
	*/

	function VCG() {
	    for(var r = 0; r < network.bidders.length; r++) {
	      network.bidders[r].cost = Number(0);
	    }

	  	for(var k = 0; k < network.bidders.length; k++) {
	    	for(var i = k; i < network.bidders.length - 1; i++) {
		      	if(network.bidders[i + 1].bid === null) {
			      	network.bidders[k].cost = 0;
		      	} else if(network.bidders[i + 1].ctr === null) {
			        network.bidders[k].cost += network.bidders[i].ctr * network.bidders[i + 1].bid;
		      	} else {
			       	network.bidders[k].cost += network.bidders[i].ctr * network.bidders[i + 1].bid -
			        network.bidders[i + 1].ctr * network.bidders[i + 1].bid;
				}
		    }
	  	}
	}

	/*
	* returns the click through rate times the value per click assigned to bidders
	*/
	function get_revenue(bidder) {
	  return Number(bidder.ctr * bidder.vfc);
	}

	//the payoff function is the difference between revenue and cost
	function get_payoff(bidder) {
	  return Number(bidder.revenue - bidder.cost);
	}

	/*
	* bubblesort of bids to determine their appropriate slot
	* runs in O(n^2)
	*/
	function update_slots() {
	  if(just_started) return;

	  var len = network.bidders.length;

	  for(var i = 0; i < len; ++i){
	    for(var j = 0; j < ((len  - 1) - i); ++j){
	      if(network.bidders[(len - 1) - j].bid > network.bidders[(len - 1) - (j + 1)].bid) {
	        var num = network.bidders[(len - 1) - (j + 1)];
	        
	        network.bidders[(len - 1) - (j + 1)] = network.bidders[(len - 1) - j];
	        network.bidders[(len - 1) - j] = num;
	      }
	    }   
	  }
	  for(var k = 0; k < network.bidders.length; ++k) {
	    if(k == network.bidders.length - 1){ //force any undefined values to 0
	      network.bidders[k].payoff = 0;
	      network.bidders[k].cost = 0;
	      network.bidders[k].ctr = 0;
	      network.bidders[k].revenue = 0;
	      network.bidders[k].current_slot = k;
	    }else{
	      network.bidders[k].current_slot = k;
	      network.bidders[k].ctr = Number(ctr[ctr.length - 1 - k]);
	    }
	  }
	}


	/* returns subject's index in network */
	function get_bidder_by_id(pid){
	  var t;
	  for(var i = 0; i < network.bidders.length; ++i) {
	    if(network.bidders[i].name == pid) t = i;
	  }

	  return t;
	}

	/*
	* replaces bid amount for specified subject
	*/
	function replace_bid(id, val){
	  	var i = get_bidder_by_id(id);
	  	network.bidders[i].bid = Number(val);
	}
	  
	/* returns unsorted list of each subject's bid */  
	function get_all_bids(){
	  var tmp = [];
	  for(var i = 0; i < network.bidders.length; ++i){
	    tmp[i] = network.bidders[i].bid;
	  }
	  
	  return tmp;
	}  
	  
	function get_pot_vals(){
	  var ind = get_bidder_by_id(id);
	  var tmp = [];
	  for(var i = 0; i < ind; ++i){
	    tmp.push(get_pot_pay(ind, i));
	  }
	  tmp.push(network.bidders[ind].payoff);
	  
	  for(var j = network.bidders.length - 1; j > ind; --j){
	    tmp.push(get_pot_pay_n(ind, i));
	  }
	  
	  return tmp;
	}  
	  
	/* returns the potential payoff of a bidder at a new slot */  
	function get_pot_pay(i, j){
	  return Number((network.bidders[i].vfc * network.bidders[j].ctr) - (network.bidders[j].bid * network.bidders[j].ctr));
	}

	function get_pot_pay_n(i, j){
	  return Number((network.bidders[i].vfc * network.bidders[j].ctr) - (network.bidders[j + 1].bid * network.bidders[j].ctr));
	}
	/* returns array of points to be plotted to generate player's potential line */  
	function horizon_line(){
	  var tmp = [];
	  var index = get_bidder_by_id(id);
	  var len = network.bidders.length - 1;
	  var a = network.bidders.length - 1;
	  
	  if(index == a){
	    --a;
	    tmp.push([0,network.bidders[len].payoff]);
	    tmp.push([network.bidders[len - 1].bid, network.bidders[len].payoff]);
	    tmp.push([network.bidders[len - 1].bid, ]);  
	  }


	  for(var i = a; i > index; --i){
	    if(i == len){
	      tmp.push([0,network.bidders[len].payoff]);
	      tmp.push([network.bidders[len].bid, network.bidders[len].payoff]);
	      tmp.push([network.bidders[len].bid, ]); 
	    } else {
	      tmp.push([network.bidders[i + 1].bid, get_pot_pay_n(index, i)]);
	      tmp.push([network.bidders[i].bid, get_pot_pay_n(index, i)]);
	      tmp.push([network.bidders[i].bid, ]);
	    }
	  }
	  
	  if(index !== 0 && index != len){
	    tmp.push([network.bidders[i + 1].bid, network.bidders[i].payoff]);
	    tmp.push([network.bidders[i - 1].bid, network.bidders[i].payoff]);
	    tmp.push([network.bidders[i - 1].bid, ]);
	  }
	  
	  for(var j = index - 1; j >= 0; --j){
	    if(j == 0){
	      tmp.push([network.bidders[j].bid, get_pot_pay(index, j)]);
	      tmp.push([max_bid, get_pot_pay(index, j)]); 
	    } else {
	      tmp.push([network.bidders[j].bid, get_pot_pay(index, j)]);
	      tmp.push([network.bidders[j - 1].bid, get_pot_pay(index, j)]);
	      tmp.push([network.bidders[j - 1].bid, ]);
	    }
	  }

	  if(index == 0){        
	    tmp.push([network.bidders[1].bid, network.bidders[0].payoff]);
	    tmp.push([max_bid, network.bidders[0].payoff]); 
	  } 
	  
	  return tmp;
	}

	/* calculate remaining time and display on screen */
	function print_time(){
	    var tmp_time = (tend - t) / 2; //t increments every 0.5s
	    var sec, min;
	    
	    sec = Math.floor(tmp_time % 60);
	    min = Math.floor(tmp_time / 60);
	    if(t <= tend) document.getElementById("time_slot").innerHTML = "Time Remaining: " + min + " Minutes " + sec + " Seconds";
	    
	    /* update progress bar */
	    var percentage = (t/tend)*100;

	    $("#progressbar").width(percentage.toString()+"%");

	}

	/* return integral of flow payoff */
	function get_session_points(){
	  var sum = 0;
	  
	  for(var i = 0; i < session_payoff_p.length; ++i){
	    if(!isNaN(session_payoff_p[i][1])) sum += Number(session_payoff_p[i][1]);
	  }
	  
	  for(var j = 0; j < session_payoff_n.length; ++j){
	    if(!isNaN(session_payoff_n[j][1])) sum += Number(-1 * Math.abs(session_payoff_n[j][1]));
	  }
	  
	  return Math.floor(sum/tend);
	}


	  /* returns the highest max_y value since start of round */
 	function get_max_y(session_payoff_p, session_payoff_n){
	    var m = 0;
	    var i;
	    for(i = 0; i < session_payoff_p.length; ++i)
	      if(session_payoff_p[i][1] > m) m = session_payoff_p[i][1];
	    
	    var j;
	    for(j = 0; j < session_payoff_n.length; ++j)
	      if(Math.abs(session_payoff_n[j][1]) > m) m = Math.abs(session_payoff_n[j][1]);
	      
	    return m;
	  } 

	/* recalculate graph data for all functions */
	function update_data() {

	  for(var i = 0; i < network.bidders.length; ++i){
	    network.bidders[i].revenue = get_revenue(network.bidders[i]);
	    network.bidders[i].payoff = get_payoff(network.bidders[i]);
	  }
	  auction_func();
	}
	

	rs.on_load(function() {
		rs.send("config", {});

		$scope.clock = SynchronizedStopWatch.instance()
			.frequency(tick_time).onTick(tick)
			.duration(rs.config.tend).onComplete(function() {
				rs.send("new_period");
		});

		$scope.clock.start();

		//prevent user input while period syncs up
	  	$('#myModal').modal({
	    	backdrop: 'static',
	    	keyboard: false
	  	}); 
	  	$("#myModal").modal('show');
	 	
	 	id = rs.user_id;
	 	if (!chosen) {
	  		time_keeper = rs.subjects[0].user_id;
	  	}
	  	chosen = true;
	    group_num = rs._group;
   
	    num_of_bidders = rs.subjects.length;

	  	for(var i = 0, l = rs.subjects.length; i < l; i++) {
          in_group.push(parseInt(rs.subjects[i].user_id));
        }
	      
	    num_of_players = in_group.length;
	    
	    totalSlots = num_of_bidders - 1;
	    
	    network.bidders = [];
	    vfc = rs.config.vfc;
	    vfc = vfc.split(",");
	    ctr = rs.config.ctr;
	    ctr = ctr.split(",");
	      
	    //initialize arrays to predefined values
	    for(var i = 0; i < num_of_bidders; ++i) {
	      gsp[i] = 0;
	      vcg[i] = 0;

	      var bidder = {};
	      bidder.name = in_group[i];
	      bidder.current_slot = -1;
	      bidder.bid = 0;
	      bidder.revenue = 0;
	      bidder.cost = 0;
	      bidder.payoff = 0;
	      //bidder.group = r.group;
	      
	      if(vfc[i] === undefined) bidder.vfc = 1;
	      else bidder.vfc = Number(vfc[i]);
	      
	      if(ctr[i] === undefined) bidder.ctr = 1;
	      else bidder.ctr = Number(ctr[i]);
	      
	      network.bidders.push(bidder);
	    }
	    
	    current_period = rs.period;


	    
		/* get new bid from input box */
		$("#sub_bid").click(function(){
		 	var input = document.getElementById('bidamnt').value;		    
		    document.getElementById('hbid').value = input;
		    if(input != last_bid){
		      var tmp;		      
		      /* check for valid bid */
		      //if(input !== null && input > 0 && last_bid != input) { 
		      if(input !== null && last_bid != input && input <= max_bid) { 
		        last_bid = input; 
		        var new_bid = last_bid;
		        just_started = false;		  
		        rs.send("replace_bids", { new_bid:new_bid, id:id });
		        rs.trigger("replace_my_bid", { new_bid:new_bid, id:id });
		    }		      
	      	flow_options.xaxis.ticks = [0,user_vfc, last_bid, max_bid]; 
	  		$("[data-slider]").simpleSlider("setValue", input);
	      	update_flow_graph();
		    }
		  });

		$("[data-slider]").each(function () {
	    	var inthis = $(this);
		  	$("<span>").addClass("output").insertAfter($(this));
		}).bind("slider:ready slider:changed", throttle(function(event, data) {
		    var input = data.value.toFixed(2);
		    if(input !== null && input <= max_bid && t <= tend){
		      	last_bid = input; 
		      	var new_bid = last_bid;
		      	just_started = false;
		      	console.log("made it");
		      	rs.send("replace_bids", { new_bid:new_bid, id:id });
		      	rs.trigger("replace_my_bid", { new_bid:new_bid, id:id });
		    }
		    flow_options.xaxis.ticks = [0, user_vfc, last_bid, max_bid]; 
		    document.getElementById('bidamnt').value = last_bid;		   
		    update_flow_graph();
	  	},throttler));

	  	function throttle(func, interval) {
		    var lastCallz = 0;
		    return function() {
		        var nowz = Date.now();
		        if (lastCallz + interval < nowz) {
		            lastCallz = nowz;
		            return func.apply(this, arguments);
		        }
		    };
		}
	});

	function update_flow_graph() {

	    var subj_pos = [];
	    //get all other subjects' positions
	    for(var i = 0; i < network.bidders.length; ++i){
	      if(opp_pay_vis_en){
	        if(network.bidders[i].name != id) subj_pos[i] = [network.bidders[i].bid, network.bidders[i].payoff];
	      }else if(!opp_pay_vis_en){
	        if(network.bidders[i].name != id) subj_pos[i] = [network.bidders[i].bid, 0];
	      }
	    }

	    //keep track of last slider position
	    var bid_pos = [[last_bid, network.bidders[get_bidder_by_id(id)].payoff]];
	    
	    var flow_plot = $.plot($("#placeholder"), [
	      {data:pot_line, color: '#000000', lines:{ show: true }} , 
	      {data:subj_pos, color: '#545454', points:{ show: true, radius: 8, fill: true, fillColor: '#ABABAB' }},
	      {data:bid_pos, color: '#545454', points:{ show: true, radius: 8, fill: true, fillColor: '#7AAE08' }}
	    ], flow_options);  
	}

	function update_ct_graph() {

    	if(just_started){
      		document.getElementById("arrow").hidden = true;
      		document.getElementById("arrow2").hidden = false;
      		session_payoff_p.push([t,0]);
    	} else {
	      	if(network.bidders[get_bidder_by_id(id)].payoff < 0){
	        	document.getElementById("arrow").hidden = false;
	        	document.getElementById("arrow2").hidden = true;

		        if(Math.abs(network.bidders[get_bidder_by_id(id)].payoff) >= max_y){
		          flow_options.yaxis.max = Math.abs(network.bidders[get_bidder_by_id(id)].payoff) + Math.abs((network.bidders[get_bidder_by_id(id)].payoff * 0.05));
		          ct_options.yaxis.max = Math.abs(network.bidders[get_bidder_by_id(id)].payoff) + Math.abs((network.bidders[get_bidder_by_id(id)].payoff * 0.05));
		        }
	        
	        	// we want negative payoffs to still be shown above the x axis
	        	session_payoff_n.push([t,Math.abs(network.bidders[get_bidder_by_id(id)].payoff)]);
	        	session_payoff_p.push([t,]);
	      	} else {
	        	document.getElementById("arrow").hidden = true;
	        	document.getElementById("arrow2").hidden = false;

	        	if(network.bidders[get_bidder_by_id(id)].payoff >= max_y){
	          		ct_options.yaxis.max = network.bidders[get_bidder_by_id(id)].payoff + (network.bidders[get_bidder_by_id(id)].payoff * 0.05);
	          		flow_options.yaxis.max = network.bidders[get_bidder_by_id(id)].payoff + (network.bidders[get_bidder_by_id(id)].payoff * 0.05);
	        	}
	        	session_payoff_p.push([t,Number(network.bidders[get_bidder_by_id(id)].payoff)]);
	        	session_payoff_n.push([t,]);
	      	}
    	} 
    
	    if(session_payoff_p.length > (t + 3)){
	      for(var i = t; i < session_payoff_p.length; ++i)
	        session_payoff_p.pop();
	    }
    
	    var ct_plot = $.plot($("#placeholder2"), [
	      { data: session_payoff_p, color: '#009900' },
	      { data: session_payoff_n, color: '#990000' }], ct_options);  

	}

  	function get_payoffs(){
    	update_slots();
    	update_data();
  	}

	function tick() {
		console.log(network.bidders);
		console.log(rs);
	    if(waiting) return;
	    t++; 

	    update_slots();
	    update_data();
	    add_points();

		ct_options.xaxis.ticks = [0, t, tend]; 

	    if(t < tend) document.getElementById("pay_slot").innerHTML = "Cumulative Payoff " + get_session_points();
	    print_time();

	    if(t >= tend){
	      if(id == time_keeper) //rs.send("new_period", { current_period:current_period });
	    }

		update_slots();
		update_data();
	    update_flow_graph();
    	update_ct_graph();
	    if (id == time_keeper) {
	    	rs.send("sync_time",{ t:t });    
        	var tmp = network.bidders;
	      	rs.send("sync_net", { tmp:tmp });  
	    }
  	}
  	function add_points() {
  		//rs.add_points(get_session_points());
  	}

  	/* have time keeper update all other subjects */
  	rs.recv("sync_net", function (uid, msg) {
  		console.log(msg);
    	for(var i = 0; i < network.bidders.length; ++i){
      		network.bidders[i] = msg.tmp[i];
    	}
  	});

  	rs.recv("update_points", function (uid, msg) {
    	if(msg.points != null) points = msg.points;
  	});

  	rs.recv("sync_time", function (uid, msg) {
    	t = msg.t;
  	});
  
  	rs.recv("pause", function(uid, msg){
    	waiting = 1;
  	});
  
  	rs.recv("unpause", function(uid, msg){
    	waiting = 0;
  	});
  
  	rs.recv("new_period", function (uid, msg) {
    	waiting = 1;
    	if(paid) {
    		rs.add_points(get_session_points());
    	}
    	$("#myModal").modal('show');
    	rs.next_period(5);
  	});
  
 	rs.recv("change_auction_type", function(uid, msg) {
    	if (msg.auction_type == "GSP") {
    		auction_func = GSP;
    	} else if (msg.auction_type == "VCG") {
    		auction_func = VCG;
    	}
  	});

  	/* enter new subject bid */
  	rs.recv("replace_bids", function(uid, msg) {
  		console.log("replacing other's bids");
    	if(msg.new_bid !== null && msg.new_bid <= max_bid){
	      	replace_bid(msg.id, Number(msg.new_bid).toFixed(2));
    	}
  	});

  	rs.on("replace_my_bid", function(msg) {
  		console.log("replacing my bid");
    	if(msg.new_bid !== null && msg.new_bid <= max_bid){
	      	replace_bid(msg.id, Number(msg.new_bid).toFixed(2));
    	}
  	});
  
  	rs.recv("override_sync", function(uid, msg){
    	if(msg.new_keep != "" && msg.new_keep != undefined && msg.new_keep != null && rs._group == msg.group)
      	time_keeper = msg.new_keep;
  	});
  
  	rs.recv("r_debug", function(uid, msg){

    	redwood_debug = msg.debug;
    	just_started = msg.start;
  	}); 
  
  	/* set up our config values */
  	rs.recv("config", function(uid, msg) {
    	chosen = true;
    	tend = rs.config.tend;
    	max_y = rs.config.max_y;
    	min_y = rs.config.min_y;  			
    	vfc = rs.config.vfc;
    	vfc = vfc.split(",");    
    	ctr = rs.config.ctr;
    	ctr = ctr.split(",");    
    	max_bid = rs.config.max_bid;
    	landscape_on = rs.config.en_landscape;
    	vfc_for_all = rs.config.en_vfc;

    	ct_options =  {
	      	series: { shadowSize: 0 },
	      	lines: { fill: true },
	      	yaxis: { min: min_y, max: max_y + 50, ticks: 14},
	      	xaxis: { min: 0, max: tend }
    	}; 

	    flow_options = {
	      series: { shadowSize: 0, lines:{ show: false }},
	      yaxis: { min: min_y, max: max_y, ticks: 14, position: "right" },
	      xaxis: { min: 0, max: max_bid, ticks:[0,max_bid] }
	    };   

	    flow_options.xaxis.max = max_bid;
	    opp_pay_vis_en = rs.config.opp_pay_vis;
	    paid = rs.config.paid_session;
	    update_flow_graph();
	    update_ct_graph();
    
    	var len = network.bidders.length;
    	for(var i = 0;i < len; ++i){
      		if(network.bidders[i].name === undefined) network.bidders.pop();
    	}

	    user_vfc = network.bidders[get_bidder_by_id(id)].vfc;
	    document.getElementById("vpc_slot").innerHTML = "Value per Item: " + user_vfc;
	    flow_options.xaxis.ticks = [0, user_vfc, last_bid, max_bid]; 
	    if(vfc_for_all) document.getElementById("all_vpc").innerHTML = "Others' Values Per Item: " + vfc;
	    document.getElementById("ctr_slot").innerHTML = "Items per Bundle: " + ctr; 

	    rs.send("setup", { chosen:chosen, time_keeper:time_keeper });
  	});
  
  	rs.recv("setup", function(uid, msg) {

    	if(msg.chosen !== null) chosen = msg.chosen;
    	if(msg.time_keeper !== null) time_keeper = msg.time_keeper;
    	$("#myModal").modal('hide');
    	waiting = 0;

  	});

}]);

