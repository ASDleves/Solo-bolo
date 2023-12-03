class PasswordUrlapElem {
    #key
    #elemLeiro = {}
    #valid = false
    #ertek = ""
    constructor(key, elemLeiro, szuloElem) {
        this.#key = key
        this.#elemLeiro = elemLeiro
        this.formelem = szuloElem
        this.#passwordElem();
        this.inputElem = $(`#${this.#key}`)
        this.validElem = this.formelem.children("div:last-child").children(".valid")
        this.invalidElem = this.formelem.children("div:last-child").children(".invalid")
        this.invalidElem.hide();
        this.validElem.hide();
        this.inputElem.on("keyup", () => {
            this.#ertek = this.inputElem.val();
            let reg = this.#elemLeiro.regex;
            let regReg = new RegExp(reg);
            if (regReg.test(this.#ertek)) {
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
        return this.#valid
    }

    get ertek() {
        return this.#ertek
    }

    get key() {
        return this.#key
    }

    #passwordElem() {
        let txt = `
            <div class="mb-3 mt-3">
                <label for="${this.#key}" class="form-label">${this.#elemLeiro.megj}:</label>
                <input type="password" class="form-control" id="${this.#key}" 
                placeholder="${this.#elemLeiro.placeholder}" value="${this.#elemLeiro.value}"
                pattern="${this.#elemLeiro.regex}">

                <div class="valid lathatosag">OK</div>
                <div class="invalid lathatosag">${this.#elemLeiro.valid}</div>
            </div>
        `
        this.formelem.append(txt)
    }
}

export default PasswordUrlapElem;