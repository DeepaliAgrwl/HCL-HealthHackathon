let dataResponse ;

$(document).ready(function () {

	if(document.querySelector('#city')){
        getCityList();

    }
});


const getCityList = function () {
    let url = '/bin/hackathon/citylist';
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            dataResponse = JSON.parse(this.responseText);

            //update the country select box
            let selectHTMLCnty = '<option value="none">Select your city</option>';
            const cityELm = document.getElementById('city');
            dataResponse['cityList'].forEach(item => {
                 selectHTMLCnty += "<option value='"+ item.city_id + "' />" + item.city_name + "</option>";
            });
            if(cityELm && selectHTMLCnty) {
                cityELm.innerHTML = selectHTMLCnty;
            }

    	}
    }
    xhttp.open('GET',url,true);
    xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhttp.send();
}