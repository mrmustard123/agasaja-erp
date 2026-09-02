<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $table = 'user';
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_name',
        'email',
        'google_id',
        'avatar',
        'user_password',
        'id_users_group',
    ];

    protected $hidden = [
        'user_password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getAuthPassword()
    {
        return $this->user_password;
    }

    public function usersGroup()
    {
        return $this->belongsTo(UsersGroup::class, 'id_users_group', 'id_users_group');
    }

    public function entries()
    {
        return $this->hasMany(Entry::class, 'user_id', 'user_id');
    }

    public function movements()
    {
        return $this->hasMany(Movement::class, 'user_id', 'user_id');
    }

    public function movSupplies()
    {
        return $this->hasMany(MovSupply::class, 'user_id', 'user_id');
    }
}
