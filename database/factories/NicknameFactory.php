<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nickname>
 */
class NicknameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nickname' => ucfirst($this->faker->words(2, true)),
            'comment' => $this->faker->boolean(70) ? $this->faker->words(3, true) : null,
            'verified' => $this->faker->boolean(),
        ];
    }
}
