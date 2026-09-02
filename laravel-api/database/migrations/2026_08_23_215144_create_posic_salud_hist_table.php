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
        Schema::create('posic_salud_hist', function (Blueprint $table) {
            $table->integer('posic_salud_hist_id', true);
            $table->char('salud', 20)->default('BUENA');
            $table->dateTime('posic_salud_hist_date')->nullable();
            $table->unsignedInteger('position_id')->nullable()->index('fk_position_id6');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posic_salud_hist');
    }
};
