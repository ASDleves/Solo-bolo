import DataService from "../Model/Dataservice.js";
import UrlapView from "../View/View.js";
import UrlapModel from "../Model/Urlapnezet.js";

class Controller {
  constructor() {
    this.urlapModel = new UrlapModel();
    this.urlapView = new UrlapView($(".urlap"), this.urlapModel.leiro);
    this.dataService = new DataService();
    this.submitElem = $("#submit");

    this.submitElem.on("click", (event) => {
      event.preventDefault();
      this.handleRegistration();
    });
  }

  handleRegistration() {
    let urlapelemLista = this.urlapView.getUrlapElemList();
    let urlapadat = {};
    let isFormValid = urlapelemLista.every((elem) => elem.getvalid());

    if (isFormValid) {
      console.log("valid az űrlap!");
      urlapelemLista.forEach((elem) => {
        let ertek = elem.ertek;
        let kulcs = elem.key;
        urlapadat[kulcs] = ertek;
      });

      this.dataService
        .postAxiosData("http://localhost:8000/api/users", {
          name: urlapadat.name,
          email: urlapadat.email,
          password: urlapadat.password,
        })
        .then((response) => {
          alert("A felhasználó elkészült, jelentkezz be.");
          window.location.href = "/public/belepes/login.html";
        })
        .catch((error) => {
            alert("Hibás Felhasználó név/Email/Jelszó.")
        });
    } else {
      console.log("Nem valid az űrlap!");
    }
  }

  hibakezeles(uzenet) {
    console.log(uzenet);
  }
}

export default Controller;
