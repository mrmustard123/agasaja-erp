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
        Schema::create('consignee', function (Blueprint $table) {
            $table->smallIncrements('consig_id');
            $table->char('consig_name');
            $table->char('consig_tel', 15)->nullable();
            $table->char('consig_addr')->nullable();
            $table->char('consig_coord', 30)->nullable();
            $table->string('consig_details', 500)->nullable();
            $table->char('consig_activo', 8)->nullable()->default('ACTIVO');
            $table->unsignedBigInteger('account_id')->nullable()->index('fk_consignee_account1');
            $table->unsignedBigInteger('ctas_por_cobrar_id')->nullable()->index('fk_consignee_account2');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consignee');
    }
};
