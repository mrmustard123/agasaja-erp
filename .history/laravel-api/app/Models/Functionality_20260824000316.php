<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Functionality extends Model
{
    protected $table = 'functionality';
    protected $primaryKey = 'id_functionality';

    protected $fillable = [
        'func_name',
        'icon_name',
        'func_link',
    ];

    public function directives()
    {
        return $this->hasMany(Directive::class, 'id_functionality', 'id_functionality');
    }
}
