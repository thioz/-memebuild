<?php

namespace App\Http\Controllers;

use App\Model\ImageModel;
use App\Model\Meme;
use Illuminate\Http\Request;
use function response;
use function storage_path;


class ImageController extends BaseController
{
	public function index(Request $req)
	{
		$images = ImageModel::get();
		return response()->json($images);
	}

	public function getimage(Request $req, $id = false)
	{
 

		$model = ImageModel::find($id);
		$image =  \Image::make(storage_path('image') . '/' . $model->storagefilename);
		
		
		return $image->response();;
		
	}

	public function preview(Request $req, $id = false)
	{
		$width = $req->input('w', false);
		$height = $req->input('h', false);
		if ($id)
		{
			$model = ImageModel::find($id);
			$image = \Image::make(storage_path('image') . '/' . $model->storagefilename);
		}
		else
		{
			$path = $req->input('path');

			$image = \Image::make(storage_path() . $path);
		}
		if (!$width && !$height)
		{
			$image->heighten(200);
		}
		elseif ($width)
		{
			$image->widen($width);
		}
		else
		{
			$image->heighten($height);
		}

		return $image->response();
	}

	function uploadAction(Request $req)
	{
		$imgId = 'poep';
		$imgName = 'poep';
		if ($req->hasFile('img'))
		{
			$file = $req->file('img');
			$imgName = $file->getClientOriginalName();
			$ext = $file->getClientOriginalExtension();
			$storename = md5($imgName) . '.' . $ext;
			$image = ImageModel::create([
					'storagefilename' => $storename,
					'name' => $imgName,
					'originalname' => $imgName,
			]);
			$imgId = $image->id;
			$file->move(storage_path('image'), $storename);
		}
		return response()->json(['id' => $imgId, 'name' => $imgName]);
	}

	function saveAction(Request $req)
	{

		$data = $req->input('img');
		$id = $req->input('id', false);
		$hdr = 'data:image/png;base64,';
		$imgdata = substr($data, strlen(($hdr)));
		if (!$id)
		{
			$filename = md5(microtime(true)) . '.png';
			$meme = Meme::create([
					'filename' => $filename
			]);
		}
		else
		{
			$meme = Meme::find($id);
			$filename = $meme->filename;
		}
		$filepath = storage_path('memes') . '/' . $filename;
		file_put_contents($filepath, base64_decode($imgdata));
		return response()->json(['id' => $meme->id, 'url' => '/meme/' . $meme->id]);
	}

	function galleryimg(Request $req, $id)
	{
		$height = $req->input('h', false);
		$model = Meme::find($id);
		$image = \Image::make(storage_path('memes') . '/' . $model->filename);
		$image->heighten($height);
		return $image->response();;
	}

	function gallery(Request $req)
	{
		$offset = $req->input('offset', 0);
		$limit = $req->input('limit', 30);
		$count = Meme::count();
		$images = Meme::offset($offset)->limit($limit)->get();

		return response()->json(['items' => $images, 'count' => $count]);
	}

	function getmemeAction(Request $req, $id)
	{
		$meme = Meme::find($id);
		$filepath = storage_path('memes') . '/' . $meme->filename;
		$image = \Image::make($filepath);
		return $image->response();;
	}

}
