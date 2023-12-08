<?php

namespace App\Http\Controllers;
use App\Models\Pont;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);

    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        $pont = new Pont([
            'pont' => 0,
            'OneShot' => 0,
            'Osszes_Tipp' => 0,
            'Season' => 'Season-1',
        ]);
    
        // Associate the Pont record with the user
        $user->ponts()->save($pont);
    
        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    public function getUserIdByName($name)
{
    $user = User::where('name', $name)->first();

    if ($user) {
        return response()->json(['userId' => $user->id]);
    } else {
        return response()->json(['error' => 'User not found'], 404);
    }
}
}