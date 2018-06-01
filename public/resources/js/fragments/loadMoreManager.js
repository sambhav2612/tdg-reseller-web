/**
 * Created by abhishekjain on 26/02/17.
 */
$('.js-loadMore').click(function () {
    var $btn_ref = $(this);
    if ($btn_ref.hasClass('disabled')) {
        return;
    }
    $btn_ref.addClass('disabled');
    var page = parseInt($btn_ref.attr('data-page'));
    var url = ($btn_ref.attr('data-url')) + page;
    $.ajax({
        url: url,
        dataType: 'html',
        success: function (response) {
            if (response) {
                $('.js-results').append(response)
                $btn_ref.attr('data-page', ++page);
                $btn_ref.removeClass('disabled');
            } else {
                $btn_ref.hide();
            }

        }, error: function () {
            $btn_ref.hide();
            alert('Something went wrong');
        }
    });
})