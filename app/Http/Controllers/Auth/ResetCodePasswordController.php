<?php

namespace App\Http\Controllers\Auth;

use App\Models\Admin;
use App\Models\Customer;
use App\Models\Publisher;
use Illuminate\Http\Request;
use App\Models\ResetCodePassword;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Mail\SendCodeResetPassword;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetCodePasswordController extends Controller
{
    public function forgotpassword(Request $request, $type): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email|exists:' . $type . 's',
        ]);

        // Delete all old code that the user sent before.
        ResetCodePassword::where('email', $request->email)->delete();

        // Generate random code
        $data['code'] = mt_rand(1000000, 9999999);

        // Create a new code
        $codeData = ResetCodePassword::create($data);

        // Send email to user
        Mail::to($request->email)->send(new SendCodeResetPassword($codeData->code));

        return response()->json([
            "success" => true,
            "message" => 'We send password reset code, please check your email.',
        ], Response::HTTP_OK);
    } // End Of forgotpassword


    public function reset(Request $request, $type)
    {
        $request->validate([
            'code' => 'required|string|exists:reset_code_passwords',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // find the code
        $passwordReset = ResetCodePassword::firstWhere('code', $request->code);

        //Check if it has not expired: the time is one hour
        $codeCheck = $this->codeCheck($passwordReset);

        // Check guard
        if (Auth::guard($type)) {
            // find user's email
            $user = $this->findUser($type, $passwordReset);
            if ($user  != null) {
                // update user password
                $this->updateUser($user, $type, $request);
                // delete current code
                $passwordReset->delete();
                return response()->json([
                    "success" => true,
                    "message" => 'Password has been successfully reset',
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => 'We can\'t find a user with that e-mail address.',
                ], Response::HTTP_BAD_REQUEST);
            }
        }
    } // End Of reset

    private function findUser($type, $passwordReset)
    {
        switch ($type) {
            case 'admin':
                return Admin::firstWhere('email', $passwordReset->email);
            case 'publisher':
                return Publisher::firstWhere('email', $passwordReset->email);
            case 'customer':
                return Customer::firstWhere('email', $passwordReset->email);
            default:
                return null;
        }
    } // End Of finduser

    private function codeCheck($passwordReset)
    {
        if ($passwordReset->created_at > now()->addHour()) {
            $passwordReset->delete();
            return response()->json([
                "success" => true,
                "message" => 'Passwords code is expire',
            ], Response::HTTP_BAD_REQUEST);
        }
    } // end of codeCheck


    private function updateUser($user, $type, $request): void
    {
        $id = $user->id;
        $tableName = $type . 's';
        $password = bcrypt($request->password);
        DB::table($tableName)
            ->where('id', $id)
            ->update(['password' => $password]);
    } // end of updateUser

} // end of controller
