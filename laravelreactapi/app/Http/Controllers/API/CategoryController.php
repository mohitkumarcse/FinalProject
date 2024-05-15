<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
           'meta_title'=> 'required|max:191',
           'slug'=> 'required|max:191',
           'name'=> 'required|max:191',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
                'statusCode'=>400
            ]);
        }


        $category = new Category();
        $category->meta_title = $request->meta_title;
        $category->meta_keywords =$request->meta_keywords;
        $category->meta_description =$request->meta_description;
        $category->slug =$request->slug;
        $category->name =$request->name;
        $category->description =$request->description;
        $category->status =$request->status == true ? '1' : '0';
        $category->save();

        return response()->json([
            'statusCode' =>200 ,
            'message'=> 'Category Added Successfully'
        ]);
    }

    public function view(){
         $category_list = Category ::get();

         if($category_list){
            return response()->json([
                'statusCode'=>200,
                'category_list'=>$category_list
             ]);
         }
         return response()->json([
            'statusCode'=>404,
            'message'=>'No Data Found'
         ]);

    }
}
