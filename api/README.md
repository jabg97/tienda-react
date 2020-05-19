<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## instrucciones de instalación

Instalar dependencias de laravel
```
composer update
```
Iniciar Base de datos y seed
```
php artisan migrate:fresh --seed
```
```
php artisan serve --port=8080
```
## Aviso
Debe asegurarse que la api se ejecute en la direccion 

```
127.0.0.1:8000
```
sino debe cambiar la variable de direccion base en la aplicación de react,ubicada al comienzo del archivo api.js

