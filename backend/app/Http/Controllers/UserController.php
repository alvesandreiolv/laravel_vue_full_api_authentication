<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
          return response()->json(['message' => 'Invalid data provided.', 'errors' => ['New username is equal to the current one.']], 422);
        }

        // Request is valid, now proceed...

        // Update the user's username.
        auth()->user()->email = $request->new_username;
        auth()->user()->save();

        //Return success message.
        return response()->json(['message' => 'Username changed.'], 200);
    }

    public function changePassword(Request $request)
    {
      return response()->json(['message' => 'You would change password.'], 200);
    }

}
