class PublicText{
    #key
    #elemLeiro = {}
    #ertek =""
    constructor(key,elemLeiro,szuloElem){
        this.#key =key
        this.#elemLeiro = elemLeiro
        this.formelem = szuloElem
        this.#textElem();
        this.inputElem=$(`#${this.#key}`)
        
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
            <div class="formelem">
                <label for="${this.#key}" class="form-label">${this.#elemLeiro.megj}:</label>
                <input type="${this.#elemLeiro.type}" class="form-control" id="${this.#key}" 
                placeholder="${this.#elemLeiro.placeholder}" value="${this.#elemLeiro.value}"
                pattern="${this.#elemLeiro.regex}">
                <input type='submit' id='submit' value='Tippelés'>
            </div>
            `
            this.formelem.append(txt)
    
    }
    
}

export default PublicText