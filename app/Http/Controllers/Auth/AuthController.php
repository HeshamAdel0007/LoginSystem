<?php

namespace App\Http\Controllers\Auth;

use App\Models\Admin;
use App\Models\Customer;
use App\Models\Publisher;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\PublisherResource;
use Illuminate\Routing\Controllers\Middleware;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Routing\Controllers\HasMiddleware;

class AuthController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('role:admin', only: ['admin']),
            new Middleware('role:publisher', only: ['publisher']),
            new Middleware('role:customer', only: ['customer']),
        ];
    } // end of middleware

    /**
     * Return user info to front-end when user login
     **/
    public function admin($id): JsonResponse
    {
        return $this->getUserInfo(
            $id,
            Admin::class,
            AdminResource::class
        );
    }
    public function publisher($id): JsonResponse
    {
        return $this->getUserInfo(
            $id,
            Publisher::class,
            PublisherResource::class
        );
    }
    public function customer($id): JsonResponse
    {
        return $this->getUserInfo(
            $id,
            Customer::class,
            CustomerResource::class
        );
    }

    private function getUserInfo($id, $modelClass, $resourceClass): JsonResponse
    {
        try {

            $findUser = $modelClass::findOrFail($id);
            $resource = new $resourceClass($findUser);

            return response()->json([
                'data' => $resource
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'An internal server error occurred while fetching the ' . strtolower(class_basename($modelClass)) . ' info.',
                'error' => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}// End of Controller
