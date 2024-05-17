<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function store(Request $request){
        // dd($request->image);
        $validator =
            Validator::make($request->all(),[
                'category_id'=>'required|max:191',
                'product_name'=> 'required|max:191',
                'product_slug'=>'required|max:191',
                'product_brand'=>'required|max:191',
                'meta_title'=>'required|max:191',
                'selling_price'=>'required|max:191',
                'original_price'=>'required|max:191',
                'product_qty'=> 'required|max:191',
                'image'=>'required',

            ]);

        if($validator->fails()){
            return response()->json([
                'statusCode' =>422,
                'validation_error'=>$validator->messages()
            ]);
        }

        $products = new Product();
        $products->category_id = $request->category_id;
        $products->product_name = $request->product_name;
        $products->product_slug = $request->product_slug;
        $products->description = $request->description;
        $products->meta_title = $request->meta_title;
        $products->meta_keywords = $request->meta_keywords;
        $products->meta_description = $request->meta_description;
        $products->selling_price = $request->selling_price;
        $products->product_qty = $request->product_qty;
        $products->product_brand = $request->product_brand;



        if($request->hasFile('image')){
            $file = $request->image;
            $extension = $file->getClientOriginalExtension();
            $filename = time() .'.'.$extension;
            $file->move('uploads/product', $filename);
            $products->image = $filename;
        }
        $products->popular = $request->popular  == true ? '1' : '0';;
        $products->featured = $request->featured  == true ? '1' : '0';;
        $products->status = $request->status  == true ? '1' : '0';;
        $products->save();

        return response()->json([
            'statusCode' =>200 ,
            'message'=> 'Product Added Successfully'
        ]);
    }
}
