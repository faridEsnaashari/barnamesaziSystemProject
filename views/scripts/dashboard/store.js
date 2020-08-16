var checkedCheckbox = [];
let lowNumber = 0;
let highNumber = 10;

window.addEventListener('DOMContentLoaded', function(event){
    getItems(lowNumber,highNumber);
});

function getItems(lownumber, highnumber){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hidePreviousItemContentFromTable();
            insertItemsContentInTable(this.response);
        }
        if (this.readyState == 4 && this.status == 404) {
            lowNumber -= 10;
            highNumber -= 10;
        }
        if (this.readyState == 4 && this.status == 400) {
            lowNumber += 10;
            highNumber += 10;
        }
    };

    const url = `http://localhost:3000/admin/dashboard/store?lownumber=${ lownumber }&highnumber=${ highnumber }`;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function insertItemsContentInTable(res){
    const itemsArray = JSON.parse(res).items;
    const table = document.getElementsByTagName("table")[0];

    itemsArray.forEach(function(item){
        let tableRow = null;
        if(!(tableRow = getTheTableRow(item.itemId.toString(), table))){
            createRowAndAddItToTable(item, table);
        }
        else{
            showHiddenRow(tableRow);
        }
    });
}

function showHiddenRow(row){
    row.style.display = "table-row";
}

function getTheTableRow(itemId, table){
    const tableRows = getRowsOfTable(table);
    for(let i = 0; i < tableRows.length; i++){
        //each row has a hidden coloumn with rowId(relative itemId to item that its contents are in that row) in it.
        const row = tableRows[i];
        const rowId = row.childNodes[1].innerHTML;
        if(rowId === itemId){
            return row;
        }
    }
    return false;
}

function getRowsOfTable(table){
    let tableRow = [];
    for(let i = 2; i < table.childNodes.length; i++){
        tableRow.push(table.childNodes[i]);
    }
    return tableRow;
}

function createRowAndAddItToTable(item, table){
    const tableRow = document.createElement("TR");

    addCheckboxToRow(tableRow, item.itemId);

    for(itemContent in item){
        const tableCol = document.createElement("TD");
        tableCol.innerHTML = item[itemContent];

        if(itemContent === "itemId"){
            tableCol.style.display = "none";
        }

        tableRow.appendChild(tableCol);
    }

    table.appendChild(tableRow);
}

function hidePreviousItemContentFromTable(){
    const tableRow = document.getElementsByTagName("TR");

    const rowCount = tableRow.length;
    for(let i = 1; i < rowCount; i++){
        tableRow[i].style.display = "none";
    }
}

function addCheckboxToRow(tableRow, checkboxId){
    const checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", checkboxId.toString());
    checkBox.onchange = checkboxStatusChanged;

    const tableCol = document.createElement("TD");

    tableCol.appendChild(checkBox);
    tableRow.appendChild(tableCol);
}

function checkboxStatusChanged(){
    const checkBox = this;
    if(checkBox.checked){
        if(!checkedCheckbox.includes(checkBox.id)){
            checkedCheckbox.push(checkBox.id);
        }
    }
    else{
        if(checkedCheckbox.includes(checkBox.id)){
            checkedCheckbox = checkedCheckbox.filter(function(id){
                return id !== checkBox.id 
            });
        }
    }
    if(checkedCheckbox.length === 1){
        insertItemDataToUpdateForm(checkedCheckbox[0]);
        enableUpdateForm();
    }
    else{
        disableUpdateForm();
    }
}

function insertItemDataToUpdateForm(id){
    const table = document.getElementsByTagName("table")[0];

    const tableRow = getTheTableRow(id.toString(), table);
    const itemDetailsInTable = {
        name: tableRow.children[2].innerHTML,
        count: tableRow.children[3].innerHTML,
        price: tableRow.children[4].innerHTML
    }

    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    updateForm.children[1].value = itemDetailsInTable.name;
    updateForm.children[5].value = itemDetailsInTable.count;
    updateForm.children[9].value = itemDetailsInTable.price;
}

function enableUpdateForm(){
    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    for(element in updateForm.children){
        updateForm[element].disabled = false;
        console.log(updateForm[element]);
    }
}

function disableUpdateForm(){
    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    for(element in updateForm.children){
        updateForm[element].disabled = true;
        console.log(updateForm[element]);
    }
}


function getNextItems(){
    lowNumber += 10;
    highNumber += 10;

    getItems(lowNumber,highNumber);
}

function getPreviousItems(){
    lowNumber -= 10;
    highNumber -= 10;

    getItems(lowNumber,highNumber);
}

function deleteItem(){
    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "items deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("item not found");
            operationsStatusParagraph.innerHTML = "items deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "items deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 403) {
            //window.location = 'http://localhost:3000/admin/login';
            refreshPage();
        }
    };

    const data = {
        items : checkedCheckbox
    };
    const dataToSend = JSON.stringify(data);
    xhttp.open("DELETE", "http://localhost:3000/admin/dashboard/store", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function updateItem(event){
    event.preventDefault();

    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "item updated successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "item updated successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 403) {
            //window.location = 'http://localhost:3000/admin/login';
            refreshPage();
        }
    };

    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];
    const data = {
        itemId : checkedCheckbox[0],
        name : updateForm.children[1].value,
        count : updateForm.children[5].value,
        price : updateForm.children[9].value
    };

    const dataToSend = JSON.stringify(data);
    xhttp.open("PUT", "http://localhost:3000/admin/dashboard/store", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function insertItem(event){
    event.preventDefault();

    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "item inserted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "item inserted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 403) {
            //window.location = 'http://localhost:3000/admin/login';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("item already existed");
            operationsStatusParagraph.innerHTML = "item already existed";
            //window.location = 'http://localhost:3000/admin/dashboard/store';
            refreshPage();
        }
    };

    const insertFormDiv = document.getElementById("insertForm");
    const insertForm = insertFormDiv.children[0];

    if(!insertForm.children[1].value || !insertForm.children[5].value || !insertForm.children[9].value){
        operationsStatusParagraph.innerHTML = "invalid inputs";
        return;
    }

    const data = {
        name : insertForm.children[1].value,
        count : insertForm.children[5].value,
        price : insertForm.children[9].value
    };
    console.log(data);

    const dataToSend = JSON.stringify(data);
    xhttp.open("POST", "http://localhost:3000/admin/dashboard/store", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function refreshPage(){
    checkedCheckbox.length = 0;
    getItems(lowNumber,highNumber);
    disableUpdateForm();
}
