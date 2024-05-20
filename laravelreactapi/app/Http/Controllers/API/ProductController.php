<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function store(Request $request){

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
        $products->popular = $request->popular  == true;
        $products->featured = $request->featured  == true;
        $products->status = $request->status  == true;
        $products->save();

        return response()->json([
            'statusCode' =>200 ,
            'message'=> 'Product Added Successfully'
        ]);
    }

    public function view()
    {
        $product_list = Product::with('category')->get();

        if ($product_list->isNotEmpty()) {
            return response()->json([
                'statusCode' => 200,
                'product_list' => $product_list
            ]);
        } else {
            return response()->json([
                'statusCode' => 404,
                'message' => 'No products found'
            ]);
        }
    }

     public function delete($id){

        $product_list = Product :: find($id);

        if($product_list){

            $product_list->delete();

            return response()->json([
                'statusCode' =>200 ,
                'message'=> 'Product Deleted SuccessFully'
            ]);
        }else{
            return response()->json([
                'statusCode' =>404 ,
                'message'=> 'Record Not Found'
            ]);
        }
     }

     public function edit($id){
        $product_list_by_id = Product ::find($id);

        if($product_list_by_id){
            return response()->json([
                'statusCode'=>200,
                'product_list_by_id'=>$product_list_by_id
             ]);
        }else{
            return response()->json([
                'statusCode'=>404,
                'message'=>'No Record Found'
             ]);
        }

    }

     public function update(Request $request, $id){

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

        $products = Product :: find($id);

        if($products){
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
            $products->popular = $request->popular;
            $products->featured = $request->featured;
            $products->status = $request->status;
            $products->save();
            return response()->json([
                'statusCode' =>200 ,
                'message'=> 'Product Updated Successfully'
            ]);
        }

        return response()->json([
            'statusCode' =>404 ,
            'message'=> 'Record Not Found'
        ]);

    }

}
