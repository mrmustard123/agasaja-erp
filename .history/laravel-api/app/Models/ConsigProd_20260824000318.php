<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsigProd extends Model
{
    protected $table = 'consig_prod';
    protected $primaryKey = 'consig_prod_id';

    protected $fillable = [
        'consig_id',
        'product_id',
        'consig_date',
        'mov_type',
        'cant',
        'balance',
        'owes',
        'topay',
        'unit_price',
        'total_price',
        'cbte_cont_tipo',
        'cbte_cont_nro',
        'comments',
    ];

    public function consignee()
    {
        return $this->belongsTo(Consignee::class, 'consig_id', 'consig_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}
