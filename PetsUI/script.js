const startButton = document.querySelector('#btnStart');



this.addEventListener('click', function(){
    addPet('Patel');
})


function getPets(){
    


}

function addPet(Name){

    var body = {
        name: Name
    }

    fetch('https://localhost:7244/api/Pets', {
        method: 'POST',
        body : JSON.stringify(body),
        headers : {
            "content-type" : "application/json"
        }
    }).then(data => data.json())
    .then(response => console.log(response));

}



