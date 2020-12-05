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
                <button class="btnTable btnMoreInfo" data-VIN="` + data[i].chassisNumber + `">Detaljnije / Uredi</button>
                <button class="btnTable btnDelete" data-VIN="` + data[i].chassisNumber + `">Obriši</button></td>
                </tr>`;

        table.innerHTML += row;
    }
    addListenersToDelete();
    addListenersToMoreInfo();
}