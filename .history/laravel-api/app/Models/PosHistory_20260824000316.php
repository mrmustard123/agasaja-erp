<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PosHistory extends Model
{
    protected $table = 'pos_history';
    protected $primaryKey = 'pos_hist_id';

    protected $fillable = [
        'pos_hist_date',
        'pos_hist_body',
        'position_id',
    ];

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }
}
