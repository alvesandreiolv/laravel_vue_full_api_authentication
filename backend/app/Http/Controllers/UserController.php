<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    public function register(Request $request)
    {
        //Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:2|max:255|regex:/^[\pL\s.]+$/u',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'max:20',
                Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised(),
            ],
        ]);

        //Check if validation fails and return errors.
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $validator->errors()->all()], 422);
        }

        //Request is valid, now proceed --

        //Creates the user in the database.
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json(['message' => 'The new user was registered successfully.'], 200);

    }

    public function deactivate(Request $request)
    {
        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'password' => 'required',
        ]);

        // Check if validation fails and return errors.
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $validator->errors()->all()], 422);
        }

        // Check if password is correct.
        if (!Hash::check($request->password, auth()->user()->password)) {
            return response()->json(['message' => 'Unauthorized.', 'errors' => ['Current password is incorrect.']], 401);
        }

        // Request is valid, now proceed...

        //Delete ALL user tokens, thus revoking his access.
        $request->user()->tokens()->delete();

        //Now soft delete the user.
        auth()->user()->delete();

        //Return success message.
        return response()->json(['message' => 'You have deactivated your account successfully.'], 200);

    }

    public function changeName(Request $request)
    {

        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'new_name' => 'required|min:2|max:25|regex:/^[\pL\s.]+$/u',
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
        if (auth()->user()->name == $request->new_name) {
            return response()->json(['message' => 'Data provided is invalid.', 'errors' => ['The new username cannot be equal to current one.']], 422);
        }

        // Request is valid, now proceed --

        // Update the user's username.
        auth()->user()->name = $request->new_name;
        auth()->user()->save();

        //Return success message.
        return response()->json(['message' => 'Display name was changed.'], 200);
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
            return response()->json(['message' => 'Data provided is invalid.', 'errors' => ['The new password cannot be equal to current one.']], 401);
        }

        // Request is valid, now proceed...

        // Update the user's password.
        auth()->user()->password = $request->new_password;
        auth()->user()->save();

        // Return success message.
        return response()->json(['message' => 'Password was changed.'], 200);
    }

}
