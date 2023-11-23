<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

//Authentication routes for API
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

//If has the token, return user information for testing.
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Test route with public access.
Route::get('/test', function () {
    return response()->json(['message' => 'This is a test route.']);
});

//Test route with public access.
Route::post('/test2', function () {
    return response()->json(['message' => 'This is a test route 2.']);
});