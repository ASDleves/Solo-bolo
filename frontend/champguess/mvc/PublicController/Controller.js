import DataService from "../../../admin/Champs/mvc/modell/DataService.js";
import UrlapModel from "../PublicModell/PublicUrlapModel.js";
import PublicDataService from "../PublicModell/PublicDataService.js";
import UrlapView from "../PublicView/PublicView.js";
import PublicMegjelenit from "../PublicView/PublicTablazat/PublicMegjelen.js";
import PublicMegjelenitegesz from "../PublicView/PublicTablazat/PublicMegjelenEgesz.js";
import PublicMegjelenitnev from "../PublicView/PublicTablazat/PublicMegjelenitesNev.js";

import PublicSoreleje from "../PublicView/PublicTablazat/PublicSoreleje.js";

class Controller {
    constructor() {
        this.updateUIBasedOnStatus(localStorage.getItem('status'));
        console.log(localStorage)
        $('#logoutButton').on('click', function() {
            localStorage.clear();

            window.location.href = '../public/belepes/login.html';
        });
        const userName = localStorage.getItem('userName'); // Assuming you have stored the username in local storage
    if (userName) {
        $('p.username').text(userName);
    }
        this.dataService = new DataService();
        this.publicDataService = new PublicDataService();
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);

        // this.dataService.getAxiosData("http://localhost:8000/api/champs", this.egyenmegjelenites.bind(this), this.hibakezeles);

