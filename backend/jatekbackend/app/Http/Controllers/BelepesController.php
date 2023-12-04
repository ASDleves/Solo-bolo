<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class BelepesController extends Controller
{
    public function login(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required',
        'password' => 'required',
    ]);

    $user = User::where('name', $validatedData['name'])->first();

    if (!$user || !Hash::check($validatedData['password'], $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    return response()->json([
        'message' => 'Login successful',
        'name' => $user->name,
        'status' => $user->status // Assuming 'statusz' is a field in your 'users' table
    ]);
}

}
