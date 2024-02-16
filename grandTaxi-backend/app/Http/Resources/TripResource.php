<?php

namespace App\Http\Resources;

use App\Models\City;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $user = User::find($this->driver_id);

        // Check if the request contains a 'car' parameter
        if ($request->has('typeCar')) {
            // Filter trips by the specified car
            if ($user->driver->vehicle_type != $request->input('typeCar')) {
                return ['valid' => false]; // Return an empty array if the car doesn't match
            }
        }
        // Check if the request contains a 'car' parameter
        if ($request->has('rating')) {
            // Filter trips by the specified car
            if ($user->driver->rating === $request->input('rating')) {
                return ['valid' => false]; // Return an empty array if the car doesn't match
            }
        }
        return [
            'id' => $this->id,
            'driver_id' => $this->driver_id,
            'status' => $this->status,
            'duration_minutes' => $this->duration_minutes,
            'pick_up_city_id' => $this->pick_up_city_id,
            'pick_up_city' => City::find($this->pick_up_city_id)->name,
            'destination_city_id' => $this->destination_city_id,
            'destination_city' => City::find($this->destination_city_id)->name,
            'pickup_datetime' => $this->pickup_datetime,
            'price' => $this->price,
            'seats' => $this->seats . '/' . $this->reservations()->count(),
            'isFull' => (int)$this->seats <= $this->reservations()->count(),
            'car' => $user->driver->vehicle_type,
            'rating' => $user->driver->rating,
            'valid' => true
        ];
    }
}
