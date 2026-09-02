<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductProduct extends Model
{
    protected $table = 'product_product';
    protected $primaryKey = 'product_product_id';

    protected $fillable = [
        'product_id',
        'ingredient_id',
        'cant',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function ingredient()
    {
        return $this->belongsTo(Product::class, 'ingredient_id', 'product_id');
    }
}
