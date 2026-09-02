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
        Schema::table('posic_descrip_hist', function (Blueprint $table) {
            $table->foreign(['position_id'], 'fk_posicion_id5')->references(['position_id'])->on('position')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posic_descrip_hist', function (Blueprint $table) {
            $table->dropForeign('fk_posicion_id5');
        });
    }
};
