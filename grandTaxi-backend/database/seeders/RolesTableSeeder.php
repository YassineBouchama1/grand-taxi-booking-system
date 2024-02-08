<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define initial roles data
        $roles = [
            ['name' => 'admin'],
            ['name' => 'passenger'],
            ['name' => 'driver'],
        ];

        // Insert data into the roles table
        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
