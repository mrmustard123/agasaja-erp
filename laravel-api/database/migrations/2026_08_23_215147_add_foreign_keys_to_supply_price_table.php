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
        Schema::table('supply_price', function (Blueprint $table) {
            $table->foreign(['supply_id'], 'supply_price_ibfk_1')->references(['supply_id'])->on('supply')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supply_price', function (Blueprint $table) {
            $table->dropForeign('supply_price_ibfk_1');
        });
    }
};
