<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TripController;
use App\Models\City;
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
    Route::get('/statics', [AuthController::class, 'statics']);
    Route::get('/usersNotAdmin', [AuthController::class, 'usersNotAdmin']);
    Route::get('/restorUser/{user_id}', [AuthController::class, 'restorUser']);
    Route::delete('/deleteUser/{user_id}', [AuthController::class, 'deleteUser']);
    Route::get('/passengers', [AuthController::class, 'passengers']);
});


//driver routes
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'drivers'], function () {

    Route::post('/create', [DriverController::class, 'create']);
    Route::put('/update', [DriverController::class, 'update']);
    Route::get('/show', [DriverController::class, 'show']);
    // Route::get('/drivers', [DriverController::class, 'index']);
});



//global endpoints
Route::get('trips', [TripController::class, 'getAllTrips']);
Route::get('cities', function () {
    return response()->json(['status' => true, 'data' => City::all()]);
});

// trip routes
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'trips'], function () {

    Route::post('/create', [TripController::class, 'create']);

    Route::get('/my', [TripController::class, 'myTrips']);
    Route::get('/history', [TripController::class, 'historiesFun']);
    Route::get('/{id}', [TripController::class, 'show']);
    Route::put('/update/{id}', [TripController::class, 'update']);
    Route::put('/updateStatus/{id}', [TripController::class, 'updateStatus']);
    Route::get('histories', [TripController::class, 'historiesTrips']);
    Route::delete('/destroy/{id}', [TripController::class, 'destroy']);
});


// trip routes
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'reservations'], function () {

    Route::post('/create', [ReservationController::class, 'create']);
    Route::get('/', [ReservationController::class, 'index']);
    Route::get('/{id}', [ReservationController::class, 'show']);
    Route::put('/update/{id}', [ReservationController::class, 'update']);
    Route::put('/addReview/{id}', [ReservationController::class, 'addReview']);
    Route::delete('/destroy/{id}', [ReservationController::class, 'destroy']);
    Route::get('/restore/{id}', [ReservationController::class, 'restore']);
    Route::post('/admin', [ReservationController::class, 'adminCreateReservation']);
});


// trip routes
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'reviews'], function () {

    Route::post('/create', [ReviewController::class, 'create']);
});

// favorite routes
Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'favorites'], function () {

    Route::get('/', [FavoriteController::class, 'index']);
    Route::post('/create', [FavoriteController::class, 'store']);
    Route::delete('favorites/{favorite}', [FavoriteController::class, 'destroy']);
});



Route::fallback(fn () => response()->json(['status' => false, 'message' => 'route not find'], 404));


Route::get('/test', fn () => response()->json(['msg' => 'hello from laravel api']));
