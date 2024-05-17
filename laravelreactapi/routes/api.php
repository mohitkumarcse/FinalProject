<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum', 'isapiadmin')->group(function(){

    Route::get('/checkingAuthenticated' , function(){
        return response()->json([
            'statusCode'=>200,
            'message'=>'You Are In'
        ]);
    });

    Route::post('logout', [AuthController::class, 'logout']);

    //Category


    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('view-category', [CategoryController::class, 'view']);
    Route::post('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::post('update-category/{id}', [CategoryController::class, 'update']);
    Route::post('delete-category/{id}', [CategoryController::class, 'delete']);
    Route::get('all-category', [CategoryController::class, 'allCategory']);

    //product

    Route::post('store-product', [ProductController::class, 'store']);

});

Route::middleware('auth:sanctum')->group(function(){

    Route::post('logout', [AuthController::class, 'logout']);

});


