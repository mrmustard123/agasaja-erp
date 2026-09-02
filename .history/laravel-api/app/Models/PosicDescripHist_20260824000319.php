<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PosicDescripHist extends Model
{
    protected $table = 'posic_descrip_hist';
    protected $primaryKey = 'posic_descrip_hist_id';

    protected $fillable = [
        'descripcion',
        'posic_descrip_hsit_date',
        'position_id',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }
}
