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
        Schema::table('pos_history', function (Blueprint $table) {
            $table->foreign(['position_id'], 'fk_position_id1')->references(['position_id'])->on('position')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pos_history', function (Blueprint $table) {
            $table->dropForeign('fk_position_id1');
        });
    }
};
