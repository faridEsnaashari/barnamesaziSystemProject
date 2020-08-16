var checkedCheckbox = [];
let lowNumber = 0;
let highNumber = 10;

window.addEventListener('DOMContentLoaded', function(event){
    getusers(lowNumber,highNumber);
});

function getusers(lownumber, highnumber){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hidePreviousUserContentFromTable();
            insertUsersContentInTable(this.response);
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

    const url = `http://localhost:3000/admin/dashboard/user?lownumber=${ lownumber }&highnumber=${ highnumber }`;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function insertUsersContentInTable(res){
    const usersArray = JSON.parse(res).users;
    const table = document.getElementsByTagName("table")[0];

    usersArray.forEach(function(user){
        let tableRow = null;
        if(!(tableRow = userContentExist(user, table))){
            createRowAndAddItToTable(user, table);
        }
        else{
            showHiddenRow(tableRow);
        }
    });
}

function showHiddenRow(row){
    row.style.display = "table-row";
}

function userContentExist(user, table){
    const tableRows = getRowsOfTable(table);
    for(let i = 0; i < tableRows.length; i++){
        //each row has a hidden coloumn with rowId(relative userId to user that its contents are in that row) in it.
        const row = tableRows[i];
        const rowId = row.childNodes[1].innerHTML;
        if(rowId === user.userId.toString()){
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

function createRowAndAddItToTable(user, table){
    const tableRow = document.createElement("TR");

    addCheckboxToRow(tableRow, user.userId);

    for(userContent in user){
        const tableCol = document.createElement("TD");
        tableCol.innerHTML = user[userContent];

        if(userContent === "userId"){
            tableCol.style.display = "none";
        }

        tableRow.appendChild(tableCol);
    }

    table.appendChild(tableRow);
}

function hidePreviousUserContentFromTable(){
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
}

function getNextUsers(){
    lowNumber += 10;
    highNumber += 10;

    getusers(lowNumber,highNumber);
}

function getPreviousUsers(){
    lowNumber -= 10;
    highNumber -= 10;

    getusers(lowNumber,highNumber);
}

function deleteUser(){
    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "users deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/user';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("user not found");
            operationsStatusParagraph.innerHTML = "users deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/user';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "users deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/user';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 403) {
            //window.location = 'http://localhost:3000/admin/login';
            refreshPage();
        }
    };

    const data = {
        users : checkedCheckbox
    };
    const dataToSend = JSON.stringify(data);
    xhttp.open("DELETE", "http://localhost:3000/admin/dashboard/user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function activateDeActivateUser(){
    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "users updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/user';
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("user not found");
            operationsStatusParagraph.innerHTML = "users updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/user';
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "users updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/user';
        }
        if (this.readyState == 4 && this.status == 403) {
            window.location = 'http://localhost:3000/admin/login';
        }
    };

    const data = {
        users : [] 
    };

    checkedCheckbox.forEach(function(id){
        const tableRow = document.getElementsByTagName("TR")
        for(let i = 1; i < tableRow.length; i++){
            if(id === tableRow[i].children[1].innerHTML){
                const active = tableRow[i].children[10].innerHTML;
                const user = {
                    id : id,
                    active : !(active === "true")
                };

                data.users.push(user);
            }
        }
    });
    const dataToSend = JSON.stringify(data);
    xhttp.open("PUT", "http://localhost:3000/admin/dashboard/user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function refreshPage(){
    checkedCheckbox.length = 0;
    getusers(lowNumber,highNumber);
    disableUpdateForm();
}
