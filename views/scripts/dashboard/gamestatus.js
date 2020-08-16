var checkedCheckbox = [];
let lowNumber = 0;
let highNumber = 10;

window.addEventListener('DOMContentLoaded', function(event){
    getGames(lowNumber,highNumber);
});

function getGames(lownumber, highnumber){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hidePreviousGameContentFromTable();
            insertGamesContentInTable(this.response);
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

    const url = `http://localhost:3000/admin/dashboard/gamestatus?lownumber=${ lownumber }&highnumber=${ highnumber }`;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function insertGamesContentInTable(res){
    const gamesArray = JSON.parse(res).games;
    const table = document.getElementsByTagName("table")[0];

    gamesArray.forEach(function(game){
        let tableRow = null;
        if(!(tableRow = getTheTableRow(game.gameId.toString(), table))){
            createRowAndAddItToTable(game, table);
        }
        else{
            showHiddenRow(tableRow);
        }
    });
}

function showHiddenRow(row){
    row.style.display = "table-row";
}

function getTheTableRow(gameId, table){
    const tableRows = getRowsOfTable(table);
    for(let i = 0; i < tableRows.length; i++){
        //each row has a hidden coloumn with rowId(relative gameId to game that its contents are in that row) in it.
        const row = tableRows[i];
        const rowId = row.childNodes[1].innerHTML;
        if(rowId === gameId){
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

function createRowAndAddItToTable(game, table){
    const tableRow = document.createElement("TR");

    addCheckboxToRow(tableRow, game.gameId, game.active);

    for(gameContent in game){
        const tableCol = document.createElement("TD");
        tableCol.innerHTML = game[gameContent];

        if(gameContent === "gameId"){
            tableCol.style.display = "none";
        }

        tableRow.appendChild(tableCol);
    }

    table.appendChild(tableRow);
}

function hidePreviousGameContentFromTable(){
    const tableRow = document.getElementsByTagName("TR");

    const rowCount = tableRow.length;
    for(let i = 1; i < rowCount; i++){
        tableRow[i].style.display = "none";
    }
}

function addCheckboxToRow(tableRow, checkboxId, active){
    const checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", checkboxId.toString());
    checkBox.onchange = checkboxStatusChanged;
    if(active === 1){
        checkBox.disabled = true;
    }

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
        insertGameDataToUpdateForm(checkedCheckbox[0]);
        enableUpdateForm();
    }
    else{
        disableUpdateForm();
    }
}

function insertGameDataToUpdateForm(id){
    const table = document.getElementsByTagName("table")[0];

    const tableRow = getTheTableRow(id.toString(), table);
    const gameDetailsInTable = {
        label: tableRow.children[2].innerHTML,
        duration: tableRow.children[3].innerHTML,
    }

    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    updateForm.children[1].value = gameDetailsInTable.label;
    updateForm.children[5].value = gameDetailsInTable.duration;
}

function enableUpdateForm(){
    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    for(element in updateForm.children){
        updateForm[element].disabled = false;
    }
}

function disableUpdateForm(){
    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    for(element in updateForm.children){
        updateForm[element].disabled = true;
    }
}


function getNextGames(){
    lowNumber += 10;
    highNumber += 10;

    getGames(lowNumber,highNumber);
}

function getPreviousGames(){
    lowNumber -= 10;
    highNumber -= 10;

    getGames(lowNumber,highNumber);
}

function deleteGame(){
    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "games deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("game not found");
            operationsStatusParagraph.innerHTML = "games deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "games deleted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 403) {
            //window.location = 'http://localhost:3000/admin/login';
            refreshPage();
        }
    };

    const data = {
        games : checkedCheckbox
    };
    const dataToSend = JSON.stringify(data);
    xhttp.open("DELETE", "http://localhost:3000/admin/dashboard/gamestatus", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function updateGame(event){
    event.preventDefault();

    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "game updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "game updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
        }
        if (this.readyState == 4 && this.status == 403) {
            window.location = 'http://localhost:3000/admin/login';
        }
    };

    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    const data = {
        gameId : checkedCheckbox[0],
        label : updateForm.children[1].value,
        duration : updateForm.children[5].value
    };
    console.log(data);

    const dataToSend = JSON.stringify(data);
    xhttp.open("PUT", "http://localhost:3000/admin/dashboard/gamestatus", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function insertGame(event){
    event.preventDefault();

    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "game inserted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "game inserted successfully";
            //window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 403) {
            //window.location = 'http://localhost:3000/admin/login';
            refreshPage();
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("game already existed");
            operationsStatusParagraph.innerHTML = "game already existed";
            //window.location = 'http://localhost:3000/admin/dashboard/gamestatus';
            refreshPage();
        }
    };

    const insertFormDiv = document.getElementById("insertForm");
    const insertForm = insertFormDiv.children[0];

    if(!insertForm.children[1].value || !insertForm.children[5].value){
        operationsStatusParagraph.innerHTML = "invalid inputs";
        return;
    }
    const data = {
        label : insertForm.children[1].value,
        duration : insertForm.children[5].value
    };
    console.log(data);

    const dataToSend = JSON.stringify(data);
    xhttp.open("POST", "http://localhost:3000/admin/dashboard/gamestatus", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);

    insertForm.children[1].value = "";
    insertForm.children[5].value = "";
}

function refreshPage(){
    checkedCheckbox.length = 0;
    getGames(lowNumber,highNumber);
    disableUpdateForm();
}
