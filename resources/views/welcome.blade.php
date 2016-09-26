<!DOCTYPE html>
<html>
	<head>
		<title>Laravel</title>
		<meta name="csrf-token" content="{{ csrf_token() }}">

		<link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<style>
			html, body {
				height: 100%;
			}

			body {
				margin: 0;
				padding: 0;
				width: 100%;
				display: table;
				font-weight: 100;
				font-family: 'Lato';
			}

			.container {
				text-align: center;
				display: table-cell;
				vertical-align: middle;
			}

			.content {
				text-align: center;
				display: inline-block;
			}

			.title {
				font-size: 96px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="content">
				<div class="title">Laravel 5</div>

				<input type="text" id="username"/>
				<input type="text" id="password"/>
				<input type="submit" value="Ga" onclick="tryLogin()"/>
			</div>
		</div>
		<script>
			var accessToken = '';
			$(document).ready(function () {
				$.ajaxSetup({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					}
				});
			})

			function getUser() {
				$.ajax({
					url: '/user',
					type: 'get',
					beforeSend: function (xhr) {
						xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
					},
					success: function (data, textStatus, jqXHR) {
						console.log(data);
					}
				});
			}


			function tryLogin() {
				var req = {
					username: $('#username').val(),
					password: $('#password').val(),
					grant_type: 'password',
					client_id: '1234',
					client_secret: '1234567890',
				};

				$.ajax({
					url: '/oauth/request',
					type: 'POST',
					data: req,
					success: function (data, textStatus, jqXHR) {
						accessToken = data.access_token;

						getUser();
					}
				});

			}
		</script>
	</body>
</html>
