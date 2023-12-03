import PublicTablabaIr from "./PublicTablaIr.js";
class PublicSoreleje {
    #data;
    #nev;

    constructor(data, szuloElem, nev) {
        this.#data = data;
        this.#nev = nev;
        
        if (szuloElem.children("table").length === 0) {
            szuloElem.append(`<table class="table table-bordered table-striped">`);
        }
        this.tablaElem = szuloElem.children("table");
        console.log(this.#data);
        this.tablazatbaIr();
    }

    tablazatbaIr() {
        const megjelenitSor = new PublicTablabaIr(this.#data, this.tablaElem);

        // Insert the new row immediately after the header row
        this.tablaElem.children("tr:first").after(megjelenitSor.sorElem);
    }
}
export default PublicSoreleje
