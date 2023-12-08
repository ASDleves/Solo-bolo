<?php
use App\Http\Controllers\ChampController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PontController;
use App\Http\Controllers\BelepesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/champs', [ChampController::class, 'index']);
Route::get('/champs/nev/{nev}', [ChampController::class, 'showByName']);
Route::get('/champs/{id}', [ChampController::class, 'show']);
Route::post('/champs', [ChampController::class, 'store']);
Route::put('/champs/{id}', [ChampController::class, 'update']);
Route::delete('/champs/{id}', [ChampController::class, 'destroy']);


Route::get('/ponts/id}', [PontController::class, 'mutat']);

Route::get('/ponts/{id}/{season}', [PontController::class, 'getByUserIdAndSeason']);
Route::put('/ponts/update/{user_id}/{season}', [PontController::class, 'updatePontByUserIdAndSeason']);
Route::put('/ponts/update/osszes-tipp/{id}/{season}', [PontController::class, 'updateOsszesTippByUserIdAndSeason']);

Route::put('/ponts/update/one-shot/{id}/{season}', [PontController::class, 'updateOneShotByUserIdAndSeason']);

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::post('/login', [BelepesController::class, 'login']);
Route::get('/user-id/{name}', [UserController::class, 'getUserIdByName']);