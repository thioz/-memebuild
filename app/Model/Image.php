<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

	protected $table = 'image';
	protected $fillable = ['name', 'storagefilename', 'originalname'];

}
