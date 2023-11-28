
class TablazatView {
    #adat = {};
    #toroltSorok = [];
    #szerkesztesMode = false;
    constructor(adat, szuloElem) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        if (this.tablaElem.children("tr").length === 0) {
            this.#generateHeaderRow();
        }
        this.#sor();
        this.sorElem = this.tablaElem.children("tr:last-child");
        this.torolElem = this.sorElem.children("td").children(".torol");
        this.szerkesztElem = this.sorElem.children("td").children(".szerkeszt");
        this.szerkesztElem.on("click", () => {
            this.#szerkesztesMode = !this.#szerkesztesMode;
        
            if (this.#szerkesztesMode) {
                this.szerkesztElem.text("Mentés");
                this.#szerkesztesMegjelenit();
            } else {
                this.szerkesztElem.text("🛠");
                this.#szerkesztesBezar();
                // Gyűjtsük össze az adatokat
                let sorAdatok = {};
                const fields = ['id','nev', 'nem', 'pozicio', 'faj', 'nyersanyag', 'fegyver', 'szarmazas', 'megjelenes'];
                fields.forEach(field => {
                    sorAdatok[field] = this.#adat[field];
                });
                // Trigger a custom event here
                $(this.szerkesztElem).trigger("mentesClicked", [sorAdatok]);
            }
        });
        this.torolElem.on("click", () => {
            this.sorElem.remove();
            this.storeDeletedSor(this.sorElem);
        });
    }
    #szerkesztesMegjelenit() {
        const fields = [
            { key: 'nev', class: 'szerkesztes-nev' },
            { key: 'nem', class: 'szerkesztes-nem' },
            { key: 'pozicio', class: 'szerkesztes-pozicio' },
            { key: 'faj', class: 'szerkesztes-faj' },
            { key: 'nyersanyag', class: 'szerkesztes-nyersanyag' },
            { key: 'fegyver', class: 'szerkesztes-fegyver' },
            { key: 'szarmazas', class: 'szerkesztes-szarmazas' },
            { key: 'megjelenes', class: 'szerkesztes-megjelenes' },
        ];
    
        fields.forEach((field, index) => {
            // Adjust the index to account for the id column
            this.sorElem.find(`td:nth-child(${index + 2})`).html(
                `<input type="text" class="${field.class}" value="${this.#adat[field.key]}">`
            );
        });
    }
    
    #szerkesztesBezar() {
        const fields = [
            { key: 'nev', class: 'szerkesztes-nev' },
            { key: 'nem', class: 'szerkesztes-nem' },
            { key: 'pozicio', class: 'szerkesztes-pozicio' },
            { key: 'faj', class: 'szerkesztes-faj' },
            { key: 'nyersanyag', class: 'szerkesztes-nyersanyag' },
            { key: 'fegyver', class: 'szerkesztes-fegyver' },
            { key: 'szarmazas', class: 'szerkesztes-szarmazas' },
            { key: 'megjelenes', class: 'szerkesztes-megjelenes' },
        ];
    
        fields.forEach((field, index) => {
            // Again, adjust the index to account for the id column
            const modifiedValue = this.sorElem.find(`.${field.class}`).val();
            this.#adat[field.key] = modifiedValue;
            this.sorElem.find(`td:nth-child(${index + 2})`).html(modifiedValue);
        });
        this.#printSorValues();

    }
    #printSorValues() {
        this.sorElem.children('td').each(function(index, td) {
            console.log(`Value of TD ${index + 1}:`, $(td).text());
        });
    }

    storeDeletedSor(sor) {
        const toroltSor = {
            nev: sor.find("td:nth-child(1)").text(),
            szul: sor.find("td:nth-child(2)").text(),
        };
        this.#toroltSorok.push(toroltSor);
        
        this.#esemenyTrigger('torles', toroltSor);
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

        const excludedKeys = ['created_at', 'updated_at','email_verified_at']; 
        
        Object.entries(this.#adat).forEach(([key, value]) => {
            if (!excludedKeys.includes(key)) {
                txt += `<td>${value}</td>`;
            }
        });
    
        txt += '<td><button class="szerkeszt">🛠</button><button class="torol">🗑️</button></td>';
    
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