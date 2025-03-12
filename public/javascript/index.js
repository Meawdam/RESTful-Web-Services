//connect to '/now' to get datetime
async function getTime() {
    try {
        const response = await fetch('/now');
        if(response.status != 200){
            //error
            throw Error('Bad response');
        } else {
            //ok
            //convert response to text
            const now = await response.text();
            document.querySelector('h3').textContent = `Current datetime is ${now}`;
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message)
    }
}

getTime();