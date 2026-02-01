<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LogRequestResponse
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @return Response|RedirectResponse
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $data = $request->all();

        // If logging an authentication request, mask the password in the log
        if ($request->isMethod('post') && $request->is('login') && isset($data['password'])) {
            $data['password'] = '********';  // Mask the password
        }

        // Log the request
        Log::info("API Request: {$request->method()}, {$request->fullUrl()}", [
            'body' => $data,
            'ip' => $request->ips(),
        ]);

        // Continue processing the request
        $response = $next($request);

        // Log the response
        Log::info("API Response: {$response->status()}, {$request->fullUrl()}", [
            'user' => Auth::user()?->email,
            'body' => $response->getContent(),
        ]);

        return $response;
    }
}
