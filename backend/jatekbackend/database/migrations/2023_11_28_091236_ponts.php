<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ponts', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('pont');
            $table->integer('Streak');
            $table->integer('Összes_Tipp');
            $table->timestamps();
        });

        // Insert a user into 'users' table
        $userId = DB::table('users')->insertGetId([
            'name' => 'Ricsi',
            'email' => 'ricsi20020302@gmail.com',
            'password' => Hash::make('test123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert a record into 'ponts' table
        DB::table('ponts')->insert([
            'user_id' => $userId,
            'pont' => 0,
            'Streak' => 0,
            'Összes_Tipp'=> 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // If rolling back, delete the user and associated 'ponts' record
        DB::table('ponts')->where('user_id', function ($query) {
            $query->select('id')
                  ->from('users')
                  ->where('email', 'ricsi20020302@gmail.com');
        })->delete();

        DB::table('users')->where('email', 'ricsi20020302@gmail.com')->delete();

        // Drop 'ponts' table
        Schema::dropIfExists('ponts');
    }
};
