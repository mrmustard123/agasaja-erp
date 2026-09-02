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
        Schema::create('product', function (Blueprint $table) {
            $table->integer('product_id', true);
            $table->char('product_name');
            $table->char('presentation', 50)->comment('frasco, gotero, spry, pote,chup-chup');
            $table->char('unit', 10);
            $table->decimal('stock', 10)->default(0);
            $table->string('comments', 400)->nullable();
            $table->string('preparation', 500)->nullable();
            $table->decimal('utility', 5)->nullable();
            $table->decimal('employee_cost', 5)->nullable();
            $table->decimal('production_cost', 10, 5)->nullable()->default(0);
            $table->unsignedBigInteger('account_id')->nullable()->index('fk_account_id1');
            $table->char('status', 8)->nullable()->default('ACTIVO');
            $table->integer('stock_min')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
