<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;

class CheckoutController extends Controller
{
       public function placeOrder(Request $request){

        if(auth('sanctum')->check()){

            $validator =Validator::make($request->all(),[

                'first_name'=>'required|max:30',
                'last_name'=>'required|max:30',
                'phone'=>'required|numeric',
                'email'=>'required|email|exists:users,email',
                'full_address'=>'required',
                'city'=>'required|max:30',
                'state'=>'required|max:30',
                'zipcode'=>'required|numeric',

           ],
           [
               'first_name.required' => 'First name is required.',
               'first_name.max' => 'First name may not be greater than 30 characters.',
               'last_name.required' => 'Last name is required.',
               'last_name.max' => 'Last name may not be greater than 30 characters.',
               'phone.required' => 'Phone number is required.',
               'phone.numeric' => 'Phone number must be a number.',
               'email.required' => 'Email address is required.',
               'email.email' => 'Email address must be a valid email address.',
               'email.exists' => 'Email address does not exist in our records.',
               'full_address.required' => 'Full address is required.',
               'city.required' => 'City is required.',
               'state.required' => 'State is required.',
               'zipcode.required' => 'Zipcode is required.',
           ]);

           if($validator->fails()){
               return response()->json([
                   'statusCode'=>422,
                   'validation_errors'=>$validator->messages()
               ]);
           }

           $user_id =auth('sanctum')->user()->id;

           $order = new Order;
           $order->user_id =$user_id;
           $order->first_name = $request->first_name;
           $order->last_name = $request->last_name;
           $order->phone = $request->phone;
           $order->email = $request->email;
           $order->full_address = $request->full_address;
           $order->city = $request->city;
           $order->state = $request->state;
           $order->zipcode = $request->zipcode;
           $order->remark = $request->remark;

           $order->payment_mode = "COD";
           $order->tracking_no = 'mohit'. rand(1111,9999);
           $order->save();

           $carts = Cart::where("user_id",$user_id)->get();
        //   print_r($carts);

           $orderitems=[];

           foreach($carts as $item){

               $orderitems[] =[
                'product_id'=>$item->product_id,
                'product_qty'=>$item->product_qty,
                'price'=>$item->product->selling_price
               ];


               $item->product->update([
                'product_qty'=>$item->product->product_qty - $item->product_qty,
               ]);
           }
        //    print_r($orderitems);

           $order->orderitems()->createMany($orderitems);

           Cart::destroy($carts);
           return response()->json([
            'statusCode'=>200,
            'message'=>'Order Palced Successfully !!'
        ]);


        }else{
            return response()->json([
                'statusCode'=>401,
                'message'=>'Login to Add to Card'
            ]);
        }

       }
}
