<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminMail = env('ADMIN_EMAIL');
        $adminPassword = env('ADMIN_PASSWORD');
        $adminName = env('ADMIN_NAME', 'Admin');

        $admin = new User();
        $admin->email = $adminMail;
        $admin->password = $adminPassword;
        $admin->name = $adminName;
        $admin->save();
    }
}
