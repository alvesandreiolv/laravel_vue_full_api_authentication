<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    //Login route for api.
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            //Create the token.
            $token = Auth::user()->createToken('JWT')->plainTextToken;
            //Attach the cookie to the response
            return response()->json(['token' => $token, 'message' => 'Authenticated'], 200);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    //Logout route for api.
    public function logout(Request $request)
    {
        //Revoke the user's token.
        $request->user()->tokens()->delete();
        //Returns successful logout message.
        return response()->json(['message' => 'Logged out']);
    }

}
