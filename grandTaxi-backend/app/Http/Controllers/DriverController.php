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
        // Check if the user is authorized to create a driver profile
        if (!$request->user()->can('create', Driver::class)) {
            return response()->json([
                'status' => false,
                'message' => 'You must be a Driver to create a reservation. or User already has a driver profile',
            ], 401);
        }

        $user = Auth::user();

        // Validate request data
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'license_plate_number' => 'required|string',
            'vehicle_type' => 'required|string',
            'payment_type' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        // Create a new driver profile for the user
        $driver = new Driver($request->all());
        // Associate the driver profile with the user
        $driver->user_id = $user->id;

        // Save the driver profile
        $driver->save();

        // Update the user status to active
        $user->status = 'active';
        $user->save();

        return response()->json(['message' => 'Driver profile created successfully'], 200);
    }








    public function show(Request $request)
    {

        if ($request->user()->status === 'inactive') {
            return response()->json(['status' => false, 'message' => 'create your driver first ']);
        }
        $request->user()->driver;

        // if (!$request->user()->can('view', $driver)) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => "this driver dosn't belong to you",
        //     ], 401);
        // }


        // If the user is not a driver or has filled driver information, return the user details
        $response = [
            'status' => 'success',
            'message' => 'User details retrieved successfully.',
            'user' => $request->user(),
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


        // chekc with poilices if user owen this driver
        if (!$request->user()->can('update', $driver)) {
            return response()->json([
                'status' => false,
                'message' => "you can't update driver cuz dosn't belong to you",
            ], 401);
        }

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
