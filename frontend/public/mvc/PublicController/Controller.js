import DataService from "../../../admin/mvc/modell/DataService.js";
import UrlapModel from "../PublicModell/PublicUrlapModel.js";
import PublicDataService from "../PublicModell/PublicDataService.js";
import UrlapView from "../PublicView/PublicView.js";
import PublicMegjelenit from "../PublicView/PublicTablazat/PublicMegjelen.js";
import PublicMegjelenitegesz from "../PublicView/PublicTablazat/PublicMegjelenEgesz.js";
import PublicMegjelenitnev from "../PublicView/PublicTablazat/PublicMegjelenitesNev.js";

class Controller {
    constructor() {
        // Initialize randomInt as a property of the class
        this.$randomInt = Math.floor(Math.random() * 3) + 1;
        console.log(this.$randomInt);

        this.dataService = new DataService();
        this.publicDataService = new PublicDataService();
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);

       // this.dataService.getAxiosData("http://localhost:8000/api/champs", this.egyenmegjelenites.bind(this), this.hibakezeles);

        this.publicDataService.getPublicAxiosData("http://localhost:8000/api/champs", this.$randomInt, (response) => {
            console.log(response.nev);
            this.Hasonlit = response.nev
        }, this.hibakezeles);
        this.submitElem = $("#submit");
        this.textInputElem = $("#nev");

        this.submitElem.on("click", (event) => {
            event.preventDefault();
            let textValue = this.textInputElem.val();
        
            if (textValue === this.Hasonlit) {
                console.log("Nyertél");
                console.log(textValue)
                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (response) => {
                    this.megjelenitesnevvel(response, textValue, true);
                }, this.hibakezeles)
            } else {
                console.log("Nem jó a hős");
            }
        });
    }

    egyenmegjelenites(list) {
        console.log(list);
        const szuloElem = $(".tarolo");
        if (list && list.length > 0 && this.$randomInt < list.length + 1) {
            const selectedItem = list[this.$randomInt];
            const megjelenito = new PublicMegjelenit(list, szuloElem, this.$randomInt);
        } else {
            console.log("List is empty or $randomInt is out of bounds");
        }
    }

    /* megjelenites(list) {
        console.log(list);
        const szuloElem = $(".tarolo");
        const megjelenito = new PublicMegjelenitegesz(list, szuloElem);
    } */

    megjelenitesnevvel(list, nev, success = false) {
        console.log(list);
        const szuloElem = $(".tarolo");
    
        // Check if 'list' is an object and convert it to an array if it's not
        if (list && !Array.isArray(list) && typeof list === 'object') {
            list = [list]; // Convert the object to an array containing that object
        }
    
        if (list && Array.isArray(list) && list.length > 0) {
            const matchingItem = list.find(item => item.nev === nev);
    
            if (matchingItem) {
                const megjelenito = new PublicMegjelenitnev(matchingItem, szuloElem, nev);
            } else {
                console.log(`No element found with nev ${nev}`);
            }
        } else {
            console.log("The provided list is not an array or is empty");
        }
        
            if (success) {
                szuloElem.children("table").css('background-color', 'green');
            }
        }
    
    
    
    hibakezeles(uzenet) {
        console.log(uzenet);
    }
}

export default Controller;
