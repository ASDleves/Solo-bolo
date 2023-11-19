import PublicTablabaIr from "./PublicTablaIr.js";
class PublicMegjelenitnev {
    #data;
    #nev;

    constructor(data, szuloElem, nev) {
        this.#data = data;
        this.#nev = nev;
        
        // Check if the table already exists
        if (szuloElem.children("table").length === 0) {
            // If no table exists, create one
            szuloElem.append(`<table class="table table-bordered table-striped">`);
        }
        this.tablaElem = szuloElem.children("table");
        console.log(this.#data);
        this.tablazatbaIr();
    }

    tablazatbaIr() {
        console.log(this.#nev);
        // Clear existing rows in the table except the header
        this.tablaElem.find("tbody").empty(); 

        if (this.#data && this.#data.nev === this.#nev) {
            const megjelenitSor = new PublicTablabaIr(this.#data, this.tablaElem);
        } else {
            console.log(`No element found with nev ${this.#nev}`);
        }
    }
}
export default PublicMegjelenitnev
