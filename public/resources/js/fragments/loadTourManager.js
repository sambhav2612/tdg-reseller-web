/**
 * Created by abhishekjain on 26/02/17.
 */
TDG.location_slug = TDG.location_slug|| '';
$.ajax({
    url: TDG.urls.LOAD_TOURS + '?location=' + TDG.location_slug,
    dataType: 'html',
    success: function (response) {
        if (response) {
            $('.js-tours').html(response);

            $(window).on('scroll', function() {
                if(window.scrollY >400) {
                    TDG.lazyLoadImages($('.js-tours'));
                } else {
                }
            })
        }

    }, error: function () {
        $('.js-tours').html('Something went wrong');
    }
});
