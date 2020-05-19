<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre', 50);
            $table->string('referencia', 50);
            $table->unsignedInteger('precio');
            $table->unsignedInteger('peso');
            $table->unsignedInteger('stock');
            $table->enum('categoria', ['Tecnologia', 'Alimentos']);
            $table->dateTime('fecha_ultima_venta')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
