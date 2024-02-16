<?php

namespace App\Http\Resources;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
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
            'passenger_id' => $this->passenger_id,
            "pick_up_city_id" => $this->pick_up_city_id,
            "destination_city_id" => $this->destination_city_id,
            "pick_up_city" => City::find($this->pick_up_city_id)->name,
            "destination_city" => City::find($this->destination_city_id)->name,
        ];
    }
}
