<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{

    public function changeUsername(Request $request)
    {
        return 'You would change username.';
    }

    public function changePassword(Request $request)
    {
        return 'You would change password.';
    }

}
