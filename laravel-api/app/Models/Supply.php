<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supply extends Model
{
    protected $table = 'supply';
    protected $primaryKey = 'supply_id';

    protected $fillable = [
        'supply_name',
        'unit',
        'stock',
        'price',
        'comments',
        'account_id',
        'stock_min',
        'cost_account_id',
        'prod_cost_id',
    ];

    // Relación: Pertenece a una cuenta contable
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}