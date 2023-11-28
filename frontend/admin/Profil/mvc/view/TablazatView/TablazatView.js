
class TablazatView {
    #adat = {};
    constructor(adat, szuloElem) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        if (this.tablaElem.children("tr").length === 0) {
            this.#generateHeaderRow();
        }
        this.#sor();
        this.sorElem = this.tablaElem.children("tr:last-child");

    }

    #generateHeaderRow() {
        let headerRow = "<tr>";
        const excludedKeys = ['created_at', 'updated_at','email_verified_at']; 
        Object.keys(this.#adat).forEach(key => {
            if (!excludedKeys.includes(key)) {
            headerRow += `<th>${key}</th>`;
            }
        });
        headerRow += "</tr>";
        this.tablaElem.append(headerRow);
    }
    #sor() {
        let txt = "<tr>";

        const excludedKeys = ['created_at', 'updated_at', 'email_verified_at'];
        
        Object.entries(this.#adat).forEach(([key, value]) => {
            if (!excludedKeys.includes(key)) {
                if (key === 'id') {
                    txt += `<td><button class="megtekint" data-id="${value}">Megtekint</button></td>`;
                } else if (key === 'name'){
                    txt += `<td class="nev">${value}</td>`;
                }else{
                    txt += `<td>${value}</td>`;
                }
            }
        });
    
        txt += "</tr>";
        this.tablaElem.append(txt);
    }

    #esemenyTrigger(esemenyNeve) {
        const esemeny = new CustomEvent(esemenyNeve, {
            detail: this.#adat,
        });
        window.dispatchEvent(esemeny);
    }
}

export default TablazatView;