<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Directive extends Model
{
    protected $table = 'directive';
    protected $primaryKey = 'directive_id';

    protected $fillable = [
        'id_functionality',
        'id_users_group',
        'directive_rule',
    ];

    public function functionality()
    {
        return $this->belongsTo(Functionality::class, 'id_functionality', 'id_functionality');
    }

    public function usersGroup()
    {
        return $this->belongsTo(UsersGroup::class, 'id_users_group', 'id_users_group');
    }
}
