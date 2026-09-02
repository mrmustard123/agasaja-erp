<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    protected $table = 'movement';
    protected $primaryKey = 'movement_id';

    protected $fillable = [
        'movement_type', // Entrada, Salida, etc.
        'movement_date',
        'consig_id',     // Cliente o proveedor relacionado
        'user_id',       // Usuario que realizó el movimiento
        'observations',
    ];

    public function consignee()
    {
        return $this->belongsTo(Consignee::class, 'consig_id', 'consig_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}