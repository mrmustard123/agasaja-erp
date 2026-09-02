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
        Schema::create('balance_checksum', function (Blueprint $table) {
            $table->bigIncrements('checksum_id');
            $table->dateTime('checksum_date');
            $table->decimal('checksum', 13)->default(0);
            $table->decimal('budget', 13)->nullable();
            $table->string('cbte_cont_nro', 30)->nullable();
            $table->decimal('balance', 13)->nullable()->default(0);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balance_checksum');
    }
};
