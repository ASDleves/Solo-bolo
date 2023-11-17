<?php
use App\Models\Champ;
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
        Schema::create('champs', function (Blueprint $table) {
            $table->id();
            $table->String('nev');
            $table->String('nem');
            $table->String('pozicio');
            $table->String('faj');
            $table->String('nyersanyag');
            $table->String('fegyver');
            $table->String('szarmazas');
            $table->integer('megjelenes');
            $table->timestamps();
        });
        Champ::create([
            'nev'=>'Darius',
            'nem'=>'Férfi',
            'pozicio'=>'Top',
            'faj'=>'Ember',
            'nyersanyag'=>'Mana',
            'fegyver'=>'Közelharcos',
            'szarmazas'=>'Noxus',
            'megjelenes'=>2012,
        ]);
        Champ::create([
            'nev'=>'Akali',
            'nem'=>'Nő',
            'pozicio'=>'Top/Mid',
            'faj'=>'Ember',
            'nyersanyag'=>'Energia',
            'fegyver'=>'Közelharcos',
            'szarmazas'=>'Ionia',
            'megjelenes'=>2010,
        ]);
        Champ::create([
            'nev'=>'Aurelion Sol',
            'nem'=>'Férfi',
            'pozicio'=>'Mid',
            'faj'=>'Égi, Sárkány',
            'nyersanyag'=>'Mana',
            'fegyver'=>'Távolharcos',
            'szarmazas'=>'Runaterra, Targon',
            'megjelenes'=>2016,
        ]);
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('champs');
    }
};
