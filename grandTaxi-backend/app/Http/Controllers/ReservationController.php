<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Driver;
use App\Models\Reservation;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            ], 402);
        }
        $reservations = $request->user()->reservations;
        if (!$reservations) {
            return response()->json([
                'status' => true,
                'message' => 'this is data',
                'data' => ReservationResource::collection($reservations)
            ]);
        }
        // dd($reservations);
        return response()->json([
            'status' => true,
            'message' => 'this is data',
            'data' => ReservationResource::collection($reservations)
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
            ], 402);
        }


        // Validate request data
        $validator = Validator::make($request->all(), [
            'trip_id' => 'required',
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
        // dd($trip);

        // if seats is full fuck off
        if ($trip->seats === 'full') {
            return response()->json([
                'status' => false,
                'message' => 'No available seats for this trip.',
            ], 402);
        }

        // get numbers of reservation
        $reservationCount = Reservation::where('trip_id', $request->trip_id)->count();
        // dd($reservationCount);
        // chekc if seats if full
        if ((int)$trip->seats <= $reservationCount) {
            return response()->json([
                'status' => false,
                'message' => 'No available seats for this trip.',
            ], 402);
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
            ], 402);
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
            ], 402);
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





    public function addReview(Request $request, $id)
    {


        // Validate request data
        $validator = Validator::make($request->all(), [
            'rating' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Get the reservation details by id
        $reservation = Reservation::find($id);



        // Check if reservation exists
        if (!$reservation || $reservation->isReviewed) {
            return response()->json(['message' => 'There is no reservation with ID ' . $id . 'or alreeady reviewd'], 404);
        }

        // Get the trip associated with the reservation
        $trip = $reservation->trip;

        // Get the driver associated with the trip
        $driver = Driver::where('user_id', $trip->driver_id)->first();

        // Check if driver exists
        if (!$driver) {
            return response()->json(['message' => 'There is no driver associated with the trip of reservation ' . $id], 404);
        }

        // Calculate new rating
        $newRating = ($driver->rating * $driver->total_reviews + $request->rating) / ($driver->total_reviews + 1);

        // Update driver's rating and total_reviews
        $driver->rating = $newRating;
        $driver->total_reviews += 1;
        $driver->save();
        // change status reservation to reviewd
        $reservation->isReviewed = 1;
        $reservation->save();
        $response = [
            'status' => 'success',
            'message' => 'Reservation details updated successfully.',
            'trip' => $driver
        ];

        return response()->json($response, 200);
    }



    public function destroy(Request $request, $id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['message' => 'There is no reservation with ID ' . $id], 404);
        }

        // Check with policies if user owns this reservation
        if (!$request->user()->can('delete', $reservation)) {
            return response()->json([
                'status' => false,
                'message' => "You can't delete this reservation because it doesn't belong to you.",
            ], 402);
        }

        $reservation->status = 'canceled';
        $reservation->save();
        // $reservation->delete();

        return response()->json(['status' => true, 'message' => 'Reservation with ID ' . $id . ' deleted'], 201);
    }


    public function getTopCitiesForUser($userId)
    {
        $topCities = Reservation::join('trips', 'reservations.trip_id', '=', 'trips.id')
            ->join('cities', 'trips.destination_city_id', '=', 'cities.id')
            ->select('cities.name', DB::raw('COUNT(*) as reservation_count'))
            ->where('reservations.passenger_id', $userId)
            ->groupBy('cities.id')
            ->orderByDesc('reservation_count')
            ->limit(5) // Adjust this limit according to your needs
            ->get();

        return response()->json(['status' => true, 'data' => $topCities], 201);
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




    public function adminCreateReservation(Request $request)
    {



        // Validate request data
        $validator = Validator::make($request->all(), [
            'trip_id' => 'required',
            'passenger_id' => 'required',
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
        // dd($trip);

        // if seats is full fuck off
        if ($trip->seats === 'full') {
            return response()->json([
                'status' => false,
                'message' => 'No available seats for this trip.',
            ], 402);
        }

        // get numbers of reservation
        $reservationCount = Reservation::where('trip_id', $request->trip_id)->count();
        // dd($reservationCount);
        // chekc if seats if full
        if ((int)$trip->seats <= $reservationCount) {
            return response()->json([
                'status' => false,
                'message' => 'No available seats for this trip.',
            ], 402);
        }

        // Create a new reservation
        $reservation = new Reservation($request->all());

        $reservation->save();


        //after create every reservation observers work to chekc
        //if seat equal reservations change status

        return response()->json([
            'status' => true,
            'message' => 'Reservation created successfully',
            'data' => $reservation,
        ], 201);
    }
}
