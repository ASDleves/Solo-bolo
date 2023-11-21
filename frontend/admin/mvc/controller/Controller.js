import DataService from "../modell/DataService.js";
import UrlapView from "../view/View.js"
import UrlapModel from "../modell/UrlapModel.js";
import Megjelenit from "../view/TablazatView/TablazatMegjelenit.js";
class Controller{
    constructor(){
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);
        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/champs", this.megjelenites, this.hibakezeles);
        this.submitElem = $("#submit")
        this.submitElem.on("click", (event) => {
            event.preventDefault()
            let urlapelemLista = this.urlapView.getUrlapElemList();
            let urlapadat = this.urlapView.getUrlapadatok();
            let isFormValid = true; 
            console.log(urlapadat)
            if (isFormValid) {
                console.log("valid az űrlap!")
                urlapelemLista.forEach((elem) => {
                    let ertek = elem.ertek
                    let kulcs = elem.key
                    urlapadat[kulcs] = ertek
                })
                console.log(urlapadat.nev)
            this.dataService.postAxiosData("http://localhost:8000/api/champs", {
                "nev": urlapadat.nev,
                "nem": urlapadat.nem,
                "pozicio": urlapadat.pozicio,
                "faj": urlapadat.faj,
                "nyersanyag": urlapadat.nyersanyag,
                "fegyver": urlapadat.fegyver,
                "szarmazas": urlapadat.szarmazas,
                "megjelenes": urlapadat.megjelenes,

            });
            } else {
                console.log("Nem valid az űrlap!")
                
            }
            
            
        })
        $(window).on("torles", (event) => {
            this.dataService.deleteAxiosData("http://localhost:8000/api/champs", event.detail.id)
        
        });
        $(window).on("mentesClicked", (event, sorAdatok) => {
            this.dataService.putAxiosData("http://localhost:8000/api/champs",sorAdatok);
        });


    }
    megjelenites(list){
        const szuloElem = $(".tarolo");
        const megjelenito = new Megjelenit(list, szuloElem);
        
    }
    hibakezeles(uzenet){
        console.log(uzenet)
    }
}
export default Controller