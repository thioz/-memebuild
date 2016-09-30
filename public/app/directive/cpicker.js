(function () {
	angular.module('app').directive('colorPicker', ['$parse', function ($parse) {
			return {
				restrict: 'E',
				scope: {
					tool: '=',
				},
				template: '<input type="number" ng-model="color[0]" ng-change="updateColor()"><input type="number" ng-model="color[1]" ng-change="updateColor()"><input type="number" ng-model="color[2]" ng-change="updateColor()">',
				link: function (scope, element, attrs) {
					scope.color = scope.tool.color;
				},
				controller: function ($scope, $element, $attrs) {
					$scope.updateColor = function () {
						$scope.tool.selectColor($scope.color);
					};
				}
			};
		}]);
	angular.module('app').directive('toolOptions', ['$compile', function ($compile) {
			return {
				restrict: 'C',
				scope: {
					tool: '=',
					toolId: '=',
				},
				link: function (scope, element, attrs) {
					scope.$watch('toolId', function (val) {
						if (!val) {
							return;
						}
						var template = '<tooloptions-' + val + ' tool="tool" tool-id="toolId"></tooloptions-' + val + '>';
						angular.element(element).append($compile(template)(scope));
					});
				},
				controller: function ($scope, $element, $attrs) {
					$scope.updateColor = function () {
						$scope.tool.selectColor($scope.color);
					};
				}
			};
		}]);
	angular.module('app').directive('tooloptionsBrush', [function () {
			return {
				restrict: 'E',
				scope: {
					tool: '=',
					toolId: '=',
				},
				templateUrl:'/app/directive/tool-brush.html',
				tmp:'hardness : <input type="number" ng-model="tool.brush.hardness"/>'
				+'<input type="number" ng-model="tool.brush.size"/>'
				+'<input type="number" ng-model="tool.brush.flow"/>'
				+'<div class="form-group">'
				+'<input type="number" ng-model="tool.color[0]" min="0" max="255"/>'
				+'<input type="number" ng-model="tool.color[1]"  min="0" max="255"/>'
				+'<input type="number" ng-model="tool.color[2]"  min="0" max="255"/>'
				+'</div>'
				+'<slider-control slider-model="tool.color[0]" slider-min="0" slider-max="255"></slider-control>'
				+'<slider-control slider-model="tool.color[1]" slider-min="0" slider-max="255"></slider-control>'
				+'<slider-control slider-model="tool.color[2]" slider-min="0" slider-max="255"></slider-control>'
				+''
				,
				link: function (scope, element, attrs) {
				},
				controller: function ($scope, $element, $attrs) {
					$scope.updateColor = function () {
						$scope.tool.selectColor($scope.color);
					};
				}
			};
		}]);
})();