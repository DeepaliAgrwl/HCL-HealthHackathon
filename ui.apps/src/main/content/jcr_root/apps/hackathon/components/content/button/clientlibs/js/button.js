
$('.categoryCarouselRedirect').click(function(event){
    event.preventDefault();
    let id = $(this).attr('id');


    let selectedCityId = $('#city').val();

	localStorage.setItem('serachFilter',"category");
    let searchResult = "";

                localStorage.setItem('serachString',$('#'+id).attr('category'));
                localStorage.setItem('selectCityId', selectedCityId);
                window.location.href = $('.cmp-search__input').attr('searchRedirectionUrl');


  });