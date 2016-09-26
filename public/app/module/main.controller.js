(function () {
	angular.module('app').controller('MainController', [
		'$scope', 'ApiService', function ($scope, apiService) {
			$scope.menuActive = false;

			$scope.init = function () {
			
			};
			$scope.toggleMenu = function () {
				$scope.menuActive = $scope.menuActive ? false : true;
			};
			
			$scope.init();
		}
	]);

})();