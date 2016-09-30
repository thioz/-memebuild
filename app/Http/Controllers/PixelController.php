<?php

namespace App\Http\Controllers;

class PixelController extends BaseController
{
	function index(){
		$img = \PixelFlow::make(storage_path('image').'/One-Does-Not-Simply.jpg');
//		echo '<pre>';
//		print_r($img->getSize());
//		echo '</pre>';
		//$img->fit(200,200);
		$img->resizeHeight(200);
 
		$img->response();
		
//		$os=[400,520];
//		$ts=[200,500];
//		
//		$or = $os[0]/$os[1];
//		$tr = $ts[0]/$ts[1];
//		if($or>1 && $tr>=1){
//			$ss=[$ts[0],$ts[1]/$or];
//		}
//		elseif($or>1 && $tr<=1){
//			$ss=[$ts[0]*$or,$ts[1]];
//			
//		}
//		elseif($or<1 && $tr<=1){
//			$ss=[$ts[0],$ts[1]/$or];
//			
//		}
//		elseif($or<1 && $tr>=1){
//			$ss=[$ts[0],$ts[1]/$or];
//		}
//		echo '<pre>';
//		print_r($ss);
//		echo '</pre>';
		
	}
}