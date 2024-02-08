<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'location_latitude', 'location_longitude'];


    public function tripsAsPickUp()
    {
        return $this->hasMany(Trip::class, 'pick_up_city_id');
    }

    public function tripsAsDestination()
    {
        return $this->hasMany(Trip::class, 'destination_city_id');
    }
}
