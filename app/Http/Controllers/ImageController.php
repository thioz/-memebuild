<?php

namespace App\Http\Controllers;

use App\Model\Image;
use App\Model\Meme;
use Illuminate\Http\Request;
use Voodoo\Resizer;
use Voodoo\VoodooImage;
use function response;
use function storage_path;

class ImageController extends BaseController
{
	public function index(Request $req)
	{
		$images = Image::get();
		return response()->json($images);
	}

	public function getimage(Request $req, $id = false)
	{
		$model = Image::find($id);
		$image = new VoodooImage(storage_path('image') . '/' . $model->storagefilename);
		$image->output();
	}

	public function preview(Request $req, $id = false)
	{
		$width = $req->input('w', false);
		$height = $req->input('h', false);
		if ($id)
		{
			$model = Image::find($id);
			$image = new VoodooImage(storage_path('image') . '/' . $model->storagefilename);
		}
		else
		{
			$path = $req->input('path');

			$image = new VoodooImage(storage_path() . $path);
		}
		$resizer = new Resizer($image);
		if (!$width && !$height)
		{
			$resizer->setHeight(200);
		}
		elseif ($width)
		{
			$resizer->setWidth($width);
		}
		else
		{
			$resizer->setHeight($height);
		}

		$resizer->make()->output();
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
			$image = Image::create([
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
		$image = new VoodooImage(storage_path('memes') . '/' . $model->filename);
		$resizer = new Resizer($image);
		$resizer->setHeight($height);
		$resizer->make()->output();
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
		$image = new VoodooImage($filepath);
		$image->output();
	}

}
