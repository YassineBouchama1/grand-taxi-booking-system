<?php

namespace Database\Seeders;

use App\Models\Citie;
use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class CityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define initial roles data
        $cities = [
            ['name' => 'Casablanca', 'location_latitude' => 33.5731, 'location_longitude' => -7.5898],
            ['name' => 'Rabat', 'location_latitude' => 34.020882, 'location_longitude' => -6.841650],
            ['name' => 'Marrakech', 'location_latitude' => 31.6295, 'location_longitude' => -7.9811],
            ['name' => 'Fes', 'location_latitude' => 34.0181, 'location_longitude' => -5.0078],
            ['name' => 'Tangier', 'location_latitude' => 35.7595, 'location_longitude' => -5.8330],
            ['name' => 'Safi', 'location_latitude' => 32.2998, 'location_longitude' => -9.2377],
            ['name' => 'El Jadida', 'location_latitude' => 33.2549, 'location_longitude' => -8.5061],
            ['name' => 'El Aioun', 'location_latitude' => 27.1537, 'location_longitude' => -13.2033],

        ];

        // Insert data into cities table
        foreach ($cities as $cityData) {
            City::create($cityData);
        }
    }
}
