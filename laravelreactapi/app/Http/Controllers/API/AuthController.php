<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Hash the password
        ]);

        if ($user) {
            $token = $user->createToken($user->email . '_Token')->plainTextToken;
            return response()->json([
                'statusCode' => 200,
                'username' => $user->name,
                '_Token' => $token,
                'message' => 'User registered successfully'
            ]);
        } else {
            return response()->json([
                'statusCode' => 500, // Adjust status code if registration fails
                'message' => 'User registration failed'
            ]);
        }
    }


    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'statusCode' => 422,
                'validation_errors' => $validator->errors(),
            ]);
        }


        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = Auth::user();

            if($user->role_as === 1){

                $role ='admin';
                $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;

            }else{
                $role ='';
                $token = $user->createToken($user->email.'_Token', [])->plainTextToken;
            }

            return response()->json([
                'statusCode' => 200,
                'message' => 'Login Successful!',
                'username' => $user->name,
                'token'=> $token,
                'role'=>$role
            ]);
        } else {

            return response()->json([
                'statusCode' => 401,
                'message' => 'Invalid Credentials!',
            ]);
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'statusCode' => 200,
            'message' => 'Logout Successfully',
        ]);
    }

}
