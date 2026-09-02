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
        Schema::table('product_supply', function (Blueprint $table) {
            $table->foreign(['product_id'], 'fk_product01')->references(['product_id'])->on('product')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['supply_id'], 'fk_supply01')->references(['supply_id'])->on('supply')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_supply', function (Blueprint $table) {
            $table->dropForeign('fk_product01');
            $table->dropForeign('fk_supply01');
        });
    }
};
