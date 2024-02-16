<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = ['passenger_id', 'pick_up_city_id', 'destination_city_id'];

    public function passenger()
    {
        return $this->belongsTo(User::class, 'passenger_id');
    }

    public function pickUpCity()
    {
        return $this->belongsTo(City::class, 'pick_up_city_id');
    }

    public function destinationCity()
    {
        return $this->belongsTo(City::class, 'destination_city_id');
    }
}
