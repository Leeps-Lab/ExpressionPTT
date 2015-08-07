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
  $scope.initalResponses = [];
  $scope.gametime = false;

  // starts showing the questions
  $scope.startExperiment = function() {
    $scope.showStartExperiment = false;
    $scope.initalquestions = 0;
  };

  // closes one question and shows the next
  $scope.nextQuestion = function(question) {
    question++;
  };

  // finishes questions onto money part
  $scope.finishQuestions = function() {
      var points = [];
      var income = 0;
      var plot = $.plot("#placeholder",[{
          data: points,
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

      var locatorState = new LocatorState(document.getElementById("locator"));
      locatorState.setGoal();
      locatorState.draw();

      $("#placeholder").bind("plotclick", function(event, pos, item) {
        points.pop();
        points.push([pos.x, pos.y]);
        plot.setData([{
          data: points,
          clickable: false,
          points: {
            show: true,
            fill: true,
            radius: 10,
          }
        }]);
        plot.draw();
        locatorState.update(pos);
        locatorState.draw();
        /*
        if (item) {
          highlight(item.series, item.datapoint);
          console.log("You clicked a point!");
        }
        */
      });


  };

  rs.on_load(function() {
    console.log("hello world");
    console.log(rs);
    $scope.showStartExperiment = true;
    rs.synchronizationBarrier('initalQuestions').then(function() {
      $scope.questions = false;
      $scope.showGame = true;
      console.log("its barrier time");
    });
	});

}]);
