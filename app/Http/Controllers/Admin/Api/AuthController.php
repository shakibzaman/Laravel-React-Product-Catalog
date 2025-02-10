<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        logger('1');
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',

            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->name);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'errors' => $e->errors(),
                'message' => 'Validation failed',
            ], 422);
        }
    }

    public function login(Request $request)
    {
        try {
            info('Login start');
            $request->validate([
                'email' => 'required|string|email|exists:users,email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'status' => 401,
                    'message' => 'Invalid credentials',
                ], 401);
            }

            $token = $user->createToken($user->name)->plainTextToken;
            info('token is ', [$token]);

            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Login successful',
                'token' => $token,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json([
                'message' => 'Logged out successfully',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'errors' => $e->getMessage(),
                'message' => 'Logout failed',
            ], 422);
        }
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
    public function users()
    {
        try {
            $users = User::all();
            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'User Fetch successful',
                'users' => $users,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'errors' => $e->getMessage(),
                'message' => 'User Fetch failed',
            ], 422);
        }
    }
}
