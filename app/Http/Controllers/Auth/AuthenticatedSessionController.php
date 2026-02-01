<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('login', [
            'redirect' => $request->input('redirect'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'redirect' => ['nullable', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        if (
            ! Auth::attempt(
                ['email' => $credentials['email'], 'password' => $credentials['password']],
                $request->boolean('remember')
            )
        ) {
            return back()
                ->withErrors([
                    'email' => 'Неверная почта или пароль.',
                ])
                ->onlyInput('email');
        }

        $request->session()->regenerate();

        $redirectDestination = $request->input('redirect');

        return redirect()
            ->intended($redirectDestination ?: route('admin'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
