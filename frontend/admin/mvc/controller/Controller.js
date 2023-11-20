import DataService from "../modell/DataService.js";
import UrlapView from "../view/View.js"
import UrlapModel from "../modell/UrlapModel.js";
import Megjelenit from "../view/TablazatView/TablazatMegjelenit.js";
class Controller{
    constructor(){
        //this.urlapModel = new UrlapModel();
        //this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);
        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/champs", this.megjelenites, this.hibakezeles);
        this.submitElem = $("#submit")
        this.submitElem.on("click", (event) => {
            event.preventDefault()
            let urlapelemLista = this.urlapView.getUrlapElemList();
            let urlapadat = this.urlapView.getUrlapadatok();
            let isFormValid = true; 
            urlapelemLista.forEach((elem) => {
                isFormValid = isFormValid && elem.getvalid();
            });
            if (isFormValid) {
                console.log("valid az űrlap!")
                urlapelemLista.forEach((elem) => {
                    let ertek = elem.ertek
                    let kulcs = elem.key
                    urlapadat[kulcs] = ertek
                })
            } else {
                console.log("Nem valid az űrlap!")
            }
            this.dataService.postAxiosData("http://localhost:8000/api/champs", {
                "nev": urlapadat.nev,
                "szul": urlapadat.szul
            });
            console.log(urlapadat)
            
        })
        $(window).on("torles", (event) => {
            console.log(event.detail);
            console.log("szia")
            console.log(event.detail.id)
            this.dataService.deleteAxiosData("http://localhost:8000/api/champs", event.detail.id)
        
        });

    }
    megjelenites(list){
        console.log(list)
        const szuloElem = $(".tarolo");
        const megjelenito = new Megjelenit(list, szuloElem);
        
    }
    hibakezeles(uzenet){
        console.log(uzenet)
    }
}
export default Controller