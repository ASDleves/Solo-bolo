class NumberUrlapElem {
    #key;
    #elemLeiro = {};
    #valid = false;
    #ertek = "";

    constructor(key, elemLeiro, szuloElem) {
        this.#key = key;
        this.#elemLeiro = elemLeiro;
        this.formelem = szuloElem;
        this.#numberElem();
        this.inputElem = $(`#${this.#key}`);
        this.validElem = this.formelem.children("div:last-child").children(".valid");
        this.invalidElem = this.formelem.children("div:last-child").children(".invalid");
        this.invalidElem.hide();
        this.validElem.hide();
        this.inputElem.on("input", () => { 
            this.#ertek = this.inputElem.val();
            let min = this.#elemLeiro.regex.min;
            let max = this.#elemLeiro.regex.max;
            
            if (!isNaN(this.#ertek) && this.#ertek >= min && this.#ertek <= max) {
                this.#valid = true;
                this.validElem.show();
                this.invalidElem.hide(); 
            } else {
                this.#valid = false;
                this.validElem.hide();
                this.invalidElem.show();
            }
        });
        
    }
    getvalid() {
        return this.#valid;
    }
    isValid() {
        return this.#valid;
    }

    get ertek() {
        return this.#ertek;
    }

    get key() {
        return this.#key;
    }

    #numberElem(key) {
        let txt = `
        <div class="col-md-6 mb-3">
        <label for="${this.#key}" class="form-label">${this.#elemLeiro.megj}:</label>
        <input type="number" class="form-control" id="${this.#key}" 
        placeholder="${this.#elemLeiro.placeholder}" value="${this.#elemLeiro.value}" 
        min="${this.#elemLeiro.regex.min}" max="${this.#elemLeiro.regex.max}">
        <div class="valid lathatosag">OK</div>
        <div class="invalid lathatosag">${this.#elemLeiro.valid}</div>
    </div>
        `;
        this.formelem.append(txt);
    }
    
}

export default NumberUrlapElem;