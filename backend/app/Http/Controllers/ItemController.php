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

    public function getItems(): JsonResponse
{
    try {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Busca todos os itens do usuário logado
        $items = Item::where('user_id', $user->_id)->get();

        return response()->json([
            'items' => $items
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error retrieving items',
            'error' => $e->getMessage()
        ], 500);
    }
}

     /**
     * 
     *
     * @param string 
     * @return JsonResponse
     */
    public function deleteItem(string $id): JsonResponse
    {
        try {
            \Log::info("controller delete");
            $user = auth()->user();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $item = Item::where('_id', $id)->where('user_id', $user->_id)->first();

            if (!$item) {
                return response()->json(['message' => 'Item not found or unauthorized'], 404);
            }

            $item->delete();

            return response()->json(['message' => 'Item deleted successfully!'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateItem(Request $request, string $id): JsonResponse
    {
        try {
            $user = auth()->user();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $item = Item::where('_id', $id)->where('user_id', $user->_id)->first();

            if (!$item) {
                return response()->json(['message' => 'Item not found or unauthorized'], 404);
            }

            $validatedData = $request->validate([
                'itemName' => ['sometimes', 'required', 'string', 'max:255'],
                'brand' => ['nullable', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'price' => ['nullable', 'numeric', 'min:0'],
                'link' => ['nullable', 'url', 'max:255'],
                'category' => ['sometimes', 'required', 'string', 'max:255'],
                'priority' => ['sometimes', 'required', 'string', 'in:Low,Medium,High'],
                'status' => ['nullable', 'string', 'in:To buy,Got it!'],
            ]);

            $item->update($validatedData);

            return response()->json([
                'message' => 'Item updated successfully!',
                'item' => $item->toArray()
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating item',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

