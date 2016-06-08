Redwood.controller("AdminCtrl", ["$rootScope", "$scope", "Admin", "$sce", function($rootScope, $scope, ra, $sce) {

	$scope.subjects = [];
	$scope.tasknum = [];
	$scope.emotions = [];
	for(var i = 1; i <= 22; i++) {
		$scope.tasknum.push(i);
	}

	$scope.downloadcsv = function() {
		var csvContent = "data:text/csv;charset=utf-8,";
		// pregame
		var dataString = "subjectId,partnerId,role,initaltime,";
		// part 1
		console.log($scope.emotions);
		for (var i = 0; i < $scope.emotions.length; i++) {
			console.log($scope.emotions[i]);
			dataString += 'init_'+$scope.emotions[i]+',';
		}
		dataString += 'initalanswerstime,';
		// part 2
		for (var i = 1; i <= $scope.tasknum.length; i++) {
			dataString += 'task'+i+',';
			dataString += 'tast'+i+'time,';
		}
		dataString += 'totalpoints,';
		// part 3
		dataString += 'takerate,takeratetime,etakerate,etakeratetime,wtp,actualprice,message,willingnesstime,finalearnings,';
		// part 4
		for (var i = 0; i < $scope.emotions.length; i++) {
			dataString += 'final_'+$scope.emotions[i]+',';
		}
		dataString += 'finalanswerstime\n';
		csvContent += dataString;
		$scope.subjects.forEach(function(element, index) {
			// pregame
			dataString = element.userid+","+element.partnerId+","+element.role+","+element.initaltime+",";
			// part 1
			for (var i = 0; i < element.part1.length; i++) {
				dataString += element.part1[i].value+",";
			}
			dataString += element.initalanswerstime+",";
			// part 2
			for (var i = 0; i < element.tasks.length; i++) {
				dataString += element.tasks[i]+","+element.tasktime[i]+",";
			}
			dataString += element.totalpoints+",";
			// part 3
			dataString += element.takerate+","+element.takeratetime+","+element.etakerate+","+element.etakeratetime+","+
			element.wtp+","+element.actualprice+","+element.message+","+element.willingnesstime+","+element.finalearnings+",";
			// part 4
			for (var i = 0; i < element.part4.length; i++) {
				dataString += element.part4[i].value+",";
			}
			dataString += element.finalanswerstime;
			console.log(element);
			csvContent += index < $scope.subjects.length ? dataString +"\n" : dataString;
		});
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
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
          status.removeClass("alert-danger");
          status.addClass("alert-success");
        } else {
          status.text("Router Disconnected");
          status.removeClass("alert-success");
          status.addClass("alert-success");
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
                  var td = $((i == 0 ? "<th>" : "<td>")).text(cell);
                  tr.append(td);
              }
              $("table.config").append(tr);
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
				var subject = {
					userid: user,
					tasks: Array(22),
					tasktime: Array(22),
					part1: [],
					part4: []
				}
				for (var i = 0; i < $scope.emotions.length; i++) {
					var emotion = $scope.emotions[i];
					subject.part1.push({
						name: emotion,
						value: null
					});
					subject.part4.push({
						name: emotion,
						value: null
					});
				}
				console.log(subject);
				$scope.subjects.push(subject);
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
		$scope.emotions = ['bad-mood','good-mood','sad','happy','depressed','satisfied','gloomy','cheerful',
											 'displeased','pleased','sorrowful','joyful']
											 console.log($scope.subjects);
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
		console.log(value);
		// stores information
		var location = getlocation(sender);
		for (var i = 0; i < $scope.emotions.length; i++) {
			var emotion = $scope.emotions[i];
			$scope.subjects[location].part1[i].value = value[emotion];
		}
		$scope.subjects[location].initalanswerstime = value.time;
		// shows the information on the admin page
	});
	ra.recv("sendfinalanswers", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		for (var i = 0; i < $scope.emotions.length; i++) {
			var emotion = $scope.emotions[i];
			$scope.subjects[location].part4[i].value = value[emotion];
		}
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
		$scope.subjects[location].tasks[value.task-1] = value.points;
		$scope.subjects[location].tasktime[value.task-1] = value.time;
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
		$scope.subjects[location].etakeratetime = '-----';
		$scope.subjects[location].willingnesstime = '-----';
	});
	ra.recv("adminetakerate", function(sender, value) {
		// stores information
		var location = getlocation(sender);
		$scope.subjects[location].etakerate = value.etakerate;
		$scope.subjects[location].takerate = '-----';
		$scope.subjects[location].takeratetime = '-----';
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
