<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
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


        // Validate request data
        $validator = Validator::make($request->all(), [
            // 'trip_id' => 'required',
            // 'passenger_id' => 'required',
            'reservation_id' => 'required',
            'rating' => 'required|integer', // Adjust validation rule
            'comment' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 401);
        }
        $reservation = Reservation::where('id', $request->reservation_id)->first();

        if (!$reservation) {
            // Handle invalid reservation ID error
            return response()->json([
                'status' => false,
                'message' => 'Invalid reservation ID provided',
            ], 402);
        }

        // dd($request->reservation_id); // Cre    ate a new review
        // $review = new Review([
        //     'trip_id' => $reservation->trip_id,
        //     'reservation_id' => 27,
        //     'passenger_id' => $request->user()->id,
        //     'rating' => $request->rating,
        //     'comment' => $request->comment,
        // ]);

        Review::create([
            'trip_id' => $reservation->trip_id,
            'reservation_id' => 27,
            'passenger_id' => $request->user()->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // Save the review
        // $review->save();
        $reservation->update(['isReviewed' => 1]);

        //update trip
        // get trip for get who is driver from it
        $trip =    Trip::where('id', $request->trip_id)->get();
        // get driver
        $driver =     Driver::find($trip->driver_id);

        $driver->rating =  $driver->rating = $request->rating;
        $driver->save();
        return response()->json([
            'status' => true,
            'message' => 'Review created successfully',

        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
