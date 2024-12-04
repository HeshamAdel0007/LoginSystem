<?php

namespace App\Models;

use App\Trait\General;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Customer extends Authenticatable implements MustVerifyEmail
{
    use General;
    protected $table = 'customers';
    protected $guard_name = 'customer';

    protected $fillable = [
        'name',
        'email',
        'status',
        'password',
        'phone',
    ]; // End of $fillable
    protected $hidden = [
        'password',
        'remember_token',
    ]; // End of $hidden

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => 'boolean',
        ];
    } // End of casts
} // End of model
