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

/*----------Modal Add new truck--------------- */
document.getElementById("btnAddNewTruck").addEventListener("click", openCloseModalAddTruck);
document.getElementById("closeModalAddTruck").addEventListener("click", openCloseModalAddTruck);
document.getElementById("modalAddTruck").addEventListener("click", checkIfClickedModalAddTruck);
document.getElementById("btnModalCancelAddTruck").addEventListener("click", openCloseModalAddTruck);
document.getElementById("btnModalAddNewTruckToDB").addEventListener("click", createNewTruck);


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

function checkIfClickedModalAddTruck(e) {
    if (e.target === document.getElementById("modalAddTruck")) {
        openCloseModalAddTruck();
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
    document.getElementById("btnDeleteDriver").addEventListener("click", deleteTruckFromDB);

    openCloseModalWindowDelete();
}

function showMoreInfoTrucks(e) {
    let selectedTruck = returnTruckDataByVIN(e.target.getAttribute("data-VIN"));

    document.getElementById("modalMoreInfoWrapperContent").innerHTML = `
    <div id="modalMoreInfoDriverDetails">
                    <div id="modalMoreInfoDriverData">
                        <label>Registarske oznake:</label>
                        <input type="text" value="` + selectedTruck.registrationNumber + `" id="registrationNumberChange">

                        <label>Broj šasije:</label>
                        <input type="text" value="` + selectedTruck.chassisNumber + `" id="chassisNumberChange" readonly disabled>

                        <label>Boja:</label>
                        <input type="text" value="` + "Plava" + `">
                        
                        <label>Proizvođač:</label>
                        <input type="text" value="` + selectedTruck.manufacturersName + `" id="manufacturersNameChange">

                        <label>Model:</label>
                        <input type="text" value="` + selectedTruck.model + `" id="modelChange">

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
    document.getElementById("btnModalInfoSaveChanges").addEventListener("click", changeDataInDB);

    openCloseModalWindowInfo();
}

function changeDataInDB(){
    let manufacturersName = document.getElementById("manufacturersNameChange").value;
    let model = document.getElementById("modelChange").value;
    let registrationNumber = document.getElementById("registrationNumberChange").value;
    let chassisNumber = document.getElementById("chassisNumberChange").value;
    //let registrationDate = document.getElementById("registrationDate").value;

    let newTruck = {
        "manufacturersName": manufacturersName,
        "model": model,
        "registrationNumber": registrationNumber,
        "chassisNumber": chassisNumber,
        "registrationDate": "2020-06-19T23:00:00.000+00:00"
    }

    axios.put("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/trucks/editTruck", newTruck)
        .then(res => {
            if (res.status === 200) {
                loadTruckDataFromDB();
                showSuccessScreenOnModalMoreInfoTruck();
            }
        })
        .catch(err => console.log(err));
}

function deleteTruckFromDB(e) {
    let truckVINDelete = e.target.getAttribute("data-VIN");

    axios.delete("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/trucks/delete/" + truckVINDelete)
        .then(res => {
            if (res.status === 200) {
                loadTruckDataFromDB();
                showSuccessScreenOnModalDeleteTruck();
            }
        })
        .catch(err => console.log(err));
}

function showSuccessScreenOnModalMoreInfoTruck(){
    document.getElementById("modalMoreInfoWrapperContent").innerHTML = "";
    document.getElementById("modalMoreInfoWrapperContent").innerHTML = `
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" id="checkAnimation">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
    </div>
    <div id="modalSuccess">Podaci uspešno sačuvani u bazi podataka!</div>
    <div>
        <button class="btnModal btnModalInfoSaveChanges" id="closeModalSuccessChangeDataTruck">Zatvori</button>
    </div>
    `;

    document.getElementById("closeModalSuccessChangeDataTruck").addEventListener("click", openCloseModalWindowInfo);
    document.getElementById("modalWrapperInfo").style.width = "50%";
}

function showSuccessScreenOnModalDeleteTruck() {
    document.getElementById("modalDeleteWrapperContent").innerHTML = "";
    document.getElementById("modalDeleteWrapperContent").innerHTML = `
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" id="checkAnimation">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
    </div>
    <div id="modalSuccess">Kamion je obrisan iz baze podataka!</div>
    <div>
        <button class="btnModal btnModalInfoSaveChanges" id="closeModalSuccessDeleteTruck">Zatvori</button>
    </div>
    `;

    document.getElementById("closeModalSuccessDeleteTruck").addEventListener("click", openCloseModalWindowDelete);
    document.getElementById("modalWrapper").style.width = "50%";
}

function createNewTruck(e) {
    let manufacturersName = document.getElementById("manufacturersName").value;
    let model = document.getElementById("model").value;
    let registrationNumber = document.getElementById("registrationNumber").value;
    let chassisNumber = document.getElementById("chassisNumber").value;
    //let registrationDate = document.getElementById("registrationDate").value;

    let newTruck = {
        "manufacturersName": manufacturersName,
        "model": model,
        "registrationNumber": registrationNumber,
        "chassisNumber": chassisNumber,
        "registrationDate": "2020-06-19T23:00:00.000+00:00"
    }
    axios.post("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/trucks/newTruck", newTruck)
        .then(res => {
            if (res.status === 200) {
                loadTruckDataFromDB();
                showSuccessScreenOnModalNewTruck();
            }
        })
        .catch(err => console.log(err));
}

function showSuccessScreenOnModalNewTruck() {
    let wrapperContetn = document.getElementById("modalAddDriverWrapperContent");
    wrapperContetn.innerHTML = `
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" id="checkAnimation">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
    </div>
    <div id="modalSuccess">Kamion je uspešno upisan u bazu podataka!</div>
    <div>
    <button class="btnModal btnModalInfoSaveChanges" id="closeModalSuccessAddTruck">Zatvori</button>
    </div>
    `;

    document.getElementById("closeModalSuccessAddTruck").addEventListener("click", closeModalSuccessAddTruckReturnBackOldHTML);
    document.getElementById("modalWrapperAdd").style.width = "50%";
}

function closeModalSuccessAddTruckReturnBackOldHTML() {
    openCloseModalAddTruck();
    let wrapperContetn = document.getElementById("modalAddDriverWrapperContent");
    wrapperContetn.innerHTML = ` 
        <div id="modalAddDriverDetails">
        <div id="modalMoreInfoDriverData">
            <label>Registarske oznake:</label>
            <input type="text" id="registrationNumber">

            <label>Broj šasije:</label>
            <input type="text" id="chassisNumber">

            <label>Boja:</label>
            <input type="text" id="truckColor">

            <label>Proizvođač:</label>
            <input type="text" id="manufacturersName">

            <label>Model:</label>
            <input type="text" id="model">

            <label>Snaga u kW:</label>
            <input type="text" id="truckPowerKW">

            <label>Snaga u KS:</label>
            <input type="text" id="truckPowerHP">

            <label>Zapremina motora:</label>
            <input type="text" id="truckEngineSize">
        </div>
    </div>
    <div id="modalAddDriverButtons">
        <button id="btnModalAddNewTruckToDB" class="btnModal btnModalInfoSaveChanges">Dodaj kamion</button>
        <button id="btnModalCancelAddTruck" class="btnModal btnModalInfoCancel">Odustani</button>
    </div>`;
    document.getElementById("modalWrapperAdd").style.width = "70%";
    document.getElementById("btnModalCancelAddTruck").addEventListener("click", openCloseModalAddTruck);
    document.getElementById("btnModalAddNewTruckToDB").addEventListener("click", createNewTruck);
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

function openCloseModalAddTruck() {
    document.getElementById("modalAddTruck").classList.toggle("PrikaziVisibility");
}