document.querySelector('button').onclick = function() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    login(username, password);
}

async function login(username, password) {
    try {
        const options = {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({"username": username, "password": password})
        };
        const response = await fetch('/login', options);
        if(response.status != 200){
            //error
            throw Error('Bad response');
        } else {
            //ok
            //convert response to text
            const message = await response.text();
            alert(message);
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message)
    }
}