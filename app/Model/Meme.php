<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Meme extends Model
{
	protected $table = 'meme';
	protected $fillable=['filename','width','height'];
}