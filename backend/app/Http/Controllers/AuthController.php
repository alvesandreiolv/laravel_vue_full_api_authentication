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
        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean|nullable',
        ]);

        // Check if validation fails and return errors.
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()->all()], 422);
        }

        //Check if credentials are valid, soft deleted users are automatically invalid by default.
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Request is valid, now proceed...

        //Below sets expiration time. If false, return date, if true, return null.
        $sessionExpirationTime = $request->input('remember', false) ? null : Carbon::now()->addMinutes(1440);
        //Create the token.
        $token = Auth::user()->createToken('JWT', ['*'], $sessionExpirationTime)->plainTextToken;
        //Attach the cookie to the response
        return response()->json(['token' => $token, 'message' => 'Authenticated'], 200);
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
