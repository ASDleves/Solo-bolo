import DataService from "../Model/Dataservice.js";
import UrlapView from "../View/View.js"
import UrlapModel from "../Model/Urlapnezet.js";
class Controller{
    constructor(){
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);
        this.dataService = new DataService();
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
                console.log(urlapadat.nev)
                this.dataService.postAxiosData("http://localhost:8000/api/users", {
                "name": urlapadat.name,
                "email": urlapadat.email,
                "password": urlapadat.password,
                

            });
            console.log(urlapadat.name)
            console.log(urlapadat.email)
            console.log(urlapadat.password)
            } else {
                console.log("Nem valid az űrlap!")
                
            }
            
            
        })
    }

    hibakezeles(uzenet){
        console.log(uzenet)
    }
}
export default Controller