Redwood.controller("SubjectCtrl", ["$rootScope", "$scope", "RedwoodSubject", function($rootScope, $scope, rs) {
  $scope.initalResponses = {
    question1: {
      answer: ''
    },
    question2: {
      answer1: '', answer2: '', answer3: ''
    },
    question3: {
      answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: '', answer7: '', answer8: '', answer9: '', answer10: '', answer11: ''
    },
    question4: {
      answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: ''
    },
    question5: {
      answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: ''
    },
    question6: {
      answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: '', answer7: '', answer8: ''
    }
  };
  $scope.finalResponses = {
    question1: {
      answer: ''
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

  // all the variables for ng show
  $scope.showpage = {
    showStartExperiment: false,
    initalquestions: null,
    part2: false,
    part2ready: false,
    exampleTasks: false,
    practice1: false,
    practice2: false,
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
    readMessage: false,
    showEarnings: false,
    part4: false,
    part4ready: false,
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
  $scope.messages = [];

  // variables for P
  $scope.bid = null;
  $scope.actualprice = 0;

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
    $scope.showpage.initalquestions = 0;
  };

  // closes one question and shows the next
  $scope.nextQuestion = function() {
    $scope.showpage.initalquestions++;
    // send responses in case of a refresh
    rs.trigger("saveinitalanswers", {
      initalResponses: $scope.initalResponses,
      showpage: $scope.showpage
    });
  };
  // finishes questions onto money part
  // barrier : have all people ready for part 2
  $scope.finishQuestions = function() {
    $scope.showpage.initalquestions++;
    $scope.showpage.part2 = true;
    // send answers back to server
    rs.trigger("sendinitalanswers", {
      initalResponses: $scope.initalResponses,
      showpage: $scope.showpage
    });
    // get ready for a barrier
    console.log("ready for part 2?");
    rs.synchronizationBarrier('part2').then(function() {
      console.log("I was born ready");
      $scope.showpage.part2ready = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    });
  };
  $scope.practiceGame1 = function() {
    $scope.showpage.practice1 = true;
    $scope.showpage.exampleTasks = false;

    $scope.points = [];
    $scope.plot = $.plot("#practice1",[{
        data: $scope.points,
        points: {show : true}
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

    $scope.locatorState =
      new LocatorState(document.getElementById("practice1locator"),
                       "#practice1points", true, 50);
    $scope.locatorState.setGoal();
    $scope.locatorState.draw();

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
          radius: 10,
        }
      }]);
      $scope.plot.draw();
      $scope.locatorState.update(pos);
      $scope.locatorState.draw();
      /*
      if (item) {
        highlight(item.series, item.datapoint);
        console.log("You clicked a point!");
      }
      */
    });
  };
  $scope.nextPractice = function() {
    $scope.showpage.practice1 = false;
    $scope.showpage.practice2 = true;

    $scope.points = [];
    $scope.plot = $.plot("#practice2",[{
        data: $scope.points,
        points: {show : true}
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

    $scope.locatorState =
      new LocatorState(document.getElementById("practice2locator"),
                       "#practice2points", true, 50);
    $scope.locatorState.setGoal();
    $scope.locatorState.draw();

    $("#practice2").bind("plotclick", function(event, pos, item) {
      $scope.points.pop();
      $scope.points.push([pos.x, pos.y]);
      console.log($scope.maxpoints);
      $scope.plot.setData([{
        data: $scope.points,
        clickable: false,
        points: {
          show: true,
          fill: true,
          radius: 10,
        }
      }]);
      $scope.plot.draw();
      $scope.locatorState.update(pos);
      $scope.locatorState.draw();
      /*
      if (item) {
        highlight(item.series, item.datapoint);
        console.log("You clicked a point!");
      }
      */
    });
  };
  $scope.finalPractice = function() {
    $scope.showpage.practice2 = false;
    $scope.showpage.realTasks = true;

    rs.synchronizationBarrier('realTasks').then(function() {
      $scope.showpage.realTasksReady = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    });
  };
  $scope.showgame = function() {
    $scope.showpage.gametime = true;
    $scope.showpage.realTasks = false;

    $scope.points = [];
    $scope.plot = $.plot("#placeholder",[{
        data: $scope.points,
        points: {show : true}
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
                                          "#points", false);
    $scope.locatorState.setGoal();
    $scope.locatorState.draw();

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
          radius: 10,
        }
      }]);
      $scope.plot.draw();
      $scope.locatorState.update(pos);
      $scope.locatorState.draw();
    });
  };
  $scope.nexttask = function() {
    $scope.income += $scope.locatorState.getPointvalue();
    $scope.maxpoints = Math.floor(Math.random() * 100) + 1;
    $("#income").text("So far, your income is $" +
      $scope.floatToMoney($scope.income) + ".");

      // reaches income goal
      if ($scope.income > 10 * 100) {
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
        console.log("income : " + $scope.income);


      }
      // clear dot and set new goal
      else {
        $scope.points.pop();
        $scope.plot.setData([$scope.points]);
        $scope.plot.draw();
        $scope.locatorState.setGoal();
        $scope.locatorState.pointvalue = 0;
        $("#earned").text("Money earned for this task (cents) : " +
          parseFloat($scope.locatorState.pointvalue).toFixed(1));
        $("#points").text("Points earned : " + parseFloat($scope.locatorState.pointvalue).toFixed(1));
      }
  };
  $scope.moneyShown = function() {
    $scope.showpage.moneyReceived = false;
    //part 3
    $scope.showpage.part3 = true;
    rs.synchronizationBarrier('part3').then(function() {
      $scope.showpage.part3ready = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    });
    console.log("slider is up");
  };
  $scope.sendDecision = function() {
    $scope.showpage.slider = false;
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
    rs.synchronizationBarrier('transferProcess').then(function() {
      $scope.showpage.willingnesspage = true;

      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    });
  };
  $scope.sendEstimate = function() {
    $scope.showpage.slider = false;
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

    // barrier time
    rs.synchronizationBarrier('transferProcess').then(function() {
      $scope.showpage.willingnesspage = true;

      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    });
  };
  $scope.sendWillingness = function() {
    $scope.showpage.willingnesspage = false;
    $scope.actualprice = Math.floor(Math.random() * ($scope.income - $scope.partner.moneytransferred));
    $scope.bid *= 100;

    if ($scope.bid > $scope.actualprice) {
      $scope.totalincome = $scope.income - $scope.partner.moneytransferred - $scope.actualprice;
      $scope.showpage.checkprice = true;
      // p gets to send message
      rs.trigger("saveWillingness", {
        bid: $scope.bid,
        actualprice: $scope.actualprice
      });
    } else {
      $scope.totalincome = $scope.income - $scope.partner.moneytransferred;
      // p doesnt get to send message
      $scope.showpage.showEarnings = true;
    }
    rs.send("sendWillingness", {
      actualprice: $scope.actualprice,
      totalincome: $scope.totalincome,
      message: $scope.bid > $scope.actualprice
    });
  };
  $scope.saveMessage = function(event) {
    if (event.keyCode === 13) {
      $scope.messages.push($scope.message);
      $scope.message = '';
    }
  };
  $scope.sendMessage = function() {
    // send message to other person
    rs.send("sendMessage", {
      messages: $scope.messages
    });
    // navigate to correct page
    $scope.showpage.messagePage = false;
  };
  $scope.readMessage = function() {
    $scope.showpage.messagePage = false;
    rs.send("readMessage", {
    });
  };
  $scope.messageConfirm = function() {
    $scope.showpage.readMessage = false;
    $scope.showpage.showEarnings = true;
    rs.send("messageConfirm", {
    });
  };
  $scope.sawEarnings = function() {
    $scope.showpage.showEarnings = false;
    $scope.showpage.part4 = true;

    rs.synchronizationBarrier('part4').then(function() {
      $scope.showpage.part4ready = true;
      rs.trigger("afterbarrier", {
        showpage: $scope.showpage
      });
    });
  };
  $scope.nextFinalQuestion = function() {
    $scope.showpage.finalquestions++;
    // send responses in case of a refresh
    rs.trigger("savefinalanswers", {
      finalResponses: $scope.finalResponses,
      showpage: $scope.showpage
    });
  };
  $scope.finishFinalQuestions = function() {
    $scope.showpage.finalquestions++;
    $scope.showpage.thanks = true;
    // send answers back to server
    rs.trigger("sendfinalanswers", {
      finalResponses: $scope.finalResponses,
      showpage: $scope.showpage
    });
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
    var path = new Path2D();
    var l = this.radius * Math.sqrt(3) / 4;
    path.moveTo(this.x, this.y - this.value - l);
    path.lineTo(this.x - this.radius, this.y - this.value + l);
    path.lineTo(this.x + this.radius, this.y  - this.value + l);
    ctx.fill(path);
  };

  function LocatorState(canvas, pointsLocation, practice, maxpoints) {
    this.canvas = canvas;
    this.pointsLocation = pointsLocation;
    this.practice = practice;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.side = "right";
    this.direction = "up";
    this.distance = null;
    this.goal = {
      x: null,
      y: null
    };
    this.pointvalue = 0;
    this.linelength = this.height / 2;
    this.maxlength = Math.sqrt(square(100 - 0) + square(100 - 0));

    this.point = new Point(this.width / 2, this.height * 3 / 4, 20);
    $scope.maxpoints = Math.floor(Math.random() * 100) + 1;

    if (this.practice) $scope.maxpoints = maxpoints;
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
    console.log(this.goal);
    this.distance = Math.sqrt(square(this.goal.x - guess.x) + square(this.goal.y - guess.y));
    // update locator position
    this.pointvalue = $scope.maxpoints - this.distance * $scope.maxpoints / this.maxlength;
    var linescale = this.pointvalue * this.linelength / $scope.maxpoints;
    this.point.update(linescale);
    if (!this.practice)
      $("#earned").text("Money earned for this task (cents) : " + parseFloat(this.pointvalue).toFixed(1));
    $(this.pointsLocation).text("Points earned : " + parseFloat(this.pointvalue).toFixed(1));

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
    this.ctx.font = "20px Lucida Console";
    this.ctx.fillText("Close!", this.width / 8, this.height * 2 / 11);
    this.ctx.fillText("Go " + this.side + "-" + this.direction, this.width * 2 / 4, this.height * 2 / 11);
    // draws line
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 4);
    this.ctx.lineTo(this.width / 2, this.height / 4 + this.linelength);
    this.ctx.stroke();

    // draws numbers

    // draw locator
    this.point.draw(this.ctx);
  };

  // creates the respective sliders for the percentage page
  $scope.createSliders = function() {
    console.log("begin creation");

    if ($scope.role === "T") {
      $scope.finalEarnings = $scope.income;
      $scope.percentSlider = $("#tSlider").slider({
        ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        ticks_labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      });
      $scope.percentSlider.on("change", function(slideEvt) {
        console.log("T slider");
        $scope.percent = slideEvt.value.newValue;
        $("#tPercentTransfered").text("Percentage transfered: " + $scope.percent + "%");
        $scope.transferred = $scope.partner.income * $scope.percent / 100;
        console.log("transferred : " + $scope.transferred);
        console.log($scope.partner.income);
        console.log($scope.percent);
        $("#tMoneyTransferred").text("Money (in $) transferred to your account : " + $scope.floatToMoney($scope.transferred));
        $scope.finalEarnings = $scope.income + $scope.transferred;
        $("#tFinalEarnings").text("Money final earnings (in $) for the experiment will be : " + $scope.floatToMoney($scope.finalEarnings));
      });
    } else {
      $scope.percentSlider = $("#pSlider").slider({
        ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        ticks_labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      });
      $scope.percentSlider.on("change", function(slideEvt) {
        console.log("P slider");
        $scope.percent = slideEvt.value.newValue;
        $("#pPercentTransferred").text("Percentage transfered: " + $scope.percent + "%");
        $scope.transferred = $scope.income * $scope.percent / 100;
        $("#pMoneyTransferred").text("Amount (in $) expected to be transferred to T's account : " + $scope.floatToMoney($scope.transferred));
        $scope.finalEarnings = $scope.income - $scope.transferred;
        $("#pFinalEarnings").text("Your expected avaliable earnings (in $) are : " + $scope.floatToMoney($scope.finalEarnings));
      });
    }
    console.log("sliders created");
    $scope.showpage.roles = false;
    $scope.showpage.slider = true;
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
      if (value.message) {
        //$scope.showpage.messagePage = true;
        $scope.partner.actualprice = value.actualprice;
      } else {
        $scope.showpage.showEarnings = true;
      }
    }
  });
  rs.recv("sendMessage", function(sender, value) {
    if (sender == parseInt($scope.partner.index)) {
      $scope.messages = value.messages;
      $scope.showpage.messagePage = true;
    }
  });
  rs.recv("readMessage", function(sender, value) {
    if (sender == parseInt($scope.partner.index)) {
      $scope.showpage.readMessage = true;
    }
  });
  rs.recv("messageConfirm", function(sender, value) {
    console.log("got the message. it is confirmed");
    if (sender == parseInt($scope.partner.index)) {
      $scope.showpage.showEarnings = true;
    }
  });

  // rs.on
  // sent from others to server and everyone

  // saves answers and location on page
  rs.on("saveinitalanswers", function(value) {
    $scope.initalResponses = value.initalResponses;
    $scope.showpage = value.showpage;
  });
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

  rs.on_load(function() {
    console.log("hello experiment");
    $scope.showpage.showStartExperiment = true;
    // set values from config file
    // role index endownment
    $scope.userIndex = parseInt(rs.user_id);
    $scope.role = rs.config.roles[$scope.userIndex - 1];
    $scope.endownment = rs.config.endownment;

    // set partner values from config file
    // index role endownment
    $scope.partner.index = rs.config.pairs[$scope.userIndex - 1];
    $scope.partner.role = rs.config.roles[$scope.partner.index - 1];
    $scope.partner.endownment = rs.config.endownment;
    console.log($scope.userIndex);
    console.log($scope.role);
    console.log($scope.partner);

    rs.synchronizationBarrier('initalQuestions').then(function() {
      $scope.questions = false;
      $scope.showGame = true;
      console.log("its barrier time");
      $scope.showpage.thanks = false;
    });
	});

}]);
