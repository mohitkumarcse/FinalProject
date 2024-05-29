<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class FrontendController extends Controller
{
    public function getCategory(){
        $category = Category::where('status', 0)->get();

        if($category){
            return response()->json([
                'statusCode' =>200,
                'catelory_list'=>$category
            ]);
        }
        if ($category->Empty()) {
            return response()->json([
                'statusCode' => 200,
                'message' => "No Data Found"
            ]);
        }


    }

    public function product($slug){
       $category = Category::where('slug' , $slug)->first();

       if($category){
            $product_data = Product::where('category_id',$category->id)->where('status',0)->get();

            if($product_data){

                    return response()->json([
                        'statusCode' => 200,
                        'product_data' => $product_data,
                        'category_data'=>$category
                    ]);
            }else{

                    return response()->json([
                        'statusCode' => 200,
                        'product_data' =>'No Product Found'
                    ]);
            }
       }
       else{
            return response()->json([
                'statusCode' => 200,
                'product_data' =>'No Category Id Found'
            ]);
       }

    }

    public function productDetails($category_slug,$product_slug){
        $category = Category::where('slug' , $category_slug)->first();
        if($category){
            $product_data = Product::where('category_id',$category->id)->where('product_slug',$product_slug)->where('status',0)->first();

            if($product_data){

                    return response()->json([
                        'statusCode' => 200,
                        'product_data' => $product_data,

                    ]);
            }else{

                    return response()->json([
                        'statusCode' => 200,
                        'product_data' =>'No Product Avilable'
                    ]);
            }
       }
       else{
            return response()->json([
                'statusCode' => 200,
                'product_data' =>'No Such Category Found'
            ]);
       }
    }
}
