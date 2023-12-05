import DataService from "../modell/DataService.js";
import Megjelenit from "../view/TablazatView/TablazatMegjelenit.js";
class Controller {
    constructor() {
        
        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/users", this.megjelenitesProfil, this.hibakezeles);

        $('#logoutButton').on('click', function () {
            localStorage.clear();

            window.location.href = '../../public/belepes/login.html';
        });
        const userName = localStorage.getItem('userName');
        if (userName) {
            $('p.username').text(userName);
        }
        
        $(document).on('click', '.megtekint', (event) => {
            const id = $(event.target).data('id');
            console.log('Megtekint clicked for ID:', id);
            const name = $(event.target).closest('tr').find('.nev').text();
            const element = event.target;
            console.log(event.target)
            element.style.backgroundColor = '#04AA6D';
            this.userName = name;
            $('#felhasznalo-nev-placeholder').text(this.userName);
            this.getPontsForUser(id);
        });
        $(document).on('click', '.close', function () {
            $('#myModal').modal('hide');
            $('.megtekint').css('background-color', '#111');
        });

        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        
    }
    getPontsForUser(userId) {
        this.dataService.getAxiosData(
            `http://localhost:8000/api/ponts/${userId}`,
            (data) => this.megjelenitesModalban(data, userId),
            this.hibakezeles
        );
    }

    megjelenitesModalban(data, userId) {
        $('#modal-content').empty();
        if (data.length === 0) {
            $('#modal-content').html('<p>Ennek a felhasználónak még nincs adatai.</p>');
            $('#user-id-placeholder').text("ID: " + userId);
        } else {
            $('#user-id-placeholder').text("ID: " + data[0].user_id);

            let contentHtml = data.map((item, index, array) => {
                let html = `
                <div class="user-data">
                    <p>Pont: ${item.pont}</p>
                    <p>OneShot: ${item.OneShot}</p>
                    <p>Összes Tipp: ${item.Összes_Tipp}</p>
                    <p>Season: ${item.Season}</p>
                </div>
            `;
                if (index < array.length - 1) {
                    html += '<hr>';
                }
                return html;
            }).join('');
            $('#modal-content').html(contentHtml);
        }
        $('#myModal').modal('show');
    }
    megjelenites(list) {
        const szuloElem = $(".tarolo");
        const megjelenito = new Megjelenit(list, szuloElem);

    }
    megjelenitesProfil(list) {
        const szuloElem = $(".felhasznalo");
        const megjelenito = new Megjelenit(list, szuloElem);
        $('.megtekint').css('background-color', '#111');
        $('.megtekint').css('color', 'white');

    }
    hibakezeles(uzenet) {
        console.log(uzenet)
    }
}
export default Controller