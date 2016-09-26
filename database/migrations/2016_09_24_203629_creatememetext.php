<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Creatememetext extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('memetext', function (Blueprint $table)
		{
			$table->increments('id');
			$table->integer('meme_id');
			$table->string('content',255);
			$table->integer('font_id');
			$table->integer('posx');
			$table->integer('posy');
			$table->integer('fontsize');
			$table->timestamps();
		});
	}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
