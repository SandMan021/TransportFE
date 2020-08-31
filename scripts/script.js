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

//http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/getAll

axios.get("http://3.21.92.112:8080/TransportPall-0.0.1-SNAPSHOT/transportPal/driver/getAll",  { crossdomain: true })
.then(res=>{
    nekiNizKojiJeStigaoSaAPIJA = res.data;
    console.log("Ovo je stiglo", nekiNizKojiJeStigaoSaAPIJA);
})
.catch(err=>{
    console.log(err.response);
});

function addListenersToDelete() {
    let listOfDeleteButtonsInTable = document.getElementsByClassName("btnDelete");
    for (let i = 0; i < listOfDeleteButtonsInTable.length; i++) {
        listOfDeleteButtonsInTable[i].addEventListener("click", openCloseModalWindowDelete);
    }
}

document.getElementById("zatvoriModalniDetaljnije").addEventListener("click", openCloseModalWindowDelete);
document.getElementById("modalDelete").addEventListener("click", checkIfClickedModalDelete);
document.getElementById("btnCancelDeleteDriver").addEventListener("click", openCloseModalWindowDelete);


function checkIfClickedModalDelete(e) {
    if (e.target === document.getElementById("modalDelete")) {
        openCloseModalWindowDelete();
    }
}

buildTable(array);

function buildTable(data) {
    var table = document.getElementById('driverTableBody');

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
            <td>` + data[i].id + `</td>
            <td>` + data[i].name + `</td>
            <td>` + data[i].lastName + `</td>
            <td>` + data[i].umcn + `</td>
            <td>` + data[i].workbookNumber + `</td>
            <td>
            <button class="btnTable">Detaljnije / Uredi</button>
            <button class="btnTable btnDelete">Obriši</button></td>
            </tr>`;

        table.innerHTML += row;
    }

    addListenersToDelete();
}


function deleteRecord(e) {

    openCloseModalWindowDelete();
}

function openCloseModalWindowDelete() {
    document.getElementById("modalDelete").classList.toggle("PrikaziVisibility");
}