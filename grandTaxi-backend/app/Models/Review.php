<?php

namespace App\Models;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{

    use HasFactory, SoftDeletes;

    protected $fillable = [
        'trip_id',
        'passenger_id',
        'rating',
        'comment',
        'is_passenger_review'
    ];

    // Define relationships if needed
    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id');
    }

    public function passenger()
    {
        return $this->belongsTo(User::class, 'passenger_id');
    }
}
