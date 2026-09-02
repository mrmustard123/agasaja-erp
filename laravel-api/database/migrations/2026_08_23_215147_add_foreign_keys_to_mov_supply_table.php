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
        Schema::table('mov_supply', function (Blueprint $table) {
            $table->foreign(['supply_id'], 'fk_supply_id02')->references(['supply_id'])->on('supply')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['user_id'], 'fk_user_id03')->references(['user_id'])->on('user')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mov_supply', function (Blueprint $table) {
            $table->dropForeign('fk_supply_id02');
            $table->dropForeign('fk_user_id03');
        });
    }
};
