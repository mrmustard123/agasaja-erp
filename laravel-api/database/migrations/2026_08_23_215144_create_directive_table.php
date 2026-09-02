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
        Schema::create('directive', function (Blueprint $table) {
            $table->increments('directive_id');
            $table->unsignedInteger('id_functionality')->index('fk_id_functionality');
            $table->unsignedInteger('id_users_group')->index('fk_id_users_group1');
            $table->char('directive_rule', 20)->default('PERMITIR')->comment('PERMITIR/DENEGAR');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('directive');
    }
};
