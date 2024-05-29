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
                    'statusCode' =>404 ,
                    'message'=> 'Login to add to cart'
                ]);
            }
        }



    public function viewCart(){

        $user_id = auth('sanctum')->user()->id;
        $cartItems =Cart ::where('user_id',$user_id)->get();

        if($cartItems){
            return response()->json([
                'statusCode' =>200,
                'card_items'=>$cartItems
            ]);

        }else{
            return response()->json([
                'statusCode' =>401,
                'message'=>'Login to view cart data'
            ]);
        }
    }

    public function cartRemove($cart_id_remove){

        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cart_items = Cart::where('id',$cart_id_remove)->where('user_id',$user_id)->first();

            if($cart_items){
                $cart_items->delete();
                return response()->json([
                    'statusCode' =>200,
                    'message'=>'Cart Removed Successfully'
                ]);

            }else{
                return response()->json([
                    'statusCode' =>404,
                    'message'=>'Cart Item Not Found'
                ]);

            }

        }else{
            return response()->json([
                'statusCode' =>401,
                'message'=>'Login to view cart data'
            ]);
        }


    }

    public function cartUpdateQuantity($cart_id, $scope){

        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cart_items = Cart::where('id',$cart_id)->where('user_id',$user_id)->first();

            if($scope === 'inc'){

                $cart_items->product_qty +=1;

            }else if($scope === 'dec'){

                $cart_items->product_qty -=1;
            }

            $cart_items->update();
            return response()->json([
                'statusCode' =>200,
                'message'=>'Quantity Updated'
            ]);

        }else{
            return response()->json([
                'statusCode' =>401,
                'message'=>'Login to view cart data'
            ]);
        }


    }



}
