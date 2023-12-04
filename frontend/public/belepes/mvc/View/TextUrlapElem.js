class TextUrlapElem{
    #key
    #elemLeiro = {}
    #valid=false
    #ertek =""
    constructor(key,elemLeiro,szuloElem){
        this.#key =key
        this.#elemLeiro = elemLeiro
        this.formelem = szuloElem
        this.#textElem();
        this.inputElem=$(`#${this.#key}`)
       
        this.inputElem.on("keyup", () => {
            this.#ertek = this.inputElem.val();
   
        })
    }
    
    getvalid(){
        return this.#valid
    }
    get ertek(){
        return this.#ertek
    }
    get key(){
        return this.#key
    }

    #textElem(key){    
        let txt=""
            txt+=`
            <div class="mb-3 mt-3">
                <label for="${this.#key}" class="form-label">${this.#elemLeiro.megj}:</label>
                <input type="${this.#elemLeiro.type}" class="form-control" id="${this.#key}" 
                placeholder="${this.#elemLeiro.placeholder}" value="${this.#elemLeiro.value}"

            </div>
            `
            this.formelem.append(txt)
    
    }
    
}

export default TextUrlapElem