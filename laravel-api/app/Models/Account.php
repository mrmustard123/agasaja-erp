<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'account';
    protected $primaryKey = 'account_id';
    
    protected $fillable = [
        'account_code',
        'name',
        'account_type',
        'description',
    ];

    // Relación: Una cuenta puede tener muchos movimientos en el libro diario (entry)
    public function entries()
    {
        return $this->hasMany(Entry::class, 'account_id', 'account_id');
    }
}