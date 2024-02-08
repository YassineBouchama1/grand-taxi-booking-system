<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = Auth::user();




        // Validate request data
        $validator = Validator::make($request->all(), [
            'duration_minutes' => 'required',
            'pick_up_city_id' => 'required',
            'destination_city_id' => 'required',
            'pickup_datetime' => 'required',
            'price' => 'required',


        ]);


        //2-if there is errors return it
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        // Create a new driver profile for the user
        $trip = new Trip($request->all());
        // Associate the driver profile with the user
        $trip->driver_id = $user->id;

        // Save the driver profile
        $trip->save();

        return response()->json(['message' => 'Driver profile created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip)
    {
        //
    }


    public function update(Request $request)
    {
        // Get the authenticated user's driver details
        $driver = $request->user()->driver;

        // Update driver data based on request input
        $driver->fill($request->only([
            'duration_minutes',
            'pick_up_city_id',
            'vehicle_type',
            'destination_city_id',
            'pickup_datetime',
            'price',
        ]));

        // Save the updated driver details
        $driver->save();

        $response = [
            'status' => 'success',
            'message' => 'Driver details updated successfully.',
            'driver' => $driver
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip)
    {
        //
    }
}
