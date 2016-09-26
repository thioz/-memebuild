(function(){
	angular.module('app').controller('ImagebrowserController',[
		'$scope','ApiService',function($scope,apiService){
			
			$scope.init = function(){
				apiService.getRoute('/images').then(function(data){
					$scope.images=data;
				});
			};
			
			$scope.init();
		}
	]);
	
})();