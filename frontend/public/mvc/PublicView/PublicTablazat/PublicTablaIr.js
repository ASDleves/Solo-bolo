
class PublicTablabaIr {
    #adat = {};

    constructor(adat, szuloElem) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        if (this.tablaElem.children("tr").length === 0) {
            this.#generateHeaderRow(); // Generate and append the header row only if it doesn't exist
        }
        this.#sor();
        this.sorElem = this.tablaElem.children("tr:last-child");
        this.torolElem = this.sorElem.children("td").children(".torol");
    }

    #generateHeaderRow() {
        let headerRow = "<tr>";
        const excludedKeys = ['id','created_at', 'updated_at']; 
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

        const excludedKeys = ['id','created_at', 'updated_at']; 
        
        Object.entries(this.#adat).forEach(([key, value]) => {
            if (!excludedKeys.includes(key)) {
                txt += `<td>${value}</td>`;
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

export default PublicTablabaIr;