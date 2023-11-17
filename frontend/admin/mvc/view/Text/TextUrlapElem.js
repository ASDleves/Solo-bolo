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
        this.validElem=this.formelem.children("div:last-child").children(".valid")
        this.invalidElem=this.formelem.children("div:last-child").children(".invalid")
        this.inputElem.on("keyup",()=>{
            this.#ertek=this.inputElem.val()
            let reg=this.#elemLeiro.regex
            let regReg = new RegExp(reg)
            if (regReg.test(this.#ertek)){
                this.#valid=true
                this.validElem.removeClass("lathatosag")
            this.invalidElem.addClass("lathatosag") 
            }else{
                this.#valid = false
                this.validElem.addClass("lathatosag")
                this.invalidElem.removeClass("lathatosag")
        }
            
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
                pattern="${this.#elemLeiro.regex}">

                <div class="valid lathatosag">OK</div>
                <div class="invalid lathatosag">${this.#elemLeiro.valid}</div>
            </div>
            `
            this.formelem.append(txt)
    
    }
    
}

export default TextUrlapElem