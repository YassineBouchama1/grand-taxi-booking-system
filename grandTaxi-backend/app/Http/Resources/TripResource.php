<?php

namespace App\Http\Resources;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'driver_id' => $this->driver_id,
            'duration_minutes' => $this->duration_minutes,
            'pick_up_city_id' => $this->pick_up_city_id,
            'destination_city_id' => $this->destination_city_id,
            'pickup_datetime' => $this->pickup_datetime,
            'price' => $this->price,
            'seats' => $this->seats . '/' . $this->reservations()->count(),
            'isFull' => (int)$this->seats <= (int)$this->reservations()->count(),

        ];
    }
}
