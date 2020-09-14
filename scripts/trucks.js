var array = [{
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 2,
    "name": "Milos",
    "lastName": "Tomasevic",
    "umcn": "521236548512",
    "workbookNumber": "856987"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 2,
    "name": "Milos",
    "lastName": "Tomasevic",
    "umcn": "521236548512",
    "workbookNumber": "856987"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 2,
    "name": "Milos",
    "lastName": "Tomasevic",
    "umcn": "521236548512",
    "workbookNumber": "856987"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 2,
    "name": "Milos",
    "lastName": "Tomasevic",
    "umcn": "521236548512",
    "workbookNumber": "856987"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 2,
    "name": "Milos",
    "lastName": "Tomasevic",
    "umcn": "521236548512",
    "workbookNumber": "856987"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}, {
    "id": 1,
    "name": "Ivan",
    "lastName": "Kocoljevac",
    "umcn": "154785968459",
    "workbookNumber": "254569"
}];

window.addEventListener("load", loadTruckDataFromDB);

function loadTruckDataFromDB() {
    buildTable(array);
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
        var row = `<tr>
                <td>` + data[i].name + `</td>
                <td>` + data[i].umcn + `</td>
                <td>` + data[i].umcn + `</td>
                <td>` + data[i].workbookNumber + `</td>
                <td>
                <button class="btnTable btnMoreInfo" data-VIN="` + data[i].umcn + `">Detaljnije / Uredi</button>
                <button class="btnTable btnDelete" data-VIN="` + data[i].umcn + `">Obriši</button></td>
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
    <div id="selectedDriverDelete">Registarskih oznaka: ` + selectedTruck.umcn + `</div>
    <div id="selectedDriverDelete">Broj šasije: ` + selectedTruck.umcn + `</div>
    <div id="modalDeleteButtons">
        <button id="btnDeleteDriver" class="btnModal btnModalConfirmDelete" data-UMCN="` + selectedTruck.umcn + `">Obriši</button>
        <button id="btnCancelDeleteDriver" class="btnModal btnModalCancelDelete">Odustani od brisanja</button>
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
                        <input type="text" value="` + selectedTruck.name + `">

                        <label>Broj šasije:</label>
                        <input type="text" value="` + selectedTruck.lastName + `">

                        <label>Boja:</label>
                        <input type="text" value="` + "10.10.2010." + `">
                        
                        <label>Proizvođač:</label>
                        <input type="text" value="` + selectedTruck.umcn + `">

                        <label>Model:</label>
                        <input type="text" value="` + selectedTruck.workbookNumber + `">

                        <label>Snaga u kW:</label>
                        <input type="text" value="` + selectedTruck.workbookNumber + `">

                        <label>Snaga u KS:</label>
                        <input type="text" value="` + selectedTruck.workbookNumber + `">

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
            if (returnLowerText(item.name).includes(inputText)) {
                arrayTable.push(item)
            }
        } else if (document.getElementById("searchTrucksByVIN").checked) {
            if (returnLowerText(item.lastName).includes(inputText)) {
                arrayTable.push(item)
            }
        } 
    }
    buildTable(arrayTable);
}

function returnTruckDataByVIN(vin) {
    for (item of array) {
        if (item.umcn === vin) {
            return item;
        }
    }
}

function openCloseModalWindowInfo() {
    document.getElementById("modalMoreInfo").classList.toggle("PrikaziVisibility");
}

function openCloseModalWindowDelete() {
    document.getElementById("modalDelete").classList.toggle("PrikaziVisibility");
}