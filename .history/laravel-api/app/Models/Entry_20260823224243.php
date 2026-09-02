<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $table = 'entry';
    protected $primaryKey = 'entry_id';

    protected $fillable = [
        'entry_date',
        'description',
        'total_amount',
        'user_id', // Quién registró el asiento
    ];

    // Relación: Un asiento contable pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Relación: Un asiento tiene detalles de cuentas (líneas del asiento)
    // public function details()
    // {
    //     return $this->hasMany(EntryDetail::class, 'entry_id', 'entry_id');
    // }
}