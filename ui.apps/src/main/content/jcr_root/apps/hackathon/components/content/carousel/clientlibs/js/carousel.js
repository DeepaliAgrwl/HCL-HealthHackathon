
$(document).ready(function () {

    // Single Slide
    var numSlides = $('.carousel-single .cmp-carousel__item').length;
    if (numSlides == 1) {
        $(".carousel-single .cmp-carousel__action").remove();
        $(".carousel-single .cmp-carousel__indicators").remove();

    }

    // Multi Slide 
    var itemsMainDiv = ('.carousel .cmp-carousel');
    var itemsDiv = ('.cmp-carousel__content');
    var itemWidth = "";
    $('.carousel .cmp-carousel__action--previous, .carousel .cmp-carousel__action--next').click(function () {
        var condition = $(this).hasClass("cmp-carousel__action--previous");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();
    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var itemClass = $('.cmp-carousel__item');
        var id = 0;
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();             
        $(itemsDiv).each(function () {
            var itemNumbers = $(this).find(itemClass).length;
            incno = (bodyWidth >= 768) ? 4 : 1;
            itemWidth = sampwidth / incno;
            $(this).css({ 'transform': 'translateX(0px)', 'width': (itemWidth * itemNumbers),'transition':'all 0.25s ease 0s' });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".cmp-carousel__action--previous").addClass("over");
            $(".cmp-carousel__action--next").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.cmp-carousel__action--previous');
        var rightBtn = ('.cmp-carousel__action--next');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");
            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);         
            $(el + ' ' + leftBtn).removeClass("over");
            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    function click(ell, ee) {
        var Parent = ('.cmp-carousel');
        var slide = 1;
        ResCarousel(ell, Parent, slide);
    }

});