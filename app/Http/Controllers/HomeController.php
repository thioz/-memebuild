<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use function view;

class HomeController extends BaseController
{
	public function index(Request $req)
	{
		return view()->make('index.index');
	}
	public function responsiveAction(Request $req)
	{
		return view()->make('index.responsive');
	}


}

