<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->increments('user_id');
            $table->char('user_name', 10);
            $table->string('email')->unique(); // Necesario para identificar al usuario por correo
            $table->string('google_id')->nullable()->unique(); // Para el login con Google OAuth
            $table->string('avatar')->nullable(); // Opcional: para la foto de perfil de Google
            $table->string('user_password')->nullable(); // Puede ser nullable si solo entran por Google
            $table->unsignedInteger('id_users_group')->nullable()->index('fk_users_group');
            $table->rememberToken(); // Token de sesión de Laravel
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};