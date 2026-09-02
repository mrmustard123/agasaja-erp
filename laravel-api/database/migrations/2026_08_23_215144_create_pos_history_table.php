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
        Schema::create('pos_history', function (Blueprint $table) {
            $table->increments('pos_hist_id');
            $table->dateTime('pos_hist_date');
            $table->string('pos_hist_body', 3500)->nullable();
            $table->unsignedInteger('position_id')->nullable()->index('fk_position_id1');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();

            $table->unique(['pos_hist_date', 'position_id'], 'idx_pos_history1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pos_history');
    }
};
