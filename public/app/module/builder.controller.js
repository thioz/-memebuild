(function () {
	angular.module('app').controller('BuilderController', [
		'$scope', '$routeParams', 'ApiService', '$timeout', function ($scope, $routeParams, apiService, $timeout) {
			var builder;
			var canvas;

			$scope.layers;
			$scope.menuActive=false;
			$scope.dragLayer;
			$scope.actLayer;
			$scope.imageSize;
			$scope.imgBrowserOpen = false;
			$scope.dragOffset = {x: 0, y: 0};
			$scope.dragging = false;
			$scope.canvasSizes = [
				{name: '500x400', w: 500, h: 400},
				{name: '800x600', w: 800, h: 600},
			];

			$scope.fontColors = [
				{value: '#ffffff', name: 'White'},
				{value: '#000000', name: 'Black'},
				{value: '#ff0000', name: 'Red'},
			];
			$scope.strokeColors = [
				{value: null, name: 'None'},
				{value: '#ffffff', name: 'White'},
				{value: '#000000', name: 'Black'},
				{value: '#ff0000', name: 'Red'},
			];
			$scope.fonts = [
				{value: 'impact', name: 'Impact'},
				{value: 'Arial', name: 'Arial'},
				{value: 'Times New Roman', name: 'Times New Roman'},
				{value: 'Ubuntu', name: 'Ubuntu'},
			];

			$scope.fontSizes = [
				{id: 10, name: '10px'},
				{id: 16, name: '16px'},
				{id: 18, name: '18px'},
				{id: 20, name: '20px'},
				{id: 24, name: '24px'},
				{id: 28, name: '28px'},
				{id: 32, name: '32px'},
				{id: 36, name: '36px'},
				{id: 45, name: '45px'},
				{id: 60, name: '60px'},
			];

			$scope.strokeWidths = [
				{id: 1, name: '1px'},
				{id: 2, name: '2px'},
				{id: 3, name: '3px'},
			];
			$scope.toggleMenu = function () {
				$scope.menuActive = $scope.menuActive ? false : true;
			};
			$scope.init = function () {

				canvas = document.getElementById('builder');
				builder = new MemeBuilder(canvas);
				document.addEventListener('mouseup', function (e) {
					$scope.dragLayer = undefined;

				});

				canvas.addEventListener('mousemove', function (e) {
					var cX = e.offsetX;
					var cY = e.offsetY;
					if ($scope.dragLayer) {
						$scope.dragLayer.x = cX - $scope.dragOffset.x;
						$scope.dragLayer.y = cY - $scope.dragOffset.y;
						builder.draw();
					}

				});
				canvas.addEventListener('mousedown', function (e) {
					if (!builder) {
						return;
					}
					var cX = e.offsetX;
					var cY = e.offsetY;
					var layer = builder.getLayerAt(cX, cY);
					if ($scope.actLayer) {
						$scope.actLayer.collapsed = true;
					}
					if (layer) {

						$scope.dragOffset.x = cX - layer.x;
						$scope.dragOffset.y = cY - layer.y;
						$scope.dragLayer = layer;
						$scope.actLayer = layer;
						$timeout(function () {
							layer.collapsed = false;

						}, 100);

					}
				});

				$scope.imageSize = $scope.canvasSizes[0];
				$scope.initBuilder();
			};

			$scope.initBuilder = function () {
				if (!$scope.imageSize) {
					return;
				}

				canvas.width = $scope.imageSize.w;
				canvas.height = $scope.imageSize.h;

				$scope.layers = builder.layers;

				$scope.memeId = false;

			};

			$scope.selectImage = function (id) {
				var imgLayer = builder.addLayer(new ImageMemeLayer('/images/get/' + id));
//				imgLayer.setTargetHeight($scope.imageSize.h + 100);
				imgLayer.id = id;
				$scope.imgBrowserOpen = false;

			};

			$scope.closeImageBrowser = function () {
				$scope.imgBrowserOpen = false;

			};

			$scope.addImage = function () {
				$scope.menuActive=false;
				var sw = $('body').width();
				var sh = $('body').height();
				var padding = 30;
				var winWidth = sw - (2 * padding);
				var winHeight = sh - (2 * padding);
				$('#imgbrowser-fade').css({
					width: sw + 'px',
					height: sh + 'px',
				});
				$('#imgbrowser').css({
					top: padding + 'px',
					left: padding + 'px',
					width: winWidth + 'px',
					height: winHeight + 'px',
				});


				$scope.imgBrowserOpen = true;

			};

			$scope.addTextField = function () {
				$scope.menuActive=false;
				var txtLayer = new TextMemeLayer();
				builder.addLayer(txtLayer, true);
				txtLayer.x = $scope.imageSize.w / 2 - txtLayer.w / 2;
				txtLayer.y = $scope.imageSize.h / 2 - txtLayer.h / 2;
				if ($scope.actLayer) {
					$scope.actLayer.collapsed = true;
				}
				txtLayer.collapsed = false;
				$scope.actLayer = txtLayer;
				builder.draw();

			};

			$scope.deleteLayer = function (layer) {
				builder.deleteLayer(layer);
				builder.draw();
			}

			$scope.toggleCollapsed = function (layer) {
				layer.collapsed = layer.collapsed == true ? false : true;
			};

			$scope.layerSizeChange = function (layer, num) {
				layer.setTargetHeight(layer.h += num);
			}

			$scope.moveLayerUp = function (layer) {
				builder.moveLayerUp(layer)
			};
			$scope.moveLayerDown = function (layer) {
				builder.moveLayerDown(layer)
			};

			$scope.memeUpdate = function () {
				builder.draw();
			};

			$scope.clearImage = function () {
				canvas.width = $scope.imageSize.w;
				canvas.height = $scope.imageSize.h;
				builder = new MemeBuilder(canvas);

				$scope.layers = builder.layers;

				$scope.memeId = false;

			};

			$scope.testSave = function () {
				var cnv = document.createElement('canvas');
				document.getElementById('prev').appendChild(cnv)
				var scale = 1.4;
				cnv.width = $scope.imageSize.w * scale;
				cnv.height = $scope.imageSize.h * scale;
				var bldr = new MemeBuilder(cnv);
				for (var l in builder.layers) {
					var lyr = builder.layers[l];
					if (lyr.type == 'text') {
						var nl = new TextMemeLayer();
						nl.color = lyr.color;
						nl.fontSize = lyr.fontSize * scale;
						nl.text = lyr.text;
						nl.x = lyr.x * scale;
						nl.y = lyr.y * scale;
						bldr.addLayer(nl);
					}
					if (lyr.type == 'image') {
						var imgLayer = bldr.addLayer(new ImageMemeLayer('/images/get/' + lyr.id));
						imgLayer.x = lyr.x * scale;
						imgLayer.y = lyr.y * scale;

						imgLayer.id = lyr.id;
						imgLayer.setTargetHeight(lyr.targetH * scale);

					}
				}
				bldr.draw();
				var dataurl = bldr.canvas.toDataURL();
				var post = {
					img: dataurl
				};

				apiService.postRoute('/images/save', post).then(function (data) {
					$scope.memeUrl = data.url;
					$scope.memeId = data.id;
				});
			};

			$scope.sendImage = function () {
				var dataurl = builder.canvas.toDataURL();
				var post = {
					img: dataurl
				};
				if ($scope.memeId) {
					post.id = $scope.memeId;
				}
				apiService.postRoute('/images/save', post).then(function (data) {
					$scope.memeUrl = data.url;
					$scope.memeId = data.id;
				});
			};

			$scope.init();
		}
	]);

})();