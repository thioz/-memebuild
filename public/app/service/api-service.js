(function () {

	angular.module('app').service('ApiService', ['$http', function ($http) {
			var service = {};

			service.getRoute = GetRoute;
			service.postRoute = PostRoute;
			service.postFile = PostFile;
			return service;

			function PostRoute(url, data, params) {
				params = params || {};
				data = data || {};
				return $http({
					method: 'POST',
					url: url,
					params: params,
					data: data
				}).then(function (response) {
					return response.data;
				});
			}
			function GetRoute(url, params) {
				params = params || {};
				return $http({
					method: 'GET',
					url: url,
					params: params
				}).then(function (response) {
					return response.data;
				});
			}

			function PostFile(url, file, filename, data) {
				data = data || {};
				filename = filename || 'file';
				var fd = new FormData();
				for (var p in data) {
					fd.append(p, data[p]);
				}
				fd.append(filename, file);
				return $http.post(url, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).then(function(res){
					return res.data;
				})
			}
		}]);

})();