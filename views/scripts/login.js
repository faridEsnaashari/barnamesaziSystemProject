function sendFormInfo(event){
    event.preventDefault();

    const usernameInput = document.getElementsByName("username")[0];
    const passwordInput = document.getElementsByName("password")[0];
    const errorDiv = document.getElementsByName("error")[0];
    
    if(!usernameInput.value || !passwordInput.value){
        const currentErrorParagraph = errorDiv.children[0];
        if(!currentErrorParagraph){
            const errorParagraph = document.createElement("P");
            errorParagraph.innerHTML = "fill username and password field"

            errorDiv.appendChild(errorParagraph);
        }
        else{
            const errorParagraph = document.createElement("P");
            errorParagraph.innerHTML = "fill username and password field"

            errorDiv.replaceChild(errorParagraph, currentErrorParagraph);
        }
    }
    else{
        wrongUserOrPass();
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                redirectToDashboard();
            }
            else if(this.readyState == 4 && this.status == 401){
                wrongUserOrPass();
            }
        };

        const data = {
            username : usernameInput.value,
            password : passwordInput.value
        };
        const dataToSend = JSON.stringify(data);
        xhttp.open("POST", "http://localhost:3000/admin/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
    }
}


function wrongUserOrPass(){
    const errorDiv = document.getElementsByName("error")[0];
    const currentErrorParagraph = errorDiv.children[0];

    if(!currentErrorParagraph){
        const errorParagraph = document.createElement("P");
        errorParagraph.innerHTML = "wrong username or password"

        errorDiv.appendChild(errorParagraph);
    }
    else{
        const errorParagraph = document.createElement("P");
        errorParagraph.innerHTML = "wrong username or password"

        errorDiv.replaceChild(errorParagraph, currentErrorParagraph);
    }
} 

function redirectToDashboard(){
    window.location = 'http://localhost:3000/admin/dashboard';
} 
