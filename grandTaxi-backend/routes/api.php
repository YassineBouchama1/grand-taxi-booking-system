<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DriverController;
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


// rouet
Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});



// route for user
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'auth'], function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userInfo']);
});


//driver routes
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'drivers'], function () {

    Route::post('/create', [DriverController::class, 'create']);
    Route::put('/update', [DriverController::class, 'update']);
    Route::get('me', [DriverController::class, 'me']);
    Route::get('/drivers', [DriverController::class, 'index']);
    // Route::get('/trips/{trip}', [TripController::class, 'show']);
    // Route::get('/myTrips/', [TripController::class, 'showAll']);
    // Route::get('/allTrips', [TripController::class, 'showTripsMeAndAdmin']);
});






Route::fallback(fn () => response()->json(['status' => false, 'message' => 'route not find'], 404));
