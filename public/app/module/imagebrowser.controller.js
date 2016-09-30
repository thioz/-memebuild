(function () {
	angular.module('app').controller('ImagebrowserController', [
		'$scope', 'ApiService', function ($scope, apiService) {
			$scope.imgupload;

			$scope.init = function () {
				apiService.getRoute('/images').then(function (data) {
					$scope.images = data;
				});
			};

			$scope.uploadFile = function () {
				var file = $scope.imgupload;
				apiService.postFile('/images/upload', file, 'img').then(function (data) {
					apiService.getRoute('/images').then(function (data) {
						$scope.images = data;
					});
				})
			}

			$scope.init();
		}
	]);

})();