<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trip extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'driver_id',
        'duration_minutes',
        'pick_up_city_id',
        'destination_city_id',
        'pickup_datetime',
        'price',
        'seats',
        'status'
    ];

    // public function driver()
    // {
    //     return $this->belongsTo(Driver::class);
    // }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pickUpCity()
    {
        return $this->belongsTo(City::class, 'pick_up_city_id');
    }

    public function destinationCity()
    {
        return $this->belongsTo(City::class, 'destination_city_id');
    }

    // get all reservation under this trip for driver
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'trip_id');
    }
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
