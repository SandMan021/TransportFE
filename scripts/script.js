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
}