Redwood.controller("SubjectWaitCtrl", ["$rootScope", "$scope", "RedwoodSubject", function($rootScope, $scope, rs) {
	rs.on_load(function() {
		rs.next_period();
	});
}]);
