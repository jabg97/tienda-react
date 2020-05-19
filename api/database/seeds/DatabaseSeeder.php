<?php

use Illuminate\Database\Seeder;
use App\Producto;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $producto = new Producto;
        $producto->nombre = "Jamon";
        $producto->referencia = "J12345";
        $producto->precio = 6000;
        $producto->peso = 40;
        $producto->stock = 10;
        $producto->categoria = "Alimentos";
        $producto->save();
        
        $producto = new Producto;
        $producto->nombre = "Televisor";
        $producto->referencia = "TV12345";
        $producto->precio = 800000;
        $producto->peso = 400;
        $producto->stock = 3;
        $producto->categoria = "Tecnologia";
        $producto->save();
    }
}
