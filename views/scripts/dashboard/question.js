var checkedCheckbox = [];
let lowNumber = 0;
let highNumber = 10;

window.addEventListener('DOMContentLoaded', function(event){
    getQuestions(lowNumber,highNumber);
});

function getQuestions(lownumber, highnumber){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hidePreviousQuestionContentFromTable();
            insertQuestionsContentInTable(this.response);
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

    const url = `http://localhost:3000/admin/dashboard/question?lownumber=${ lownumber }&highnumber=${ highnumber }`;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function insertQuestionsContentInTable(res){
    const questionsArray = JSON.parse(res).questions;
    const table = document.getElementsByTagName("table")[0];

    questionsArray.forEach(function(question){
        let tableRow = null;
        if(!(tableRow = getTheTableRow(question.questionId.toString(), table))){
            createRowAndAddItToTable(question, table);
        }
        else{
            showHiddenRow(tableRow);
        }
    });
}

function showHiddenRow(row){
    row.style.display = "table-row";
}

function getTheTableRow(questionId, table){
    const tableRows = getRowsOfTable(table);
    for(let i = 0; i < tableRows.length; i++){
        //each row has a hidden coloumn with rowId(relative questionId to question that its contents are in that row) in it.
        const row = tableRows[i];
        const rowId = row.childNodes[1].innerHTML;
        if(rowId === questionId){
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

function createRowAndAddItToTable(question, table){
    const tableRow = document.createElement("TR");

    addCheckboxToRow(tableRow, question.questionId);

    for(questionContent in question){
        const tableCol = document.createElement("TD");
        tableCol.innerHTML = question[questionContent];

        if(questionContent === "questionId"){
            tableCol.style.display = "none";
        }

        tableRow.appendChild(tableCol);
    }

    table.appendChild(tableRow);
}

function hidePreviousQuestionContentFromTable(){
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
        insertQuestionDataToUpdateForm(checkedCheckbox[0]);
        enableUpdateForm();
    }
    else{
        disableUpdateForm();
    }
}

function insertQuestionDataToUpdateForm(id){
    const table = document.getElementsByTagName("table")[0];

    const tableRow = getTheTableRow(id.toString(), table);
    const questionDetailsInTable = {
        question: tableRow.children[2].innerHTML,
        answer1: tableRow.children[3].innerHTML,
        answer2: tableRow.children[4].innerHTML,
        answer3: tableRow.children[5].innerHTML,
        answer4: tableRow.children[6].innerHTML,
        currect: tableRow.children[7].innerHTML,
    }

    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];

    updateForm.children[1].value = questionDetailsInTable.question;
    updateForm.children[5].value = questionDetailsInTable.answer1;
    updateForm.children[9].value = questionDetailsInTable.answer2;
    updateForm.children[13].value = questionDetailsInTable.answer3;
    updateForm.children[17].value = questionDetailsInTable.answer4;
    updateForm.children[21].value = questionDetailsInTable.currect;
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


function getNextQuestions(){
    lowNumber += 10;
    highNumber += 10;

    getQuestions(lowNumber,highNumber);
}

function getPreviousQuestions(){
    lowNumber -= 10;
    highNumber -= 10;

    getQuestions(lowNumber,highNumber);
}

function deleteQuestion(){
    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "questions deleted successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("question not found");
            operationsStatusParagraph.innerHTML = "questions deleted successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "questions deleted successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 403) {
            window.location = 'http://localhost:3000/admin/login';
        }
    };

    const data = {
        questions : checkedCheckbox
    };
    const dataToSend = JSON.stringify(data);
    xhttp.open("DELETE", "http://localhost:3000/admin/dashboard/question", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function updateQuestion(event){
    event.preventDefault();

    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "question updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "question updated successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 403) {
            window.location = 'http://localhost:3000/admin/login';
        }
    };

    const updateFormDiv = document.getElementById("updateForm");
    const updateForm = updateFormDiv.children[0];
    const data = {
        questionId : checkedCheckbox[0],
        question : updateForm.children[1].value,
        answer1 : updateForm.children[5].value,
        answer2 : updateForm.children[9].value,
        answer3 : updateForm.children[13].value,
        answer4 : updateForm.children[17].value,
        currect : updateForm.children[21].value
    };

    const dataToSend = JSON.stringify(data);
    xhttp.open("PUT", "http://localhost:3000/admin/dashboard/question", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}

function insertQuestion(event){
    event.preventDefault();
    console.log("sla");

    const operationsStatusParagraph = document.getElementById("operationsStatus");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.status);
        if(this.readyState == 1){
            operationsStatusParagraph.innerHTML = "wait";
        }
        if (this.readyState == 4 && this.status == 200) {
            operationsStatusParagraph.innerHTML = "question inserted successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 400) {
            console.error("bad parameter provided");
            operationsStatusParagraph.innerHTML = "question inserted successfully";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
        if (this.readyState == 4 && this.status == 403) {
            window.location = 'http://localhost:3000/admin/login';
        }
        if (this.readyState == 4 && this.status == 409) {
            console.error("question already existed");
            operationsStatusParagraph.innerHTML = "question already existed";
            window.location = 'http://localhost:3000/admin/dashboard/question';
        }
    };

    const insertFormDiv = document.getElementById("insertForm");
    const insertForm = insertFormDiv.children[0];
    const data = {
        question : insertForm.children[1].value,
        answer1 : insertForm.children[5].value,
        answer2 : insertForm.children[9].value,
        answer3 : insertForm.children[13].value,
        answer4 : insertForm.children[17].value,
        currect : insertForm.children[21].value
    };
    console.log(data);

    const dataToSend = JSON.stringify(data);
    xhttp.open("POST", "http://localhost:3000/admin/dashboard/question", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataToSend);
}
