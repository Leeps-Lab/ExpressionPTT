Redwood.controller("AdminCtrl", ["$rootScope", "$scope", "Admin", "$sce", function($rootScope, $scope, ra, $sce) {
	$scope.configsettings = {
		numberofpeople: null,
		treatment: 'Directed Message',
		method : 'BDM1',
		sopValue : '1',
		endowment: null,
		incomegoal: null,
		scale: null,
		debug: false
	};
	$scope.validate = true;
	$scope.subjects = [];
	$scope.tasknum = [];
	for(var i = 1; i <= 22; i++) {
		$scope.tasknum.push(i);
	}

	$scope.downloadcsv = function() {
		var csvContent = "data:text/csv;charset=utf-8,";
		var dataString = "subjectId,partnerId,role,initaltime,takerate,finalearnings,etakerate,wtp,actualprice,message,takeratetime,etrakeratetime,willingnesstime,message"+
		"messagetime,happiness,sadness,fear,anger,surprise,disgust,finalanswerstime";
		$scope.subjects.forEach(function(element, index) {
			dataString = element.userid+","+element.partnerId+","+element.role+","+element.initaltime+","+element.takerate+","+element.finalearnings+","+element.etakerate+
			","+element.wtp+","+element.actualprice+","+element.message+","+element.takeratetime+","+element.etakeratetime+","+element.willingnesstime+
			","+element.message+","+element.messagetime+","+element.happiness+","+element.sadness+","+element.fear+","+element.anger+","+
			","+element.surprise+","+element.disgust+","+element.finalanswerstime;
			csvContent += index < $scope.subjects.length ? dataString +"\n" : dataString;
		});
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	};

	$scope.methods = {
		'Directed Message' : [{
			name : 'BDM1',
			id : '0'
		},{
			name : 'BDM2',
			id : '1'
		},{
			name : 'SOP',
			id : '2'
		},{
			name : 'BDMWTA',
			id : '3'
		}],
		'Readers' : [{
			name : 'BDM1',
			id : '0'
		},{
			name : 'BDM2',
			id : '1'
		},{
			name : 'SOP',
			id : '2'
		},{
			name : 'BDMWTA',
			id : '3'
		}],
		'selectedOption': {
			id: '0',
			name : 'BDM'
		}
	};

	$scope.questionaires = [
		{
			name: 'batson',
			id: '0'
		},
		{
			name: 'bosman',
			id: '1'
		},
		{
			name: 'panas',
			id: '2'
		},
	];
	$scope.selectedQuestionaire = {
		name: 'Baton',
		id: '0'
	};

	var Display = { //Display controller

		initialize: function() {
			$("#start-session").click(function () {
				$("#start-session").attr("disabled", "disabled");
				ra.trigger("start_session");
			});

			ra.on("start_session", function() {
				$("#start-session").attr("disabled", "disabled");
				$("#pause-session").removeAttr("disabled");
			});

			$("#refresh-subjects").click(function () {
				$("#refresh-subjects").attr("disabled", "disabled");
				ra.refreshSubjects().then(function() {
					$("#refresh-subjects").removeAttr("disabled");
				});
			});

			$("#reset-session").click(function () {
				ra.reset();
			});

			$("#pause-session").click(function () {
				$("#pause-session").attr("disabled", "disabled");
				ra.trigger("pause");
			});
			ra.on("pause", function() {
				$("#pause-session").attr("disabled", "disabled");
			});

			$("#resume-session").click(function () {
				$("#resume-session").attr("disabled", "disabled");
				ra.trigger("resume");
			});
			ra.on("resume", function() {
				$("#resume-session").attr("disabled", "disabled");
				$("#pause-session").removeAttr("disabled");
			});

			ra.on_subject_paused(function(userId) {
				$("#pause-session").attr("disabled", "disabled");
				$("tr.subject-" + userId).addClass("warning"); //Display current period for each user
				$("tr.subject-" + userId + " :nth-child(4)").text("Paused"); //Display current period for each user
			});

			ra.on_all_paused(function() {
				$("#resume-session").removeAttr("disabled");
			});

			ra.on_subject_resumed(function(user) {
				$("tr.subject-" + user).removeClass("warning"); //Display current period for each user
				$("tr.subject-" + user + " :nth-child(4)").text(""); //Display current period for each user
			});

			$("#archive").click(function () {
				var r = confirm("Are you sure you want to archive this session?");
				if(r === true) {
					ra.delete_session();
				}
			});

			ra.on_router_connected(function(connected) { //Display router connection status
        var status = $("#router-status");
        if (connected) {
          status.text("Router Connected");
          status.removeClass("alert-success");
          status.addClass("alert-success");
        } else {
          status.text("Router Disconnected");
          status.removeClass("alert-success");
          status.addClass("alert-success");
        }
      });

			ra.on_set_period(function(user, period) {
				$("tr.subject-" + user + " :nth-child(3)").text(period); //Display current period for each user
			});

			ra.on_set_group(function(user, group) {
				$("tr.subject-" + user + " :nth-child(2)").text(group); //Display group for each user
			});

			ra.on_register(function(user) { //Add a row to the table to each user
				$("#subject-list").empty();
				for(var i = 0, l = ra.subjects.length; i < l; i++) {
					$("#subject-list").append($("<tr>").addClass("subject-" + ra.subjects[i].user_id).append(
						$("<td>").text(ra.subjects[i].user_id).after(
							$("<td>").text(0).after(
								$("<td>").text(0).after(
									$("<td>").text(""))))));
				}
				//outputGroups
				$scope.subjects.push({
					userid: user,
					tasks: Array(22),
					tasktime: Array(22)
				});
			});

			// here for the new stuff; for the config files
			$("#set_config").click(function() {
				console.log("lets try");
				$scope.configsettings.numberofpeople = ra.subjects.length;
				var treatment = $("#treatment").val();
				$scope.configsettings.method = $scope.methods.selectedOption.name;
				$scope.configsettings.questionaire = $scope.selectedQuestionaire.name;
				$scope.configsettings.sopValue = Number($("#sopValue").val());
				switch(treatment) {
		      case "Directed Message":
		        $scope.configsettings.treatmentvalue = 1;
		        break;
		      case "No Message":
		        $scope.configsettings.treatmentvalue = 2;
		        break;
		      case "Free Message":
		        $scope.configsettings.treatmentvalue = 3;
		        break;
		      case "Readers":
		        $scope.configsettings.treatmentvalue = 4;
		        break;
		      default:
		        alert("somehow this is incorrect");
		        break;
		    }
				$scope.configsettings.endowment = Number($("#endowment").val());
				$scope.configsettings.incomegoal = Number($("#incomegoal").val());
				$scope.configsettings.scale = Number($("#scale").val());
				$scope.configsettings.debug = $("#debug").val();
				//ra.trigger("do_roles");
				ra.trigger("save_values", {
					numberofpeople: $scope.configsettings.numberofpeople,
					treatment: $scope.configsettings.treatmentvalue,
					method: $scope.configsettings.method,
					questionaire: $scope.configsettings.questionaire,
					sopValue: $scope.configsettings.sopValue,
					endowment: $scope.configsettings.endowment,
					incomegoal: $scope.configsettings.incomegoal,
					scale: $scope.configsettings.scale,
					debug: $scope.configsettings.debug
				});
				if (!$scope.validNumberOfPeople($scope.configsettings.treatmentvalue,$scope.configsettings.numberofpeople)) {
					if ($scope.configsettings.treatmentvalue !== 4) {
						sweetAlert({
							title: "There has to be an even amount of subjects",
							type: "error",
							allowOutsideClick: true
						});
						return;
					} else {
						if ($scope.configsettings.numberofpeople > 9) {
							sweetAlert({
								title: "Treatment 4 Error",
								text: "There has to be an even number of subjects.",
								type: "error",
								allowOutsideClick: true
							});
							return;
						} else {
							sweetAlert({
								title: "Treatment 4 Error",
								text: "There has to be an odd number of subjects.",
								type: "error",
								allowOutsideClick: true
							});
							return;
						}
					}
				}
				$scope.pairs = $scope.generatepairs($scope.configsettings.treatmentvalue,$scope.configsettings.numberofpeople);
				$scope.roles = $scope.generateroles($scope.pairs);
				$scope.setvalues($scope.pairs,$scope.roles);
				console.log($scope.configsettings);
				if ($scope.configsettings.treatmentvalue === 4) $scope.setreaders($scope.pairs,$scope.roles);
				$("#start-session").removeAttr("disabled");
				console.log("roles : " + $scope.roles);
				console.log("pairs : " + $scope.pairs);

				// next well
				$scope.validate = false;
				$("#showtreatment").text($("#treatment").val());
				$("#showmethod").text($scope.configsettings.method);
				$("#questionaire").text($scope.configsettings.questionaire);
				$("#showsopValue").text($scope.configsettings.sopValue);
				$("#showendowment").text($scope.configsettings.endowment);
				$("#showincomegoal").text($scope.configsettings.incomegoal);
				$("#showscale").text($scope.configsettings.scale);
				$("#showdebug").text($scope.configsettings.debug);
			});
			$scope.validNumberOfPeople = function(t,n) {
				if (t === 4 && n <= 9 && n % 2 === 1) return true;
				else if (t === 4 && n > 9 && n % 2 === 0) return true;
				else if (t !== 4 && n % 2 === 0) return true;
				return false;
			};
			$scope.generatepairs = function(t,n) {
			  var location = 1;
			  var people = new Array(n+1).join('0').split('').map(parseFloat);
			  var reader;
			  // if need readers
			  if (t === 4 && n <= 9) {
			    console.log("one reader");
			    reader = Math.floor(Math.random() * n) + 1;
			    people[reader - 1] = -1;
			  } else if (t === 4 && n > 9) {
			    console.log("two readers");
			    reader = Math.floor(Math.random() * n) + 1;
			    people[reader - 1] = -1;
			    reader = Math.floor(Math.random() * n) + 1;
			    while (people[reader - 1] === -1)
			      reader = Math.floor(Math.random() * n) + 1;
			    people[reader - 1] = -1;
			  }
			  // start match making
			  console.log("start match making ");
			  while (people.indexOf(0) !== -1) {
			    var person = Math.floor(Math.random() * n) + 1;
			    while (people[location - 1] !== 0) {
			      location++;
			    }
			    while (people.indexOf(person) !== -1 ||
			           people[person - 1] === -1 ||
			           person === location) {
			      person = Math.floor(Math.random() * n) + 1;
			    }
			    people[location - 1] = person;
			    people[person - 1] = location;
			    location++;
			  }
			  console.log(people);
			  return people;
			};
			$scope.generateroles = function(p) {
				var location = 0;
			  var roles = new Array(p.length+1).join('u').split('');
				while (roles.indexOf("u") !== -1) {
					if (p[location] === -1) {
						roles[location] = "R";
						location++;
						continue;
					}
					var role = Math.floor(Math.random() * 2) + 1;
					if (role === 1) {
						roles[location] = "T";
						roles[p[location] - 1] = "P";
					} else if (role === 2) {
						roles[location] = "P";
						roles[p[location] - 1] = "T";
					}
					location++;
				}
				return roles;
			};
			$scope.setreaders = function(p,r) {
				var n = p.length + 1;
				var reader;
				var readerlist = [];
				// easy way out
				if (n <= 9) {
					reader = r.indexOf("R");
					for (var i = 0, l = ra.subjects.length; i < l; i++) {
						if (ra.subjects[i].user_id === reader) continue;
						if (r[ra.subjects[i].user_id - 1] === "P") {
							readerlist.push(ra.subjects[i].user_id);
						}
					}
					ra.set(ra.subjects[reader].user_id,"readerlist",readerlist);
				}
				// try harder
				else {
					// divide by 4
					// 2 for half the people being p
					// 2 to take control of half of the p
					var goal = Math.floor((n - 2) / 4);
					console.log("number to reach : " + goal);
					reader = r.indexOf("R");
					for (var i = 0, l = ra.subjects.length; i < l; i++) {
						if (ra.subjects[i].user_id === reader) continue;
						if (r[ra.subjects[i].user_id - 1] === "P") {
							readerlist.push(ra.subjects[i].user_id);
							goal--;
							if (goal <= 0) {
								ra.set(ra.subjects[reader].user_id,"readerlist",readerlist);
								readerlist = [];
								reader = r.indexOf("R",reader+1);
								goal = Math.ceil((n - 2) / 4);
							}
						}
					}
				}
			};
			$scope.setvalues = function(p,r) {
				for (var i = 0, l = ra.subjects.length; i < l; i++) {
					ra.set(ra.subjects[i].user_id,"pair",p[i]);
					ra.set(ra.subjects[i].user_id,"role",r[i]);
					ra.set(ra.subjects[i].user_id,"treatment",$scope.configsettings.treatmentvalue);
					ra.set(ra.subjects[i].user_id,"method",$scope.configsettings.method);
					ra.set(ra.subjects[i].user_id,"questionaire",$scope.configsettings.questionaire);
					ra.set(ra.subjects[i].user_id,"sopValue",$scope.configsettings.sopValue);
					ra.set(ra.subjects[i].user_id,"endowment",$scope.configsettings.endowment);
					ra.set(ra.subjects[i].user_id,"incomegoal",$scope.configsettings.incomegoal);
					ra.set(ra.subjects[i].user_id,"scale",$scope.configsettings.scale);
					ra.set(ra.subjects[i].user_id,"debug",$scope.configsettings.debug);
				}
			};
			ra.on("save_values", function(value) {
				$scope.configsettings.numberofpeople = value.numberofpeople;
				$scope.configsettings.treatmentvalue = value.treatment;
				$scope.configsettings.method = value.method;
				$scope.configsettings.questionaire = value.questionaire;
				$scope.configsettings.endowment = value.endowment;
				$scope.configsettings.incomegoal = value.incomegoal;
				$scope.configsettings.scale = value.scale;
				$scope.configsettings.debug = value.debug;
			});
			ra.on("do_roles", function() {
				for (var i = 0, l = ra.subjects.length; i < 1; i++) {
					//ra.set(i + 1,"role",$("#role").val());
					ra.set_group(1, 1);
				}
			});

			ra.on_set_config(function(config) { //Display the config file
				$("table.config").empty();
				var a = $.csv.toArrays(config);
				for (var i = 0; i < a.length; i++) {
					var row = a[i];
					var tr = $("<tr>");
					for (var j = 0; j < row.length; j++) {
						var cell = row[j];
						var td = $((i === 0 ? "<th>" : "<td>")).text(cell);
						tr.append(td);
					}
					$("table.config").append(tr);
				}
			});
		}
	};


	var resetGroups = function() {
		var config = ra.get_config(1, 0) || {};
		for (var i = 0; i < ra.subjects.length; i++) { //set all subjects to group 1 (this is so that matching can be changed per period)
			if($.isArray(config.groups)) {
				for(var groupId = 0; groupId < config.groups.length; groupId++) {
					if($.isArray(config.groups[groupId])) {
						if(config.groups[groupId].indexOf(parseInt(ra.subjects[i].user_id)) > -1) { //Nested group array
							ra.set_group(groupId + 1, ra.subjects[i].user_id);
						}
					} else {
						ra.set_group(1, ra.subjects[i].user_id);
					}
				}
			} else {
				ra.set_group(1, ra.subjects[i].user_id);
			}
		}
	};

	// on page load
	Display.initialize();

	ra.on_load(function () {
		resetGroups(); //Assign groups to users
	});

	ra.on_register(function(user) { //Add a row to the table to each user
		resetGroups();
	});

	ra.on("start_session", function() {
		ra.start_session();
		$("#set_config").attr("disabled", "disabled");
	});

	ra.on("pause", function() {
		ra.pause();
	});

	ra.on("resume", function() {
		ra.resume();
	});

	$scope.click = function(value) {
		console.log(value)
	};
	$scope.setmethodvalue = function(index) {
		$scope.configsettings.method = $scope.methods[$scope.configsettings][index];
	};

	var getlocation = function(sender) {
		var location = $.map($scope.subjects, function(obj, index) {
			if (obj.userid === sender) {
				return index;
			}
		});
		return location[0];
	};
	ra.recv("sendinitalanswers", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].happiness = value.initalResponses.happiness;
		$scope.subjects[location].sadness = value.initalResponses.sadness;
		$scope.subjects[location].fear = value.initalResponses.fear;
		$scope.subjects[location].anger = value.initalResponses.anger;
		$scope.subjects[location].surprise = value.initalResponses.surprise;
		$scope.subjects[location].disgust = value.initalResponses.disgust;
		$scope.subjects[location].initalanswerstime = value.time;
		// shows the information on the admin page
	});
	ra.recv("sendfinalanswers", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].fhappiness = value.finalResponses.happiness;
		$scope.subjects[location].fsadness = value.finalResponses.sadness;
		$scope.subjects[location].ffear = value.finalResponses.fear;
		$scope.subjects[location].fanger = value.finalResponses.anger;
		$scope.subjects[location].fsurprise = value.finalResponses.surprise;
		$scope.subjects[location].fdisgust = value.finalResponses.disgust;
		$scope.subjects[location].finalanswerstime = value.time;
		// shows the information on the admin page
	});
	ra.recv("admininital", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].partnerId = value.partnerId;
		$scope.subjects[location].role = value.role;
		$scope.subjects[location].initaltime = value.time;
	});
	ra.recv("adminTasks", function(sender, value) {
		var location = getlocation(sender);
		$scope.subjects[location].tasks[value.task] = value.points;
		$scope.subjects[location].tasktime[value.task] = value.time;
		$scope.subjects[location].totalpoints = value.totalpoints;
	});
	ra.recv("admintakerate", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].takerate = value.takerate;
		$scope.subjects[location].finalearnings = value.finalearnings;
		$scope.subjects[location].etakerate = '-----';
		$scope.subjects[location].wtp = '-----';
		$scope.subjects[location].actualprice = '-----';
		$scope.subjects[location].message = $sce.trustAsHtml('-----');
		$scope.subjects[location].takeratetime = value.time;
	});
	ra.recv("adminetakerate", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].etakerate = value.etakerate;
		$scope.subjects[location].takerate = '-----';
		$scope.subjects[location].etakeratetime = value.time;
	});
	ra.recv("adminwillingness", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].wtp = value.wtp;
		$scope.subjects[location].actualprice = value.actualprice;
		$scope.subjects[location].finalearnings = value.finalearnings;
		$scope.subjects[location].willingnesstime = value.time;
	});
	ra.recv("adminmessage", function(sender, value) {
		// stores information
		console.log("got the message");
		var location = getlocation(sender);
		$scope.subjects[location].message = $sce.trustAsHtml(value.message);
		$scope.subjects[location].messagetime = value.time;
	});

}]);
