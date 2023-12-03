import DataService from "../Model/Dataservice.js";
import UrlapView from "../View/View.js"
import UrlapModel from "../Model/Urlapnezet.js";
class Controller {
    constructor() {
        this.urlapModel = new UrlapModel();
        this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);
        this.dataService = new DataService();
        this.submitElem = $("#submit")
        this.submitElem.on("click", (event) => {
            event.preventDefault();

            this.handleLogin();
        });
    }

    handleLogin() {
        let urlapElemList = this.urlapView.getUrlapElemList();
        let isFormValid = urlapElemList.every(elem => elem.getvalid());
        
        if (isFormValid) {
            let loginData = {
                name: urlapElemList.find(elem => elem.key === "name").ertek,
                password: urlapElemList.find(elem => elem.key === "password").ertek
            };

            this.dataService.postAxiosData("http://localhost:8000/api/login", loginData)
                .then(response => {
                    console.log("Login successful", response.data);
                    // Additional actions upon successful login
                })
                .catch(error => {
                    console.log("Login failed", error.response.data);
                    this.hibakezeles("Login failed: " + error.response.data.message);
                });
        } else {
            this.hibakezeles("Form is not valid");
        }
    }

    hibakezeles(uzenet) {
        console.log(uzenet);
    }
}

export default Controller;