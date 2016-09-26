(function(){
	
	angular.module('app').service('ApiService',['$http',function($http){
			var service={};
			
			service.getRoute = GetRoute;
			service.postRoute = PostRoute;
			return service;
			
			function PostRoute(url,data,params){
				params = params || {};
				data = data || {};
				return $http({
					method:'POST',
					url: url,
					params: params,
					data: data
				}).then(function(response){
					return response.data;
				});
			}
			function GetRoute(url,params){
				params = params || {};
				return $http({
					method:'GET',
					url: url,
					params: params
				}).then(function(response){
					return response.data;
				});
			}
	}]);
	
})();