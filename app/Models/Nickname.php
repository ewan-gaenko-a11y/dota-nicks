<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Nickname extends Model
{
    use HasFactory;

    protected $fillable = [
        'nickname',
        'comment',
        'likes',
        'dislikes',
        'verified',
    ];

    protected $casts = [
        'likes' => 'integer',
        'dislikes' => 'integer',
        'verified' => 'boolean',
    ];

    public function toPayload(?int $viewerId = null): array
    {
        $currentUserVote = null;

        if ($viewerId) {
            if ($this->relationLoaded('votes')) {
                $currentUserVote = $this->votes->firstWhere('user_id', $viewerId)?->type;
            } else {
                $currentUserVote = $this->votes()->where('user_id', $viewerId)->value('type');
            }
        }

        return [
            'id' => $this->id,
            'nickname' => $this->nickname,
            'comment' => $this->comment,
            'likes' => $this->likes,
            'dislikes' => $this->dislikes,
            'createdAt' => $this->created_at?->toISOString(),
            'currentUserVote' => $currentUserVote,
        ];
    }

    public function votes(): HasMany
    {
        return $this->hasMany(NicknameVote::class);
    }
}
