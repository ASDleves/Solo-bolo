import TextUrlapElem from "../View/TextUrlapElem.js"
import PasswordUrlapElem from "./Password.js";
class UrlapView {
    #leiro = {};
    #urlapElemList = []
    #valid = true
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
    getvalid() {
        return this.#valid
    }

    #urlapLetrehoz() {
        let txt = ""
        for (const key in this.#leiro) {
            switch (this.#leiro[key].type) {
                case "text":
                    this.#urlapElemList.push(new TextUrlapElem(key, this.#leiro[key], this.formelem))
                    break
                case "password":
                    this.#urlapElemList.push(new PasswordUrlapElem(key, this.#leiro[key], this.formelem))
                default:

            }

        }
        txt += "<input type='submit' id='submit' value='Feltöltés'>"
        this.formelem.append(txt)
        
    }
    
    


}

export default UrlapView