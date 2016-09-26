(function () {
	angular.module('app').controller('GalleryController', [
		'$scope', 'ApiService', function ($scope, apiService) {
			$scope.images=[];
			$scope.params={
				offset:0,
				limit:30
			};
			$scope.init = function () {
				apiService.getRoute('/images/gallery',$scope.params).then(function(data){
					$scope.images=data.items;
				});
			};
			
			$scope.init();
		}
	]);

})();