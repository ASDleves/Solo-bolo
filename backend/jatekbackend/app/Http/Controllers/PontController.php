<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Pont;
use Illuminate\Http\Request;

class PontController extends Controller
{
    
    public function mutat($id) {
        $pontok = Pont::where('id', $id)->get();
        return response()->json($pontok);
    }
    public function getByUserIdAndSeason($id, $season) {
        $pont = Pont::where('id', $id)
                    ->where('Season', $season)
                    ->first(); // Select only the 'pont' column
        
        if (!$pont) {
            return response()->json(['message' => 'Pont not found'], 404);
        }
    
        return response()->json([$pont]);
    }
    public function updatePontByUserIdAndSeason(Request $request, $id, $season) {
        \Log::info("Updating pont for id: $id, season: $season");
    
        // The new 'pont' value from the request
        $newPont = $request->input('pont');
    
        // Use a manual query to ensure only the row with the matching 'id' and 'Season' is updated
        $updatedRows = DB::table('ponts')
                         ->where('id', $id)
                         ->where('Season', $season)
                         ->update(['pont' => $newPont]);
    
        if ($updatedRows) {
            return response()->json(['message' => 'Pont updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Record not found or not updated'], 404);
        }
    }
    public function updateOsszesTippByUserIdAndSeason(Request $request, $id, $season) {
        \Log::info("Updating tipp for id: $id, season: $season");
    
        // The new 'pont' value from the request
        $newTipp = $request->input('Osszes_Tipp');
        $updatedRows = DB::table('ponts')
                         ->where('id', $id)
                         ->where('Season', $season)
                         ->update(['Osszes_Tipp' => $newTipp]);
    
        if ($updatedRows) {
            return response()->json(['message' => 'Tipp updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Record not found or not updated'], 404);
        }
    }
    public function updateOneShotByUserIdAndSeason(Request $request, $id, $season) {
        \Log::info("Updating oneshot for id: $id, season: $season");
    
        // The new 'pont' value from the request
        $newOneShot = $request->input('OneShot');
        $updatedRows = DB::table('ponts')
                         ->where('id', $id)
                         ->where('Season', $season)
                         ->update(['OneShot' => $newOneShot]);
    
        if ($updatedRows) {
            return response()->json(['message' => 'OneShot updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Record not found or not updated'], 404);
        }
    }
}
