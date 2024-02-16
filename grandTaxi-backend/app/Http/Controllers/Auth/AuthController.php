<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Passenger;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            // Validate the request
            $validateUser = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'role_id' => 'required',
                'contact_info' => 'required',
                'profile_photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Max size 2MB
            ]);

            // Check for validation errors
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            // Move the uploaded image to public/images directory
            $imageName = time() . '.' . $request->profile_photo->extension();
            $request->profile_photo->move(public_path('images'), $imageName);

            // Create the user account and save the image path in the database
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => (int)$request->role_id,
                'contact_info' => $request->contact_info,
                'profile_photo' => 'images/' . $imageName, // Save the image path in the database
                'status' => (int)$request->role_id === 3 ? 'inactive' : 'active'
            ]);

            // Retrieve the role name using the relationship
            $roleName = $user->role->name;

            // Construct the full URL for the image
            $imageUrl = asset($user->profile_photo);

            // Return success response with image URL
            return response()->json([
                'status' => 'success',
                'message' => 'User is created successfully.',
                'user Role' =>  $roleName,
                'user' =>  $user,
                'image_url' => $imageUrl // Include the image URL in the response
            ], 201);
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

            return response()->json($response, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }




    public function statics()
    {


        $users = DB::table('users')
            ->whereNotIn('role_id', [1])
            ->get()
            ->count();
        $reservations = DB::table('reservations')

            ->get()
            ->count();
        return response()->json([
            'message' => 'Successfully',
            'users' => $users,
            'reservations' => $reservations
        ], 201);
    }


    public function usersNotAdmin()
    {


        $users = DB::table('users')
            ->whereNotIn('role_id', [1])
            ->get();


        return response()->json([
            'message' => 'Successfully ',
            'users' => $users,

        ], 201);
    }


    public function deleteUser(Request $request)
    {

        if (!$request->user_id) {
            return response()->json([
                'status' => false,
                'message' => 'id is required',
            ], 402);
        }


        User::find($request->user_id)->update(['status' => 'deleted']);
        User::find($request->user_id)->delete();

        return response()->json([
            'message' => 'user deleted Successfully ',


        ], 201);
    }



    public function restorUser(Request $request)
    {

        if (!$request->user_id) {
            return response()->json([
                'status' => false,
                'message' => 'id is required',
            ], 402);
        }

        User::withTrashed()->find($request->user_id)->update(['status' => 'active']);
        User::withTrashed()->find($request->user_id)->restore();



        return response()->json([
            'message' => 'user Restored Successfully ',


        ], 201);
    }



    //passengers
    public function passengers()
    {


        $passengers = DB::table('passengers')
            ->whereNotIn('role_id', [1, 3])
            ->get();


        return response()->json([
            'message' => 'data passengers come Successfully ',
            'users' => $passengers,

        ], 201);
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
