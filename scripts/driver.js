var array = [];
window.addEventListener("load", getDataFromDB);

function getDataFromDB() {
    console.log('-----------------------')
    axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/getAll")
        .then(res => {
            nekiNizKojiJeStigaoSaAPIJA = res.data;
            array = nekiNizKojiJeStigaoSaAPIJA;
            buildTable(array);
        })
        .catch(err => {
            console.log(err.response);
        });
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
        listOfMoreInfoButtonsInTable[i].addEventListener("click", showMoreDriverInfo);
    }
}
/*-----------Hamburger menu-----------*/
document.getElementById("closeMenu").addEventListener("click", closeHamburgerMenu);
document.getElementById("openMenu").addEventListener("click", openHamburgerMenu);
/*-----------Modal delete------------ */
document.getElementById("zatvoriModalniDetaljnije").addEventListener("click", openCloseModalWindowDelete);
document.getElementById("modalDelete").addEventListener("click", checkIfClickedModalDelete);

/*-----------Modal edit---------------*/
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

function closeHamburgerMenu() {
    document.getElementById("sideBar").style.marginRight = '-120px';
    document.getElementById("closeMenu").style.display = 'none';
    document.getElementById("openMenu").style.display = 'block';
}

function openHamburgerMenu() {
    document.getElementById("sideBar").style.marginRight = '0';
    document.getElementById("closeMenu").style.display = 'block';
    document.getElementById("openMenu").style.display = 'none';
}

function buildTable(data) {
    var table = document.getElementById('driverTableBody');
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
            <td>` + data[i].name + `</td>
            <td>` + data[i].lastName + `</td>
            <td>` + data[i].umcn + `</td>
            <td>` + data[i].numberOfPassport + `</td>
            <td>` + data[i].numberOfId + `</td>
            <td>` + data[i].workContract + `</td>
            <td>
            <span class="btnTable btnMoreInfo" data-UMCN="` + data[i].umcn + `">Uredi</span>
            <span class="btnTable btnDelete" data-UMCN="` + data[i].umcn + `">Obriši</span></td>
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
        if (document.getElementById("searchDriverByName").checked) {
            if (returnLowerText(item.name).includes(inputText)) {
                arrayTable.push(item)
            }
        } else if (document.getElementById("searchDriverByLastName").checked) {
            if (returnLowerText(item.lastName).includes(inputText)) {
                arrayTable.push(item)
            }
        } else if (document.getElementById("searchDriverByUMCD").checked) {
            if (returnLowerText(item.umcn).includes(inputText)) {
                arrayTable.push(item)
            }
        } else if (document.getElementById("searchDriverByWN").checked) {
            if (returnLowerText(item.workContract).includes(inputText)) {
                arrayTable.push(item)
            }
        }
    }
    buildTable(arrayTable);
}

function returnLowerText(text) {
    return text.toLowerCase();
}

function createNewDriver(e) {
    let name = document.getElementById("newDriverName").value;
    let lastName = document.getElementById("newDriverLastName").value;
    let umcn = document.getElementById("newDriverUMCN").value;
    let numberOfPassport = document.getElementById("newDriverPassportNumber").value;
    let numberOfId = document.getElementById("newDriverIdNumber").value;
    let workContract = document.getElementById("newDriverWorkNumber").value;

    let newDriver = {
        "name": name,
        "lastName": lastName,
        "umcn": umcn,
        "numberOfPassport": numberOfPassport,
        "workContract": workContract,
        "numberOfId": numberOfId
    }
    if (validateFieldsDriver(newDriver)) {

        axios.post("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/insertNew", newDriver)
            .then(res => {
                if (res.status === 200) {
                    getDataFromDB();
                    showSuccessScreenOnModalNewDriver();
                }
            })
            .catch(err =>
                err ?
                alert('Greška, neki podaci već postoje u bazi i ne mogu biti vezani za drugog vozača (JMBG, broj lk. ...)') : null);
    }
}

function validateFieldsDriver(newDriver) {
    var isError = false;
    var errorText = 'Greška prilikom unosa podatak:';
    if (newDriver.name == '') {
        isError = true;
        errorText = errorText + '\n-Niste uneli ime.';
    }
    if (newDriver.lastName == '') {
        isError = true;
        errorText = errorText + '\n-Niste uneli prezime.';
    }
    if (newDriver.umcn == '') {
        isError = true;
        errorText = errorText + '\n-Niste uneli JMBG.';
    } else if (newDriver.umcn.length != 13) {
        isError = true;
        errorText = errorText + '\n-JMBG mora imati 13 cifara.';
    }
    if (newDriver.numberOfPassport == '') {
        isError = true;
        errorText = errorText + '\n-Niste uneli broj pasoša.';
    }
    if (newDriver.numberOfId == '') {
        isError = true;
        errorText = errorText + '\n-Niste uneli broj lične karte.';
    }
    if (newDriver.workContract == '') {
        isError = true;
        errorText = errorText + '\n-Niste uneli broj ugovora o radu.';
    }
    if (isError) {
        alert(errorText);
    } else {
        return true;
    }

}

