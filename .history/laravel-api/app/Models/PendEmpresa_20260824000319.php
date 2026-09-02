<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PendEmpresa extends Model
{
    protected $table = 'pend_empresa';
    protected $primaryKey = 'pend_empresa_id';

    protected $fillable = [
        'fecha',
        'cuerpo',
        'responsable',
        'realizado',
    ];
}
