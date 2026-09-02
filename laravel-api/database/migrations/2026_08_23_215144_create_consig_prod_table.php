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
        Schema::create('consig_prod', function (Blueprint $table) {
            $table->increments('consig_prod_id');
            $table->unsignedSmallInteger('consig_id')->index('fk_consig_id1');
            $table->integer('product_id');
            $table->dateTime('consig_date');
            $table->char('mov_type', 10)->default('ENTRADA');
            $table->smallInteger('cant')->default(0);
            $table->smallInteger('balance')->default(0);
            $table->smallInteger('owes')->default(0);
            $table->smallInteger('topay')->default(0);
            $table->decimal('unit_price', 13)->nullable()->default(0);
            $table->decimal('total_price', 13)->nullable()->default(0);
            $table->string('cbte_cont_tipo', 30)->nullable();
            $table->string('cbte_cont_nro', 30)->nullable();
            $table->string('comments', 500)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consig_prod');
    }
};
