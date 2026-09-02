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
        Schema::table('consig_prod', function (Blueprint $table) {
            $table->foreign(['consig_id'], 'fk_consig_id1')->references(['consig_id'])->on('consignee')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consig_prod', function (Blueprint $table) {
            $table->dropForeign('fk_consig_id1');
        });
    }
};
