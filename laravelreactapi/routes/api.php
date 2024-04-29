<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum', 'isapiadmin')->group(function(){

    Route::get('/checkingAuthenticated' , function(){
        return response()->json([
            'statusCode'=>200,
            'message'=>'You Are In'
        ]);
    });

    Route::post('logout', [AuthController::class, 'logout']);

});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
// Route::get('/register', function () {
//     return '<h1>Hello</h1>';
// });
