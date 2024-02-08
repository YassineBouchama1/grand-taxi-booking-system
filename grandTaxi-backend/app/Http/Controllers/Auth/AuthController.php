<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Passenger;
use App\Models\Role;
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
            //1-Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required',
                    'role_id' => 'required',
                    'contact_info' => 'required',
                ]
            );


            //2-if there is errors return it
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }
            //3-create account
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
                'status' => (int)$request->role_id === 3 ? 'inactive' : 'active'
            ]);

            //4-generate token
            // $data['token'] = $user->createToken($request->email)->plainTextToken;
            // $data['user'] = $user;


            // Retrieve the role name using the relationship
            $roleName = $user->role->name;


            $response = [
                'status' => 'success',
                'message' => 'User is created successfully.',
                'user Role' =>  $roleName,
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
            // $data['isValid'] = $user->hasDriverInformation;

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



    public function logout()
    {
        $user = auth()->user();
        $user->last_online_at = now(); // update last oline at
        $user->save();

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Successfully Logged out'
        ], 200);
    }

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
