<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_name',
        'presentation',
        'unit',
        'stock',
        'comments',
        'preparation',
        'utility',
        'employee_cost',
        'production_cost',
        'account_id',
        'status',
        'stock_min',
    ];

    // Relación: Pertenece a una cuenta contable
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}