window.addEventListener("load", loadTruckDataFromDB);

function loadTruckDataFromDB() {
    axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/trucks/getAll")
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
/*--------MODAL DELETE TRUCK-------*/
document.getElementById("zatvoriModalniDetaljnije").addEventListener("click", openCloseModalWindowDelete);
document.getElementById("modalDelete").addEventListener("click", checkIfClickedModalDelete);
/*-----------Modal more info---------------*/
document.getElementById("closeModalMoreInfo").addEventListener("click", openCloseModalWindowInfo);
document.getElementById("modalMoreInfo").addEventListener("click", checkIfClickedModalMoreInfo);

document.getElementById("searchTrucks").addEventListener("input", filterOutTrucksInTable);


function buildTable(data) {
    var table = document.getElementById('driverTableBody');
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        let date = new Date(data[i].registrationDate);
        var row = `<tr>
                <td>` + data[i].registrationNumber + `</td>
                <td>` + data[i].chassisNumber + `</td>
                <td>` + data[i].manufacturersName + `</td>
                <td>` + date.getDay() + `.` + date.getMonth() + `.` + date.getFullYear() + `</td>
                <td>
                <button class="btnTable btnMoreInfo" data-VIN="` + data[i].chassisNumber + `">Detaljnije / Uredi</button>
                <button class="btnTable btnDelete" data-VIN="` + data[i].chassisNumber + `">Obriši</button></td>
                </tr>`;

        table.innerHTML += row;
    }

    addListenersToDelete();
    addListenersToMoreInfo();
}

function addListenersToDelete() {
    let listOfDeleteButtonsInTable = document.getElementsByClassName("btnDelete");
    for (let i = 0; i < listOfDeleteButtonsInTable.length; i++) {
        listOfDeleteButtonsInTable[i].addEventListener("click", showDeleteWindow);
    }
}

function addListenersToMoreInfo() {
    let listOfMoreInfoButtonsInTable = document.getElementsByClassName("btnMoreInfo");
    for (let i = 0; i < listOfMoreInfoButtonsInTable.length; i++) {
        listOfMoreInfoButtonsInTable[i].addEventListener("click", showMoreInfoTrucks);
    }
}

function checkIfClickedModalDelete(e) {
    if (e.target === document.getElementById("modalDelete")) {
        openCloseModalWindowDelete();
    }
}

function checkIfClickedModalMoreInfo(e) {
    if (e.target === document.getElementById("modalMoreInfo")) {
        openCloseModalWindowInfo();
    }
}

function showDeleteWindow(e) {
    let selectedTruck = returnTruckDataByVIN(e.target.getAttribute("data-VIN"));

    document.getElementById("modalDeleteWrapperContent").innerHTML = `
    <div id="modalDeleteContentText">Da li ste sigurni da želite da obrišete kamion: </div>
    <div id="selectedDriverDelete">Registarskih oznaka: ` + selectedTruck.registrationNumber + `</div>
    <div id="selectedDriverDelete">Broj šasije: ` + selectedTruck.chassisNumber + `</div>
    <div id="modalDeleteButtons">
        <button id="btnDeleteDriver" class="btnModal btnModalConfirmDelete" data-VIN="` + selectedTruck.chassisNumber + `">Obriši</button>
        <button id="btnCancelDeleteDriver" class="btnModal btnModalCancelDelete" data-VIN="` + selectedTruck.chassisNumber + `">Odustani od brisanja</button>
    </div>
    `;

    document.getElementById("btnCancelDeleteDriver").addEventListener("click", openCloseModalWindowDelete);
    //document.getElementById("btnDeleteDriver").addEventListener("click", deleteDriverFromDB);

    openCloseModalWindowDelete();
}

function showMoreInfoTrucks(e) {
    let selectedTruck = returnTruckDataByVIN(e.target.getAttribute("data-VIN"));

    document.getElementById("modalMoreInfoWrapperContent").innerHTML = `
    <div id="modalMoreInfoDriverDetails">
                    <div id="modalMoreInfoDriverData">
                        <label>Registarske oznake:</label>
                        <input type="text" value="` + selectedTruck.registrationNumber + `">

                        <label>Broj šasije:</label>
                        <input type="text" value="` + selectedTruck.chassisNumber + `">

                        <label>Boja:</label>
                        <input type="text" value="` + "Plava" + `">
                        
                        <label>Proizvođač:</label>
                        <input type="text" value="` + selectedTruck.manufacturersName + `">

                        <label>Model:</label>
                        <input type="text" value="` + selectedTruck.model + `">

                        <label>Snaga u kW:</label>
                        <input type="text" value="300">

                        <label>Snaga u KS:</label>
                        <input type="text" value="500">

                        <label>Zapremina motora:</label>
                        <input type="text" value="` + "Kralja Petra I 20" + `">
                    </div>
                </div>
                <div id="modalMoreInfoButtons">
                <button id="btnModalInfoSaveChanges" class="btnModal btnModalInfoSaveChanges">Sačuvaj promene</button>
                <button id="btnCancelModalInfo" class="btnModal btnModalInfoCancel">Odustani</button>
            </div>
    `;

    document.getElementById("btnCancelModalInfo").addEventListener("click", openCloseModalWindowInfo);

    openCloseModalWindowInfo();
}

function filterOutTrucksInTable(e) {
    let inputText = e.target.value.toLowerCase();

    document.getElementById("driverTableBody").innerHTML = "";

    var arrayTable = [];
    for (let item of array) {
        if (document.getElementById("searchTrucksByREG").checked) {
            if (returnLowerText(item.registrationNumber).includes(inputText)) {
                arrayTable.push(item)
            }
        } else if (document.getElementById("searchTrucksByVIN").checked) {
            if (returnLowerText(item.chassisNumber).includes(inputText)) {
                arrayTable.push(item)
            }
        }
    }
    buildTable(arrayTable);
}

function returnTruckDataByVIN(vin) {
    for (item of array) {
        if (item.chassisNumber === vin) {
            return item;
        }
    }
}

function returnLowerText(text) {
    return text.toLowerCase();
}

function openCloseModalWindowInfo() {
    document.getElementById("modalMoreInfo").classList.toggle("PrikaziVisibility");
}

function openCloseModalWindowDelete() {
    document.getElementById("modalDelete").classList.toggle("PrikaziVisibility");
}