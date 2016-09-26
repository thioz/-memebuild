<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Creative - Bootstrap 3 Responsive Admin Template">
    <meta name="author" content="Ik">
    <meta name="keyword" content="Creative, Dashboard, Admin, Template, Theme, Bootstrap, Responsive, Retina, Minimal">
    <link rel="shortcut icon" href="img/favicon.png">

    <title>MemeBuilder</title>

    <!-- Bootstrap CSS -->    
    <link href="/app/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- bootstrap theme -->
    <link href="/app/assets/bootstrap/css/bootstrap-theme.css" rel="stylesheet">
    <link href="/app/css/app.css" rel="stylesheet">
  </head>

  <body>
		<!-- container section start -->
		<div  class="container-fluid" >
			<div class="row small" id="main" ng-view></div>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="/app/js/angular.min.js"></script>
		<script src="/app/js/angular-route.min.js"></script>
		<script src="/app/app.js"></script>
		<script src="/app/service/api-service.js"></script>
		<script src="/app/lib/imagepreview.js"></script>
		<script src="/app/lib/memebuilder.js"></script>
		<script src="/app/directive/uberselect.js"></script>
		<script src="/app/directive/filemodel.js"></script>
		
		
		<script src="/app/module/main.controller.js"></script>
		<script src="/app/module/builder.controller.js"></script>
		<script src="/app/module/imagebrowser.controller.js"></script>
		<script src="/app/module/gallery.controller.js"></script>

  </body>
</html>
