function display(){
    
    const data=`
    <div class="form">    
        <form>
            <div style="margin-top: 110px; margin-left: 83px; font-size: 18px;">
                <span>FROM</span>
                <select class="form-select form-select-lg mb-3"  id="Start" aria-label=".form-select-lg example" style="font-size: large; width: 243px;">
                    
                </select>
            </div>
            <div style="margin-top: -46px; margin-left: 500px; font-size: 18px;">
                <span>TO</span>
                <select class="form-select form-select-lg mb-3" id="end" aria-label=".form-select-lg example"  style="font-size: large; width: 243px;">
                    
                </select>
            </div>
            <div style="margin-top: -48px;margin-left: 885px;font-size: 18px;">
                <span>Date</span>
                <input type="date" id="date">
            </div>
            <div style="margin-top: 110px; margin-left: 75px; font-size: 18px;">
                <span>Number of passengers</span>
                <input type="number" id="no" min="1">
            </div>
            <div style="margin-top: -34px; margin-left: 740px; font-size: 18px;">
                <span>Seat Type</span>
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style="font-size: large;">
                    <option selected>Select class</option>
                    <option value="1">Economy</option>
                    <option value="2">Business</option>
                    <option value="3">First Class</option>
                </select>     
            </div>
            <div style="margin-top: 88px; margin-left: 543px;font-size: 25px;">
                <input type="button" style="border-radius: 9px;" value="Check Flights" onclick="display2()">
            </div>
          </form>
        </div>   
 `
document.getElementById("content").innerHTML+=data;

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
        
        data.Places.forEach(element => {
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
        
        data.Places.forEach(element => {
            document.getElementById("end").innerHTML+= ` <option>${element.PlaceName}</option>`
        });
        
    }
    )
    .catch(err => {
        console.error(err);
    })
    



}
async function display2(){
    var l=document.getElementById("Start").value
    var m=document.getElementById("end").value
    var city1="";
    var city2="";
    const x=`<table id="ans" border="2">
    <th>Source &rarr; Destination</th>
    <th>Airlines</th>
    <th>Price</th>
    <th>Total Price</th>
    
</table>`


    await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${l}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "7fb6e6e027mshdb4b803bc116c32p1b254fjsndf9b4e669c03"
        }
    })
    .then(response=>response.json()).then(data=>{
        city1=data.Places[0].CityId
        console.log(city1)

        //localStorage.setItem("city1",data.Places[0].CityId)
        //console.log(localStorage.getItem("city1"))

    }).catch(err => {
        console.error(err);
    })
    await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${m}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "7fb6e6e027mshdb4b803bc116c32p1b254fjsndf9b4e669c03"
        }
    })
    .then(response=>response.json()).then(data=>{
        // window.city2=data.Places[0].CityId
        city2=data.Places[0].CityId
        console.log(city2)
        //localStorage.setItem("city2",data.Places[0].CityId)
        //console.log(localStorage.getItem("city2"))
        

    }).catch(err => {
        console.error(err);
    })
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/INR/en-US/${city2}/${city1}/${document.getElementById("date").value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "7fb6e6e027mshdb4b803bc116c32p1b254fjsndf9b4e669c03"
        }
        })
    .then(response => response.json()).then(data=>{
        var a=0
        data.Carriers.forEach(element=>{
        document.getElementById("ans").innerHTML+=`<tr><td>${l}&rarr;${m}</td><td>${element.Name}</td><td>${data.Quotes[a].MinPrice}</td><td>${data.Quotes[a].MinPrice*document.getElementById("no").value}</td></tr>`
        a=a+1
    })})
    .catch(err => {
        console.error(err);
    });
    document.getElementById("w").innerHTML+=x;
}

