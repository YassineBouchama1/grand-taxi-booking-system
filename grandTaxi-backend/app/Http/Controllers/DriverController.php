<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // //1-check if driver has alread fill driver info
        // if (!$request->user()->hasDriverInformation()) {

        //     // if not return empty array
        //     return response()->json(['data' =>  []], 401);

        //     //if already filled return it
        // } else {
        //     $response = [
        //         'status' => 'success',
        //         'message' => 'User is created successfully.',
        //         'data' =>  $request->user()->hasDriverInformation(),
        //     ];
        //     return response()->json($response, 201);
        // }
    }



    // create driver info
    public function create(Request $request)
    {
        $user = Auth::user();

        // Check if the user already has a driver profile
        if ($user->driver()->exists()) {
            return response()->json(['message' => 'User already has a driver profile'], 400);
        }


        // Validate request data
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'license_plate_number' => 'required|string',
            'vehicle_type' => 'required|string',
            // 'availability_status' => 'required|string',
            // 'rating' => 'required|number',
            'payment_type' => 'required|string',
            // 'location_latitude' => 'required|string',
            // 'location_longitude' => 'required|string',
            // 'revenue'

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
        $driver = new Driver($request->all());
        // Associate the driver profile with the user
        $driver->user_id = $user->id;

        // Save the driver profile
        $driver->save();

        return response()->json(['message' => 'Driver profile created successfully'], 200);
    }



    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        //
    }


    public function me(Request $request)
    {
        // Check if the user is authenticated and is a driver
        if ($request->user()->isDriver()) {
            // Check if the driver has filled driver information
            if (!$request->user()->hasDriverInformation()) {
                // If not, return a 404 response
                return response()->json(['message' => 'Driver information not found.'], 404);
            }
        }

        $request->user()->driver;
        // If the user is not a driver or has filled driver information, return the user details
        $response = [
            'status' => 'success',
            'message' => 'User details retrieved successfully.',
            'user' => $request->user()
        ];

        return response()->json($response, 200);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Driver $driver)
    {
        // Get the authenticated user's driver details
        $driver = $request->user()->driver;

        // Update driver data based on request input
        $driver->fill($request->only([
            'description',
            'license_plate_number',
            'vehicle_type',
            'availability_status',
            'rating',
            'payment_type',
            'location_latitude',
            'location_longitude',
            'revenue'
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
    public function destroy(Driver $driver)
    {
        //
    }
}
