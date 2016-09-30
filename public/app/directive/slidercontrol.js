(function () {
	angular.module('app').directive('sliderControl', ['$parse', function ($parse) {
			return {
				restrict: 'E',
				scope: {
					sliderModel: '='
				},
				template: '<div class="slider-control" ng-click="sliderClick($event)" ng-mouseup="handleUp()" ng-mousemove="sliderMove($event)"><div class="bg"></div><div class="slider-handle" ng-mousedown="handleDown()" ng-mouseup="handleUp()"></div></div>',
				link: function (scope, element, attrs) {
					scope.minVal = parseInt(attrs.sliderMin) || 0;
					scope.maxVal = parseInt(attrs.sliderMax) || 100;
					scope.sliderHandle = angular.element(element).find('.slider-handle');
					scope.sliderDown = false;
					
					scope.$watch('sliderModel',function(v){
						if(v==undefined || scope.sliderDown){
							return;
						}
						if(scope.sliderModel>scope.maxVal){
							scope.sliderModel=scope.maxVal;
						}
						if(scope.sliderModel<scope.minVal){
							scope.sliderModel=scope.minVal;
						}
						scope.updateView();
					});

				},
				controller: function ($scope, $element) {
					$scope.getPosition = function(){
						return angular.element($element).offset();
					}
					$scope.getSliderWidth = function(){
						return angular.element($element).find('.slider-control').width();
					}
					
					$scope.sliderClick = function (e) {
						
						var pos = {x: e.clientX - $scope.getPosition().left};
						if(pos.x<0){
							pos.x=0;
						}
						var w = $scope.getSliderWidth();
						if(pos.x>w){
							pos.x=w;
						}
						$scope.sliderDown = false;
						$scope.updateValue(pos.x);
						$scope.updatePosition(pos.x);
					};

					$scope.sliderMove = function (e) {
						
						var pos = {x: e.clientX - $scope.getPosition().left};
						if(pos.x<0){
							pos.x=0;
						}
						var w = $scope.getSliderWidth();
						if(pos.x>w){
							pos.x=w;
						}
						if ($scope.sliderDown) {
							$scope.updateValue(pos.x);
							$scope.updatePosition(pos.x);
						}
					};

					$scope.updatePosition = function (x) {
						$scope.sliderHandle.css({left: x - 5 + 'px'});
					};
					$scope.updateView = function () {
						var r = $scope.getSliderWidth() / ($scope.maxVal - $scope.minVal);
						var x = Math.ceil($scope.sliderModel*r);
						$scope.sliderHandle.css({left: x - 5 + 'px'});
					};

					$scope.updateValue = function (x) {
						var r = $scope.getSliderWidth() / ($scope.maxVal - $scope.minVal);

						var val = $scope.minVal + Math.ceil(x / r);
						$scope.sliderModel = val;

					};

					$scope.handleDown = function (e) {
						$scope.sliderDown = true;
					};

					$scope.handleUp = function (e) {
						$scope.sliderDown = false;
					}
				}
			};
		}]);
})();