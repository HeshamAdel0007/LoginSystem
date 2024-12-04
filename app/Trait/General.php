<?php

namespace App\Trait;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

trait General
{
    use HasApiTokens, HasFactory, Notifiable;
    public function getActive()
    {
        return  $this->status  == 0 ?   'Un-Activated'   : 'Activated';
    } // End Of getActive

}// End Of Trait
