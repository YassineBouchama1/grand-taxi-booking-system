<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'description',
        'license_plate_number',
        'vehicle_type',
        'availability_status',
        'rating',
        'payment_type',
        'location_latitude',
        'location_longitude',
        'revenue',
        'total_reviews'
    ];

    // to convert it to datetime usieng carbon
    // protected $casts = [
    //     'last_online_at' => 'datetime',
    // ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
