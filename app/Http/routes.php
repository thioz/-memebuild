<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/',['uses' => 'HomeController@index']);

Route::get('/images',['uses' => 'ImageController@index']);
Route::get('/images/preview/{id?}',['uses' => 'ImageController@preview']);
Route::get('/images/get/{id?}',['uses' => 'ImageController@getimage']);
Route::post('/images/save',['uses' => 'ImageController@saveAction']);
Route::get('/meme/{id}',['uses' => 'ImageController@getmemeAction']);
Route::get('/res',['uses' => 'HomeController@responsiveAction']);

