import NumberUrlapElem from "./Number/NumberUrlapElem.js";
import TextUrlapElem from "./Text/TextUrlapElem.js";

class UrlapView {
    #leiro = {};
    #urlapElemList = []
    #valid = true
    #urlapAdatok = {}
    constructor(szuloElem, leiro) {

        this.#leiro = leiro;
        this.szuloElem = szuloElem;
        this.szuloElem.append(`<form class="hosok">`)
        this.formelem = this.szuloElem.children("form")
        this.#urlapLetrehoz()
        this.submitContainer = $('<div class="submit-container">');
        this.formelem.append(this.submitContainer);
        this.submitContainer.append("<input type='submit' id='submit' value='Feltöltés'>");
        

    }
    getUrlapElemList() {
        return this.#urlapElemList;
    }
    getUrlapadatok() {
        return this.#urlapAdatok
    }
    getvalid() {
        return this.#valid
    }

    #urlapLetrehoz() {
        this.formelem.append('<div class="row">'); // Kezdődik a sor
        for (const key in this.#leiro) {
            let formElement;
            switch (this.#leiro[key].type) {
                case "text":
                    formElement = new TextUrlapElem(key, this.#leiro[key], this.formelem.children('.row:last-child'));
                    break;
                case "number":
                    formElement = new NumberUrlapElem(key, this.#leiro[key], this.formelem.children('.row:last-child'));
                    break;
                // ... other cases ...
            }
            if (formElement) {
                this.#urlapElemList.push(formElement);
            }
        
    }
    this.formelem.append('</div>'); // Zárjuk le az utolsó sort
        
    
    }

}

export default UrlapView