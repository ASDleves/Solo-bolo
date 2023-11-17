import DataService from "../../../admin/mvc/modell/DataService.js";
import UrlapModel from "../PublicModell/PublicUrlapModel.js";
import PublicDataService from "../PublicModell/PublicDataService.js";
import UrlapView from "../PublicView/PublicView.js";
class Controller {
    constructor() {
        let randomInt = Math.floor(Math.random() * 3) + 1;
        console.log(randomInt);
        this.dataService = new DataService();
        this.publicDataService = new PublicDataService()
        this.urlapModel = new UrlapModel
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);
        this.dataService.getAxiosData("http://localhost:8000/api/champs", this.megjelenites, this.hibakezeles);
        this.publicDataService.getPublicAxiosData("http://localhost:8000/api/champs", randomInt, this.megjelenites, this.hibakezeles);
        this.publicDataService.getPublicAxiosData("http://localhost:8000/api/champs", randomInt, (response) => {
            console.log(response.nev);
            this.Hasonlit = response.nev 
        }, this.hibakezeles);
        this.submitElem = $("#submit");
        this.textInputElem = $("#nev"); 

        this.submitElem.on("click", (event) => {
            event.preventDefault();
            let textValue = this.textInputElem.val();
            if (textValue == this.Hasonlit){
                console.log("Nyertél")
            }else{
                console.log("Nem jó a hős")
            }
        });
    }

    megjelenites(list) {
        console.log(list)


    }
    hibakezeles(uzenet) {
        console.log(uzenet)
    }
}
export default Controller