import DataService from "../modell/DataService.js";
import UrlapView from "../view/View.js"
import UrlapModel from "../modell/UrlapModel.js";
import Megjelenit from "../view/TablazatView/TablazatMegjelenit.js";
class Controller{
    constructor(){
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($("#heroesModal .modal-body"), this.urlapModel.leiro);
        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/champs", this.megjelenites, this.hibakezeles);
        this.submitElem = $("#submit")
        this.submitElem.on("click", (event) => {
            event.preventDefault();
            let urlapelemLista = this.urlapView.getUrlapElemList();
            let urlapadat = this.urlapView.getUrlapadatok();
            let isFormValid = true;
    
            for (let elem of urlapelemLista) {
                let ertek = elem.ertek;
                let kulcs = elem.key;
    
                if (!elem.isValid()) {
                    isFormValid = false;
                    console.log("Form element invalid:", kulcs);
                }
                urlapadat[kulcs] = ertek;
            }
    
            if (isFormValid) {
                console.log("Form is valid. Data:", urlapadat);
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
        $('#heroesModal').on('hidden.bs.modal', function() {
            $('.hosok').trigger('reset');
            
            $('.valid.lathatosag').hide();
            $('.invalid.lathatosag').hide();
        });
        $('#heroesModal').modal({
            backdrop: 'static', 
            keyboard: false    
        });
        $(window).on("torles", (event) => {
            this.dataService.deleteAxiosData("http://localhost:8000/api/champs", event.detail.id)
        
        });
        $(window).on("mentesClicked", (event, sorAdatok) => {
            console.log(sorAdatok)
            this.dataService.putAxiosData("http://localhost:8000/api/champs",sorAdatok);
        });

        
    }
    
    megjelenites(list){
        const szuloElem = $(".tarolo");
        const megjelenito = new Megjelenit(list, szuloElem);
        
    }
    megjelenitesProfil(list){
        const szuloElem = $(".felhasznalo");
        const megjelenito = new Megjelenit(list, szuloElem);
        
    }
    hibakezeles(uzenet){
        console.log(uzenet)
    }
}
export default Controller