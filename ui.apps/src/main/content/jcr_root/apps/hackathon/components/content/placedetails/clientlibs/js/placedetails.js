$(document).ready(function () {


    const getUserCookie = function (cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
	}	

    const placeDeatils = getUserCookie("placeDetails");
    let placeDetailsJson = JSON.parse(placeDeatils);

      
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
            placeDetail = data[placeDetailsJson.category].filter(item => (item.areaId == placeDetailsJson.areaId && item.id == placeDetailsJson.id))[0];
            covidDetail = data['covid'].filter(item =>item.areaId == placeDetailsJson.areaId)[0];

            document.getElementById('place-title').innerHTML = placeDetail.name;
			document.getElementById('time').innerHTML = placeDetail.hours;
            document.getElementById('place-image').src= placeDetail.image;
            document.getElementById('place-desc').innerHTML = placeDetail.description;
            document.getElementById('modeified-date').innerHTML = covidDetail.modeifiedDate;
            document.getElementById('covid-cases').innerHTML = covidDetail.covidcases;
            document.getElementById('covid-recovered').innerHTML = covidDetail.RecoveredCases;
            document.getElementById('covid-severity').innerHTML = covidDetail.covidseverity;
            document.getElementById('place-review').innerHTML = placeDetail.review_text;

        })        
        .catch((error) => {
            console.log('promise error', error);
        });
});
