<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function serve(Request $request, $path)
    {
        if ($request->isMethod('OPTIONS')) {
            return response('')
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                ->header('Access-Control-Allow-Headers', '*')
                ->header('Access-Control-Max-Age', '86400');
        }

        // Debug the path
        \Log::info('Requested path: ' . $path);
        \Log::info('Full storage path: public/' . $path);

        // Check if file exists
        if (!Storage::exists('public/' . $path)) {
            \Log::info('File not found, using default');
            return response()->file(public_path('storage/images/products/default.png'));
        }

        try {
            $fullPath = storage_path('app/public/' . $path);
            \Log::info('Attempting to serve file from: ' . $fullPath);
            
            if (file_exists($fullPath)) {
                return response()->file($fullPath, [
                    'Content-Type' => mime_content_type($fullPath),
                    'Access-Control-Allow-Origin' => '*',
                    'Access-Control-Allow-Methods' => 'GET, OPTIONS',
                    'Access-Control-Allow-Headers' => '*',
                    'Cache-Control' => 'public, max-age=31536000'
                ]);
            } else {
                \Log::error('File does not exist at path: ' . $fullPath);
                return response()->json(['error' => 'Image not found'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error serving image: ' . $e->getMessage());
            return response()->json(['error' => 'Error serving image'], 500);
        }
    }
} 