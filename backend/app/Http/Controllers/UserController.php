<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function changeUsername(Request $request)
    {
        // Do request validation
        if (Validator::make($request->all(), [
            'password' => 'required',
            'newUsername' => 'required',
        ])->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        // Check if password is correct.
        if (!Auth::attempt(['email' => auth()->user()->email, 'password' => $request->password])) {
            return response()->json(['message' => 'Password is incorrect.', 'errors' => $validator->errors()], 401);
        }

        return 'You would change username.';
    }

    public function changePassword(Request $request)
    {
        return 'You would change password.';
    }

}
