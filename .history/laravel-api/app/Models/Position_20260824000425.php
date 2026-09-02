<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $table = 'position';
    protected $primaryKey = 'position_id';

    protected $fillable = [
        'pos_name',
        'descripcion',
        'coordenadas',
        'salud',
        'id_apiario',
    ];

    public function apiario()
    {
        return $this->belongsTo(Apiario::class, 'id_apiario', 'id_apiario');
    }

    public function healthHistory()
    {
        return $this->hasMany(PosicSaludHist::class, 'position_id', 'position_id');
    }

    public function descriptionHistory()
    {
        return $this->hasMany(PosicDescripHist::class, 'position_id', 'position_id');
    }

    public function posHistory()
    {
        return $this->hasMany(PosHistory::class, 'position_id', 'position_id');
    }
}