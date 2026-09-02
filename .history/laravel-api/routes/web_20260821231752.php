<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// (API routes are loaded via bootstrap/app.php Route configuration)
