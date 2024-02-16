<?php

namespace App\Http\Resources;

use App\Models\City;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $passenger = User::find($this->passenger_id);
        $trip = Trip::withTrashed()->find($this->trip_id);

        //bring all data cities
        $Pick_up_city = City::find($trip->pick_up_city_id);
        $destination_city = City::find($trip->destination_city_id);


        return [
            'id' => $this->id,
            'passenger_id' => $this->passenger_id,
            'passenger_name' => $passenger->name,
            'trip_id' => $this->trip_id,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'tripStatus' => $trip->status,
            'destination_city' => $destination_city->name,
            'Pick_up_city' => $Pick_up_city->name,
            'destination_city_id' => $destination_city->id,
            'Pick_up_city_id' => $Pick_up_city->id,
            "pick_up_day" => $trip->pickup_datetime,
            "isReviewed" => $this->isReviewed
        ];
    }
}
