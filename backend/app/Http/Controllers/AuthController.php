<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse 
    {
        $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required']
        ]);

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response().json(['message' => 'Incorrect e-mail or password'], 401);
            }

            //Searches for authenticated user
            $user = auth()->user();

            return response()->json([
                'message' => 'Login success!',
                'user' => $user->only('email'),
                'token' => $token,
                'token_type' => 'Bearer'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Login Error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Error during authentication: '
            ], 500);
        } 
    }

    public function user(): JsonResponse
    {
        return response()->json(auth()->user());
    }

    public function logout(): JsonResponse
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refreshToken(): JsonResponse
    {
        return response()->json([
            'token' => auth()->refresh(),
            'token_type' => 'Bearer'
        ]);
    }
}
