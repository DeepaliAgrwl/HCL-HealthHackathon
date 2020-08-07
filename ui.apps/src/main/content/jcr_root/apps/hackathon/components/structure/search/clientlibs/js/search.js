
$(document).ready(function () {

});

let dataResponse_dummy = {
	"cityList":
	[
		{
			"city_name": "Noida",
			"city_id": "ND"
		},
		{
			"city_name": "Banglore",
			"city_id": "BLR"
		}
	],
	"keywords":
		{
			"resturant":["Hotel", "resturant", "dining"],
			"shopping-malls":["shopping-mall", "shop", "mall", "shopping"]
			
		}	

};
//var datajson= JSON.parse(dataResponse_dummy);
var datajson= dataResponse_dummy;

const searchPlaces = function () {
    const searchString =  $('#searchString').val();
    if(searchString && searchString.length >= 3)
    {

		for (item in datajson['keywords']) {

            datajson['keywords'][item].forEach(keywords => {

				if(keywords.toLowerCase().includes(searchString.toLowerCase()))
                {
                    console.log(item);
                }

               // selectHTMLCnty += "<option value='"+ item.city_id + "' />" + item.city_name + "</option>";
        	});

        }


    }

}