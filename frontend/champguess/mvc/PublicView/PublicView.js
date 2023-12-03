import PublicText from "./PublicText/PublicText.js";

class UrlapView {
    #leiro = {};
    #urlapElemList = []
    #urlapAdatok = {}
    constructor(szuloElem, leiro) {
        this.#leiro = leiro;
        this.szuloElem = szuloElem;
        this.szuloElem.append("<form>")
        this.formelem = this.szuloElem.children("form")
        this.#urlapLetrehoz()

    }
    getUrlapElemList() {
        return this.#urlapElemList;
    }
    getUrlapadatok() {
        return this.#urlapAdatok
    }

    #urlapLetrehoz() {
        let txt = ""
        for (const key in this.#leiro) {
            switch (this.#leiro[key].type) {
                case "text":
                    this.#urlapElemList.push(new PublicText(key, this.#leiro[key], this.formelem))
                    break;     
                default:

            }

        }
        
        this.formelem.append(txt)
        
    }
    
    


}

export default UrlapView