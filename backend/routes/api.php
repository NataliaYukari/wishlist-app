<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewUserController;
use App\Http\Controllers\ItemController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//User routes
Route::post('/newUser', [NewUserController::class, 'newUser']);
Route::post('/login', [AuthController::class, 'login']);

//User routes protected by auth
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
});

//Item routes protected by auth
Route::middleware('jwt.auth')->group(function () {
    Route::post('/newItem', [ItemController::class, 'newItem']);
});

Route::middleware('auth:api')->get('/items', [ItemController::class, 'getItems']);

Route::middleware('auth:api')->group(function () {
    Route::delete('/items/{id}', [ItemController::class, 'deleteItem']);
    Route::put('/items/{id}', [ItemController::class, 'updateItem']); 
});
