<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCost extends Model
{
    protected $table = 'product_cost';
    protected $primaryKey = 'prod_cost_id';

    protected $fillable = [
        'cost_name',
        'comments',
        'cost_type',
        'saving_type',
        'saving_id',
        'account_id',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }

    public function savingAccount()
    {
        return $this->belongsTo(Account::class, 'saving_id', 'account_id');
    }

    public function products()
    {
        return $this->hasMany(ProdCostProd::class, 'prod_cost_id', 'prod_cost_id');
    }
}
