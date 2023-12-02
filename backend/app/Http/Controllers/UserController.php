<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function changeUsername(Request $request)
    {

        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'newUsername' => 'required',
        ]);

        // Check if validation fails and return errors.
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $validator->errors()], 422);
        }

        // Check if password is correct.
        if (!Hash::check($request->password, auth()->user()->password)) {
            return response()->json(['message' => 'Password is incorrect.'], 401);
        }

        // Request is valid, now proceed...

        return 'You would change username.';
    }

    public function changePassword(Request $request)
    {
        return 'You would change password.';
    }

}
