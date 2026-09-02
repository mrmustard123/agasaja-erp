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
        Schema::table('movement', function (Blueprint $table) {
            $table->foreign(['product_id'], 'fk_product02')->references(['product_id'])->on('product')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['user_id'], 'fk_user_id04')->references(['user_id'])->on('user')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movement', function (Blueprint $table) {
            $table->dropForeign('fk_product02');
            $table->dropForeign('fk_user_id04');
        });
    }
};
