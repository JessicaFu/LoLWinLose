app.controller('mainCtrl', function($scope, util){
	var apiGet = util.apiGet;

	$scope.summonerName = "";
	$scope.endResult = "";

	$scope.calculate = function(){
		apiGet.calculate({summonerName: $scope.summonerName}, function(res){
			if (res.data && res.data.endResult){
				$scope.endResult = "win";//res.data.endResult;
				$("#results").show();
			}
		});
	}

});