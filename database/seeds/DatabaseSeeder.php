<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$faker = \Faker\Factory::create();
    	foreach (range(1,1000) as $index) {
	        DB::table('transaction')->insert([
	            'accountnumber' => $faker->bankAccountNumber,
	            'paymentmethod_id' => $faker->randomElement([1,2,3]),
	            'transactionstatus_id' => $faker->randomElement([1,2,3,4]),
	            'amount' => $faker->randomFloat(2,10,500),
	            'created_at' => $faker->dateTimeThisMonth(),
	        ]);
        }
    }
}
