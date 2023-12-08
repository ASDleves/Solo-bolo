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
        $('#logoutButton').on('click', function () {
            localStorage.clear();

            window.location.href = '../public/belepes/login.html';
        });
        const userName = localStorage.getItem('userName');
        if (userName) {
            $('p.username').text(userName);
            // Ensure this is called after publicDataService is initialized
        }

        this.dataService = new DataService();
        this.publicDataService = new PublicDataService();
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);

        // this.dataService.getAxiosData("http://localhost:8000/api/champs", this.egyenmegjelenites.bind(this), this.hibakezeles);
        this.Jatek(userName);
        this.publicDataService.getUserIdByName("http://localhost:8000/api", userName, (data) => {
            console.log('User ID:', data.userId);
            this.userId = data.userId;
            // Now you can use this.userId here or call other functions that need it
        }, (error) => {
            console.error('Error:', error);
        });
    }
    updateUIBasedOnStatus(status) {
        if (status === "Játékos") {
            $("li a.admin").closest("li").remove();
        }
    }

    Jatek() {



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
            console.log("szamlalo="+szamlalo)
            this.publicDataService.getPontByUserIdAndSeason("http://localhost:8000/api", this.userId, "Season-1",
                (responseArray) => {
                    if (responseArray.length > 0 && responseArray[0].hasOwnProperty('pont')) {
                        console.log(responseArray)
                        const currentTipp = responseArray[0].Osszes_Tipp;
                        console.log(currentTipp)
                        const newTipp = currentTipp + 1;
                        console.log(newTipp)
                        this.publicDataService.updateOsszesTippByUserIdAndSeason("http://localhost:8000/api",this.userId,"Season-1",newTipp, // You need to calculate the updated value
                            (updateResponse) => {
                                console.log("Összes_Tipp updated successfully", updateResponse);
                            },
                            (error) => {
                                console.error('Error updating Összes_Tipp:', error);
                            }
                        );
                    } else {
                        console.error('Pont key is undefined in response:', responseArray);
                    }
                },
                (error) => {
                    console.error('Error getting Pont by user_id and Season:', error);
                }
            );

            let textValue = this.capitalizeFirstLetter(this.textInputElem.val().trim());
            if (textValue === "") {
                return;
            }
            
            if (this.compareStrings(textValue, this.Hasonlitnev)) {
                console.log("Nyertél");

                this.publicDataService.getPontByUserIdAndSeason("http://localhost:8000/api", this.userId, "Season-1",
                    (responseArray) => {
                        if (responseArray.length > 0 && responseArray[0].hasOwnProperty('pont')) {
                            const currentPont = responseArray[0].pont;
                            const newPont = currentPont + 1; // Increment the points by 1
                            const currentOneshot = responseArray[0].OneShot
                            const newOneShot =currentOneshot+1
                            console.log(szamlalo+"szamlalocsak")
                            if (szamlalo == 0){
                                this.publicDataService.updateOneShotByUserIdAndSeason("http://localhost:8000/api", this.userId, "Season-1", newOneShot,
                                (updateResponse) => {
                                    console.log("Pont updated successfully", updateResponse);
                                },
                                (error) => {
                                    console.error('Error updating Pont:', error);
                                }
                            );
                            }
                            
                            this.publicDataService.updatePontByUserIdAndSeason("http://localhost:8000/api", this.userId, "Season-1", newPont,
                                (updateResponse) => {
                                    console.log("Pont updated successfully", updateResponse);
                                    szamlalo = 0
                                },
                                (error) => {
                                    console.error('Error updating Pont:', error);
                                }
                            );
                        } else {
                            console.error('Pont key is undefined in response:', responseArray);
                        }
                    },
                    (error) => {
                        console.error('Error getting Pont by user_id and Season:', error);
                    }
                );
                this.publicDataService.getPublicnevAxiosData("http://localhost:8000/api/champs/nev", textValue, (response) => {
                    this.megjelenitsoreleje(response, textValue, true);
                }, this.hibakezeles);
                this.createRestartButton();
                
            } else {
                if (szamlalo = 0) {
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
                } else {
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

    compareStrings(str1, str2) {
        // Remove leading/trailing whitespace and convert to lowercase for case-insensitive comparison
        const cleanedStr1 = str1.trim().toLowerCase();
        const cleanedStr2 = str2.trim().toLowerCase();
      
        // Compare the cleaned strings
        return cleanedStr1 === cleanedStr2;
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
        targetTd.each(function () {
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
            const matchingItem = list.find(item => item.nev.trim().toLowerCase() === nev.trim().toLowerCase());

            if (matchingItem) {
                const megjelenito = new PublicSoreleje(matchingItem, szuloElem, nev);

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
