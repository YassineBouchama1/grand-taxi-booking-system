<?php

namespace App\Jobs;

use App\Models\Trip;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateTripStatusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */


    public function handle()
    {
        // spdate status of trips where pickup_datetime has passed and status is 'waiting'
        Trip::whereDate('pickup_datetime', '<', now())
            ->where('status', 'waiting')
            ->update(['status' => 'expired']);
    }
}
