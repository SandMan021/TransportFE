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

document.getElementById("zatvoriModalniDetaljnije").addEventListener("click", openCloseModalWindowDelete);
document.getElementById("modalDelete").addEventListener("click", checkIfClickedModalDelete);

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

function showDeleteWindow(e) {
    //let selectedTruck = returnTruckDataByVIN(e.target.getAttribute("data-TOURID"));

    document.getElementById("modalDeleteWrapperContent").innerHTML = `
    <div id="modalDeleteContentTextTour">Da li ste sigurni da želite da obrišete turu?</div>
    <div id="modalDeleteButtons">
        <button id="btnDeleteDriver" class="btnModal btnModalConfirmDelete" data-VIN="">Obriši</button>
        <button id="btnCancelDeleteDriver" class="btnModal btnModalCancelDelete" data-VIN="">Odustani</button>
    </div>
    `;

    document.getElementById("btnCancelDeleteDriver").addEventListener("click", openCloseModalWindowDelete);
    //document.getElementById("btnDeleteDriver").addEventListener("click", deleteTruckFromDB);

    openCloseModalWindowDelete();
}

function openCloseModalAddTour() {
    document.getElementById("modalAddTour").classList.toggle("PrikaziVisibility");
    fillDataOnModalAddNewTour();
}

function checkIfClickedModalAddTour(e) {
    if (e.target === document.getElementById("modalAddTour")) {
        openCloseModalAddTour();
    }
}

function checkIfClickedModalDelete(e) {
    if (e.target === document.getElementById("modalDelete")) {
        openCloseModalWindowDelete();
    }
}

function fillDataOnModalAddNewTour() {
    if (document.getElementById("newTourDriverNameDD").options.length === 0) {
        getDriversFromDB();
    }
    if (document.getElementById("newTourTruckRegistrationNumberDD").options.length === 0) {
        getTrucksFromDB();
    }
}

function getDriversFromDB() {
    axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/getAll")
        .then(res => {
            resArray = res.data;
            console.log("Ovo je stiglo od vozaca", resArray);
            driverArray = resArray;
            console.log(driverArray);
            addDriverDataNewTour(driverArray);
        })
        .catch(err => {
            console.log(err.response);
        });
}

function addDriverDataNewTour(driverArray) {
    const driverDD = document.getElementById("newTourDriverNameDD");

    for (item of driverArray) {
        let option = document.createElement("option");
        option.value = item.umcn;
        option.innerHTML = item.name + " " + item.lastName;
        driverDD.appendChild(option);
    }

    updateDriverDisplayData();

    driverDD.addEventListener("change", updateDriverDisplayData);
}

function updateDriverDisplayData() {
    const driverDD = document.getElementById("newTourDriverNameDD");
    const driverUMCN = document.getElementById("newTourDriverUMCN");
    const driverPassport = document.getElementById("newTourDriverPassport");

    driverUMCN.value = driverDD.value;
    driver = returnDriverDataByUMCN(driverDD.value)
    driverPassport.value = driver.workbookNumber;
}

function returnDriverDataByUMCN(umcn) {
    for (item of driverArray) {
        if (item.umcn === umcn) {
            return item;
        }
    }
}

function getTrucksFromDB() {
    axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/trucks/getAll")
        .then(res => {
            resArray = res.data;
            console.log("Ovo je stiglo od kamiona", resArray);
            truckArray = resArray;
            console.log(truckArray);
            addTruckDataNewTour(truckArray);
        })
        .catch(err => {
            console.log(err.response);
        });
}

function addTruckDataNewTour(truckArray) {
    const truckDD = document.getElementById("newTourTruckRegistrationNumberDD");

    for (item of truckArray) {
        let option = document.createElement("option");
        option.value = item.chassisNumber;
        option.innerHTML = item.registrationNumber;
        truckDD.appendChild(option);
    }

    updateTruckDisplayData();

    truckDD.addEventListener("change", updateTruckDisplayData);
}

function updateTruckDisplayData() {
    const truckDD = document.getElementById("newTourTruckRegistrationNumberDD");
    const truckRegistrationDate = document.getElementById("newTourTruckRegistrationDate");
    const truckVIN = document.getElementById("newTourTruckVIN");
    const truckManufacturer = document.getElementById("newTourTruckManufacturer");
    const truckModel = document.getElementById("newTourTruckModel");

    truckObject = returnTruckDataByVIN(truckDD.value);

    let registrationDate= new Date(truckObject.registrationDate);

    truckRegistrationDate.value = registrationDate.toLocaleDateString();
    truckVIN.value = truckObject.chassisNumber;
    truckManufacturer.value = truckObject.manufacturersName;
    truckModel.value = truckObject.model;

}
function openCloseModalWindowDelete() {
    document.getElementById("modalDelete").classList.toggle("PrikaziVisibility");
}

function returnTruckDataByVIN(vin) {
    for (item of truckArray) {
        if (item.chassisNumber === vin) {
            return item;
        }
    }
}