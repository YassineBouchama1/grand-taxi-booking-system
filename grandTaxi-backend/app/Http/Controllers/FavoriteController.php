<?php

namespace App\Http\Controllers;

use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $favorites = Favorite::where('passenger_id', $request->user()->id)->get();
        return response()->json(FavoriteResource::collection($favorites), 201);
    }


    public function store(Request $request)
    {
        $request->validate([

            'pick_up_city_id' => 'required|exists:cities,id',
            'destination_city_id' => 'required|exists:cities,id'
        ]);



        $favorite = Favorite::create([
            'passenger_id' => $request->user()->id,
            'pick_up_city_id' => $request->pick_up_city_id,
            'destination_city_id' => $request->destination_city_id
        ]);

        $response = [
            'status' => 'success',
            'message' => 'Saved successfully.',

        ];

        return response()->json($response, 201);
    }


    public function destroy(Favorite $favorite)
    {
        $favorite->delete();
        return response()->json(null, 204);
    }
}
