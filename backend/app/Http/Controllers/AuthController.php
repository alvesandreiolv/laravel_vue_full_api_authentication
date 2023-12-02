<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    //Login route for api.
    public function login(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        //Below gets the credentials.
        $credentials = $request->only('email', 'password');
        //Below sets expiration time. If it is false, so returns null to variable, other wise, return minutes.
        $sessionExpirationTime = $request->input('remember', false) ? null : 30;

        //If authentication passes, sets expiration time and returns token. 
        if (Auth::attempt($credentials)) {
            //Create the token.
            $token = Auth::user()->createToken('JWT', ['expires_in' => $sessionExpirationTime])->plainTextToken;
            //Attach the cookie to the response
            return response()->json(['token' => $token, 'message' => 'Authenticated'], 200);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    //Logout route for api.
    public function logout(Request $request)
    {
        //Delete ALL user tokens, thus revoking his access.
        $request->user()->tokens()->delete();
        //Returns successful logout message.
        return response()->json(['message' => 'Logged out']);
    }

}
