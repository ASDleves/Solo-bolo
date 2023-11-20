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
        this.$randomInt = Math.floor(Math.random() * 4) + 1;
        console.log(this.$randomInt);

        this.dataService = new DataService();
        this.publicDataService = new PublicDataService();
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);

       // this.dataService.getAxiosData("http://localhost:8000/api/champs", this.egyenmegjelenites.bind(this), this.hibakezeles);

        this.publicDataService.getPublicAxiosData("http://localhost:8000/api/champs", this.$randomInt, (response) => {
            console.log(response.nev);
            this.Hasonlitnev = response.nev
            this.Hasonlitnem = response.nem
            this.Hasonlitpozicio = response.pozicio
            this.Hasonlitfaj = response.faj
            this.Hasonlitnyersanyag = response.nyersanyag
            this.Hasonlitfegyver = response.fegyver
            this.Hasonlitszarmazas = response.szarmazas
            this.Hasonlitmegjelenes = response.megjelenes
            console.log(this.Hasonlitnem)
        }, this.hibakezeles);
        this.submitElem = $("#submit");
        this.textInputElem = $("#nev");

        this.submitElem.on("click", (event) => {
            event.preventDefault();
            let textValue = this.textInputElem.val();
        
            if (textValue === this.Hasonlitnev) {
                console.log("Nyertél");
                console.log(textValue);
                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (response) => {
                    this.megjelenitesnevvel(response, textValue, true); // Pass true for success
                }, this.hibakezeles);
            } else {
                console.log("Nem jó a hős");
                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (visszater) => {
                    this.megjelenitesnevvel(visszater, textValue, false);
                    this.Hasonlitasnev = visszater.nev
                    this.Hasonlitasnem = visszater.nem
                    this.Hasonlitaspozicio = visszater.pozicio
                    this.Hasonlitasfaj = visszater.faj
                    this.Hasonlitasnyersanyag = visszater.nyersanyag
                    this.Hasonlitasfegyver = visszater.fegyver
                    this.Hasonlitasszarmazas = visszater.szarmazas
                    this.Hasonlitasmegjelenes = visszater.megjelenes
                    console.log(this.Hasonlitasnem)
                }, this.hibakezeles);
                console.log(this.Hasonlitnem+"asd")
                console.log(this.Hasonlitasnem+"asddd")
                if (this.Hasonlitnem == this.Hasonlitasnem){
                    
                }
            }
            this.textInputElem.val('');
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

        if (list && !Array.isArray(list) && typeof list === 'object') {
            list = [list];
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
            const tdElements = szuloElem.find("table td");
            tdElements.css('background-color', 'green');
        }
        }
    
    
    
    hibakezeles(uzenet) {
        console.log(uzenet);
    }
}

export default Controller;
