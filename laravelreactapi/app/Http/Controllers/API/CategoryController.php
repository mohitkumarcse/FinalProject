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

    public function allCategory(){
        $category_list = Category ::where('status', 0)->get();

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


    public function edit($id){
        $category_list_by_id = Category ::find($id);

        if($category_list_by_id){
            return response()->json([
                'statusCode'=>200,
                'category_list_by_id'=>$category_list_by_id
             ]);
        }else{
            return response()->json([
                'statusCode'=>404,
                'message'=>'No Record Found'
             ]);
        }

    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
           'meta_title'=> 'required|max:191',
           'slug'=> 'required|max:191',
           'name'=> 'required|max:191',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
                'statusCode'=>422
            ]);
        }


        $category = Category ::find($id);

        if($category){

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
                'message'=> 'Category Updated Successfully'
            ]);
        }else{
            return response()->json([
                'statusCode'=>404,
                'message'=>'No Record Found By Id'
             ]);
        }

    }

    public function delete($id){

        $category = Category ::find($id);

        if($category){

            $category->delete();

            return response()->json([
                'statusCode'=>200,
                'message'=>'Record Deleted Successfully'
             ]);
        }else{
            return response()->json([
                'statusCode'=>404,
                'message'=>'No Record Found By Id'
             ]);
        }




    }
}
