<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//The login route.
Route::post('/login', [AuthController::class, 'login']);

// Group of routes that require authentication with Sanctum
Route::middleware(['auth:sanctum'])->group(function () {

    //The logout route. Needs to be logged in first.
    Route::post('/logout', [AuthController::class, 'logout']);

    // If the user has the token, return user information for testing.
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});

//Test route with public access.
//Route::post('/test2', public function () {
//    return response()->json(['message' => 'This is a test route 2.']);
//});
