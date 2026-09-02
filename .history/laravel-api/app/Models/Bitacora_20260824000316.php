<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    protected $table = 'bitacora';
    protected $primaryKey = 'bitacora_id';

    protected $fillable = [
        'fecha',
        'cuerpo',
    ];
}
