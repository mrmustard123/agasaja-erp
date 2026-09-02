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
        Schema::table('prod_cost_prod', function (Blueprint $table) {
            $table->foreign(['prod_cost_id'], 'fk_prod_cost_id1')->references(['prod_cost_id'])->on('product_cost')->onUpdate('cascade')->onDelete('no action');
            $table->foreign(['product_id'], 'fk_product_id3')->references(['product_id'])->on('product')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prod_cost_prod', function (Blueprint $table) {
            $table->dropForeign('fk_prod_cost_id1');
            $table->dropForeign('fk_product_id3');
        });
    }
};
