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
        Schema::create('pend_empresa', function (Blueprint $table) {
            $table->increments('pend_empresa_id');
            $table->date('fecha')->nullable();
            $table->string('cuerpo', 3500)->nullable();
            $table->char('responsable', 50)->nullable();
            $table->char('realizado', 1)->default('N')->comment('N=NO;S=SI');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pend_empresa');
    }
};
