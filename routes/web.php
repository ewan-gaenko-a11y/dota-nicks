<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Nickname;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return redirect(route('random-nickname'));
})->name('home');

Route::get('/suggest', function () {
    return Inertia::render('nickname-suggestion');
})->name('nickname-suggestion');

Route::get('/random', function () {
    $nickname = Nickname::where('verified', true)->inRandomOrder()->first();

    return Inertia::render('random-nickname', [
        'nickname' => $nickname
            ? [
                'id' => $nickname->id,
                'nickname' => $nickname->nickname,
                'comment' => $nickname->comment,
                'created_at' => $nickname->created_at?->toISOString(),
            ]
            : null,
    ]);
})->name('random-nickname');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:login');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth');

Route::get('/leaderboard', function (Request $request) {
    $search = trim((string) $request->query('q', ''));

    $nicknamesQuery = Nickname::where('verified', true);

    if ($search !== '') {
        $nicknamesQuery->where(function ($query) use ($search) {
            $query
                ->where('nickname', 'like', '%' . $search . '%')
                ->orWhere('comment', 'like', '%' . $search . '%');
        });
    }

    $perPage = 10;
    $totalNicknames = (clone $nicknamesQuery)->count();
    $lastPage = max(1, (int) ceil($totalNicknames / $perPage));

    $nicknames = $nicknamesQuery->simplePaginate($perPage)->withQueryString();

    return Inertia::render('leaderboard', [
        'nicknames' => $nicknames,
        'pagination' => [
            'last_page' => $lastPage,
            'current_page_url' => $nicknames->url($nicknames->currentPage()),
        ],
        'filters' => [
            'q' => $search !== '' ? $search : null,
        ],
    ]);
});

Route::post('/nicknames', function (Request $request) {
    $data = $request->validate([
        'nickname' => [
            'required',
            'string',
            'min:2',
            'max:50',
            function (string $attribute, mixed $value, callable $fail) {
                $normalizedNickname = mb_strtolower((string) $value, 'UTF-8');

                $exists = Nickname::query()
                    ->whereRaw('LOWER(nickname) = ?', [$normalizedNickname])
                    ->exists();

                if ($exists) {
                    $fail('Такой никнейм уже существует');
                }
            },
        ],
        'comment' => ['nullable', 'string', 'max:255'],
    ]);

    Nickname::create([
        'nickname' => $data['nickname'],
        'comment' => $data['comment'] ?: null,
        'verified' => false,
    ]);

    return back();
})->middleware('throttle:nickname-create');

Route::middleware('auth')->group(function () {
    Route::get('/admin', function () {
        $pendingNickname = Nickname::where('verified', false)
            ->orderBy('created_at')
            ->first();

        $pendingCount = Nickname::where('verified', false)->count();

        return Inertia::render('admin', [
            'pendingNickname' => $pendingNickname
                ? [
                    'id' => $pendingNickname->id,
                    'nickname' => $pendingNickname->nickname,
                    'comment' => $pendingNickname->comment,
                    'created_at' => $pendingNickname->created_at?->toISOString(),
                ]
                : null,
            'pendingCount' => $pendingCount,
        ]);
    })->name('admin');

    Route::post('/admin/nicknames/{nickname}/approve', function (Nickname $nickname) {
        if (!$nickname->verified) {
            $nickname->update(['verified' => true]);
        }

        return back(303);
    })->name('admin.nicknames.approve');

    Route::post('/admin/nicknames/{nickname}/decline', function (Nickname $nickname) {
        if (!$nickname->verified) {
            $nickname->delete();
        }

        return back(303);
    })->name('admin.nicknames.decline');
});
