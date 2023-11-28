import DataService from "../modell/DataService.js";
import Megjelenit from "../view/TablazatView/TablazatMegjelenit.js";
class Controller{
    constructor(){
        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/users", this.megjelenitesProfil, this.hibakezeles);
        $(document).on('click', '.megtekint', (event) => {
            const id = $(event.target).data('id');
            console.log('Megtekint clicked for ID:', id);
            const name = $(event.target).closest('tr').find('.nev').text();

            this.userName = name;
            $('#felhasznalo-nev-placeholder').text(this.userName);
            this.getPontsForUser(id); // Pass the correct userId
        });
        $(document).on('click', '.close', function() {
            $('#myModal').modal('hide');
        });
    }
    getPontsForUser(userId) {
        this.dataService.getAxiosData(`http://localhost:8000/api/ponts/${userId}`, this.megjelenitesModalban, this.hibakezeles);
    }

    megjelenitesModalban(data) {
        // Clear any existing content in the modal
        $('#modal-content').empty();
        $('#user-id-placeholder').text("ID: "+data[0].user_id);
        
        // Create HTML content for the modal
        let contentHtml = data.map((item, index, array) => {
            let html = `
                <div class="user-data">
                    <p>Pont: ${item.pont}</p>
                    <p>OneShot: ${item.OneShot}</p>
                    <p>Összes Tipp: ${item.Összes_Tipp}</p>
                    <p>Season: ${item.Season}</p>
                </div>
            `;
            // Add an <hr> tag if it's not the last item in the array
            if (index < array.length - 1) {
                html += '<hr>';
            }
            return html;
        }).join('');
        $('#modal-content').html(contentHtml);

        // Open the modal
        $('#myModal').modal('show');
    }
    megjelenites(list){
        const szuloElem = $(".tarolo");
        const megjelenito = new Megjelenit(list, szuloElem);
        
    }
    megjelenitesProfil(list){
        const szuloElem = $(".felhasznalo");
        const megjelenito = new Megjelenit(list, szuloElem);
        
    }
    hibakezeles(uzenet){
        console.log(uzenet)
    }
}
export default Controller