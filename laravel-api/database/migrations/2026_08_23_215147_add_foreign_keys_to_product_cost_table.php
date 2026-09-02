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
        Schema::table('product_cost', function (Blueprint $table) {
            $table->foreign(['account_id'], 'fk_account_id3')->references(['account_id'])->on('account')->onUpdate('cascade')->onDelete('no action');
            $table->foreign(['saving_id'], 'fk_account_id7')->references(['account_id'])->on('account')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_cost', function (Blueprint $table) {
            $table->dropForeign('fk_account_id3');
            $table->dropForeign('fk_account_id7');
        });
    }
};
