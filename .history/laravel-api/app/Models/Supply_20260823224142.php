<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supply extends Model
{
    protected $table = 'supply';
    protected $primaryKey = 'supply_id';

    protected $fillable = [
        'supply_name',
        'stock',
        'unit',
        'unit_cost',
        'account_id',
    ];

    // Relación: Pertenece a una cuenta contable
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}