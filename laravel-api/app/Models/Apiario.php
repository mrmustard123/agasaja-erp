<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apiario extends Model
{
    protected $table = 'apiario';
    protected $primaryKey = 'id_apiario';

    protected $fillable = [
        'nombre',
        'coordenadas',
        'comentarios',
    ];

    // Relación: Un apiario tiene muchas posiciones (colmenas)
    public function positions()
    {
        return $this->hasMany(Position::class, 'id_apiario', 'id_apiario');
    }
}