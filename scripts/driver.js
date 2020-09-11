// var array = [{
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 2,
//     "name": "Milos",
//     "lastName": "Tomasevic",
//     "umcn": "521236548512",
//     "workbookNumber": "856987"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 2,
//     "name": "Milos",
//     "lastName": "Tomasevic",
//     "umcn": "521236548512",
//     "workbookNumber": "856987"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 2,
//     "name": "Milos",
//     "lastName": "Tomasevic",
//     "umcn": "521236548512",
//     "workbookNumber": "856987"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 2,
//     "name": "Milos",
//     "lastName": "Tomasevic",
//     "umcn": "521236548512",
//     "workbookNumber": "856987"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 2,
//     "name": "Milos",
//     "lastName": "Tomasevic",
//     "umcn": "521236548512",
//     "workbookNumber": "856987"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }, {
//     "id": 1,
//     "name": "Ivan",
//     "lastName": "Kocoljevac",
//     "umcn": "154785968459",
//     "workbookNumber": "254569"
// }];

//http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/getAll

var array = [];
axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/getAll")
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

function addListenersToDelete() {
    let listOfDeleteButtonsInTable = document.getElementsByClassName("btnDelete");
    for (let i = 0; i < listOfDeleteButtonsInTable.length; i++) {
        listOfDeleteButtonsInTable[i].addEventListener("click", showDeleteWindow);
    }
}

function addListenersToMoreInfo() {
    let listOfMoreInfoButtonsInTable = document.getElementsByClassName("btnMoreInfo");
    for (let i = 0; i < listOfMoreInfoButtonsInTable.length; i++) {
        listOfMoreInfoButtonsInTable[i].addEventListener("click", showMoreDriverInfo);
    }
}
/*-----------Modal delete------------ */
document.getElementById("zatvoriModalniDetaljnije").addEventListener("click", openCloseModalWindowDelete);
document.getElementById("modalDelete").addEventListener("click", checkIfClickedModalDelete);

/*-----------Modal more info---------------*/
document.getElementById("closeModalMoreInfo").addEventListener("click", openCloseModalWindowInfo);
document.getElementById("modalMoreInfo").addEventListener("click", checkIfClickedModalMoreInfo);

/*----------Modal Add new driver--------------- */
document.getElementById("btnAddNewDriver").addEventListener("click", openCloseModalAddDriver);
document.getElementById("closeModalAddDriver").addEventListener("click", openCloseModalAddDriver);
document.getElementById("modalAddDriver").addEventListener("click", checkIfClickedModalAddDriver);
document.getElementById("btnModalCancelAddDriver").addEventListener("click", openCloseModalAddDriver);
document.getElementById("btnModalAddNewDriverToDB").addEventListener("click", createNewDriver);


document.getElementById("searchDriver").addEventListener("input", filterOutDriversInTable);

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

function checkIfClickedModalAddDriver(e) {
    if (e.target === document.getElementById("modalAddDriver")) {
        openCloseModalAddDriver();
    }
}

