<?php

namespace App\Http\Controllers;

use App\Models\Pont;
use Illuminate\Http\Request;

class PontController extends Controller
{
    
    public function mutat($user_id) {
        $pont = Pont::where('user_id', $user_id)->first();
        return response()->json($pont);
    }
    
}
