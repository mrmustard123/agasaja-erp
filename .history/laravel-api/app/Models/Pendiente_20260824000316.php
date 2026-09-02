<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendiente extends Model
{
    protected $table = 'pendiente';
    protected $primaryKey = 'pendientes_id';

    protected $fillable = [
        'fecha',
        'cuerpo',
        'realizado',
    ];
}
