<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\Log;

class NewUserController extends Controller
{

    public function newUser(Request $request): JsonResponse
    {
        try {

            $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

            //Creates new user
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'User registered successfully!',
                'user' => $user->only('email')
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error during registration: ',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