function showSuccessScreenOnModalNewDriver() {
    let wrapperContetn = document.getElementById("modalAddDriverWrapperContent");
    wrapperContetn.innerHTML = `
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" id="checkAnimation">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
    </div>
    <div id="modalSuccess">Vozač je uspešno upisan u bazu podataka!</div>
    <div>
    <button class="btnModal btnModalInfoSaveChanges" id="closeModalSuccessAddDriver">Zatvori</button>
    </div>
    `;

    document.getElementById("closeModalSuccessAddDriver").addEventListener("click", openCloseModalAddDriver);
    document.getElementById("modalWrapperAdd").style.width = "50%";
}

var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function fillmodalAddDriverWithHTML() {
    let wrapperContetn = document.getElementById("modalAddDriverWrapperContent");
    wrapperContetn.innerHTML = ` 
        <div id="modalAddDriverDetails">
            <div id="modalMoreInfoDriverPicture">
                <div >
                    <img src="./img/account_circle-black-18dp.svg" id="output">
                </div>
                <input id="file" type="file" name="file" accept="image/*" class="custom-file-input" onchange="loadFile(event)">
            </div>
                <div id="modalMoreInfoDriverData">
                            <label>Ime:</label>
                            <input type="text" id="newDriverName">
    
                            <label>Prezime:</label>
                            <input type="text" id="newDriverLastName">
    
                            <label>JMBG:</label>
                            <input type="number" maxlength="13" id="newDriverUMCN">
    
                            <label>Broj pasoša:</label>
                            <input type="number" id="newDriverPassportNumber">
    
                            <label>Broj lične karte:</label>
                            <input type="number" id="newDriverIdNumber">
    
                            <label>Broj ugovora o radu:</label>
                            <input type="number" id="newDriverWorkNumber">
    
                </div>
        </div>
        <div id="modalAddDriverButtons">
            <button id="btnModalAddNewDriverToDB" class="btnModal btnModalInfoSaveChanges">Dodaj vozača</button>
            <button id="btnModalCancelAddDriver" class="btnModal btnModalInfoCancel">Odustani</button>
        </div>`;

    document.getElementById("modalWrapperAdd").style.width = "70%";
    document.getElementById("btnModalCancelAddDriver").addEventListener("click", openCloseModalAddDriver);
    document.getElementById("btnModalAddNewDriverToDB").addEventListener("click", createNewDriver);
}

function showDeleteWindow(e) {
    let selectedDriver = returnDriverDataByUMCN(e.target.getAttribute("data-UMCN"));

    document.getElementById("modalDeleteWrapperContent").innerHTML = `
    <div id="modalDeleteContentText">Da li ste sigurni da želite da obrišete vozača: </div>
    <div id="selectedDriverDelete">` + selectedDriver.name + ` ` + selectedDriver.lastName + `</div>
    <div id="modalDeleteButtons">
        <button id="btnDeleteDriver" class="btnModal btnModalConfirmDelete" data-UMCN="` + selectedDriver.umcn + `">Obriši</button>
        <button id="btnCancelDeleteDriver" class="btnModal btnModalCancelDelete">Odustani</button>
    </div>
    `;

    document.getElementById("btnCancelDeleteDriver").addEventListener("click", openCloseModalWindowDelete);
    document.getElementById("btnDeleteDriver").addEventListener("click", deleteDriverFromDB);

    openCloseModalWindowDelete();
}

function showSuccessScreenOnModalDriverMoreInfo() {
    let wrapperContetn = document.getElementById("modalMoreInfoWrapperContent");
    wrapperContetn.innerHTML = `
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" id="checkAnimation">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
    </div>
    <div id="modalSuccess">Izmene uspešno upisane u bazu podataka!</div>
    <div>
    <button class="btnModal btnModalInfoSaveChanges" id="closeModalSuccessAddDriver">Zatvori</button>
    </div>
    `;

    document.getElementById("closeModalSuccessAddDriver").addEventListener("click", openCloseModalWindowInfo);
    document.getElementById("modalWrapperInfo").style.width = "50%";
}

