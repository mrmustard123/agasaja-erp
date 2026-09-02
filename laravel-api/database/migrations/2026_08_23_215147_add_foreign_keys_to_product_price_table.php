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
        Schema::table('product_price', function (Blueprint $table) {
            $table->foreign(['product_id'], 'product_price_ibfk_1')->references(['product_id'])->on('product')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_price', function (Blueprint $table) {
            $table->dropForeign('product_price_ibfk_1');
        });
    }
};
