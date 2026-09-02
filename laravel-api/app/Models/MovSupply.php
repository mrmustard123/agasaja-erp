<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovSupply extends Model
{
    protected $table = 'mov_supply';
    protected $primaryKey = 'mov_supply_id';

    protected $fillable = [
        'mov_supply_type',
        'mov_supply_date',
        'mov_supply_cant',
        'mov_supply_lot',
        'supply_id',
        'comments',
        'user_id',
    ];

    public function supply()
    {
        return $this->belongsTo(Supply::class, 'supply_id', 'supply_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
