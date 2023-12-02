<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    //Login route for api.
    public function login(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
            'remember' => 'boolean|nullable',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        //Below gets the credentials.
        $credentials = $request->only('email', 'password');
        //Below sets expiration time. If false, return date, if true, return null.
        $sessionExpirationTime = $request->input('remember', false) ? null : Carbon::now()->addMinutes(1440);

        //If authentication passes, sets expiration time and returns token.
        if (Auth::attempt($credentials)) {
            //Create the token.
            $token = Auth::user()->createToken('JWT', ['*'], $sessionExpirationTime)->plainTextToken;
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
