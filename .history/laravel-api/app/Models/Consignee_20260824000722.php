<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consignee extends Model
{
    protected $table = 'consignee';
    protected $primaryKey = 'consig_id';

    protected $fillable = [
        'consignee_name',
        'address',
        'phone',
        'email',
        'document_number',
        'type', // Cliente, Proveedor, etc.
    ];

    // Relación: Un consignatario puede estar asociado a transacciones, ventas o movimientos
    // public function movements()
    // {
    //     return $this->hasMany(Movement::class, 'consig_id', 'consig_id');
    // }
}