        this.Jatek();
    }
    updateUIBasedOnStatus(status) {
        if (status === "Játékos") {
            // Remove list items with 'admin' class links
            $("li a.admin").closest("li").remove();
        }
        // Add more conditions here if you have other roles and corresponding UI updates
    }
    Jatek(){
        let szamlalo = 0
        this.$randomInt = Math.floor(Math.random() * 165) + 1;
        console.log(this.$randomInt);
        this.publicDataService.getPublicAxiosData("http://localhost:8000/api/champs", this.$randomInt, (response) => {
            console.log(response);
            this.Hasonlitnev = response.nev
            this.Hasonlitnem = response.nem
            this.Hasonlitpozicio = response.pozicio
            this.Hasonlitfaj = response.faj
            this.Hasonlitnyersanyag = response.nyersanyag
            this.Hasonlitfegyver = response.fegyver
            this.Hasonlitszarmazas = response.szarmazas
            this.Hasonlitmegjelenes = response.megjelenes
        }, this.hibakezeles);
        this.submitElem = $("#submit");
        this.textInputElem = $("#nev");

        this.submitElem.on("click", (event) => {
            event.preventDefault();
            let textValue = this.capitalizeFirstLetter(this.textInputElem.val().trim());
            if (textValue === "") {
                return; 
            }
            if (textValue === this.Hasonlitnev) {
                console.log("Nyertél");

                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (response) => {
                    this.megjelenitsoreleje(response, textValue, true);
                }, this.hibakezeles);
                this.createRestartButton();
                szamlalo = 0
            } else{
                if (szamlalo = 0){
                    szamlalo += 1
                console.log("Nem jó a hős");
                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (response) => {
                    this.megjelenitesnevvel(response, textValue, false);
                    this.Mnev = response.nev
                    this.Mnem = response.nem
                    this.Mpozi = response.pozicio
                    this.Mfaj = response.faj
                    this.Mnyers = response.nyersanyag
                    this.Mfegyver = response.fegyver
                    this.Mszarmaz = response.szarmazas
                    this.Mmegjelen = response.megjelenes
                    const colorForNem = (this.Mnem === this.Hasonlitnem) ? "green" : "red";
                    this.changeTdBackground(this.Mnem, colorForNem);

                    // Use the new comparison function for positions
                    const colorForPozicio = this.compareAttributes(this.Mpozi, this.Hasonlitpozicio);
                    this.changeTdBackground(this.Mpozi, colorForPozicio);

                     const colorForFaj = this.compareAttributes(this.Mfaj, this.Hasonlitfaj);
                    this.changeTdBackground(this.Mfaj, colorForFaj);

                    const colorForNyersanyag = this.compareAttributes(this.Mnyers, this.Hasonlitnyersanyag);
                    this.changeTdBackground(this.Mnyers, colorForNyersanyag);

                    const colorForfegyver = this.compareAttributes(this.Mfegyver, this.Hasonlitfegyver);
                    this.changeTdBackground(this.Mfegyver, colorForfegyver);
 
                    const colorForszarmaz = this.compareAttributes(this.Mszarmaz, this.Hasonlitszarmazas);
                    this.changeTdBackground(this.Mszarmaz, colorForszarmaz);
                    const colorFormegjelen = (this.Mmegjelen === this.Hasonlitmegjelenes) ? "green" : "red";
                    this.changeTdBackground(this.Mmegjelen, colorFormegjelen);  
                }, this.hibakezeles);
            }else{
                szamlalo += 1
                console.log("Nem jó a hős");
                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (response) => {
                    this.megjelenitsoreleje(response, textValue, false);
                    this.Mnev = response.nev
                    this.Mnem = response.nem
                    this.Mpozi = response.pozicio
                    this.Mfaj = response.faj
                    this.Mnyers = response.nyersanyag
                    this.Mfegyver = response.fegyver
                    this.Mszarmaz = response.szarmazas
                    this.Mmegjelen = response.megjelenes
                    const colorForNem = (this.Mnem === this.Hasonlitnem) ? "green" : "red";
                    this.changeTdBackground(this.Mnem, colorForNem);

                    // Use the new comparison function for positions
                    const colorForPozicio = this.compareAttributes(this.Mpozi, this.Hasonlitpozicio);
                    this.changeTdBackground(this.Mpozi, colorForPozicio);

                     const colorForFaj = this.compareAttributes(this.Mfaj, this.Hasonlitfaj);
                    this.changeTdBackground(this.Mfaj, colorForFaj);

                    const colorForNyersanyag = this.compareAttributes(this.Mnyers, this.Hasonlitnyersanyag);
                    this.changeTdBackground(this.Mnyers, colorForNyersanyag);

                    const colorForfegyver = this.compareAttributes(this.Mfegyver, this.Hasonlitfegyver);
                    this.changeTdBackground(this.Mfegyver, colorForfegyver);
 
                    const colorForszarmaz = this.compareAttributes(this.Mszarmaz, this.Hasonlitszarmazas);
                    this.changeTdBackground(this.Mszarmaz, colorForszarmaz);
                    const colorFormegjelen = (this.Mmegjelen === this.Hasonlitmegjelenes) ? "green" : "red";
                    this.changeTdBackground(this.Mmegjelen, colorFormegjelen);  
                }, this.hibakezeles);
            }
            }
            this.textInputElem.val('');
        });
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    createRestartButton() {
        const restartButton = $("<button>Új játék</button>");
        restartButton.addClass("restart-game");
        $(".jatek").append(restartButton); 

   
        restartButton.on("click", () => {
            this.clearTable();
            this.Jatek();
            restartButton.remove();
        });
    }
    clearTable() {
        $(".tarolo").find("table").remove();
    }
    compareAttributes(targetAttribute, comparisonAttribute) {
        const targetParts = targetAttribute.split('/');
        const comparisonParts = comparisonAttribute.split('/');
        if (targetParts.every(part => comparisonParts.includes(part)) && comparisonParts.every(part => targetParts.includes(part))) {
            return "green";
        }

        // Check for partial match (some parts match)
        if (targetParts.some(part => comparisonParts.includes(part)) || comparisonParts.some(part => targetParts.includes(part))) {
            return "orange";
        }

        // No match
        return "red";
    }
    changeTdBackground(searchText, color) {
        const szuloElem = $(".tarolo");
    
        // Find the td element that contains the specified text
        const targetTd = szuloElem.find("table td").filter(function () {
            return $(this).text().includes(searchText);
        });
    
        // Change the background color if the element is found and hasn't been styled before
        targetTd.each(function() {
            if (!$(this).hasClass('styled')) {
                $(this).css('background-color', color);
                $(this).addClass('styled'); // Mark this td as styled
            }
        });
    }


    egyenmegjelenites(list) {
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
        const szuloElem = $(".tarolo");
    
        if (list && !Array.isArray(list) && typeof list === 'object') {
            list = [list];
        }
    
        if (list && Array.isArray(list) && list.length > 0) {
            const matchingItem = list.find(item => item.nev === nev);
    
            if (matchingItem) {
                const megjelenito = new PublicMegjelenitnev(matchingItem, szuloElem, nev);
    
                // Change the color of the row containing the matching item
                if (success) {
                    const matchingTd = szuloElem.find(`table td:contains('${nev}')`);
                    matchingTd.closest('tr').css('background-color', 'green');
                }
            } else {
                console.log(`No element found with nev ${nev}`);
            }
        } else {
            console.log("The provided list is not an array or is empty");
        }
    }
    megjelenitsoreleje(list, nev, success = false) {
        const szuloElem = $(".tarolo");
    
        if (list && !Array.isArray(list) && typeof list === 'object') {
            list = [list];
        }
    
        if (list && Array.isArray(list) && list.length > 0) {
            const matchingItem = list.find(item => item.nev === nev);
    
            if (matchingItem) {
                const megjelenito = new PublicSoreleje(matchingItem, szuloElem, nev);
    
                // Change the color of the row containing the matching item
                if (success) {
                    const matchingTd = szuloElem.find(`table td:contains('${nev}')`);
                    matchingTd.closest('tr').css('background-color', 'green');
                }
            } else {
                console.log(`No element found with nev ${nev}`);
            }
        } else {
            console.log("The provided list is not an array or is empty");
        }
    }




    hibakezeles(uzenet) {
        console.log(uzenet);
    }
}

export default Controller;
