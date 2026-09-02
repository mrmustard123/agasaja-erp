<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PosicSaludHist extends Model
{
    protected $table = 'posic_salud_hist';
    protected $primaryKey = 'posic_salud_hist_id';

    protected $fillable = [
        'salud',
        'posic_salud_hist_date',
        'position_id',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }
}
