<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        // dd($request->user()->role->name);
        //check usieng policies /Policies/ReservitionPolicy
        //Check if user is a passenger
        if (!$request->user()->can('viewAny', Reservation::class)) {
            return response()->json([
                'status' => false,
                'message' => 'You must be a passenger to see a reservation.',
            ], 401);
        }
        $reservations = $request->user()->reservations;
        if (!$reservations) {
            return response()->json([
                'status' => true,
                'message' => 'this is data',
                'data' => $reservations
            ]);
        }
        // dd($reservations);
        return response()->json([
            'status' => true,
            'message' => 'this is data',
            'data' => $reservations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //bing instant of user that auth
        $user = Auth::user();


        //check usieng policies /Policies/ReservitionPolicy
        //Check if user is a passenger
        if (!$request->user()->can('create', Reservation::class)) {
            return response()->json([
                'status' => false,
                'message' => 'You must be a passenger to create a reservation.',
            ], 401);
        }


        // Validate request data
        $validator = Validator::make($request->all(), [
            'trip_id' => 'required|exists:trips,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if trip has available seats
        $trip = Trip::find($request->trip_id);


        // if seats is full fuck off
        if ($trip->seats === 'full') {
            return response()->json([
                'status' => false,
                'message' => 'No available seats for this trip.',
            ], 422);
        }

        // get numbers of reservation
        $reservationCount = Reservation::where('trip_id', $request->trip_id)->count();
        // dd($reservationCount);
        // chekc if seats if full
        if ((int)$trip->seats <= $reservationCount) {
            return response()->json([
                'status' => false,
                'message' => 'No available seats for this trip.',
            ], 422);
        }

        // Create a new reservation
        $reservation = new Reservation($request->all());
        $reservation->passenger_id = $user->id;
        $reservation->save();


        //after create every reservation observers work to chekc
        //if seat equal reservations change status

        return response()->json([
            'status' => true,
            'message' => 'Reservation created successfully',
            'data' => $reservation,
        ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // bring reservationuseing id
        $reservation = Reservation::find($id);
        // if there is no trip under this id return error
        if (!$reservation) {
            return response()->json(['message' => 'there is no reservation belong this id',], 404);
        }
        // chekc with poilices if user owen this trip
        if (!$request->user()->can('view', $reservation)) {
            return response()->json([
                'status' => false,
                'message' => "you can't delete reservation cuz dosn't belong to you",
            ], 401);
        }

        return response()->json([
            'status' => true,
            'message' => 'this is data',
            'data' => $reservation
        ], 200);
    }



    public function update(Request $request, $id) // Modified to accept $id parameter
    {
        // Get the reservation details by id
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'there is no reservation belong this ' . $id], 404);
        }
        // chekc with poilices if user owen this passenger
        if (!$request->user()->can('update', $reservation)) {
            return response()->json([
                'status' => false,
                'message' => "you can't update reservation cuz dosn't belong to you",
            ], 401);
        }

        // Update reservation data based on request input
        $reservation->fill($request->only([
            'status'
        ]));


        // Save the updated reservation details
        $reservation->save();

        $response = [
            'status' => 'success',
            'message' => 'reservation details updated successfully.',
            'trip' => $reservation
        ];

        return response()->json($response, 200);
    }


    public function destroy(Request $request, $id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['message' => 'there is no reservation belong this ' . $id], 404);
        }

        // chekc with poilices if user owen this reservation
        if (!$request->user()->can('show', $reservation)) {
            return response()->json([
                'status' => false,
                'message' => "you can't delete reservation cuz dosn't belong to you",
            ], 401);
        }

        $reservation->delete();

        return response()->json(['status' => true, 'message' => 'reservation belong id : ' . $id . 'Deleted'], 200);
    }



    //retrieve
    public function restore(Request $request, $id)
    {
        $reservation = Reservation::withTrashed()->find($id);
        if (!$reservation) {
            return response()->json(['message' => 'there is no reservation belong this ' . $id], 404);
        }

        // chekc with poilices if user owen this reservation
        if (!$request->user()->can('show', $reservation)) {
            return response()->json([
                'status' => false,
                'message' => "you can't delete reservation cuz dosn't belong to you",
            ], 401);
        }

        $reservation->restore(); // This restores the soft-deleted post

        return response()->json(['status' => true, 'message' => 'Recoved Reservation', 'data' => $reservation], 200);
    }
}
