<?php

namespace App\Http\Controllers;

use App\Http\Resources\TripResource;
use App\Models\Reservation;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllTrips(Request $request)
    {
        // Get the request parameters for filtering
        $date = $request->input('date');
        $start = $request->input('start');
        $end = $request->input('end');
        $typeCar = $request->input('typeCar');
        $rating = $request->input('rating');

        // Start building the query
        $query = Trip::query();

        // Include the driver relationship
        // $query->join('users', 'trips.driver_id', '=', 'users.id')
        //     ->join('drivers', 'users.id', '=', 'drivers.user_id');



        // Apply filters if provided
        if ($date) {
            $query->whereDate('pickup_datetime', $date);
        }
        if ($start) {
            $query->where('pick_up_city_id', $start);
        }
        if ($end) {
            $query->where('destination_city_id', $end);
        }
        // if ($typeCar) {
        //     $query->where('drivers.vehicle_type', $typeCar);
        // }
        // if ($rating) {
        //     $query->where('drivers.rating', (int)$rating);
        // }

        // Execute the query with pagination
        $trips = $query->paginate(20);

        // Return the JSON response
        return response()->json([
            'status' => true,
            'message' => 'This is data',
            'data' => TripResource::collection($trips)
        ], 201);
    }




    //get my trips
    public function myTrips(Request $request)
    {

        $trips = Trip::where('driver_id', $request->user()->id)->get();
        return response()->json([
            'status' => true,
            'message' => 'this is data',
            'data' => TripResource::collection($trips)
        ], 201);
    }


    public function historiesFun(Request $request)
    {
        // dd($request->user()->id);
        $trips = Trip::where('driver_id', $request->user()->id)
            ->withTrashed() // Corrected function name
            ->get(); // Use get() instead of all() to execute the query

        return response()->json([
            'status' => true,
            'message' => 'This is data',
            'data' => TripResource::collection($trips)
        ], 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = Auth::user();


        //check usieng policies /Policies/TripPolicy
        //check if driver active & he is a driver
        if (!$request->user()->can('create', Trip::class)) {
            return response()->json([
                'status' => false,
                'message' => 'you are not active to create trips or u are not a driver',
            ], 402);
        }

        // Validate request data
        $validator = Validator::make($request->all(), [
            'duration_minutes' => 'required',
            'pick_up_city_id' => 'required',
            'destination_city_id' => 'required',
            'pickup_datetime' => 'required',
            'price' => 'required',
            "seats" => 'required'


        ]);


        //2-if there is errors return it
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }


        // Check if the driver already has a trip scheduled for the same pickup date
        $existingTrip = Trip::where('driver_id', $user->id)
            ->whereDate('pickup_datetime', '=', date('Y-m-d', strtotime($request->pickup_datetime)))
            ->first();

        if ($existingTrip) {
            return response()->json([
                'status' => false,
                'message' => 'You already have a trip scheduled for the same pickup date.',
            ], 403);
        }


        // Create a new driver profile for the user
        $trip = new Trip($request->all());
        // Associate the driver profile with the user
        $trip->driver_id = $user->id;

        // Save the driver profile
        $trip->save();

        return response()->json(['message' => 'Driver profile created successfully'], 201);
    }




    public function updateStatus(Request $request, $id)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'status' => 'required:',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 401);
        }

        // Find the trip by its ID
        $trip = Trip::findOrFail($id);


        // if there is no trip under this id return error
        if (!$trip) {
            return response()->json(['message' => 'there is no trip belong this id',], 402);
        }


        // if trip already complte and want update to somthing else  refuse
        if ($trip->status === 'completed') {
            return response()->json(['message' => 'already complted this trip',], 402);
        }

        // Update the status of the trip
        $trip->status = $request->status;
        $trip->save();


        //chekc if status if complted
        if ($trip->status === 'completed') {
            $reservations =   Reservation::where('trip_id', $trip->id)->update(['status' => 'completed'], 201);
            //here create reviews for each reservation
        }

        // Update the status of all reservations with the same trip_id
        //    $reservations =
        // foreach ($reservations as $reservation) {
        //     $reservation->status = 'arrived';
        //     $reservation->save();

        //     // Create a review for each reservation
        //     $review = new Review([
        //         'reservation_id' => $reservation->id,
        //         'user_id' => $reservation->passenger_id,
        //         'rating' => '// Your logic to calculate rating,',
        //         'comment' => ''
        //     ]);
        //     $review->save();
        // }

        return response()->json(['message' => 'Trip status updated successfully'], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {



        $trip = Trip::find($id);
        //check usieng policies /Policies/TripPolicy
        //check if driver active & he is a driver
        // chekc with poilices if user owen this trip
        if (!$request->user()->can('view', $trip)) {
            return response()->json([
                'status' => false,
                'message' => "the trip not belong to you",
            ], 401);
        }
        if (!$trip) {
            return response()->json(['message' => 'there is no trip belong this id',], 402);
        }


        return response()->json([
            'status' => true,
            'message' => 'this is data',
            'data' => $trip
        ]);
    }


    public function update(Request $request, $id) // Modified to accept $id parameter
    {
        // Get the trip details by id
        $trip = Trip::find($id);

        if (!$trip) {
            return response()->json(['message' => 'Trip not found'], 402);
        }
        // chekc with poilices if user owen this trip
        if (!$request->user()->can('update', $trip)) {
            return response()->json([
                'status' => false,
                'message' => "you can't update trip cuz dosn't belong to you",
            ], 402);
        }

        // Update trip data based on request input
        $trip->fill($request->only([
            'duration_minutes',
            'pick_up_city_id',
            'vehicle_type',
            'destination_city_id',
            'pickup_datetime',
            'price',
            'seats'
        ]));

        // Save the updated trip details
        $trip->save();

        $response = [
            'status' => 'success',
            'message' => 'Trip details updated successfully.',
            'trip' => $trip
        ];

        return response()->json($response, 201);
    }


    public function destroy(Request $request, $id)
    {
        $trip = Trip::find($id);

        if (!$trip) {
            return response()->json(['message' => 'there is no trip belong this ' . $id], 404);
        }
        // chekc with poilices if user owen this trip
        if (!$request->user()->can('delete', $trip)) {
            return response()->json([
                'status' => false,
                'message' => "you can't delete trip cuz dosn't belong to you",
            ], 402);
        }
        $trip->status = 'canceled';
        $trip->save();
        $trip->delete();

        return response()->json(['status' => true, 'message' => 'trip belong id : ' . $id . 'Deleted'], 200);
    }



    //retrieve
    public function restore(Request $request, $id)
    {
        $trip = Trip::withTrashed()->find($id);

        if (!$trip) {
            return response()->json(['message' => 'there is no trip belong this ' . $id], 401);
        }
        // chekc with poilices if user owen this trip
        if (!$request->user()->can('restore', $trip)) {
            return response()->json([
                'status' => false,
                'message' => "you can't restore trip cuz dosn't belong to you",
            ], 401);
        }

        $trip->restore();

        return response()->json(['status' => true, 'message' => 'Recoved trip', 'data' => $trip], 200);
    }
}
