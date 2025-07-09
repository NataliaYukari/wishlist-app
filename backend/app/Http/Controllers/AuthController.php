<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request) 
    {
        try {
        Log::info("LOGIN CONTROLLER");

            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

            //Searches for the user with email
            $user = User::where('email', $credentials['email']) -> first();

            //Checks if user exists and if the password is correct
            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json(['message' => 'Incorrect e-mail or password'], 401);
            }

            //Creating auth token
            $token= $user->createToken('auth_token')->plainTextToken;

        } catch (\Exception $e) {
            Log::error('Authentication error: ', $e->getMessage(),
            ['exception' => $e]);
            return response()->json([
                'message' => 'Error during authentication: ',
                'error' => $e->getMessage()
            ], 500);
        } 
    }
}
