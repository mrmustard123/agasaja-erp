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
        Schema::create('position', function (Blueprint $table) {
            $table->increments('position_id');
            $table->char('pos_name')->unique('idx_pos1');
            $table->string('descripcion', 500)->nullable();
            $table->char('coordenadas')->nullable();
            $table->char('salud', 20)->nullable()->default('BUENA');
            $table->unsignedInteger('id_apiario')->nullable()->index('fk_id_apiario1');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('position');
    }
};
