<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;

class ProductoController extends Controller
{
    public function __construct()
    {
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $grados = Producto::All();
        return response()->json($grados);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        try {
            $rules = array(
                'nombre' => 'required',
                'referencia' => 'required',
                'precio' => 'numeric|required',
                'peso' => 'numeric|required',
                'stock' => 'numeric|required',
                'categoria' => 'required'
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario", 'messageJSON' => $validator]);
            } else {
                $producto = new Producto;
                $producto->nombre = $request->nombre;
                $producto->referencia = $request->referencia;
                $producto->precio = $request->precio;
                $producto->peso = $request->peso;
                $producto->stock = $request->stock;
                $producto->categoria = $request->categoria;
                $producto->save();
                return response()->json($producto);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        try {
            $rules = array(
                'nombre' => 'required',
                'referencia' => 'required',
                'precio' => 'numeric|required',
                'peso' => 'numeric|required',
                'stock' => 'numeric|required',
                'categoria' => 'required'
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario", 'messageJSON' => $validator]);
            } else {
                $producto = Producto::findOrFail($id);
                $producto->nombre = $request->nombre;
                $producto->referencia = $request->referencia;
                $producto->precio = $request->precio;
                $producto->peso = $request->peso;
                $producto->stock = $request->stock;
                $producto->categoria = $request->categoria;
                $producto->save();
                return response()->json(['status' => 200, 'message' => 'El producto "' . $producto->nombre . '" ha sido editado.']);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        try {
            $producto = Producto::findOrFail($id);
            $producto->delete();
            return response()->json(['status' => 200, 'message' => 'El producto "' . $producto->nombre . '" ha sido eliminado.']);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()]);
        }
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  int  $id
    * @return Response
    */
    public function vender($id, Request $request)
    {
        try {
            $rules = array(
                'cantidad' => 'numeric|required',
            );
            return response()->json($request);

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario", 'messageJSON' => $validator]);
            } else {
                $producto = Producto::findOrFail($id);
                $producto->stock = $producto->stock-$request->cantidad;
                $producto->save();
                return response()->json(['status' => 200, 'message' => 'El producto "' . $producto->nombre . '" ha sido editado.']);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()]);
        }
    }
}
