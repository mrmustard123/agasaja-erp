<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersGroup extends Model
{
    protected $table = 'users_group';
    protected $primaryKey = 'id_users_group';

    protected $fillable = [
        'group_name',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'id_users_group', 'id_users_group');
    }

    public function directives()
    {
        return $this->hasMany(Directive::class, 'id_users_group', 'id_users_group');
    }
}
