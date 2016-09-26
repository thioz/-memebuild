(function(){
	
	angular.module('app',['ngRoute']);
	angular.module('app').config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/main',{
				controller:'MainController',
				templateUrl: '/app/module/main.html'
			});
			$routeProvider.when('/gallery',{
				controller:'GalleryController',
				templateUrl: '/app/module/gallery.html'
			});
			$routeProvider.when('/builder',{
				controller:'BuilderController',
				templateUrl: '/app/module/builder.html'
			});
			
			$routeProvider.otherwise('/builder');
			
	}]);
	
	
})();