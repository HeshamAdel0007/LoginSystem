<?php

namespace App\Http\Controllers\Auth;

use App\Models\Admin;
use App\Models\Customer;
use App\Models\Publisher;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatedSessionController extends Controller
{
    public function login(LoginRequest $request, string $type)
    {
        try {
            // Validate guard type
            if (!$this->isValidGuard($type)) {
                return response()->json([
                    'message' => 'Invalid guard type.'
                ], Response::HTTP_BAD_REQUEST);
            }

            $email = $request->email;

            // user login
            $request->authenticate($type);

            // create token
            $token =  $this->createUserToken($type, $email);

            // return user info
            $user = $this->getUserInfo($type, $email);

            return response()->json([
                "message" => "Successfully Login!",
                "data"    => $user,
                "token"   =>  $token
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Login failed. Please check your credentials.',
                'error' => $ex->getMessage()
            ], Response::HTTP_UNAUTHORIZED);
        }
    } // End of login


    /**
     * get user info
     * @return object
     */
    private function getUserInfo(string $type, string $email)
    {
        switch ($type) {
            case 'admin':
                return Admin::firstWhere('email', $email);
            case 'publisher':
                return Publisher::firstWhere('email', $email);
            case 'customer':
                return Customer::firstWhere('email', $email);
            default:
                return null;
        }
    } // End Of getuserinfo


    /**
     * Create Token for user
     */
    private function createUserToken(string $type, string $email)
    {
        return $this->getUserInfo($type, $email)->createToken($type . '_loggedin', ['*'], now()->addWeek())->plainTextToken;
    } // end of createtoken


    /**
     * Validate if the guard type is correct.
     */
    private function isValidGuard(string $type): bool
    {
        return in_array($type, ['admin', 'publisher', 'customer']);
    }

    /**
     * Destroy an authenticated tokens.
     */
    public function destroy(Request $request): Response
    {
        $request->user()->tokens()->delete();
        return response()->json([
            "success" => true,
            "message" => "You have been successfully loggedOut."
        ], Response::HTTP_OK);
    } // End Of destroy

}//End of controller
