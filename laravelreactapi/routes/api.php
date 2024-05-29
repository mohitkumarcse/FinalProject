<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('get-category', [FrontendController::class, 'getCategory']);
Route::get('get-product/{slug}', [FrontendController::class, 'product']);
Route::get('product-details/{category_slug}/{product_slug}', [FrontendController::class, 'productDetails']);
Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::get('view-cart', [CartController::class, 'viewCart']);
Route::put('cart-update-quantity/{cart_id}/{scope}', [CartController::class, 'cartUpdateQuantity']);
Route::post('cart-remove/{card_id_remove}', [CartController::class, 'cartRemove']);
Route::post('place-order', [CheckoutController::class, 'placeOrder']);
Route::post('verify-order', [CheckoutController::class, 'VerifyOrder']);









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
    Route::get('view-product', [ProductController::class, 'view']);
    Route::post('delete-product/{id}', [ProductController::class, 'delete']);
    Route::post('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);



});

Route::middleware('auth:sanctum')->group(function(){

    Route::post('logout', [AuthController::class, 'logout']);

});



