<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $this->call(RolesTableSeeder::class);
        // $this->call(CityTableSeeder::class);

        // \App\Models\Role::factory()->create([
        //     'name' => 'admin',
        // ]);
        // \App\Models\Role::factory()->create([
        //     'name' => 'driver',
        // ]);
        // \App\Models\Role::factory()->create([
        //     'name' => 'passenger',
        // ]);
    }
}
