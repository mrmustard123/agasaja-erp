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
        Schema::create('posic_descrip_hist', function (Blueprint $table) {
            $table->integer('posic_descrip_hist_id', true);
            $table->string('descripcion')->nullable();
            $table->dateTime('posic_descrip_hsit_date')->nullable();
            $table->unsignedInteger('position_id')->nullable()->index('fk_posicion_id5');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posic_descrip_hist');
    }
};
