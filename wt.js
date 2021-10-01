function display(){
    

    var w=document.getElementById("from").value  
    console.log(w)
    var x=document.getElementById("to").value
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${w}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "7fb6e6e027mshdb4b803bc116c32p1b254fjsndf9b4e669c03"
        }
    })
    .then(response => response.json()
    ).then(data => {
        console.log(data);
        console.log(data.Places);
        data.Places.forEach(element => {
            console.log(element);
            document.getElementById("Start").innerHTML+= ` <option>${element.PlaceName}</option>`;
        });
        
    }
    )
    .catch(err => {
        console.error(err);
    })
    
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${x}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "7fb6e6e027mshdb4b803bc116c32p1b254fjsndf9b4e669c03"
        }
    })
    .then(response => response.json()
    ).then(data => {
        console.log(data);
        console.log(data.Places);
        data.Places.forEach(element => {
            console.log(element);
            document.getElementById("end").innerHTML+= ` <option>${element.PlaceName}</option>`
        });
        
    }
    )
    .catch(err => {
        console.error(err);
    })
    



}
