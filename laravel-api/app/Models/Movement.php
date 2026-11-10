<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    protected $table = 'movement';
    protected $primaryKey = 'mov_id';

    protected $fillable = [
        'mov_type',
        'mov_date',
        'mov_cant',
        'mov_lot',
        'product_id',
        'comments',
        'user_id',
        'reason',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}