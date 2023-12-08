<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ponts', function (Blueprint $table) {
            // Add the unique index
            $table->unique(['id', 'Season'], 'user_season_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ponts', function (Blueprint $table) {
            // Remove the unique index
            $table->dropUnique('user_season_unique');
        });
    }
};
