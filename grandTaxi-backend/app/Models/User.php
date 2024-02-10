<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name', 'email', 'password', 'role_id', 'profile_photo', 'contact_info', 'status', 'email_verified_at', 'last_online_at',
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'last_online_at' => 'datetime',
    ];



    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    
    ///driver associated with the user
    public function driver(): HasOne
    {
        return $this->hasOne(Driver::class);
    }






    //  return reservation depand of role user

    public function reservations()
    {
        // return $this->hasMany(Reservation::class, 'passenger_id');
        if ($this->role->name == 'passenger') {

            return $this->hasMany(Reservation::class, 'passenger_id');
        }
        // else if ($this->role->name == 'driver') {

        //     return $this->hasMany(Reservation::class, 'driver_id');
        // }
        else {
            return $this->hasMany(Reservation::class);
        }
    }




    ///driver associated with the user
    public function trip(): HasMany
    {
        return $this->hasMany(Trip::class);
    }

    //Determine if the user is a admin
    public function isAdmin(): bool
    {
        return $this->role->name === 'admin';
    }

    //Determine if the user is a passenger
    public function isPassenger(): bool
    {
        return $this->role->name === 'passenger';
    }

    //Determine if the user is a passenger
    public function isDriver(): bool
    {
        return $this->role->name === 'driver';
    }

    //determine if driver filled information
    public function hasDriverInformation(): bool
    {
        return $this->isDriver() && $this->driver()->exists();
    }
}
