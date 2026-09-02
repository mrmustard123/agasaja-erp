<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Ensure API routes are loaded when RouteServiceProvider isn't present
Route::middleware('api')->prefix('api')->group(base_path('routes/api.php'));
