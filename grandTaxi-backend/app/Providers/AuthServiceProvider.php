<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Driver;
use App\Models\Reservation;
use App\Models\Trip;
use App\Policies\DriverPolicy;
use App\Policies\ReservationPolicy;
use App\Policies\TripPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Driver::class => DriverPolicy::class,
        Trip::class => TripPolicy::class,
        Reservation::class => ReservationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