function showMoreDriverInfo(e) {
    let selectedDriver = returnDriverDataByUMCN(e.target.getAttribute("data-UMCN"));

    document.getElementById("modalMoreInfoWrapperContent").innerHTML = `
    <div id="modalMoreInfoDriverDetails">
        <div id="modalMoreInfoDriverPicture">
            <div><img src="./img/account_circle-black-18dp.svg" id="output"></div>
            <input id="file" type="file" name="file" accept="image/*" class="custom-file-input" onchange="loadFile(event)">
        </div>
                    <div id="modalMoreInfoDriverData">
                        <label>Ime:</label>
                        <input type="text" id="driverName" value="` + selectedDriver.name + `">

                        <label>Prezime:</label>
                        <input type="text" id="driverLastName" value="` + selectedDriver.lastName + `">
                        
                        <label>JMBG:</label>
                        <input type="number" id="driverUMCN" maxlength="13" value="` + selectedDriver.umcn + `">

                        <label>Broj pasoša:</label>
                        <input type="number" id="driverPassportNumber" value="` + selectedDriver.numberOfPassport + `">

                        <label>Broj lične karte:</label>
                        <input type="number" id="driverIdNumber" value="` + selectedDriver.numberOfId + `">

                        <label>Broj ugovora o radu:</label>
                        <input type="number" id="driverWorkNumber" value="` + selectedDriver.workContract + `">
                    </div>
    </div>
    <div id="modalMoreInfoButtons">
        <button id="btnModalInfoSaveChanges" class="btnModal btnModalInfoSaveChanges">Sačuvaj promene</button>
        <button id="btnCancelModalInfo" class="btnModal btnModalInfoCancel">Odustani</button>
    </div>`;

    document.getElementById("btnModalInfoSaveChanges").addEventListener("click", saveChanges);
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

function deleteDriverFromDB(e) {
    let driverUMCNDelete = e.target.getAttribute("data-UMCN");

    console.log(e.target.getAttribute("data-UMCN"));
    axios.post("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/delete/" + driverUMCNDelete)
        .then(res => {
            if (res.status === 200) {
                getDataFromDB();
                showSuccessScreenOnModalDeleteDriver();
            }
        })
        .catch(err => console.log(err));
}

function showSuccessScreenOnModalDeleteDriver() {
    document.getElementById("modalDeleteWrapperContent").innerHTML = "";
    document.getElementById("modalDeleteWrapperContent").innerHTML = `
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" id="checkAnimation">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
    </div>
    <div id="modalSuccess">Vozač je obrisan iz baze podataka!</div>
    <div>
        <button class="btnModal btnModalInfoSaveChanges" id="closeModalSuccessDeleteDriver">Zatvori</button>
    </div>
    `;

    document.getElementById("closeModalSuccessDeleteDriver").addEventListener("click", openCloseModalWindowDelete);
    document.getElementById("modalWrapper").style.width = "50%";
}

function saveChanges() {
    let name = document.getElementById("driverName").value;
    let lastName = document.getElementById("driverLastName").value;
    let umcn = document.getElementById("driverUMCN").value;
    let numberOfPassport = document.getElementById("driverPassportNumber").value;
    let numberOfId = document.getElementById("driverIdNumber").value;
    let workContract = document.getElementById("driverWorkNumber").value;

    let driver = {
        "name": name,
        "lastName": lastName,
        "umcn": umcn,
        "numberOfPassport": numberOfPassport,
        "workContract": workContract,
        "numberOfId": numberOfId
    }
    if (validateFieldsDriver(driver)) {

        // axios.post("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/insertNew", driver)
        //     .then(res => {
        //         if (res.status === 200) {
        //             getDataFromDB();
        //             showSuccessScreenOnModalDriverMoreInfo();
        //         }
        //     })
        // .catch(err => 
        //     err?
        //     alert('Greška prilikom komunikacije sa bazom podataka.'):null);
    }

}

function openCloseModalWindowDelete() {
    document.getElementById("modalDelete").classList.toggle("PrikaziVisibility");
}

function openCloseModalWindowInfo() {
    document.getElementById("modalMoreInfo").classList.toggle("PrikaziVisibility");
    document.getElementById("modalWrapperInfo").style.width = "70%";
}

function openCloseModalAddDriver() {
    fillmodalAddDriverWithHTML();
    document.getElementById("modalAddDriver").classList.toggle("PrikaziVisibility");
}