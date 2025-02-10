<?php

namespace App\Http\Controllers\Public\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        // Add CORS headers
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
        header('Access-Control-Allow-Credentials: true');
    }

    public function index()
    {
        try {
            $products = Product::orderBy('id', 'DESC')->get();
            // Return a successful response
            $message = $products->isEmpty()
                ? 'No products found in the database.'
                : 'Products retrieved successfully.';
            return ApiResponse::success($message, $products);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to retrieve products.', $e->getMessage());
        }
    }
    public function show(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            // The image URL will now be handled by the accessor
            return ApiResponse::success('Product retrieved successfully.', $product);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to retrieve product.', $e->getMessage());
        }
    }

    public function getProduct()
    {
        logger('Api is calling');
        return response()->json(Product::latest()->first());
    }
}
