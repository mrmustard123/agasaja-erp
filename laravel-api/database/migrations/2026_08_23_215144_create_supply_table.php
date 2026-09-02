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
        Schema::create('supply', function (Blueprint $table) {
            $table->integer('supply_id', true);
            $table->char('supply_name');
            $table->char('unit', 10);
            $table->bigInteger('stock')->default(0);
            $table->decimal('price', 10, 5)->nullable()->default(0);
            $table->string('comments', 400)->nullable();
            $table->unsignedBigInteger('account_id')->nullable()->index('fk_account_id03');
            $table->integer('stock_min')->nullable();
            $table->unsignedBigInteger('cost_account_id')->nullable()->index('fk_cost_account_id01');
            $table->integer('prod_cost_id')->nullable()->index('fk_prod_cost_id');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supply');
    }
};
