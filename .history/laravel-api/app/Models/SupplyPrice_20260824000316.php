<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplyPrice extends Model
{
    protected $table = 'supply_price';
    protected $primaryKey = 'supply_price_id';

    protected $fillable = [
        'value',
        'start_date',
        'comments',
        'supply_id',
    ];

    public function supply()
    {
        return $this->belongsTo(Supply::class, 'supply_id', 'supply_id');
    }
}
