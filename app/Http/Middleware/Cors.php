<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class Cors {
    public function handle($request, Closure $next)
    {
		$response = $next($request);
		if($response instanceof BinaryFileResponse){
			return $response;
		}
        return $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Bearer, Authorization');
    }
}