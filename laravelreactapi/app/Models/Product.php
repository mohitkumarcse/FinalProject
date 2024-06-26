<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Models\Category;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $fillable =[
        'category_id',
        'product_name',
        'product_slug',
        'description',
        'meta_title',
        'meta_keywords',
        "meta_description",
        'selling_price',
        'original_price',
        'product_brand',
        'product_qty',
        'popular',
        'featured',
        'status',
    ];

    protected $with =['category'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

}
