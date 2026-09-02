<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSupply extends Model
{
    protected $table = 'product_supply';
    protected $primaryKey = 'product_suppy_id';

    protected $fillable = [
        'product_id',
        'supply_id',
        'cant',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function supply()
    {
        return $this->belongsTo(Supply::class, 'supply_id', 'supply_id');
    }
}
