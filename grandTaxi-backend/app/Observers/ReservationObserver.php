<?php

namespace App\Observers;

use App\Models\Driver;
use App\Models\Reservation;
use App\Models\Trip;

class ReservationObserver
{

    //for every reservation we check if trip is full
    // if yes change status trip to full
    public function created(Reservation $reservation): void
    {


        $this->updateTripStatus($reservation->trip);
        $this->incrementDriverRevenue($reservation->trip);
    }


    // if seats full change status to full
    private function updateTripStatus(Trip $trip): void
    {
        $reservedSeats = $trip->reservations()->count();
        if ($reservedSeats >= $trip->seats) {
            $trip->update(['status' => 'full']);
        }
    }

    private function incrementDriverRevenue(Trip $trip): void
    {
        // $driver = $trip->driver;
        // $price = $trip->price;
        // $driver->revenue = $driver->revenue + $price;
        // $driver->save();
        // $driver->increment('revenue', $price);
    }
    /**
     * Handle the Reservation "updated" event.
     */
    public function updated(Reservation $reservation): void
    {
        //
    }

    /**
     * Handle the Reservation "deleted" event.
     */
    public function deleted(Reservation $reservation): void
    {
        //
    }

    /**
     * Handle the Reservation "restored" event.
     */
    public function restored(Reservation $reservation): void
    {
        //
    }

    /**
     * Handle the Reservation "force deleted" event.
     */
    public function forceDeleted(Reservation $reservation): void
    {
        //
    }
}
