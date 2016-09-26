<?php

namespace App\Http\Controllers;

use App\Model\Image;
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

	function saveAction(Request $req)
	{

		$data = $req->input('img');
		$id = $req->input('id',false);
		$hdr='data:image/png;base64,';
		$imgdata = substr($data, strlen(($hdr)));
		if (!$id)
		{
			$filename=md5(microtime(true)) . '.png';
			$meme = \App\Model\Meme::create([
					'filename' => $filename
			]);
		}
		else
		{
			$meme = \App\Model\Meme::find($id);
			$filename = $meme->filename;
			
		}
		$filepath= storage_path('memes') . '/' . $filename;
		file_put_contents($filepath, base64_decode($imgdata));
		return response()->json(['id' => $meme->id, 'url' => '/meme/' . $meme->id]);
	}

	function getmemeAction(Request $req, $id)
	{
		$meme = \App\Model\Meme::find($id);
		$filepath = storage_path('memes') . '/' . $meme->filename;
		$image = new VoodooImage($filepath);
		$image->output();
	}

}
