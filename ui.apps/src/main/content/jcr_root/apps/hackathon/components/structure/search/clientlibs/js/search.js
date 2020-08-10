let serachResultJson = [];
$(document).ready(function () {
    $('.searchFilter').on('change', function() {
          localStorage.setItem('serachFilter', this.value);
     });


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
	searchByKeywords();
}


const onSearchString = function (event) {
    $('.search_errormsg').css({'display' : 'none'});
	if(event.which===13 || event.keyCode ===13)
    {
		searchByKeywords();
    }
}



const searchByKeywords = function () {

    //let searchFilter = localStorage.getItem('serachFilter');
    let selectedCityId = $('#city').val();
    let searchFilter = $('.searchFilter').val();
	localStorage.setItem('serachFilter',searchFilter);
	const searchString =  $('#searchString').val();
    if(searchString && searchString.length >= 3)
    {
        if(searchFilter == "category" || searchFilter==null){
        	let searchResult = "";
            for (item in datajson['keywords']) {
                datajson['keywords'][item].forEach(keywords => {
                    if(keywords.toLowerCase().includes(searchString.toLowerCase()))
                    {
                        searchResult = item;
                    }
                });
            }
            if(searchResult)
            {
                localStorage.setItem('serachString',searchResult);
                localStorage.setItem('selectCityId', selectedCityId);
                window.location.href = $('.cmp-search__input').attr('searchRedirectionUrl');
    
            }
            else
            {
                    $('.search_errormsg').css({'color' : 'red', 'font-size' : '15px', 'display' : 'block'});
            }
    	}
    	else
        {
            searchDataJson
            let searchResult = "";
            for (item in searchDataJson) {
                searchDataJson[item].forEach(searchItm => {
                    if(searchItm.name.toLowerCase().includes(searchString.toLowerCase()))
                    {
						serachResultJson.push(searchItm.areaId);
                    }
                });
            }
            if(serachResultJson && serachResultJson.length>0)
            {
                localStorage.setItem('serachString',JSON.stringify(serachResultJson));
                localStorage.setItem('selectCityId', selectedCityId);
                window.location.href = $('.cmp-search__input').attr('searchRedirectionUrl');
    
            }
            else
            {
                    $('.search_errormsg').css({'color' : 'red', 'font-size' : '15px', 'display' : 'block'});
            }

        }


    }
}