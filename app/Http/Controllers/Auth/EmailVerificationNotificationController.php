<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use App\Mail\SendLinkEmailVerification;
use Symfony\Component\HttpFoundation\Response;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse
    {
        // check user Verified or not
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Your email address is A Verified'
            ], Response::HTTP_OK);
        }

        // Send Mail to user
        $this->sendLinkEmailVerify($request->user());

        return response()->json([
            'message' => 'E-Mail verification link is sent, please check your email.'
        ], Response::HTTP_OK);
    } // end of store

    /**
     * handel url user verify to verified
     */
    private function sendLinkEmailVerify($user): void
    {
        // generate new temporary signed Url
        $generateUrl = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $user->id,
                'hash' => sha1($user->getEmailForVerification()),
            ]
        );

        // get front-end url & page verified mail
        $frontendUrl = env('FRONTEND_URL') . env('FRONTEND_EMAIL_VERIFY_URL');

        // handel url verified
        $url =  $frontendUrl . $user->id . '/' . basename($generateUrl);

        // send verified url to user
        Mail::to($user)->send(new SendLinkEmailVerification($user, $url));
    } // end of sendLinkEmailVerify

}// end of controller
