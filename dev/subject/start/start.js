/*
Redwood.controller("SubjectCtrl", ["$rootScope", "$scope", "RedwoodSubject", function($rootScope, $scope, rs) {
  rs.on_load(function() {
    console.log("hello world");
    console.log(rs);
    $scope.questionInital = 0;
  });

  rs.synchronizationBarrier('initalQuestions').then(function() {
    $scope.questions = false;
    $scope.showGame = true;
    console.log("its barrier time");
  });

}]);
*/

Redwood.controller("SubjectCtrl", ["$rootScope", "$scope", "RedwoodSubject", function($rootScope, $scope, rs) {
  $scope.initalResponses = {
    question1: {
      answer: ''
    },
    question2: {
      answer1: '',
      answer2: '',
      answer3: ''
    },
    question3: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: '',
      answer9: '',
      answer10: '',
      answer11: ''
    },
    question4: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: ''
    },
    question5: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: ''
    },
    question6: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: ''
    }
  };

  // all the variables for ng show
  $scope.showStartExperiment = false;
  $scope.part2 = false;
  $scope.exampleTasks = false;
  $scope.gametime = false;
  $scope.realTasks = false;
  $scope.part3 = false;
  $scope.roles = false;
  $scope.slider = false;
  $scope.willingnesspage = false;
  $scope.checkprice = false;
  $scope.messagePage = false;
  $scope.thanks = false;

  /*

  $scope.percentSlider = $("#ex").slider({
    ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    ticks_labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
  });
  $scope.percentSlider.on("slide", function(slideEvt) {
    $scope.percent = slideEvt.value;
  });

  */

  //set in config
  $scope.role = "T";
  $scope.endownment = 300;
  $scope.partner = {
    endownment: 300,
    role: "P",
    income: 1045
  };

  // variables used for slider
  $scope.percent = 0;
  $scope.transfered = 0;
  $scope.totalincome = 0;

  // starts showing the questions
  $scope.startExperiment = function() {
    $scope.showStartExperiment = false;
    $scope.initalquestions = 0;
  };

  // closes one question and shows the next
  $scope.nextQuestion = function() {
    $scope.initalquestions++;
  };// finishes questions onto money part
  $scope.finishQuestions = function() {
    $scope.initalquestions++;
    $scope.part2 = true;
  };
  $scope.showgame = function() {
    $scope.gametime = true;
    $scope.realTasks = false;

    $scope.points = [];
    $scope.income = 900;
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

    $scope.locatorState = new LocatorState(document.getElementById("locator"));
    $scope.locatorState.setGoal();
    $scope.locatorState.draw();

    $("#placeholder").bind("plotclick", function(event, pos, item) {
      $scope.points.pop();
      $scope.points.push([pos.x, pos.y]);
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
  $scope.nexttask = function() {
    $scope.income += $scope.locatorState.getPointvalue();
    $("#income").text("So far, your income is $" +
      parseFloat(parseInt($scope.income)) / 100 + ".");

      // reaches income goal
      if ($scope.income > 10 * 100) {
        $scope.gametime = false;
        $scope.part3 = true;
        console.log("income : " + $scope.income);

        //part 3

        console.log("slider is up");
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
  $scope.sendDecision = function() {
    $scope.slider = false;
  };
  $scope.sendEstimate = function() {
    $scope.slider = false;
    $scope.willingnesspage = true;
  };
  $scope.sendWillingness = function() {
    $scope.willingnesspage = false;
    $scope.checkprice = true;
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

  function LocatorState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.side = "right";
    this.direction = "up";
    this.goal = {
      x: null,
      y: null
    };
    this.pointvalue = 0;
    this.linelength = this.height / 2;
    this.maxlength = Math.sqrt(square(100 - 0) + square(100 - 0));

    this.point = new Point(this.width / 2, this.height * 3 / 4, 20);
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

  LocatorState.prototype.update = function(guess) {
    console.log(this.goal);
    var distance = Math.sqrt(square(this.goal.x - guess.x) + square(this.goal.y - guess.y));
    // update locator position
    this.pointvalue = 100 - distance * this.linelength / 100;
    var linescale = this.pointvalue * this.linelength / 100;
    this.point.update(linescale);
    $("#earned").text("Money earned for this task (cents) : " + parseFloat(this.pointvalue).toFixed(1));
    $("#points").text("Points earned : " + parseFloat(this.pointvalue).toFixed(1));
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

  $scope.createSliders = function() {
    console.log("begin creation");
    $scope.percentSlider = $("#ex").slider({
      ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      ticks_labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
    });
    $scope.percentSlider.on("change", function(slideEvt) {
      $scope.percent = slideEvt.value.newValue;
      $("#percentTransfered").text("Percentage transfered: " + $scope.percent);
    });
      console.log("sliders created");
      $scope.roles = false;
      $scope.slider = true;
  };

  rs.on_load(function() {
    console.log("hello world");
    console.log(rs);
    $scope.showStartExperiment = true;

    rs.synchronizationBarrier('initalQuestions').then(function() {
      $scope.questions = false;
      $scope.showGame = true;
      console.log("its barrier time");
      $scope.thanks = false;
    });
	});

}]);
