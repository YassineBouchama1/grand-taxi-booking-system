<?php

namespace App\Policies;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TripPolicy
{


    public function view(User $user, Trip $trip)
    {
        // return $user->id === $trip->user_id;
        return $user->id === $trip->driver_id && $user->role->name === 'driver';
    }

    public function viewAny(User $user)
    {
        // return $user->id === $trip->user_id;
        // dd($user->role->name);
        return  $user->role->name === 'passenger';
    }


    /**
     * Determine whether the user can create models.
     */

    public function create(User $user): bool
    {
        return $user->status === 'active' && $user->role->name === 'driver';
    }


    /*
     * Determine whether the user can update the model.
     */

    public function update(User $user, Trip $trip): bool
    {
        return $user->id === $trip->user_id && $user->role->name === 'driver';
    }
    public function updateStatusTrip(User $user, Trip $trip): bool
    {
        return $user->id === $trip->user_id && $user->role->name === 'driver';
    }

    /**
     * Determine whether the user can delete the model.
     */

    public function delete(User $user, Trip $trip): bool
    {
        return $user->id === $trip->driver_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Trip $trip): bool
    {
        return true;
    }
}
