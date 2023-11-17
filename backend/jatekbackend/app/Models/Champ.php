<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Champ extends Model
{
    use HasFactory;
    protected $fillable = [
        'nev',
        'nem',
        'pozicio',
        'faj',
        'nyersanyag',
        'fegyver',
        'szarmazas',
        'megjelenes',
    ];
}
