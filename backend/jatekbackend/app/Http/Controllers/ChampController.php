<?php

namespace App\Http\Controllers;
use App\Models\Champ;
use Illuminate\Http\Request;

class ChampController extends Controller
{
    //
    public function index(){
        $champs = Champ::all();
        return response()->json($champs);

    }
    public function show($id) {
        $champ = Champ::find($id);
        return response()->json($champ);
    }
    public function showByName($nev) {
        // Find the champ by 'nev'
        $champ = Champ::where('nev', $nev)->first();
        return response()->json($champ);
    }
    
    

    public function store(Request $request){
        $record = new Champ();
        $record->nev = $request->nev;
        $record->nem = $request->nem;
        $record->pozicio = $request->pozicio;
        $record->faj = $request->faj;
        $record->nyersanyag = $request->nyersanyag;
        $record->fegyver = $request->fegyver;
        $record->szarmazas = $request->szarmazas;
        $record->megjelenes = $request->megjelenes;
        $record->save();

        return Champ::find($record->id);
    }
    public function destroy($id){
        $champ = Champ::find($id)->delete();
        return response()->json(['message'=> 'sikeres törlés!',201]);
    
    }
    public function update(Request $request, $id){
        $champ = Champ::find($id);
        $champ->nev = $request->nev;
        $champ->nem = $request->nem;
        $champ->pozicio = $request->pozicio;
        $champ->faj = $request->faj;
        $champ->nyersanyag = $request->nyersanyag;
        $champ->fegyver = $request->fegyver;
        $champ->szarmazas = $request->szarmazas;
        $champ->megjelenes = $request->megjelenes;
        $champ->save();
        return redirect('/champs');
    }
}
