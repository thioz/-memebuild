<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MemeText extends Model
{
	protected $table = 'memetext';
	
	function font(){
		return $this->hasOne('App\Model\Font','font_id','id');
	}
	
}