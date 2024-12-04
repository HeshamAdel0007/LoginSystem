<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\ResetCodePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

/*
 *--------------------------------------------------------------------------
 * Authentication Routes
 * Routes Prefix('api/v1/etc...')
 *--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::post(
        '/login/{type}',
        [AuthenticatedSessionController::class, 'login']
    )->name('login');

    Route::post(
        '/register/publisher',
        [RegisteredUserController::class, 'storePublisher']
    )->name('register.publisher');

    Route::post(
        '/register/customer',
        [RegisteredUserController::class, 'storeCustomer']
    )->name('register.customer');

    Route::post(
        '/forgot-password/{type}',
        [ResetCodePasswordController::class, 'forgotpassword']
    )->name('password.email');

    Route::post(
        '/reset-password/{type}',
        [ResetCodePasswordController::class, 'reset']
    )->name('password.reset');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get(
        '/verify-email/{id}/{hash}',
        VerifyEmailController::class
    )
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::get(
        '/email/verification',
        [EmailVerificationNotificationController::class, 'store']
    )
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::post(
        '/logout',
        [AuthenticatedSessionController::class, 'destroy']
    )->name('logout');
});

Route::controller(AuthController::class)
    ->middleware(['auth:sanctum', 'verified'])
    ->group(function () {
        Route::get(
            '/admin/{id}',
            'admin'
        )->name('admin.info');

        Route::get(
            '/publisher/{id}',
            'publisher'
        )->name('publisher.info');

        Route::get(
            '/customer/{id}',
            'customer'
        )->name('customer.info');
    });
