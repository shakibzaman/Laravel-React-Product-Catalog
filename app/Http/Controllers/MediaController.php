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

    public function serveImage(Request $request, $path)
    {
        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            return $this->addCorsHeaders(response('', 200));
        }

        $fullPath = 'public/images/products/' . $path;
        
        if (!Storage::exists($fullPath)) {
            $fullPath = 'public/images/products/default.png';
        }

        try {
            $file = Storage::get($fullPath);
            $type = Storage::mimeType($fullPath);

            return $this->addCorsHeaders(
                response($file)
                    ->header('Content-Type', $type)
                    ->header('Cache-Control', 'public, max-age=31536000')
            );
        } catch (\Exception $e) {
            return response()->json(['error' => 'Image not found'], 404);
        }
    }
} 