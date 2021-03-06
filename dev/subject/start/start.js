  Redwood.controller("SubjectStartCtrl", ["$rootScope", "$scope", "$sce", "$timeout", "RedwoodSubject", function($rootScope, $scope, $sce, $timeout, rs) {
    $scope.getTime = function() {
      var d = new Date();
      return d.getTime();
    };
    $scope.initalResponses = {};
    $scope.finalResponses = {};
    // checks if inputs are filled out
    $scope.isValid = function(answers) {
      if ($scope.debug) return true;
      for (answer in answers) {
          if (!answers[answer]) {
            sweetAlert({
              title: "Please enter a value for all emotions.",
              text: "",
              type: "error",
              allowOutsideClick: true
            });
            return false;
          }
      }
      return true;
    };
    $scope.checkSlider = function(value) {
      if ($scope.debug) return true;
      if (!value) {
        sweetAlert({
          title: "Please enter a value of percent.",
          text: "",
          type: "error",
          allowOutsideClick: true
        });
        return false;
      }
      return true;
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
    $scope.method = {
      type: '',
      inc: '',
      direction: ''
    };
    $scope.nomessage = false;
    $scope.freemessage = false;
    $scope.questionaire = '';

    // questionaire options

    $scope.finalquestionaireoptions = {
      'Batson': {
        options: {
          min: 1,
          max: 9,
          orientation: 'horizontal',
          step: 1
        },
        values: [
          {
            begin: {
              name: 'bad-mood',
              value: 0
            },
            end: {
              name: 'good-mood',
              value: 0
            }
          },
          {
            begin: {
              name: 'sad',
              value: 0
            },
            end: {
              name: 'happy',
              value: 0
            }
          },
          {
            begin: {
              name: 'depressed',
              value: 0
            },
            end: {
              name: 'satisfied',
              value: 0
            }
          },
          {
            begin: {
              name: 'gloomy',
              value: 0
            },
            end: {
              name: 'cheerful',
              value: 0
            }
          },
          {
            begin: {
              name: 'displeased',
              value: 0
            },
            end: {
              name: 'pleased',
              value: 0
            }
          },
          {
            begin: {
              name: 'sorrowful',
              value: 0
            },
            end: {
              name: 'joyful',
              value: 0
            }
          }
        ]
      },
      'Bosman': {
        options: {
          min: 0,
          max: 7,
          orientation: 'horizontal',
          step: 0.1
        },
        values: [
          {
            name: 'saddness',
            value: 0
          },
          {
            name: 'happiness',
            value: 0
          },
          {
            name: 'shame',
            value: 0
          },
          {
            name: 'fear',
            value: 0
          },
          {
            name: 'envy',
            value: 0
          },
          {
            name: 'hope',
            value: 0
          },
          {
            name: 'anger',
            value: 0
          },
          {
            name: 'anxiety',
            value: 0
          },
          {
            name: 'joy',
            value: 0
          },
          {
            name: 'irritation',
            value: 0
          },
          {
            name: 'contempt',
            value: 0
          },
          {
            name: 'surprise',
            value: 0
          },
          {
            name: 'dissapointment',
            value: 0
          },
          {
            name: 'nervousness',
            value: 0
          }
        ]
      }
    };$scope.questionaireoptions = {
      'Batson': {
        options: {
          min: 1,
          max: 9,
          orientation: 'horizontal',
          step: 1
        },
        values: [
          {
            begin: {
              name: 'bad-mood',
              value: 0
            },
            end: {
              name: 'good-mood',
              value: 0
            }
          },
          {
            begin: {
              name: 'sad',
              value: 0
            },
            end: {
              name: 'happy',
              value: 0
            }
          },
          {
            begin: {
              name: 'depressed',
              value: 0
            },
            end: {
              name: 'satisfied',
              value: 0
            }
          },
          {
            begin: {
              name: 'gloomy',
              value: 0
            },
            end: {
              name: 'cheerful',
              value: 0
            }
          },
          {
            begin: {
              name: 'displeased',
              value: 0
            },
            end: {
              name: 'pleased',
              value: 0
            }
          },
          {
            begin: {
              name: 'sorrowful',
              value: 0
            },
            end: {
              name: 'joyful',
              value: 0
            }
          }
        ]
      },
      'Bosman': {
        options: {
          min: 0,
          max: 7,
          orientation: 'horizontal',
          step: 0.1
        },
        values: [
          {
            name: 'saddness',
            value: 0
          },
          {
            name: 'happiness',
            value: 0
          },
          {
            name: 'shame',
            value: 0
          },
          {
            name: 'fear',
            value: 0
          },
          {
            name: 'envy',
            value: 0
          },
          {
            name: 'hope',
            value: 0
          },
          {
            name: 'anger',
            value: 0
          },
          {
            name: 'anxiety',
            value: 0
          },
          {
            name: 'joy',
            value: 0
          },
          {
            name: 'irritation',
            value: 0
          },
          {
            name: 'contempt',
            value: 0
          },
          {
            name: 'surprise',
            value: 0
          },
          {
            name: 'dissapointment',
            value: 0
          },
          {
            name: 'nervousness',
            value: 0
          }
        ]
      }
    };

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
      finalquestions: false,
      thanks: false
    };
    $scope.barrier = {
      subject : {
        readyPart2: false,
        readyPart3: false,
        transferProcess: false
      },
      partner : {
        readyPart2: false,
        readyPart3: false,
        transferProcess: false
      }
    };

    // user variables
    // set in config
    $scope.role = "T";
    $scope.endowment = 300;
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
      endowment: 0,
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
      if (!$scope.isValid($scope.initalResponses)) return;
      $scope.showpage.initalquestions = false;

      $scope.showpage.part2 = true;
      // send answers back to server
      var value = {
        showpage: $scope.showpage,
        time: $scope.getTime()
      };
      for(emotion in $scope.initalResponses) {
        value[emotion] = $scope.initalResponses[emotion];
      };

      rs.trigger("sendinitalanswers", value);
      // get ready for a barrier
      console.log("ready for part 2?");
      rs.trigger("readypart2self", {
      });
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
      $scope.maxpoints = (Math.floor(Math.random() * 80) + 40) * $scope.scale;
      $("#income").text("So far, your income is $" +
        $scope.floatToMoney($scope.income).toFixed(2) + ".");

      // save income
      rs.trigger("saveIncome", {
        role: $scope.role,
        endowment: $scope.endowment,
        income: $scope.income,
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percentTransferred,
        moneytransferred: $scope.moneytransferred,
        totalincome: $scope.totalincome
      });
      rs.trigger("adminTasks", {
        points: $scope.locatorState.getPointvalue(),
        totalpoints: $scope.income,
        task: $scope.task,
        time: $scope.getTime()
      });

      // reaches income goal or passes max number of tasks
      if ($scope.income > $scope.incomegoal * 100 * $scope.scale || $scope.task > 22) {
        $timeout.cancel($scope.mytimeout);
        console.log("sending payload, over.");
        rs.send("sendIncome", {
          income: $scope.income
        });
        rs.trigger("saveIncome", {
          role: $scope.role,
          endowment: $scope.endowment,
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
      rs.trigger("readypart3self", {});
      console.log("slider is up");
    };
    $scope.part3ready = function() {
      $scope.showpage.roles = true;
      $scope.showpage.part3ready = false;
      $scope.saveState();
    };
    $scope.sendDecision = function() {
      if (!$scope.checkSlider($scope.percent)) return;
      $scope.showpage.slider = false;
      $scope.showpage.waitpage = true;
      $scope.saveState();
      // send values
      $scope.percentTransferred = $scope.percent;
      $scope.moneytransferred = $scope.transferred;
      $scope.partner.percenttransferred = $scope.percent;
      $scope.partner.moneytransferred = $scope.transferred;
      $scope.totalincome = ($scope.finalEarnings || $scope.income) + $scope.endowment;
      console.log("sending payload, over.");
      rs.trigger("admintakerate", {
        takerate: $scope.percent,
        finalearnings: $scope.floatToMoney($scope.totalincome),
        time: $scope.getTime()
      });
      rs.send("sendDecision", {
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percent,
        moneytransferred: $scope.transferred,
        totalincome: $scope.totalincome
      });
      rs.trigger("saveIncome", {
        role: $scope.role,
        endowment: $scope.endowment,
        income: $scope.income,
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percentTransferred,
        moneytransferred: $scope.moneytransferred,
        totalincome: $scope.totalincome
      });

      // barrier time
      rs.trigger("readyTransferProcessSelf", {});
    };
    $scope.sendEstimate = function() {
      if (!$scope.checkSlider($scope.percent)) return;
      $scope.showpage.slider = false;
      $scope.showpage.waitpage = true;
      $scope.saveState();
      // send values
      console.log("sending payload, over.");
      rs.trigger("adminetakerate", {
        etakerate: $scope.percent,
        time: $scope.getTime()
      });
      rs.send("sendEstimate", {
        percent: $scope.percent,
        transferred: $scope.transferred
      });
      rs.trigger("saveIncome", {
        role: $scope.role,
        endowment: $scope.endowment,
        income: $scope.income,
        percent: $scope.percent,
        transferred: $scope.transferred,
        percentTransferred: $scope.percentTransferred,
        moneytransferred: $scope.moneytransferred,
        totalincome: $scope.totalincome
      });

      $scope.saveState();
      // barrier time
      rs.trigger("readyTransferProcessSelf", {});
    };
    $scope.sendWillingness = function(responce) {
      // check if there is a bid
      if (!$scope.bid && $scope.method.type !== "SOP") {
        sweetAlert({
          title: "Please enter an amount.",
          text: "",
          type: "error",
          allowOutsideClick: true
        });
        return;
      }
      // set bid in sop
      if ($scope.method.type === "SOP") {
        if (responce === "yes") {
          $scope.bid = $scope.sopValue;
          $scope.actualprice = $scope.sopValue;
        } else if (responce === "no") {
          $scope.bid = 0;
          $scope.actualprice = $scope.sopValue;
        }
      }
      $scope.bid *= 100;

      if ($scope.bid > $scope.income - $scope.partner.moneytransferred + $scope.endowment && $scope.method.direction === "WTP") {
        sweetAlert({
          title: "Unavaliable Value",
          text: "Your willingness exeeds your avaliable earnings.",
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

      if ($scope.method.inc === "CONT") {
        $scope.actualprice = Math.floor(Math.random() * 300 * $scope.scale);
        $scope.bid *= 100;
      } else if ($scope.method.inc === "LIST") {
        var length = $scope.bdm2values.length;
        $scope.actualprice = $scope.bdm2values[Math.floor(Math.random() * length)].value;
      }

      if ($scope.bid >= $scope.actualprice && $scope.method.direction === "WTP") {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred - $scope.actualprice + $scope.endowment;
        // p gets to send message
        $scope.bid = $scope.bid / 100;
        $scope.ablesendmessage = true;
        rs.trigger("saveWillingness", {
          bid: $scope.bid,
          actualprice: $scope.actualprice
        });
        rs.trigger("adminwillingness", {
          wtp: $scope.floatToMoney($scope.bid),
          actualprice: $scope.floatToMoney($scope.actualprice),
          finalearnings: $scope.floatToMoney($scope.totalincome),
          time: $scope.getTime()
        });
      } else if ($scope.bid <= $scope.actualprice && $scope.method.direction === "WTA") {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred - $scope.actualprice;
        // p gets to send message
        $scope.bid = $scope.bid / 100;
        $scope.ablesendmessage = true;
        rs.trigger("saveWillingness", {
          bid: $scope.bid,
          actualprice: $scope.actualprice
        });
        rs.trigger("adminwillingness", {
          wtp: $scope.floatToMoney($scope.bid),
          actualprice: $scope.floatToMoney($scope.actualprice),
          finalearnings: $scope.floatToMoney($scope.totalincome),
          time: $scope.getTime()
        });
      } else {
        $scope.totalincome = $scope.income - $scope.partner.moneytransferred;
        // p doesnt get to send message
        $scope.bid = $scope.bid / 100;
        $scope.ablesendmessage = false;
        rs.trigger("adminwillingness", {
          wtp: $scope.floatToMoney($scope.bid),
          actualprice: $scope.floatToMoney($scope.actualprice),
          finalearnings: $scope.floatToMoney($scope.totalincome),
          time: $scope.getTime()
        });
      }

      $scope.showpage.messagePage = true;
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
      rs.trigger("adminmessage", {
        message: $scope.message.replace(/\n/g, '<br />'),
        time: $scope.getTime()
      });
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
      rs.send("readMessage", {});
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
    $scope.finishFinalQuestions = function() {
      if (!$scope.isValid($scope.finalResponses)) return;
      $scope.showpage.finalquestions = false;

      $scope.showpage.thanks = true;
      // send answers back to server
      var value = {
        showpage: $scope.showpage,
        time: $scope.getTime()
      };
      for(emotion in $scope.finalResponses) {
        value[emotion] = $scope.finalResponses[emotion];
      };

      rs.trigger("sendfinalanswers", value);
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
    $scope.createInitQuestionaires = function() {
      console.log('creating inital questions');
      // create sliders for the initalquestions
      var options = $scope.questionaireoptions[$scope.questionaire].options;
      $scope.questionaireoptions[$scope.questionaire].values.forEach(function(val, index) {
        $("#initalslider-"+index).slider({
          range: 'min',
          min: options.min,
          max: options.max,
          step: options.step,
          value: 0,
          orientation: options.orientation,
          slide: function(event, ui) {
            ui.handle.style.display = "inline";
            if ($scope.questionaire === 'Batson') {
              val.begin.value = ui.value;
              $scope.initalResponses[val.begin.name] = ui.value;
              val.end.value = 10-ui.value;
              $scope.initalResponses[val.end.name] = 10-ui.value;
              $scope.$apply();
            } else {
              val.value = ui.value;
              $scope.initalResponses[val.name] = ui.value;
            }
          }
        });
        if ($scope.questionaire === 'Batson') {
          $scope.initalResponses[val.begin.name] = null;
          $scope.initalResponses[val.end.name] = null;
        } else {
          $scope.initalResponses[val.name] = null;
        }
      });
      $(".ui-state-default").hide();
    };

    $scope.createFinalQuestionaires = function() {
      var options = $scope.questionaireoptions[$scope.questionaire].options;
      $scope.finalquestionaireoptions[$scope.questionaire].values.forEach(function(val, index) {
        $("#finalslider-"+index).slider({
          range: "min",
          min : options.min,
          max : options.max,
          step: options.step,
          value : 0,
          orientation: options.orientation,
          slide: function(event, ui) {
            ui.handle.style.display = "inline";
            if ($scope.questionaire === 'Batson') {
              val.begin.value = ui.value;
              $scope.finalResponses[val.begin.name] = ui.value;
              val.end.value = 10-ui.value;
              $scope.finalResponses[val.end.name] = 10-ui.value;
              $scope.$apply();
            } else {
              val.value = ui.value;
              $scope.finalResponses[val.name] = ui.value;
            }
          }
        });
        if ($scope.questionaire === 'Batson') {
          $scope.finalResponses[val.begin.name] = null;
          $scope.finalResponses[val.end.name] = null;
        } else {
          $scope.finalResponses[val.name] = null;
        }
      });
      $(".ui-state-default").hide();
    };
    $scope.createSliders = function() {
      if ($scope.role === "T") {
        $scope.percentSlider = $("#tSlider").labeledslider({
          max: 100,
          tickArray: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          value: 0,
          range: 'min',
          slide: function(event, ui) {
            ui.handle.style.display = "inline";
            console.log("T slider");
            $scope.percent = ui.value;
            $("#tPercentTransfered").text("Percentage transfered: " + $scope.percent + "%");
            $scope.transferred = $scope.partner.income * $scope.percent / 100;
            $("#tMoneyTransferred").text("The amount tranferred to your account will be $" + $scope.floatToMoney($scope.transferred).toFixed(2) + ".");
            $scope.finalEarnings = $scope.income + $scope.transferred;
            $("#tFinalEarnings").text("Your final earnings will be $" + $scope.floatToMoney($scope.finalEarnings).toFixed(2) + ".");
            rs.trigger("tickmark", {role: $scope.role, percent: ui.value, money: $scope.transferred});
          }
        });
      } else if ($scope.role === "P"){
        $scope.percentSlider = $("#pSlider").labeledslider({
          max: 100,
          tickArray: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          value: 0,
          range: 'min',
          slide: function(event, ui) {
            ui.handle.style.display = "inline";
            console.log("P slider");
            $scope.percent = ui.value;
            $("#pPercentTransferred").text("Percentage transfered: " + $scope.percent + "%");
            $scope.transferred = $scope.income * $scope.percent / 100;
            $("#pMoneyTransferred").text("The amount transferred from your account would be $" + $scope.floatToMoney($scope.transferred).toFixed(2) + ".");
            $scope.finalEarnings = $scope.income - $scope.transferred;
            $("#pFinalEarnings").text("Your final earnings would be $" + $scope.floatToMoney($scope.finalEarnings).toFixed(2) + ".");
            rs.trigger("tickmark", {role: $scope.role, percent: ui.value, money: $scope.transferred});
          }
        });
      }
      $(".ui-state-default").hide();
      $(".ui-slider-wrapper.ui-widget.horizontal").css("margin-left", "23%");
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
      rs.trigger("readyTransferProcessSelf", {});
      $scope.saveState();
    };

    // rs.recv
    // sent from self to server and self
    rs.recv("sendIncome", function(sender, value) {
      console.log("got from the other person");
      if (sender == parseInt($scope.partner.index)) {
        console.log("got the payload, over.");
        $scope.partner.income = value.income;
      }
    });
    // sends decision on percent
    rs.recv("sendDecision", function(sender, value) {
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
      console.log ("sendmessage recv");
      if ($scope.reader && $scope.role === "R") {
        console.log("r recieved message");
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
      } else if (sender == parseInt($scope.partner.index) && !$scope.reader) {
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
      $scope.endowment = value.endowment;
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
    rs.on("readypart2self", function(value) {
      $scope.barrier.subject.readyPart2 = true;
      if ($scope.role === "R") {
        $scope.part2barrier();
      }
      rs.send("readypart2send", {
      });
      if ($scope.barrier.subject.readyPart2 && $scope.barrier.partner.readyPart2) {
        console.log('past 2nd barrier');
        $scope.part2barrier();
      }
    });
    rs.recv("readypart2send", function(sender, value) {
      if (sender == parseInt($scope.partner.index)) {
        $scope.barrier.partner.readyPart2 = true;
        if ($scope.barrier.subject.readyPart2 && $scope.barrier.partner.readyPart2) {
          console.log('past 2nd barrier');
          $scope.part2barrier();
        }
      }
    });
    $scope.part2barrier = function() {
      $scope.showpage.part2 = false;
      $scope.showpage.part2ready = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    };
    rs.on("readypart3self", function(value) {
      $scope.barrier.subject.readyPart3 = true;
      if ($scope.role === "R") {
        $scope.part3barrier();
      }
      rs.send("readypart3send", {
      });
      if ($scope.barrier.subject.readyPart3 && $scope.barrier.partner.readyPart3) {
        $scope.part3barrier();
      }
    });
    rs.recv("readypart3send", function(sender, value) {
      if (sender == parseInt($scope.partner.index)) {
        $scope.barrier.partner.readyPart3 = true;
        if ($scope.barrier.subject.readyPart3 && $scope.barrier.partner.readyPart3) {
          $scope.part3barrier();
        }
      }
    });
    $scope.part3barrier = function() {
      $scope.showpage.part3 = false;
      $scope.showpage.part3ready = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    };
    rs.on("readyTransferProcessSelf", function(value) {
      $scope.barrier.subject.transferProcess = true;
      rs.send("readyTransferProcessSend", {
      });
      if ($scope.barrier.subject.transferProcess && $scope.barrier.partner.transferProcess) {
        $scope.transferprocessbarrier();
      }
    });
    rs.recv("readyTransferProcessSend", function(sender, value) {
      if (sender == parseInt($scope.partner.index)) {
        $scope.barrier.partner.transferProcess = true;
        if ($scope.barrier.subject.transferProcess && $scope.barrier.partner.transferProcess) {
          $scope.transferprocessbarrier();
        }
      }
    })
    $scope.transferprocessbarrier = function() {
      if ($scope.nomessage) {
        if ($scope.role === "T") {
          $scope.showpage.waitpage = false;
          $scope.showpage.showEarnings = true;
          $scope.saveState();
        }
        if ($scope.role === "P") {
          $scope.totalincome = $scope.income - $scope.partner.moneytransferred;
          $scope.bid = 0;
          rs.send("sendWillingness", {
            actualprice: $scope.actualprice,
            totalincome: $scope.totalincome,
            message: false
          });
          rs.trigger("adminwillingness", {
            wtp: "---",
            actualprice: "---",
            finalearnings: $scope.floatToMoney($scope.totalincome),
            time: $scope.getTime()
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
          rs.trigger("adminwillingness", {
            wtp: "---",
            actualprice: "---",
            finalearnings: $scope.floatToMoney($scope.totalincome),
            time: $scope.getTime()
          });
          $scope.showpage.waitpage = false;
          $scope.showpage.messagePage = true;
          $scope.saveState();
        }
      } else {
        console.log('through part 3');
        if ($scope.role === "P") {
          $scope.showpage.waitpage = false;
          $scope.showpage.willingnesspage = true;
        }
      }
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    };

    $scope.treatmentConfig = function() {
      switch($scope.treatment) {
        // as is
        case 'DM':
          console.log("welcome, nothing out of the ordinary is here");
          break;
        // no message :
        // no references to messages
        case 'NM':
          console.log("carry on, nothing to see here");
          $scope.nomessage = true;
          break;
        // free message :
        // no references to paying for the message
        case 'FM':
          console.log("'cause I'm free as a message now baby");
          $scope.freemessage = true;
          break;
        // reader :
        // all messages go to an isolated reader(s)
        case 'TP':
          console.log("time for the reader");
          // need to make algorithm for sorting peoples
          $scope.reader = true;
          break;
        default:
          console.log("error : check config");
          break;
      }
    };
    $scope.parseMethod = function(method) {
      var splitMethod = method.split("_");
      $scope.method.type = splitMethod[0];
      if ($scope.method.type === "BDM") {
        $scope.method.inc = splitMethod[1];
        $scope.method.direction = splitMethod[2];
      } else {
        $scope.method.direction = splitMethod[1];
      }
    };

    $scope.$on('ngRepeatInitFinished', function(ngRepeatFinishedEvent) {
      console.log('and here we are at first');
      $scope.createInitQuestionaires();
    });
    $scope.$on('ngRepeatFinalFinished', function(ngRepeatFinishedEvent) {
      console.log('and here we are at last');
      $scope.createFinalQuestionaires();
    });

    rs.on_load(function() {
      var configfile;
      var userIndex;
      var partnerIndex;

      console.log("hello experiment");

      $scope.userIndex = parseInt(rs.user_id);
      for (var i = 0; i < rs.configs.length; i++) {
        var groupindex = rs.configs[i].Group.indexOf($scope.userIndex)
        if (groupindex !== -1) {
          console.log('config is at '+i);
          configfile = rs.configs[i];
          userIndex = groupindex;
          for (var j = 0; j < rs.configs[i].Group.length; j++) {
            if (j !== userIndex && rs.configs[i].Role[j] !== 'R') {
              partnerIndex = j;
            }
          }
        }
      }
      console.log('my index '+userIndex);
      console.log('other index '+partnerIndex);
      // congif values
      $scope.incomegoal = configfile.TargetIncome;
      $scope.scale = configfile.Scale;
      $scope.treatment = configfile.Treatment;
      $scope.treatmentConfig();
      $scope.parseMethod(configfile.Method);
      $scope.questionaire = configfile.Questionaire;
      $scope.methodParams = configfile.MethodParams * 100;

      $scope.showpage.showStartExperiment = true;
      // set values from config file
      // role index endowment
      configfile.Role = configfile.Role.substring(1,configfile.Role.length-1).split(",");
      $scope.role = configfile.Role[userIndex];
      $scope.endowment = configfile.Endowment * 100 * $scope.scale;

      // check if debug is up
      if (!configfile.Debug) $scope.debug = false;
      else {
        $scope.debug = true;
        $scope.income = $scope.incomegoal * 100 * $scope.scale + 1;
      }

      // set partner values from config file
      // index role endowment
      if ($scope.role !== 'R') {
        $scope.partner.index = configfile.Group[partnerIndex];
        $scope.partner.role = configfile.Role[partnerIndex];
        $scope.partner.endowment = $.isArray(configfile.Endowment) ?
          configfile.Endowment[partnerIndex] * 100 * $scope.scale :
          configfile.Endowment * 100 * $scope.scale;
        console.log("userId : "+$scope.userIndex);
        console.log("role : "+$scope.role);
        console.log("partnerId : "+$scope.partner.index);
        console.log("partnerRole : "+$scope.partner.role);
      } else {
        $scope.readerlist = [];
        for (var i = 0; i < configfile.Group.length; i++) {
          if (i !== $scope.userIndex && configfile.Role[i] === 'P') {
            $scope.readerlist.push(i);
          }
        }
      }
      $scope.createSliders();

      rs.trigger("admininital", {
        partnerId: $scope.partner.index,
        role: $scope.role,
        time: $scope.getTime()
      });
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
  })
  .directive('onInitFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatInitFinished');
                });
            }
        }
    }
  })
  .directive('onFinalFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinalFinished');
                });
            }
        }
    }
  });
