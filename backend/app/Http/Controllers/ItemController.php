<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class ItemController extends Controller
{

    public function newItem(Request $request): JsonResponse
    {
        try {

            $user = auth()->user();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $validatedData = $request->validate([
                'itemName' => ['required', 'string', 'max:255'],
                'brand' => ['nullable', 'string', 'max:255'], 
                'description' => ['nullable', 'string'],
                'price' => ['nullable', 'numeric', 'min:0'], 
                'link' => ['nullable', 'url', 'max:255'], 
                'category' => ['required', 'string', 'max:255'],
                'priority' => ['required', 'string', 'in:Low,Medium,High'], 
                'status' => ['nullable', 'string', 'in:To buy,Got it!'],
            ]);

            $validatedData['user_id'] = $user->_id;
            $validatedData['status'] = 'To buy';

            $item = Item::create($validatedData);

            return response()->json([
                'message' => 'Item added successfully!',
                'item' => $item->toArray()
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error during item registration: '
            ], 500);
        }
    }
}