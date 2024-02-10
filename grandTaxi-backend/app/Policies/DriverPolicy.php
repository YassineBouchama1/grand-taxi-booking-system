<?php

namespace App\Policies;

use App\Models\Driver;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DriverPolicy
{

    use HandlesAuthorization;


    public function view(User $user, Driver $trip)
    {
        // return $user->id === $trip->user_id;
        return $user->id === $trip->user_id && $user->role->name === 'driver';
    }
    // public function viewAny(User $user): bool
    // {
    //     return $user || $user->role = 'admin';
    // }



    public function viewAny(User $user): bool
    {
        return true;
    }



    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return  $user->role->name === 'driver' && !$user->driver()->exists();
    }

    public function update(User $user, Driver $driver): bool
    {
        return $user->id === $driver->user_id && $user->role->name === 'driver';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Driver $driver): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Driver $driver): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Driver $driver): bool
    {
        return true;
    }
}
