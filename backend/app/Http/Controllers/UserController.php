<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    public function changeUsername(Request $request)
    {

        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'new_username' => 'required',
        ]);

        // Check if validation fails and return errors.
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $validator->errors()->all()], 422);
        }

        // Check if password is correct.
        if (!Hash::check($request->password, auth()->user()->password)) {
            return response()->json(['message' => 'Unauthorized.', 'errors' => ['Current password is incorrect.']], 401);
        }

        // Check if new username is not the same of current one.
        if (auth()->user()->email == $request->new_username) {
            return response()->json(['message' => 'Data provided is invalid.', 'errors' => ['The new username cannot be equal to current one.']], 422);
        }

        // Request is valid, now proceed...

        // Update the user's username.
        auth()->user()->email = $request->new_username;
        auth()->user()->save();

        //Return success message.
        return response()->json(['message' => 'Username was changed.'], 200);
    }

    public function changePassword(Request $request)
    {

        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'new_password' => [
                'required',
                'string',
                'max:20',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ]);

        // Check if validation fails and return errors.
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $validator->errors()->all()], 422);
        }

        // Check if password is correct.
        if (!Hash::check($request->password, auth()->user()->password)) {
            return response()->json(['message' => 'Unauthorized.', 'errors' => ['Current password is incorrect.']], 401);
        }

        // Check if the new password is not the same of current.
        if (Hash::check($request->new_password, auth()->user()->password)) {
            return response()->json(['message' => 'Data provided is invalid.', 'errors' => ['The new username cannot be equal to current one.']], 401);
        }

        // Request is valid, now proceed...

        // Update the user's password.
        auth()->user()->password = $request->new_password;
        auth()->user()->save();

        // Return success message.
        return response()->json(['message' => 'Password was changed.'], 200);
    }

}
