(function () {

	angular.module('app').directive('uberselect', [function () {
			return {
				restrict: 'E',
				require: 'ngModel',
				scope: {
					modelval: '@',
					selectoptions: '=',
				},
				template: '<input value="{{modelval}}"/><div class="us-select"><div class="us-select-value" ng-click="toggleSelect()">{{modellabel}}{{selectOpen}}</div><div class="us-select-options" ng-show="selectOpen"><div  ng-repeat="opt in selectoptions" ng-click="setItem(opt)">{{opt.name}}</div></div></div>',
				link: function (scope, element, attrs, ngModelCtrl) {
					scope.modelval = '';
					scope.modellabel;
					scope.selectOpen=false;
					scope.selectedOpt;
					ngModelCtrl.$render = function () {
						for(var o in scope.selectoptions){
							if(scope.selectoptions[o].value == ngModelCtrl.$viewValue){
								scope.modelval = ngModelCtrl.$viewValue;
								scope.modellabel = scope.selectoptions[o].name;
							}
						}
					};
					scope.$watch('modelval', function () {
						ngModelCtrl.$setViewValue(scope.modelval);
					});

				},
				controller: function ($scope) {
					$scope.setItem = function(opt){
						$scope.modelval = opt.value;
					}
					$scope.toggleSelect = function(){
						$scope.selectOpen = $scope.selectOpen==true ? false : true;
					}
				}
			};
		}]);

})();