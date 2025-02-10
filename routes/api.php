<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Api\AuthController;
use App\Http\Controllers\Admin\Api\ProductController;
use App\Http\Controllers\Public\Api\ProductController as ApiProductController;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ImageController;

// Middleware to handle unauthenticated requests
Route::middleware(['auth:sanctum'])->group(function () {
    // Protected API Routes
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/users', [AuthController::class, 'users']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);


    // Product API Routes
    Route::get('/products', [ProductController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});

// Public API Routes
Route::post('/login', [AuthController::class, 'login']);
Route::get('/public-products', [ApiProductController::class, 'index']);
Route::get('/public-products/{id}', [ApiProductController::class, 'show']);
Route::get('/get-product', [ApiProductController::class, 'getProduct']);

// Testing Route (Optional)
Route::middleware('auth:sanctum')->post('/user', function (Request $request) {
    return $request->user();
});

// Global Exception Handler for API Middleware

Route::match(['GET', 'OPTIONS'], 'media/images/products/{path}', [MediaController::class, 'serveImage']);

Route::match(['GET', 'OPTIONS'], 'serve-image/{path}', [ImageController::class, 'serve'])
    ->where('path', '.*');  // This allows for nested paths
