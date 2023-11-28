<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function index(){
        $users = User::all();
        return response()->json($users);

    }
    public function getUserWithPont($id) {
        $user = User::with('pont')->find($id);
        return response()->json($user);
    }
}
