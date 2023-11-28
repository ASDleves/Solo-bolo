<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pont extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'pont',
        'OneShot',
        'Összes_Tipp',
        'Season',
    ];
}