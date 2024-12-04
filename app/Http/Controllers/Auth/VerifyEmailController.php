<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request)
    {
        // check user Verified or not
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Your email address is A Verified',
            ], Response::HTTP_OK);
        }

        // check Verified user or not
        if ($request->user()->markEmailAsVerified()) {
            return response()->json([
                'message' => 'Your email address is A Verified'
            ], Response::HTTP_ACCEPTED);
        }
    }
}
