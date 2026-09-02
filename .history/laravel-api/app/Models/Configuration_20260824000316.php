<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    protected $table = 'configuration';
    protected $primaryKey = 'config_id';

    protected $fillable = [
        'config_name',
        'config_value',
    ];
}
