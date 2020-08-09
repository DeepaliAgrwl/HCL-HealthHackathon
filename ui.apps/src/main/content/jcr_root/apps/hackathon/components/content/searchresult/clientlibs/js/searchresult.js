let searchDataJson;
$(document).ready(function () {
    let searchString = localStorage.getItem('serachString');
    let selectedCity = localStorage.getItem('selectCityId');
    let searchFilter = localStorage.getItem('serachFilter');

	let url = '/bin/hackathon/dataJson';
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            searchDataJson = JSON.parse(this.responseText);
            	if(searchFilter == "category" || searchFilter==null){
					searchResultElem(searchDataJson[searchString],selectedCity);
                }
	            else
                {
					searchByNameResultElem(searchDataJson,searchString,selectedCity);
                }

    	}
    }
    xhttp.open('GET',url,true);
    xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhttp.send();

});

const searchResultElem = function(searchDataJson,selectedCity)
{
    let placeRatingMapping = [];
	let target = document.querySelector(".searchResults");
    let searchListElem = null;
		if(selectedCity !== "undefined")
        {
            searchListElem = searchDataJson.map((item,index) =>{
                        const ratingOrderIdMap = {};
                        if(item.cityCode==selectedCity) {
                			ratingOrderIdMap['areaId'] = item.areaId;
                            ratingOrderIdMap['rating'] = item.rating;

    							placeRatingMapping.push(ratingOrderIdMap);

							return renderSearchItem(item,index);

            			}

            }).join('');

		}
		else{	

			searchListElem = searchDataJson.map((item,index) =>{
                        const ratingOrderIdMap = {};
						ratingOrderIdMap['areaId'] = item.areaId;
                        ratingOrderIdMap['rating'] = item.rating;

    							placeRatingMapping.push(ratingOrderIdMap);
						return renderSearchItem(item,index);
            }).join('');

        }

        	if (searchListElem && target) {
            	target.innerHTML = searchListElem;

                 placeRatingMapping.forEach((item) =>{
					document.getElementById("rating" + item.rating * 2 +"-"+item.areaId).checked = true;
    			})

        	}
}


const renderSearchItem= function(item,index)
{

	return(
            `<div class ='cmp-result-main-container'>
					<div class="cmp-result-left-container" >
							<img class ='cmp-img' src= ${item.image}></img>                            
        					<div class="rate">
        						<input type="checkbox" id="rating10-${item.areaId}" name="rating10" value="5"/> <label for="rating10-${item.areaId}" title="5"></label>
                                 <input type="checkbox" id="rating9-${item.areaId}" name="rating9" value="4.5"/><label class="half" for="rating9-${item.areaId}" title="4.5"></label>
                                 <input type="checkbox" id="rating8-${item.areaId}" name="rating8" value="4" /><label for="rating8-${item.areaId}" title="4"></label>
                                 <input type="checkbox" id="rating7-${item.areaId}" name="rating7" value="3.5" /><label class="half" for="rating7-${item.areaId}" title="3.5"></label>
                                 <input type="checkbox" id="rating6-${item.areaId}" name="rating6" value="3" /><label for="rating6-${item.areaId}" title="3"></label>
                                 <input type="checkbox" id="rating5-${item.areaId}" name="rating5" value="2.5" /><label class="half" for="rating5-${item.areaId}" title="2.5"></label>
                                 <input type="checkbox" id="rating4-${item.areaId}" name="rating" value="2" /><label for="rating4-${item.areaId}" title="2"></label>
                                 <input type="checkbox" id="rating3-${item.areaId}" name="rating" value="1.5" /><label class="half" for="rating3-${item.areaId}" title="1.5"></label>
                                 <input type="checkbox" id="rating2-${item.areaId}" name="rating" value="1" /><label for="rating2-${item.areaId}" title="1"></label>
                                 <input type="checkbox" id="rating1-${item.areaId}" name="rating" value="0.5" /><label class="half" for="rating1-${item.areaId}" title="0.5"></label>
                                 <input type="checkbox" id="rating0-${item.areaId}" name="rating" value="0" /><label style="display:none" for="rating0-${item.areaId}" title="No star"></label>
                               </div>

                       </div>
                                                            <div class="cmp-result-right-container">
                                                                <p class="cmp-product-name"><b> ${item.name}</b></p>
                                                                <p><span>${item.description}</span></p>

                                                            </div>

                                                        </div>`
                       		)
}


const searchByNameResultElem = function(searchDataJson,searchString,selectedCity)
{
    let placeRatingMapping = [];
    let searchStringJson = JSON.parse(searchString);
	let target = document.querySelector(".searchResults");
    let searchListElem = null;
		if(selectedCity !== "undefined")
        {

             Object.keys(searchDataJson).map((objectKeys) => {

            			searchListElem = searchDataJson[objectKeys].map((item,index) =>{
                            const ratingOrderIdMap = {};
                            if(item.cityCode==selectedCity && searchStringJson.indexOf(item.areaId)>-1 ) {

                                ratingOrderIdMap['areaId'] = item.areaId;
                                ratingOrderIdMap['rating'] = item.rating;

    							placeRatingMapping.push(ratingOrderIdMap);
                                return renderSearchItem(item,index);
    
                            }
            			})

			}).join('');


		}
		else{	
			Object.keys(searchDataJson).map((objectKeys) => {
            			searchListElem = searchDataJson[objectKeys].map((item,index) =>{
                		const ratingOrderIdMap = {};
                        if(searchStringJson.indexOf(item.areaId)>-1 ) {
                			 ratingOrderIdMap['areaId'] = item.areaId;
                                ratingOrderIdMap['rating'] = item.rating;

    							placeRatingMapping.push(ratingOrderIdMap);
							return renderSearchItem(item,index);

            			}

            		})
			}).join('');
        }


        	if (searchListElem && target) {
            	target.innerHTML = searchListElem;

                placeRatingMapping.forEach((item) =>{
					document.getElementById("rating" + item.rating * 2 +"-"+item.areaId).checked = true;
    			})	
        	}
}