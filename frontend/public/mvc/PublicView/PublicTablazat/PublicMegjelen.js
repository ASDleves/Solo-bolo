import PublicTablabaIr from "./PublicTablaIr.js";

class PublicMegjelenit {
  #list = [];
  #id;

  constructor(list, szuloElem, id) {
    this.#list = list;
    this.#id = id;
    
    szuloElem.append(`<table class="table table-bordered table-striped">`);
    this.tablaElem = szuloElem.children("table");
    console.log(this.#list);
    this.tablazatbaIr(); 
  }

  tablazatbaIr() {
    const elem = this.#list.find(item => item.id === this.#id);
    if (elem) {
      const megjelenitSor = new PublicTablabaIr(elem, this.tablaElem);
    } else {
      console.log(`No element found with id ${this.#id}`);
    }
  }
}

export default PublicMegjelenit;
