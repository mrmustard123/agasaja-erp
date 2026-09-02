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
        Schema::create('entry', function (Blueprint $table) {
            $table->bigIncrements('entry_id');
            $table->dateTime('entry_date');
            $table->string('details', 500)->nullable();
            $table->decimal('balance', 13, 5)->default(0);
            $table->unsignedBigInteger('account_id')->index('fk_account_id');
            $table->unsignedInteger('user_id')->nullable()->index('fk_user_id02');
            $table->string('cbte_cont_tipo', 30)->nullable();
            $table->string('cbte_cont_nro', 30)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entry');
    }
};
