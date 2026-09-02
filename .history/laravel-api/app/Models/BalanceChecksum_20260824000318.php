<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BalanceChecksum extends Model
{
    protected $table = 'balance_checksum';
    protected $primaryKey = 'checksum_id';

    protected $fillable = [
        'checksum_date',
        'checksum',
        'budget',
        'cbte_cont_nro',
        'balance',
    ];
}
