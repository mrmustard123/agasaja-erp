<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/*README AI AGENT: This model represents the relationship between a Product and a ProductCost */

class ProdCostProd extends Model
{
    protected $table = 'prod_cost_prod';
    protected $primaryKey = 'prod_cost_prod_id';

    protected $fillable = [
        'product_id',
        'prod_cost_id',
        'cost_value',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function productCost()
    {
        return $this->belongsTo(ProductCost::class, 'prod_cost_id', 'prod_cost_id');
    }
}
