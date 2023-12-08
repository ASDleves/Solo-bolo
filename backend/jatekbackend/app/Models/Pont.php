<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pont extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'pont',
        'OneShot',
        'Osszes_Tipp',
        'Season',
    ];
}
