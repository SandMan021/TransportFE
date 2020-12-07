window.addEventListener("load", loadTourDataFromDB);

function loadTourDataFromDB() {
    axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportpal/tours/getAll")
        .then(res => {
            nekiNizKojiJeStigaoSaAPIJA = res.data;
            console.log("Ovo je stiglo", nekiNizKojiJeStigaoSaAPIJA);
            array = nekiNizKojiJeStigaoSaAPIJA;
            console.log(array);
            buildTable(array);
        })
        .catch(err => {
            console.log(err.response);
        });
}

/*----------Modal Add new truck--------------- */
document.getElementById("btnAddNewTour").addEventListener("click", openCloseModalAddTour);
document.getElementById("closeModalAddTour").addEventListener("click", openCloseModalAddTour);
document.getElementById("modalAddTour").addEventListener("click", checkIfClickedModalAddTour);
document.getElementById("btnModalCancelAddTour").addEventListener("click", openCloseModalAddTour);
//document.getElementById("btnModalAddNewTruckToDB").addEventListener("click", createNewTruck);

function buildTable(data) {
    var table = document.getElementById('driverTableBody');
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        let dateDeparture = new Date(data[i].dateOfDeparture);
        let dateArrival = new Date(data[i].dateOfArrival);
        console.log(dateDeparture.toLocaleDateString())
        var row = `<tr>
                <td>` + data[i].status + `</td>
                <td>` + data[i].placeOfDeparture.city + `</td>
                <td>` + data[i].placeOfArrival.city + `</td>
                <td>` + dateDeparture.toLocaleDateString() + `</td>
                <td>` + dateArrival.toLocaleDateString() + `</td>
                <td>
                <button class="btnTable btnMoreInfo" data-TOURID="` + data[i].id + `">Detaljnije / Uredi</button>
                <button class="btnTable btnDelete" data-TOURID="` + data[i].id + `">Obriši</button></td>
                </tr>`;

        table.innerHTML += row;
    }
    addListenersToDelete();
    addListenersToMoreInfo();
}

function openCloseModalAddTour() {
    document.getElementById("modalAddTour").classList.toggle("PrikaziVisibility");
}
function checkIfClickedModalAddTour(e) {
    if (e.target === document.getElementById("modalAddTour")) {
        openCloseModalAddTour();
    }
}