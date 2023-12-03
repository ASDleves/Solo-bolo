import { urlap } from "./PublicAdat.js";

class UrlapModel{
    #leiro
    constructor(){
        this.#leiro = urlap;
    }


    get leiro(){
        return this.#leiro
    }
}


export default UrlapModel