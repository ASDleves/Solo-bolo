class PublicMegjelenitegesz {
    #list = [];
  
    constructor(list, szuloElem) {
      // Ensure that list is always an array
      this.#list = Array.isArray(list) ? list : [];
      
      szuloElem.append(`<table class="table table-bordered table-striped">`);
      this.tablaElem = szuloElem.children("table");
      console.log(this.#list);
      this.tablazatbaIr(); 
    }
  
    tablazatbaIr() {
      this.#list.forEach((elem) => {
          const megjelenitSor = new PublicTablabaIr(elem, this.tablaElem);
      });
    }
  }
  
  export default PublicMegjelenitegesz;
  