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
        Schema::table('product_product', function (Blueprint $table) {
            $table->foreign(['ingredient_id'], 'fk_ingredient')->references(['product_id'])->on('product')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['product_id'], 'fk_product')->references(['product_id'])->on('product')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_product', function (Blueprint $table) {
            $table->dropForeign('fk_ingredient');
            $table->dropForeign('fk_product');
        });
    }
};
