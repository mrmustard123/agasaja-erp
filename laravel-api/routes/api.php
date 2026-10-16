<?php

use App\Http\Controllers\AuthController;
//use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user-functionalities', function () {
        $user = Auth::user();

        if (! $user) {
            return response()->json([
                'functionalities' => [],
            ]);
        }

        $group = $user->usersGroup()->first();

        if (! $group) {
            return response()->json([
                'functionalities' => [],
            ]);
        }

        $functionalities = $group->directives()
            ->where('directive_rule', 'PERMITIR')
            ->pluck('id_functionality')
            ->toArray();

        return response()->json([
            'functionalities' => $functionalities,
        ]);
    });

    // Route::get('/products', [ProductController::class, 'index']);
    // Route::post('/products', [ProductController::class, 'store']);
    // Route::get('/products/{id}', [ProductController::class, 'show']);
    // Route::put('/products/{id}', [ProductController::class, 'update']);
    // Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});




