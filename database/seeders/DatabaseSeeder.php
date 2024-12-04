<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Admin;
use App\Models\Customer;
use App\Models\Publisher;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Model::unguard();
        $admin = Admin::create([
            'name'              => 'Admin',
            'email'             => 'admin@admin.com',
            'status'            => 1,
            'email_verified_at' => now(),
            'password'          => bcrypt('password'),
        ]);
        $publisher = Publisher::create([
            'name'              => 'Publisher',
            'email'             => 'publisher@publisher.com',
            'status'            => 1,
            'email_verified_at' => now(),
            'password'          => bcrypt('password'),
        ]);
        $customer = Customer::create([
            'name' => 'Customer',
            'email' => 'customer@admin.com',
            'status' => 1,
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);
    }
}
