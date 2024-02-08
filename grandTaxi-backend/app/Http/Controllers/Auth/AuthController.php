<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Passenger;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */




    public function register(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);


            $data['token'] = $user->createToken($request->email)->plainTextToken;
            $data['user'] = $user;


            $response = [
                'status' => 'success',
                'message' => 'User is created successfully.',
                'data' => $data,
            ];

            return response()->json($response, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function login(Request $request)
    {
        try {
            $request->validate(
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );



            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Email & Password do not match our records.'
                ], 401);
            }

            $user = User::where('email', $request->email)->first();


            // Check password
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $data['token'] = $user->createToken($request->email)->plainTextToken;
            $data['user'] = $user;

            $response = [
                'status' => 'success',
                'message' => 'User is logged in successfully.',
                'data' => $data,
            ];

            return response()->json($response, 200);


        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        // $request->session()->invalidate();

        // $request->session()->regenerateToken();

        return response()->json([
            'status' => 'success',
            'message' => 'successfully logout'
        ], 500);
    }

    // public function logout()
    // {
    //     auth()->user()->tokens()->delete();

    //     return response()->json([
    //         'message' => 'Succesfully Logged out'
    //     ], 200);
    // }

    public function userInfo(Request $request)
    {


        $route =   $this->redirectDash();
        return response()->json(['route' => $route, 'user' => Auth::user()]);
    }

    // public function show(Request $request)
    // {

    //     if (Auth::user()->can('view', Passenger::class)) {
    //         return response()->json(['route' => 'can']);
    //     } else {
    //         return response()->json(['route' => 'cant']);
    //     }
    //     // $route =   $this->redirectDash();
    //     // return response()->json(['route' => $route]);
    // }
    public function redirectDash()
    {
        $redirect = '';

        if (Auth::user() && Auth::user()->role == 'passenger') {
            $redirect = '/passenger';
        } else if (Auth::user() && Auth::user()->role == 'admin') {
            $redirect = '/admin';
        } else if (Auth::user() && Auth::user()->role == 'driver') {
            $redirect = '/driver';
        } else {
            $redirect = '/dashboard';
        }

        return $redirect;
    }
}
