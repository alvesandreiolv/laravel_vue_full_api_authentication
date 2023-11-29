<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{

    //Login route for api.
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('JWT')->plainTextToken;

            // Create an HTTP-only cookie with the token
            $cookie = cookie('auth_token', $token, 60)->sameSite('None')->disableSecure();

            // Attach the cookie to the response
            return response()->json(['token' => $token, 'message' => 'Authenticated'], 200)->cookie($cookie);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    //Logout route for api.
    public function logout(Request $request)
    {
        return response()->json(['message' => 'Logged out']);
    }

}
