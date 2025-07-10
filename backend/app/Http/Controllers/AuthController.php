<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse 
    {
        try {

            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

            //Searches for the user with email
            $user = User::where('email', $credentials['email']) -> first();

            //Checks if user exists and if the password is correct
            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json(['message' => 'Incorrect e-mail or password'], 401);

            } else {
                //Creating auth token
                $token= $user->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'message' => 'Login success!',
                    'user' => $user->only('email'),
                    'token' => $token,
                    'token_type' => 'Bearer'
                ], 200);
            }

        } catch (\Exception $e) {
            \Log::error('Login Error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Error during authentication: '
            ], 500);
        } 
    }
}
