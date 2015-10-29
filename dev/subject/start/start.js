  Redwood.controller("SubjectCtrl", ["$rootScope", "$scope", "$sce", "$timeout", "RedwoodSubject", function($rootScope, $scope, $sce, $timeout, rs) {
    $scope.initalResponses = {
      happiness : '',
      sadness : '',
      fear : '',
      anger : '',
      surprise : '',
      disgust : ''
    };
    $scope.finalResponses = {
      question1: {
        answer1: ''
      },
      question2: {
        answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: '', answer7: '', answer8: '', answer9: '', answer10: '', answer11: ''
      },
      question3: {
        answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: ''
      },
      question4: {
        answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: '', answer7: '', answer8: '', answer9: ''
      },
      question5: {
        satisfiedOptions: [
          {
            value: 'Completely satisfied.',
            selected: false
          },
          {
            value: 'Very satisfied.',
            selected: false
          },
          {
            value: 'Rather satisfied.',
            selected: false
          },
          {
            value: 'Neither satisfied nor dissatisfied.',
            selected: false
          },
          {
            value: 'Rather dissatisfied.',
            selected: false
          },
          {
            value: 'Very dissatisfied.',
            selected: false
          },
          {
            value: 'Completely dissatisfied.',
            selected: false
          }
        ]
      },
      question6: {
        answer1: '',
        moneyOptions: [
          {
            value: '$0 to less than $25,000',
            selected: false
          },
          {
            value: '$25,000 to less than $50,000',
            selected: false
          },
          {
            value: '$50,000 to less than $75,000',
            selected: false
          },
          {
            value: '$75,000 to less than $100,000',
            selected: false
          },
          {
            value: '$100,000 to less than $125,000',
            selected: false
          },
          {
            value: '$125,000 to less than $150,000',
            selected: false
          },
          {
            value: '$150,000 or more',
            selected: false
          },
        ]
      },
    };
    $scope.optionToggled = function(index) {
      for(var i = 0; i < $scope.finalResponses.question5.satisfiedOptions.length; i++) {
        if (index === i) continue;
        $scope.finalResponses.question5.satisfiedOptions[i].selected = false;
      }
    };
    $scope.moneyToggled = function(index) {
      for(var i = 0; i < $scope.finalResponses.question6.moneyOptions.length; i++) {
        if (index === i) continue;
        $scope.finalResponses.question6.moneyOptions[i].selected = false;
      }
    };
    // checks if inputs are filled out
    $scope.isValid = function(qNum,rNum,mNum,toggle,tNumber) {
      if (!qNum && !toggle) return true;
      console.log("preparing ... ");
      // checks input values
      if (qNum) {
        for (var i = 1; i <= rNum; i++) {
          console.log("whats the password");
          if (qNum["answer" + i] === "") {
            console.log("you shall not pass");
            sweetAlert({
              //title: "Sorry",
              title: "This entry is not valid, please read instructions.",
              type: "error",
              allowOutsideClick: true
            });
            return false;
          } else if (isNaN(qNum["answer" + i])) {
            console.log("you didn't put a number");
            sweetAlert({
              //title: "Sorry",
              title: "This entry is not valid, please read instructions.",
              type: "error",
              allowOutsideClick: true
            });
            return false;
          } else if (mNum !== null && (parseInt(qNum["answer" + i]) < 1 ||
            mNum < parseInt(qNum["answer" + i]))) {
            console.log("not in range");
            sweetAlert({
              //title: "Sorry",
              title: "This entry is not valid, please read instructions.",
              type: "error",
              allowOutsideClick: true
            });
            return false;
          }
        }
      }
      // checks if a toggle is true
      if (!toggle) return true;
      for (var i = 1; i < tNumber; i++) {
        console.log("check " + i);
        if (toggle[i].selected === true) {
          return true;
        }
      }
      return false;
    };

    // saves which pages are open
    $scope.saveState = function() {
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    };

    // config files
    $scope.numberofpeople = null;
    $scope.scale = 1;
    $scope.incomegoal = 10;
    $scope.treatment = 1;
    $scope.method = 'BDM1';
    $scope.nomessage = false;
    $scope.freemessage = false;

    // method config
    $scope.bdm2values = [];
    for (var i = 0; i <= 300; i = i + 25) {
      $scope.bdm2values.push({
        value : i,
        selected : false
      });
    }
    $scope.bdm2Toggle = function(index) {
      for(var i = 0; i < $scope.bdm2values.length; i++) {
        if (i <= index) $scope.bdm2values[i].selected = true;
        else $scope.bdm2values[i].selected = false;
      }
      $scope.bid = $scope.bdm2values[index].value;
      console.log("the bid is " + $scope.bid);
    };
    $scope.sopValue = 300;

    // reader variables
    $scope.allmessages = false;
    $scope.readerMessages = [];
    $scope.readerlist = [];
    $scope.readerconfirm = 0;

    // debug
    $scope.debug = false;

    // all the variables for ng show
    $scope.showpage = {
      waitpage: false,

      showStartExperiment: false,
      part1: false,
      initalquestions: false,
      part2: false,
      part2ready: false,
      exampleTasks: false,
      practice1: false,
      realTasks: false,
      realTasksReady: false,
      gametime: false,
      moneyReceived: false,
      part3: false,
      part3ready: false,
      roles: false,
      slider: false,
      willingnesspage: false,
      checkprice: false,
      messagePage: false,
      pwait: false,
      readMessage: false,
      showEarnings: false,
      part4: false,
      finalquestions: null,
      thanks: false
    };

    // user variables
    // set in config
    $scope.role = "T";
    $scope.endownment = 300;
    $scope.income = 0;
    $scope.percent = 0;
    $scope.transferred = 0;
    $scope.percentTransferred= 0;
    $scope.moneytransferred = 0;
    $scope.totalincome = 0;
    $scope.messages = "";
    $scope.task = 1;

    // variables for P
    $scope.bid = null;
    $scope.actualprice = 0;

    // time variables
    $scope.timelimit = 35;
    $scope.time = 35;
    $scope.practiceRound = 1;

    // partner variables
    $scope.partner = {
      index: '',
      endownment: 0,
      role: 0,
      income: '',
      percent: '',
      transferred: '',
      percentTransferred: 0,
      moneytransferred: '',
      actualprice: '',
      totalincome: ''
    };

    // starts showing the questions
    $scope.startExperiment = function() {
      $scope.showpage.showStartExperiment = false;
      $scope.showpage.initalquestions = true;
    };

    // finishes questions onto money part
    // barrier : have all people ready for part 2
    $scope.finishQuestions = function() {
      //if ($scope.isValid(qNum, rNum,mNum)) {
        $scope.showpage.initalquestions = false;

        $scope.showpage.part2 = true;
        // send answers back to server
        rs.trigger("sendinitalanswers", {
          initalResponses: $scope.initalResponses,
          showpage: $scope.showpage
        });
        // get ready for a barrier
        console.log("ready for part 2?");
        rs.trigger("readypart2", {
        });
      //}
    };
    $scope.practiceTimeout = function() {
      $scope.time--;
      if ($scope.time < 1) {
      } else
        $scope.mytimeout = $timeout($scope.practiceTimeout,1000);
    };
    $scope.onTimeout = function() {
      $scope.time--;
      if ($scope.time < 1) {
        console.log("Times up");
        $scope.nexttask();
      }
      else $scope.mytimeout = $timeout($scope.onTimeout,1000);
    };
    $scope.practiceGame1 = function() {
      $scope.showpage.practice1 = true;
      $scope.showpage.exampleTasks = false;

      // popover
      $('[data-toggle="instructions"]').popover({
        html: true,
        trigger: 'focus hover'
      });

      $scope.points = [];
      $scope.plot = $.plot("#practice1",[{
          data: $scope.points,
          points: {
            show : true,
            fill: true,
            fillColor: '#DAA831'
          },
          color: '#FFCD72'
        }], {
          xaxis: {
              ticks:10,
              min:0,
              max:100
          },
          yaxis: {
              ticks:10,
              min:0,
              max:100
          },
          grid: {
            clickable: true
          }
      });

      $scope.locatorState = new LocatorState(document.getElementById("practicelocator"),
                                           "#pointspractice", true, "#nearnesspractice", "#locationpractice", 50);
      $scope.locatorState.setGoal();
      $scope.locatorState.reset();

      $("#practice1").bind("plotclick", function(event, pos, item) {
        $scope.points.pop();
        $scope.points.push([pos.x, pos.y]);
        console.log($scope.maxpoints);
        $scope.plot.setData([{
          data: $scope.points,
          clickable: false,
          points: {
            show: true,
            fill: true,
            fillColor: '#DAA831',
            radius: 10
          },
          color: '#FFCD72'
        }]);
        $scope.plot.draw();
        $scope.locatorState.update(pos);
        $scope.locatorState.draw();
      });

      $scope.mytimeout = $timeout($scope.practiceTimeout,1000);
    };
    $scope.nextPractice = function() {
      $scope.practiceRound++;

      // resets graph
      $scope.points.pop();
      $scope.plot.setData([$scope.points]);
      $scope.plot.draw();
      $scope.locatorState.setGoal();

      // reset points and locator
      // reset words
      $scope.locatorState.reset();

      $timeout.cancel($scope.mytimeout);
      $scope.time = $scope.timelimit;
      $scope.mytimeout = $timeout($scope.practiceTimeout,1000);
    };
    $scope.finalPractice = function() {
      $scope.showpage.practice1 = false;
      $scope.showpage.realTasks = true;

      $scope.showpage.realTasksReady = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    };
    $scope.showgame = function() {
      $scope.showpage.gametime = true;
      $scope.showpage.realTasks = false;

      //start tooltip
      $('[data-toggle="instructions"]').popover({
        html: true,
        trigger: 'focus hover'
      });

      $scope.points = [];
      $scope.plot = $.plot("#placeholder",[{
          data: $scope.points,
          points: {
            show : true,
            fill: true,
            fillColor: '#DAA831'
          },
          color: '#FFCD72'
        }], {
          xaxis: {
              ticks:10,
              min:0,
              max:100
          },
          yaxis: {
              ticks:10,
              min:0,
              max:100
          },
          grid: {
            clickable: true
          }
      });

      $scope.locatorState = new LocatorState(document.getElementById("locator"),
                                            "#points", false, "#nearness", "#location");

      $scope.locatorState.setGoal();
      $scope.locatorState.reset();

      $("#placeholder").bind("plotclick", function(event, pos, item) {
        $scope.points.pop();
        $scope.points.push([pos.x, pos.y]);
        console.log($scope.maxpoints);
        $scope.plot.setData([{
          data: $scope.points,
          clickable: false,
          points: {
            show: true,
            fill: true,
            fillColor: '#DAA831',
            radius: 10
          },
          color: '#FFCD72'
        }]);
        $scope.plot.draw();
        $scope.locatorState.update(pos);
        $scope.locatorState.draw();
      });

      $timeout.cancel($scope.mytimeout);
      $scope.time = $scope.timelimit;
      $scope.mytimeout = $timeout($scope.onTimeout,1000);
    };
    $scope.nexttask = function() {
      $scope.income += $scope.locatorState.getPointvalue();
      $scope.maxpoints = (Math.floor(Math.random() * 80) + 20) * $scope.scale;
      $("#income").text("So far, your income is $" +
        $scope.floatToMoney($scope.income) + ".");

      // save income
      rs.trigger("saveIncome", {
        role: $scope.role,
        endownment: $scope.endownment,
        income: $scope.income,
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percentTransferred,
        moneytransferred: $scope.moneytransferred,
        totalincome: $scope.totalincome
      });

      // reaches income goal
      if ($scope.income > $scope.incomegoal * 100 * $scope.scale) {
        $timeout.cancel($scope.mytimeout);
        console.log("sending payload, over.");
        rs.send("sendIncome", {
          income: $scope.income
        });
        rs.trigger("saveIncome", {
          role: $scope.role,
          endownment: $scope.endownment,
          income: $scope.income,
          percent: $scope.percent,
          transferred: $scope.transferred,
          percentTransferred: $scope.percentTransferred,
          moneytransferred: $scope.moneytransferred,
          totalincome: $scope.totalincome
        });
        $scope.showpage.gametime = false;
        $scope.showpage.moneyReceived = true;
        $scope.saveState();
        console.log("income : " + $scope.income);
      }
      // clear dot and set new goal
      else {
        $scope.task++;
        $scope.points.pop();
        $scope.plot.setData([$scope.points]);
        $scope.plot.draw();
        $scope.locatorState.setGoal();
        $scope.locatorState.point.update(0);
        $scope.locatorState.reset();

        $timeout.cancel($scope.mytimeout);
        $scope.time = $scope.timelimit;
        $scope.mytimeout = $timeout($scope.onTimeout,1000);
      }
    };
    $scope.moneyShown = function() {
      $scope.showpage.moneyReceived = false;
      //part 3
      $scope.showpage.part3 = true;
      $scope.saveState();
      rs.trigger("readypart3", {});
      console.log("slider is up");
    };
    $scope.part3ready = function() {
      $scope.showpage.roles = true;
      $scope.showpage.part3ready = false;
      $scope.saveState();
    };
    $scope.sendDecision = function() {
      $scope.showpage.slider = false;
      $scope.showpage.waitpage = true;
      $scope.saveState();
      // send values
      $scope.percentTransferred = $scope.percent;
      $scope.moneytransferred = $scope.transferred;
      $scope.partner.percenttransferred = $scope.percent;
      $scope.partner.moneytransferred = $scope.transferred;
      $scope.totalincome = $scope.finalEarnings;
      console.log("sending payload, over.");
      rs.send("sendDecision", {
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percent,
        moneytransferred: $scope.transferred,
        totalincome: $scope.totalincome
      });
      rs.trigger("saveIncome", {
        role: $scope.role,
        endownment: $scope.endownment,
        income: $scope.income,
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percentTransferred,
        moneytransferred: $scope.moneytransferred,
        totalincome: $scope.totalincome
      });

      // barrier time
      rs.trigger("readytransferProcess", {});
    };
    $scope.sendEstimate = function() {
      $scope.showpage.slider = false;
      $scope.showpage.waitpage = true;
      $scope.saveState();
      // send values
      console.log("sending payload, over.");
      rs.send("sendEstimate", {
        percent: $scope.percent,
        transferred: $scope.transferred
      });
      rs.trigger("saveIncome", {
        role: $scope.role,
        endownment: $scope.endownment,
        income: $scope.income,
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percentTransferred,
        moneytransferred: $scope.moneytransferred,
        totalincome: $scope.totalincome
      });

      $scope.saveState();
      // barrier time
      rs.trigger("readytransferProcess", {});
    };
    $scope.sendWillingness = function(responce) {
      console.log("my responce is " + responce);
      if ($scope.method === "BDM1" || $scope.method === "BDMWTA") {
        $scope.actualprice = Math.floor(Math.random() * 300);
        $scope.bid *= 100;
      } else if ($scope.method === "BDM2") {
        var length = $scope.bdm2values.length;
        $scope.actualprice = $scope.bdm2values[Math.floor(Math.random() * length)].value;
        console.log("random value : " + $scope.actualprice);
      } else if ($scope.method === "SOP") {
        if (responce === "yes") {
          $scope.bid = $scope.sopValue;
          $scope.actualprice = $scope.sopValue;
        } else if (responce === "no") {
          $scope.bid = 0;
          $scope.actualprice = $scope.sopValue;
        }
      }
      if ($scope.bid > $scope.income - $scope.partner.moneytransferred) {
        sweetAlert({
          title: "Your willingness exeeds your avaliable earnings.",
          text: "",
          type: "error",
          allowOutsideClick: true
        });
        $scope.bid = $scope.bid / 100;
        return;
      } else if ($scope.bid < 0 || isNaN($scope.bid)) {
        sweetAlert({
          title: "Unavaliable Value",
          text: "Please check you can use that amount.",
          type: "error",
          allowOutsideClick: true
        });
        $scope.bid = $scope.bid / 100;
        return;
      }
      $scope.showpage.willingnesspage = false;

      if ($scope.bid >= $scope.actualprice && ($scope.method === "BDM1" || $scope.method === "BDM2")) {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred - $scope.actualprice;
        // p gets to send message
        $scope.ablesendmessage = true;
        rs.trigger("saveWillingness", {
          bid: $scope.bid,
          actualprice: $scope.actualprice
        });
      } else if ($scope.bid <= $scope.actualprice && $scope.method === "BDMWTA") {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred - $scope.actualprice;
        // p gets to send message
        $scope.ablesendmessage = true;
        rs.trigger("saveWillingness", {
          bid: $scope.bid,
          actualprice: $scope.actualprice
        });
      } else if (responce === "yes") {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred - $scope.actualprice;
        // p gets to send message
        $scope.ablesendmessage = true;
        rs.trigger("saveWillingness", {
          bid: $scope.bid,
          actualprice: $scope.actualprice
        });
      } else {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred;
        // p doesnt get to send message
        $scope.ablesendmessage = false;
      }
      if (responce !== "no") {
        $scope.showpage.messagePage = true;
      } else {
        $scope.showpage.showEarnings = true;
      }
      $scope.saveState();
      rs.send("sendWillingness", {
        actualprice: $scope.actualprice,
        totalincome: $scope.totalincome,
        message: $scope.ablesendmessage
      });
    };
    $scope.checkprice = function() {
      if ($scope.ablesendmessage) {
        $scope.showpage.waitpage = true;
        $scope.showpage.checkprice = false;
        $scope.saveState();

        rs.send("sendMessage", {
          messages : $scope.message.replace(/\n/g, '<br />'),
          taken : $scope.partner.moneytransferred
        });
      } else {
        $scope.showpage.showEarnings = true;
        $scope.showpage.checkprice = false;
        $scope.saveState();
      }
    };
    $scope.sendMessage = function() {
      // navigate to correct page
      $scope.showpage.messagePage = false;
      if ($scope.reader) {
        rs.send("sendMessage", {
          messages : $scope.message.replace(/\n/g, '<br />'),
          taken : $scope.partner.moneytransferred
        });
        $scope.showpage.pwait = true;
      } else if ($scope.freemessage) {
        rs.send("sendMessage", {
          messages : $scope.message.replace(/\n/g, '<br />'),
          taken : $scope.partner.moneytransferred
        });
        $scope.showpage.waitpage = true;
      } else {
        $scope.showpage.checkprice = true;
      }
      $scope.saveState();
    };
    $scope.readMessage = function() {
      $scope.showpage.messagePage = false;
      $scope.showpage.showEarnings = true;
      rs.send("readMessage", {
      });
    };
    $scope.readRMessage = function() {
      $scope.showpage.showEarnings = true;
      $scope.showpage.messagePage = true;
      $scope.saveState();
    };
    $scope.messageConfirm = function() {
      $scope.showpage.readMessage = false;
      $scope.showpage.showEarnings = true;
      $scope.saveState();
    };
    $scope.rmessageConfirm = function(userid,index) {
      $scope.readerconfirm--;
      $scope.readerMessages.splice(index,1);
      rs.send("readRMessage", {
        userid: userid
      });
    };
    $scope.sawEarnings = function() {
      $scope.showpage.showEarnings = false;
      $scope.showpage.part4 = true;

      $scope.saveState();
    };
    $scope.nextFinalQuestion = function(qNum,rNum,mNum,toggle,tNumber) {
      if ($scope.debug) $scope.finishFinalQuestions(qNum,rNum,mNum,toggle,tNumber);
      else if ($scope.isValid(qNum,rNum,mNum,toggle,tNumber)) {
        $scope.showpage.finalquestions++;
        // send responses in case of a refresh
        rs.trigger("savefinalanswers", {
          finalResponses: $scope.finalResponses,
          showpage: $scope.showpage
        });
      }
    };
    $scope.finishFinalQuestions = function(qNum,rNum,mNum,toggle,tNumber) {
      if ($scope.isValid(qNum,rNum,mNum,toggle,tNumber)) {
        $scope.showpage.finalquestions = 7;
        $scope.showpage.thanks = true;
        // send answers back to server
        rs.trigger("sendfinalanswers", {
          finalResponses: $scope.finalResponses,
          showpage: $scope.showpage
        });
      }
    };

    $scope.floatToMoney = function(number) {
      return parseFloat(parseInt(number)) / 100;
    };

    function Point(x, y, radius) {
      this.x = x || 0;
      this.y = y || 0;
      this.value = 0;
      this.radius = radius || 10;
      this.fill = "#EEEEEE";
    }

    Point.prototype.update = function(value) {
      this.value = value;
    };

    Point.prototype.draw = function(ctx) {
      // draws triangle
      /*
      var path = new Path2D();
      var l = this.radius * Math.sqrt(3) / 4;
      path.moveTo(this.x, this.y - this.value - l);
      path.lineTo(this.x - this.radius, this.y - this.value + l);
      path.lineTo(this.x + this.radius, this.y  - this.value + l);
      ctx.fill(path);
      */
      ctx.beginPath();
      ctx.arc(this.x, this.y - this.value, this.radius, 0, 2*Math.PI);
      ctx.fillStyle = '#CC1600';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#660B00';
      ctx.stroke();
    };

    Point.prototype.reset = function(ctx) {
      this.value = 0;
      this.draw(ctx);
    };

    function LocatorState(canvas, pointsLocation, practice, nearid, locationid, maxpoints) {
      this.canvas = canvas;
      this.pointsLocation = pointsLocation;
      this.nearid = nearid;
      this.locationid = locationid;
      this.practice = practice;
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = canvas.getContext('2d');
      this.side = "right";
      this.direction = "up";
      this.location = "Click";
      this.distance = null;
      this.goal = {
        x: null,
        y: null
      };
      this.pointvalue = 0;
      this.linelength = 3 * this.height / 4;
      this.maxlength = Math.sqrt(square(100 - 0) + square(100 - 0));

      this.point = new Point(this.width / 2, this.height * 7 / 8, 15);
      $scope.maxpoints = (Math.floor(Math.random() * 80) + 20) * $scope.scale;

      if (this.practice) $scope.maxpoints = maxpoints * $scope.scale;

      $(this.pointsLocation).text("0.0");
    }

    LocatorState.prototype.getPointvalue = function() {
      return this.pointvalue;
    };

    LocatorState.prototype.setGoal = function() {
      this.goal = {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      };
    };

    $scope.maxpoints = 0;
    LocatorState.prototype.update = function(guess) {
      if ($scope.debug) console.log(this.goal);
      this.distance = Math.sqrt(square(this.goal.x - guess.x) + square(this.goal.y - guess.y));
      this.distance < 20 ? this.location = "Close!" : this.location = "Far!";
      // update locator position
      this.pointvalue = $scope.maxpoints - this.distance * $scope.maxpoints / this.maxlength;
      var linescale = this.pointvalue * this.linelength / $scope.maxpoints;
      this.point.update(linescale);
      if (!this.practice)
        $("#earned").text("Money earned for this task (cents) : " + parseFloat(this.pointvalue).toFixed(1));
      $(this.pointsLocation).text(parseFloat(this.pointvalue).toFixed(1));

      guess.x > this.goal.x ? this.side = "left" : this.side = "right";
      guess.y > this.goal.y ? this.direction = "down" : this.direction = "up";
    };

    function square(x) {
      return x * x;
    }

    // clears canvas
    LocatorState.prototype.clear = function() {
      this.ctx.clearRect(0,0,this.width,this.height);
    };

    // draws inital locator
    LocatorState.prototype.draw = function() {
      this.clear();

      // draws text
      $(this.nearid).text(this.location);
      $(this.locationid).text("Go " + this.side + "-" + this.direction);
      // draws line
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height / 8);
      this.ctx.lineTo(this.width / 2, this.height / 8 + this.linelength);
      this.ctx.lineWidth = 6;
      this.ctx.strokeStyle = '#660B00';
      this.ctx.stroke();

      // draws numbers

      // draw locator
      this.point.draw(this.ctx);
    };

    LocatorState.prototype.reset = function() {
      $(this.nearid).text("Click inside the square");
      $(this.locationid).text("");
      $(this.pointsLocation).text("0.0");

      this.clear();
      // draw line
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height / 8);
      this.ctx.lineTo(this.width / 2, this.height / 8 + this.linelength);
      this.ctx.lineWidth = 6;
      this.ctx.stroke();
      // draw point
      this.point.reset(this.ctx);
    };

    // creates all sliders used
    $scope.createSliders = function() {
      console.log("begin creation");

      // create sliders for the initalquestions
      $("#happiness").slider({
        orientation: "vertical",
        range: "min",
        min : 0,
        max : 10,
        step: 1,
        value : 0,
        slide: function(event, ui) {
            $scope.initalResponses.happiness = ui.value;
            $("#initalhappiness").text(ui.value);
        }
      });
      $("#sadness").slider({
        orientation: "vertical",
        range: "min",
        min : 0,
        max : 10,
        value : 0,
        slide: function(event, ui) {
            $scope.initalResponses.sadness = ui.value;
            $("#initalsadness").text(ui.value);
        }
      });
      $("#fear").slider({
        orientation: "vertical",
        range: "min",
        min : 0,
        max : 10,
        value : 0,
        slide: function(event, ui) {
            $scope.initalResponses.fear = ui.value;
            $("#initalfear").text(ui.value);
        }
      });
      $("#anger").slider({
        orientation: "vertical",
        range: "min",
        min : 0,
        max : 10,
        value : 0,
        slide: function(event, ui) {
            $scope.initalResponses.anger = ui.value;
            $("#initalanger").text(ui.value);
        }
      });
      $("#surprise").slider({
        orientation: "vertical",
        range: "min",
        min : 0,
        max : 10,
        value : 0,
        slide: function(event, ui) {
            $scope.initalResponses.surprise = ui.value;
            $("#initalsurprise").text(ui.value);
        }
      });
      $("#disgust").slider({
        orientation: "vertical",
        range: "min",
        min : 0,
        max : 10,
        value : 0,
        slide: function(event, ui) {
            $scope.initalResponses.disgust = ui.value;
            $("#initaldisgust").text(ui.value);
        }
      });

      // create sliders for core interaction
      if ($scope.role === "T") {
        $scope.percentSlider = $("#tSlider").labeledslider({
          min: 0,
          max: 100,
          tickArray: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          value: 0,
          range: 'min',
          slide: function(event, ui) {
            console.log("T slider");
            $scope.percent = ui.value;
            $("#tPercentTransfered").text("Percentage transfered: " + $scope.percent + "%");
            $scope.transferred = $scope.partner.income * $scope.percent / 100;
            console.log("transferred : " + $scope.transferred);
            console.log($scope.partner.income);
            console.log($scope.percent);
            $("#tMoneyTransferred").text("Money (in $) transferred to your account : " + $scope.floatToMoney($scope.transferred));
            $scope.finalEarnings = $scope.income + $scope.transferred;
            $("#tFinalEarnings").text("Money final earnings (in $) for the experiment will be : " + $scope.floatToMoney($scope.finalEarnings));
          }
        });
      } else {
        $scope.percentSlider = $("#pSlider").labeledslider({
          max: 100,
          tickArray: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          value: 0,
          range: 'min',
          slide: function(event, ui) {
            console.log("P slider");
            $scope.percent = ui.value;
            $("#pPercentTransferred").text("Percentage transfered: " + $scope.percent + "%");
            $scope.transferred = $scope.income * $scope.percent / 100;
            $("#pMoneyTransferred").text("Amount (in $) expected to be transferred to T's account : " + $scope.floatToMoney($scope.transferred));
            $scope.finalEarnings = $scope.income - $scope.transferred;
            $("#pFinalEarnings").text("Your expected avaliable earnings (in $) are : " + $scope.floatToMoney($scope.finalEarnings));
          }
        });
      }
      console.log("sliders created");
    };
    $scope.showSliders = function() {
      $scope.showpage.roles = false;
      $scope.showpage.slider = true;
      $scope.saveState();
    };
    $scope.noSliders = function() {
      $scope.showpage.roles = false;
      $scope.showpage.waitpage = true;
      if ($scope.role === "T") {
        $("#tSlider").val(50);
      } else if ($scope.role === "P") {
        $("#pSlider").val(50);
      }
      rs.trigger("readytransferProcess", {});
      $scope.saveState();
    };

    // rs.recv
    // sent from self to server and self
    rs.recv("sendIncome", function(sender, value) {
      console.log("got from the other person");
      console.log(sender == $scope.partner.index);
      if (sender == parseInt($scope.partner.index)) {
        console.log("got the payload, over.");
        $scope.partner.income = value.income;
        console.log("income from " + $scope.partner.index + " is " + $scope.partner.income);
      }
    });
    // sends decision on percent
    rs.recv("sendDecision", function(sender, value) {
      console.log(sender);
      console.log(value);
      if (sender == parseInt($scope.partner.index)) {
        console.log("got the payload, over.");
        $scope.partner.percent = value.percent;
        $scope.partner.transferred = value.transferred;
        $scope.partner.percentTransferred = value.percentTransferred;
        $scope.partner.moneytransferred = value.moneytransferred;
        $scope.partner.totalincome = value.totalincome;
      }
    });
    rs.recv("sendEstimate", function(sender, value) {
      console.log(sender);
      console.log(value);
      if (sender == parseInt($scope.partner.index)) {
        console.log("got the payload, over.");
        $scope.partner.percent = value.percent;
        $scope.partner.transferred = value.transferred;
      }
    });
    rs.recv("sendWillingness", function(sender, value) {
      if (sender == parseInt($scope.partner.index)) {
        $scope.showpage.willingnesspage = false;
        $scope.partner.totalincome = value.totalincome;
        console.log("got willingness, what's the next step?");
        if ($scope.reader) {
          if (value.message) $scope.partner.actualprice = value.actualprice;
          $scope.showpage.waitpage = false;
          $scope.showpage.showEarnings = true;
        } else if (value.message) {
          //$scope.showpage.messagePage = true;
          $scope.partner.actualprice = value.actualprice;
        } else {
          $scope.showpage.waitpage = false;
          $scope.showpage.showEarnings = true;
        }
      }
    });
    rs.recv("sendMessage", function(sender, value) {
      if ($scope.reader && $scope.role === "R") {
        console.log(sender);
        console.log($scope.readerlist);
        // check if on readerlist
        if ($scope.readerlist.indexOf(sender) !== -1) {
          $scope.readerMessages.push({
            text : $sce.trustAsHtml(value.messages),
            taken : value.taken,
            userid : sender
          });
          $scope.readerconfirm++;
          $scope.readerlist.splice($scope.readerlist.indexOf(sender),1);
          if ($scope.showpage.waitpage) {
            $scope.showpage.waitpage = false;
            $scope.showpage.messagePage = true;
          }
        }
      }
      if (sender == parseInt($scope.partner.index) && !$scope.reader) {
        $scope.messages = $sce.trustAsHtml(value.messages);
        $scope.showpage.waitpage = false;
        $scope.showpage.messagePage = true;
      }
    });
    rs.recv("readMessage", function(sender, value) {
      if (sender == parseInt($scope.partner.index)) {
        $scope.showpage.waitpage = false;
        $scope.showpage.readMessage = true;
      }
    });
    rs.recv("readRMessage", function(sender, value) {
      console.log(value.userid);
      console.log($scope.userIndex);
      if (parseInt(value.userid) === $scope.userIndex) {
        console.log("message recieved");
        $scope.showpage.pwait = false;
        $scope.showpage.readMessage = true;
      }
    });

    // rs.on
    // sent from others to server and everyone

    // saves answers and location on page
    // saves place and responces in experiment
    rs.on("sendinitalanswers", function(value) {
      $scope.initalResponses = value.initalResponses;
      $scope.showpage = value.showpage;
    });
    // responce after a barrier
    rs.on("afterbarrier", function(value) {
      $scope.showpage = value.showpage;
    });
    // recieves income after game
    rs.on("saveIncome", function(value) {
      $scope.role = value.role;
      $scope.endownment = value.endownment;
      $scope.income = value.income;
      $scope.percent = value.percent;
      $scope.transferred = value.transferred;
      $scope.percentTransferred = value.percentTransferred;
      $scope.moneytransferred = value.moneytransferred;
      $scope.totalincome = value.totalincome;
    });
    // stores bid and actualprice
    rs.on("saveWillingness", function(value) {
      $scope.bid = value.bid;
      $scope.actualprice = value.actualprice;
      $scope.partner.actualprice = value.actualprice;
    });
    rs.on("savefinalanswers", function(value) {
      $scope.finalResponses = value.finalResponses;
      $scope.showpage = value.showpage;
    });
    rs.on("sendfinalanswers", function(value) {
      $scope.finalResponses = value.finalResponses;
      $scope.showpage = value.showpage;
    });
    // barriers
    rs.on("readypart2", function(value) {
      rs.synchronizationBarrier('part2').then(function() {
        console.log("I was born ready");
        $scope.showpage.part2 = false;
        $scope.showpage.part2ready = true;
        rs.trigger("afterbarrier", {
          showpage: $scope.showpage
        });
      });
    });
    rs.on("readypart3", function(value) {
      rs.synchronizationBarrier('part3').then(function() {
        $scope.showpage.part3 = false;
        $scope.showpage.part3ready = true;
        rs.trigger("afterbarrier", {
          showpage: $scope.showpage
        });
      });
    });
    rs.on("readytransferProcess", function(value) {
      rs.synchronizationBarrier('transferProcess').then(function() {
        if ($scope.nomessage) {
          if ($scope.role === "T") {
          }
          if ($scope.role === "P") {
            $scope.totalincome = $scope.income - $scope.partner.moneytransferred;
            $scope.bid = 0;
            rs.send("sendWillingness", {
              actualprice: $scope.actualprice,
              totalincome: $scope.totalincome,
              message: false
            });
            $scope.showpage.waitpage = false;
            $scope.showpage.showEarnings = true;
            $scope.saveState();
          }
        } else if ($scope.freemessage) {
          if ($scope.role === "T") {
          }
          if ($scope.role === "P") {
            $scope.totalincome = $scope.income - $scope.partner.moneytransferred;
            $scope.bid = 0;
            rs.send("sendWillingness", {
              actualprice: $scope.actualprice,
              totalincome: $scope.totalincome,
              message: true
            });
            $scope.showpage.waitpage = false;
            $scope.showpage.messagePage = true;
            $scope.saveState();
          }
        } else {
          if ($scope.role === "P") {
            $scope.showpage.waitpage = false;
            $scope.showpage.willingnesspage = true;
          }
        }
        rs.trigger("afterbarrier", {
          showpage: $scope.showpage
        });
      });
    });

    $scope.treatmentConfig = function() {
      switch($scope.treatment) {
        // as is
        case 1:
          console.log("welcome, nothing out of the ordinary is here");
          break;
        // no message :
        // no references to messages
        case 2:
          console.log("carry on, nothing to see here");
          $scope.nomessage = true;
          break;
        // free message :
        // no references to paying for the message
        case 3:
          console.log("'cause I'm free as a message now baby");
          $scope.freemessage = true;
          break;
        // reader :
        // all messages go to an isolated reader(s)
        case 4:
          console.log("time for the reader");
          // need to make algorithm for sorting peoples
          $scope.reader = true;
          break;
        default:
          console.log("error : check config");
          break;
      }
    };

    rs.on_load(function() {
      console.log("hello experiment");
      console.log(rs);
      // congif values
      $scope.userIndex = parseInt(rs.user_id);
      var configfile = rs.subjects[$scope.userIndex - 1].data;
      $scope.incomegoal = configfile.incomegoal[0];
      $scope.scale = configfile.scale[0];
      $scope.treatment = configfile.treatment[0];
      $scope.treatmentConfig();
      $scope.method = "BDMWTA";
      $scope.sopValue = 299;
      console.log("method is : " + $scope.method);

      $scope.showpage.showStartExperiment = true;
      // set values from config file
      // role index endownment
      $scope.role = configfile.role[0];
      $scope.endownment = configfile.endowment[0] * 100 * $scope.scale;
      console.log(configfile);
      console.log("endowment : " + $scope.incomegoal);

      // check if debug is up
      if (configfile.debug[0] === "False") $scope.debug = false;
      else {
        $scope.debug = true;
        $scope.income = $scope.incomegoal * 100 + 1;
      }

      // set partner values from config file
      // index role endownment
      if ($scope.role !== 'R') {
        $scope.partner.index = configfile.pair[0];
        $scope.partner.role = rs.subjects[$scope.partner.index - 1].data.role[0];
        $scope.partner.endownment = configfile.endowment[0] * 100;
        console.log("userId : " + $scope.userIndex);
        console.log("role : " + $scope.role);
        console.log("partner : " + $scope.partner);
        $scope.createSliders();
      } else {
        $scope.readerlist = configfile.readerlist[0];
      }

      rs.synchronizationBarrier('initalQuestions').then(function() {
        $scope.questions = false;
        $scope.showGame = true;
        console.log("its barrier time");
        $scope.showpage.thanks = false;
      });
  	});

  }])
  .filter('breakfilter', function() {
    return function(text) {
      if (text !== undefined) return text.replace(/\n/g, '<br />');
    };
  });
