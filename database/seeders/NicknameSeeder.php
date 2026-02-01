<?php

namespace Database\Seeders;

use App\Models\Nickname;
use Illuminate\Database\Seeder;

class NicknameSeeder extends Seeder
{
    public const COUNT_OF_RECORDS = 20;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $presets = [
            [
                'nickname' => '???',
                'comment' => 'ancient_leshrac',
                'verified' => false,
            ],
            [
                'nickname' => 'пидор',
                'comment' => 'void_loop',
                'verified' => false,
            ],
            [
                'nickname' => 'хуйло',
                'comment' => 'shadow_magus',
                'verified' => true,
            ],
            [
                'nickname' => 'Темный Крипожор',
                'comment' => null,
                'verified' => true,
            ],
            [
                'nickname' => 'еблан',
                'comment' => 'runaway_io',
                'verified' => true,
            ],
        ];

        foreach ($presets as $preset) {
            Nickname::updateOrCreate(
                ['nickname' => $preset['nickname']],
                $preset
            );
        }

        Nickname::factory(100)->create();
    }
}
