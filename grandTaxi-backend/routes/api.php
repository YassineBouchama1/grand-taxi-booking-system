<?php

use App\Http\Controllers\Auth\AuthController;
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

Route::middleware('auth:sanctum')->get('/auth/user', [AuthController::class, 'userInfo']);


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/auth/logout', [AuthController::class, 'logout']);
    // Route::get('trips', [TripController::class, 'index']);
    // Route::get('/trips/{trip}', [TripController::class, 'show']);
    // Route::get('/myTrips/', [TripController::class, 'showAll']);
    // Route::get('/allTrips', [TripController::class, 'showTripsMeAndAdmin']);
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('guest');
