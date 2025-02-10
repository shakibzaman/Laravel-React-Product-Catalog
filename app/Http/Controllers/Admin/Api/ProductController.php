<?php

namespace App\Http\Controllers\Admin\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Jobs\SendLowStockNotification;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock_quantity' => 'required|integer|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            // Handle image upload or use default image
            $imagePath = $request->hasFile('image')
                ? $request->file('image')->store('images/products', 'public')
                : 'images/products/default.png'; // Relative path on the public disk

            // Create product
            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'stock_quantity' => $request->stock_quantity,
                'image' => $imagePath
            ]);

            return ApiResponse::success('New product created successfully.', $product, 201);
        } catch (Exception $e) {
            return ApiResponse::error('Validation failed.', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $product = Cache::remember("product_{$id}", 60, function () use ($id) {
                return Product::findOrFail($id);
            });

            return ApiResponse::success('Product retrieved successfully.', $product);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to retrieve product.', $e->getMessage());
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock_quantity' => 'required|integer|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                // Delete old image if it's not the default one
                if ($product->image && $product->image !== 'images/products/default.png') {
                    Storage::disk('public')->delete($product->image);
                }

                // Store new image
                $validatedData['image'] = $request->file('image')->store('images/products', 'public');
            }

            // Update product
            $product->update($validatedData);

            return ApiResponse::success('Product updated successfully.', $product);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to update product.', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Find and delete the product
            $product = Product::findOrFail($id);
            $product->delete();
            
            // Return a success response
            return ApiResponse::success('Product deleted successfully.', null, 200);
        } catch (Exception $e) {
            // Handle exceptions and return an error response
            return ApiResponse::error('Failed to delete the product.', $e->getMessage());
        }
    }
}