function buildTable(data) {
    var table = document.getElementById('driverTableBody');

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
            <td>` + data[i].name + `</td>
            <td>` + data[i].lastName + `</td>
            <td>` + data[i].umcn + `</td>
            <td>` + data[i].workbookNumber + `</td>
            <td>
            <button class="btnTable btnMoreInfo" data-UMCN="` + data[i].umcn + `">Detaljnije / Uredi</button>
            <button class="btnTable btnDelete" data-UMCN="` + data[i].umcn + `">Obriši</button></td>
            </tr>`;

        table.innerHTML += row;
    }

    addListenersToDelete();
    addListenersToMoreInfo();
}

function filterOutDriversInTable(e) {
    let inputText = e.target.value.toLowerCase();

    document.getElementById("driverTableBody").innerHTML = "";

    var arrayTable = [];
    for (let item of array) {
        let lowerName = item.name.toLowerCase();
        if(document.getElementById("searchDriverByName").checked){
            if (item.name.toLowerCase().includes(inputText)) {
                arrayTable.push(item)
             }
        }else if(document.getElementById("searchDriverByLastName").checked){
            if (item.lastName.toLowerCase().includes(inputText)) {
                arrayTable.push(item)
             }
        }else if(document.getElementById("searchDriverByUMCD").checked){
            if (item.umcn.toLowerCase().includes(inputText)) {
                arrayTable.push(item)
             }
        }else if(document.getElementById("searchDriverByWN").checked){
            if (item.workbookNumber.toLowerCase().includes(inputText)) {
                arrayTable.push(item)
             }
        }
    }
    buildTable(arrayTable);
}

function createNewDriver(e) {
    let name = document.getElementById("newDriverName").value;
    let lastName = document.getElementById("newDriverLastName").value;
    let umcn = document.getElementById("newDriverUMCN").value;
    let workbookNumber = document.getElementById("newDriverwoorkNumber").value;
    let DOB = document.getElementById("newDriverDOB").value;
    let addres = document.getElementById("newDriverAddres").value;
    let newDriver = {
        "name": name,
        "lastName": lastName,
        "umcn": umcn,
        "workbookNumber": workbookNumber
    }
    console.log(newDriver);
    axios.post("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/insertNew",
            newDriver
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

function showDeleteWindow(e) {
    let selectedDriver = returnDriverDataByUMCN(e.target.getAttribute("data-UMCN"));

    document.getElementById("modalDeleteWrapperContent").innerHTML = `
    <div id="modalDeleteContentText">Da li ste sigurni da želite da obrišete vozača: </div>
    <div id="selectedDriverDelete">` + selectedDriver.name + ` ` + selectedDriver.lastName + `</div>
    <div id="modalDeleteButtons">
        <button id="btnDeleteDriver" class="btnModal btnModalConfirmDelete">Obriši</button>
        <button id="btnCancelDeleteDriver" class="btnModal btnModalCancelDelete">Odustani od brisanja</button>
    </div>
    `;

    document.getElementById("btnCancelDeleteDriver").addEventListener("click", openCloseModalWindowDelete);

    openCloseModalWindowDelete();
}

function showMoreDriverInfo(e) {
    let selectedDriver = returnDriverDataByUMCN(e.target.getAttribute("data-UMCN"));

    document.getElementById("modalMoreInfoWrapperContent").innerHTML = `
    <div id="modalMoreInfoDriverDetails">
                    <div id="modalMoreInfoDriverPicture">
                        <div><img src="./img/account_circle-black-18dp.svg"></div>
                        <input id="my-file-selector" type="file" name="file">
                    </div>
                    <div id="modalMoreInfoDriverData">
                        <label>Ime:</label>
                        <input type="text" value="` + selectedDriver.name + `">

                        <label>Prezime:</label>
                        <input type="text" value="` + selectedDriver.lastName + `">

                        <label>Datum rodjenja:</label>
                        <input type="text" value="` + "10.10.2010." + `">
                        
                        <label>JMBG:</label>
                        <input type="text" value="` + selectedDriver.umcn + `">

                        <label>Broj radne knjižice:</label>
                        <input type="text" value="` + selectedDriver.workbookNumber + `">

                        <label>Adresa:</label>
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

function returnDriverDataByUMCN(umcn) {
    for (item of array) {
        if (item.umcn === umcn) {
            return item;
        }
    }

}

function deleteRecord(e) {
    //do stuff
    openCloseModalWindowDelete();
}

function saveChanges(e) {
    //do stuff
    openCloseModalWindowInfo();
}

function openCloseModalWindowDelete() {
    document.getElementById("modalDelete").classList.toggle("PrikaziVisibility");
}


function openCloseModalWindowInfo() {
    document.getElementById("modalMoreInfo").classList.toggle("PrikaziVisibility");
}

function openCloseModalAddDriver() {
    document.getElementById("modalAddDriver").classList.toggle("PrikaziVisibility");
}