<?php

use App\Http\Controllers\AuthController;
//use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JournalEntryController;
use App\Http\Controllers\MovementController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserFunctionalitiesController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user-functionalities', UserFunctionalitiesController::class);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/journal-entries', [JournalEntryController::class, 'index']);
    Route::post('/movements', [MovementController::class, 'store']);
    Route::get('/movements/recent', [MovementController::class, 'recent']);
});

    // Route::get('/products', [ProductController::class, 'index']);
    // Route::post('/products', [ProductController::class, 'store']);
    // Route::get('/products/{id}', [ProductController::class, 'show']);
    // Route::put('/products/{id}', [ProductController::class, 'update']);
    // Route::delete('/products/{id}', [ProductController::class, 'destroy']);





