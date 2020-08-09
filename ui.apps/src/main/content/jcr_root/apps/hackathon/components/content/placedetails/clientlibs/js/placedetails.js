$(document).ready(function () {

   // var obj= {name :  'Restaurant', areaId :  '1', placeId :  '16774318'  }
      
    let placeDetail = {};
    let covidDetail = {};
    const othrParm = {
        headers: { "content-type": "application/json; charset=UTF-8", 'Accept': 'application/json' },
      //  body: JSON.stringify(formdata),
        method: "GET"
    }

    fetch('/bin/hackathon/placeslist')
        .then(
            (response) => { return response.json(); },
            (rejected) => {
                console.log(rejected);
            })
        .then(data => {            
            placeDetail = data["Restaurant"].filter(item => item.areaId == 1)[0];
            covidDetail = data['covid'].filter(item => item.areaId == 1)[0];

            document.getElementById('place-title').innerHTML = placeDetail.name;
            document.getElementById('place-image').src= placeDetail.image;
            document.getElementById('place-desc').innerHTML = placeDetail.description;
            document.getElementById('place-rating').innerHTML = placeDetail.rating;
            document.getElementById('covid-cases').innerHTML = covidDetail.covidcases;
            document.getElementById('covid-recovered').innerHTML = covidDetail.RecoveredCases;
            document.getElementById('covid-severity').innerHTML = covidDetail.covidseverity;
            document.getElementById('place-review').innerHTML = placeDetail.review_text;
        })        
        .catch((error) => {
            console.log('promise error', error);
        });
});
