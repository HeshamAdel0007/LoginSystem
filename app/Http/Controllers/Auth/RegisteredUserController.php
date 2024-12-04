<?php

namespace App\Http\Controllers\Auth;

use App\Models\Customer;
use App\Models\Publisher;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRegisteredRequest;
use App\Http\Requests\PublisherRegisteredRequest;
use Symfony\Component\HttpFoundation\JsonResponse;

class RegisteredUserController extends Controller
{
    /**
     * create New Publisher
     */
    public function storePublisher(PublisherRegisteredRequest $request): JsonResponse
    {
        DB::beginTransaction(); // Start the transaction
        try {
            // Create new publisher
            $publisher = Publisher::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $publisher->assignRole('publisher'); // Add Role
            DB::commit(); // Commit the transaction

            return response()->json([
                "success" => true,
                "message" => 'Created Publisher Is Successfully',
            ], Response::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack(); // Rollback if validation fails
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'error' => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    } // end of storePublisher

    /**
     * create New Customer
     */
    public function storeCustomer(CustomerRegisteredRequest $request): JsonResponse
    {
        DB::beginTransaction(); // Start the transaction

        try {
            $customer = Customer::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $customer->assignRole('customer'); // Add Role
            DB::commit(); // Commit the transaction

            return response()->json([
                "success" => true,
                "message" => 'Created Customer Is Successfully',
            ], Response::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack(); // Rollback if validation fails
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'error' => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    } // end of storeCustomer



}//End Of controller
