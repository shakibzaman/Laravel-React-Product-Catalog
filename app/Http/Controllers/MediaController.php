<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    private function addCorsHeaders($response)
    {
        return $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With')
            ->header('Access-Control-Max-Age', '86400'); // 24 hours
    }

    public function serveImage($path)
    {
        $path = storage_path('app/public/products/' . $path);

        if (!file_exists($path)) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->file($path, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'X-Requested-With, Content-Type, X-Token-Auth, Authorization'
        ]);
    }
}
