<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
       public function addToCart(Request $request)
        {

            if(auth('sanctum')->check()){

                $user_id=auth('sanctum')->user()->id;
                $product_id = $request->product_id;
                $product_qty = $request->product_qty;
                $product_check = Product::where('id', $product_id)->first();
                if($product_check){

                    if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                    {
                        return response()->json([
                            'statusCode' =>409 ,
                            'message'=>$product_check->product_name. 'Already Added To Cart'
                        ]);
                    }else{

                        $cart = new Cart;
                        $cart->user_id=$user_id;
                        $cart->product_id=$product_id;
                        $cart->product_qty=$product_qty;
                        $cart->save();

                        return response()->json([
                            'statusCode' =>201 ,
                            'message'=> 'Added to Cart'
                        ]);
                    }

                }

                return response()->json([
                    'statusCode' =>201 ,
                    'message'=> 'Login to add to cart'
                ]);
            }else{
                return response()->json([
                    'statusCode' =>401 ,
                    'message'=> 'Login to add to cart'
                ]);
            }
        }
}
