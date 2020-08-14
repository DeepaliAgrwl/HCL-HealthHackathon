/*<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2U87MpLQOIdn4M0qh9YfCyjTTrjATqI8" defer></script>*/
let covidseverity;
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


let latitude = "";
let longitude = "";


    const placeDeatils = getUserCookie("placeDetails");
    let placeDetailsJson;
if(placeDeatils){
        	placeDetailsJson = JSON.parse(placeDeatils);

 //function getLocation(){
    //var zipcode = $('#zipCode').val();
if(placeDetailsJson.address!= ""){

    latlon(placeDetailsJson.address);

		/*};*/
}
    function latlon(address){

         $.ajax({
       url : "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC2U87MpLQOIdn4M0qh9YfCyjTTrjATqI8&address="+address+"&sensor=false",
       method: "POST",
       success:function(data){
           latitude = data.results[0].geometry.location.lat;
           longitude= data.results[0].geometry.location.lng;
     initMap(latitude,longitude)
       }
    	});
    }
}
function initMap(latitude,longitude) {


    const data = {
   "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJuaXRoaW5pdGhlc2hrdW1hckBnbWFpbC5jb20ifQ.p2W2_YCu6RKJhBvJuhhBO_2J72xKVcFA59TkZqbt9cg",
  "lng": longitude,
  "lat": latitude,
  "radius": 5000
  }

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom:12,
    center: {lat: latitude, lng: longitude},
    //mapTypeId: 'terrain'
  });

     var cityCircle = new google.maps.Circle({
      			strokeColor: 'BLACK',
      			strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'BLACK',
              fillOpacity: 0.35,
              map: map,
         	center: {"lng": longitude,"lat": latitude},
              radius: 400
    });

   const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const message= JSON.parse(this.responseText)['containmentZoneNames']
                covidseverity = JSON.parse(this.responseText)['numberOfNearbyZones']
				if(covidseverity <3)
                	document.getElementById('covid-severity').innerHTML = "LOW";
                else if(covidseverity >5 && covidseverity <=8)
                	document.getElementById('covid-severity').innerHTML ="MODERATE";
				else if(covidseverity >8)
                	document.getElementById('covid-severity').innerHTML = "HIGH";
				console.log(message)
                for(let i=0;i<message.length;i++){
					 $.ajax({
       url : "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC2U87MpLQOIdn4M0qh9YfCyjTTrjATqI8&address="+message[i].trim()+"&sensor=false",
       method: "POST",
       success:function(data){
           latitude = data.results[0].geometry.location.lat;
           longitude= data.results[0].geometry.location.lng;
            var city = {lat: latitude, lng: longitude};

			 var cityCircle = new google.maps.Circle({
      			strokeColor: '#FF0000',
      			strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: map,
              center: city,
              radius: 200
    });

             var contents =  '<div style= "max-width:100 !important"><p style="color:red">Containmnet Zone  &#128543;</p>'+message[i]+'<div>';

      var infowindow = new google.maps.InfoWindow({    
    content: contents    
  });


         google.maps.event.addListener(cityCircle, 'click', function(ev){
    infowindow.setPosition(cityCircle.getCenter());
    infowindow.open(map);
});	
       }
    	});



  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  /*for (var city in citymap) {
    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: citymap[city].center,
      radius: Math.sqrt(citymap[city].population) * 100
    });
  }*/
                }
            }
        };
        xhttp.open("POST", "https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify(data));

      /*  var city = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
                      zoom: 10,
                      mapMaker: true,
                      rotateControl: true,
                      center: city
                  });
        var marker = new google.maps.Marker({
                    position: city,
                    map: map
                 });*/
      }



/*$(document).ready(function () {*/


if(latitude!= "" && longitude != ""){

/*const data = {
   "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJuaXRoaW5pdGhlc2hrdW1hckBnbWFpbC5jb20ifQ.p2W2_YCu6RKJhBvJuhhBO_2J72xKVcFA59TkZqbt9cg",
  "lng": latitude,
  "lat": longitude,
  "radius": 5000
  }


   const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const message= JSON.parse(this.responseText)['containmentZoneNames']
				console.log(message)
            }
        };
        xhttp.open("POST", "https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
*/		xhttp.send(JSON.stringify(data));


}




                document.getElementById('place-title').innerHTML = placeDetailsJson.name;
                document.getElementById('time').innerHTML = placeDetailsJson.time;
                document.getElementById('place-image').src= placeDetailsJson.image;
                document.getElementById('place-desc').innerHTML = placeDetailsJson.description;
				//document.getElementById('place-review').innerHTML = placeDetail.review_text;
                document.getElementById('modeified-date').innerHTML = placeDetailsJson.modeifiedDate;
                document.getElementById('covid-cases').innerHTML = placeDetailsJson.covidcases;
                document.getElementById('covid-recovered').innerHTML = placeDetailsJson.RecoveredCases;



				document.getElementById("rating" + placeDetailsJson.rating * 2).checked = true;


