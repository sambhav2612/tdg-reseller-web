TDG.rzpKey = 'rzp_test_sUVdGS7PTpp1uv';

document.getElementById('rzp-button1').onclick = function(e){
    if ($(this).data('booking')){
        createBooking(e);
    } else{
        customPay(e)
    }
    e.preventDefault();
};
var createBooking = function(e) {
     var url = "/booking";
    //var url = "/license/test.traveldglobe.in/booking";
    $.ajax({
        type: "POST",
        url: url,
        data: $("#createBookingForm").serialize(),
        success: function(data){
            console.log(data);
            var options = {
                "key": TDG.rzpKey,
                "name":TDG.rzp_name,
                "amount": data.amount*100, // 2000 paise = INR 20
                "description": TDG.rzp_desc,
                "handler": function (response){
                    console.log(response)
                    if (response.razorpay_payment_id){
                        var newForm = jQuery('<form>', {
                             'action': data.surl,
                            //'action': "/license/test.traveldglobe.in/booking/success",
                            'method': 'post'
                        }).append(jQuery('<input>', {
                            'name': 'status',
                            'value': 'Success',
                            'type': 'hidden'
                        }), jQuery('<input>', {
                            'name': 'booking_id',
                            'value': data.booking_id,
                            'type': 'hidden'
                        }), jQuery('<input>', {
                            'name': 'razorpay_payment_id',
                            'value':response.razorpay_payment_id ,
                            'type': 'hidden'
                        }), jQuery('<input>', {
                            'name': 'amount',
                            'value': data.amount,
                            'type': 'hidden'
                        })).appendTo('body');
                        newForm.submit();
                    }
                },
                "prefill": {
                    "name": $('#userName').text(),
                    "email": $('#userEmail').text(),
                    "contact":$('#userPhone').text()
                },
                "notes": {
                    "address": "",
                    "booking_id":data.booking_id
                },
                "theme": {
                    "color": "#F37254",
                    "emi_mode": true
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
        }
    });
    e.preventDefault();
};
var customPay = function(e) {
    e.preventDefault()
    // var url = "/license/test.traveldglobe.in/pay";
    var options = {
        "key": TDG.rzpKey,
        "name":TDG.custom_pay_name,
        "amount": parseInt(document.getElementById("amount").value)*100, // 2000 paise = INR 20
        "description": "Paying to"+TDG.rzp_desc,
        "handler": function (response){
            alert("Payment of Rs."+ document.getElementById("amount").value.toString()+" has been successfully done. Kindly contact "+TDG.custom_pay_desc);
            // if (response.razorpay_payment_id){
            //     var newForm = jQuery('<form>', {
            //         // 'action': data.surl,
            //         'action': "/license/test.traveldglobe.in/booking/success",
            //         'method': 'post'
            //     }).append(jQuery('<input>', {
            //         'name': 'status',
            //         'value': 'Success',
            //         'type': 'hidden'
            //     }), jQuery('<input>', {
            //         'name': 'booking_id',
            //         'value': data.booking_id,
            //         'type': 'hidden'
            //     }), jQuery('<input>', {
            //         'name': 'razorpay_payment_id',
            //         'value':response.razorpay_payment_id ,
            //         'type': 'hidden'
            //     }), jQuery('<input>', {
            //         'name': 'amount',
            //         'value': data.amount,
            //         'type': 'hidden'
            //     })).appendTo('body');
            //     newForm.submit();
            // }
        },
        "prefill": {
            "name": $('#userName').text(),
            "email": $('#userEmail').text(),
            "contact":$('#userPhone').text()
        },
        "notes": {
            "itinerary": document.getElementById("itinerary").value,
            // "booking_id":data.booking_id
        },
        "theme": {
            "color": "#F37254",
            // "emi_mode": true
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
};
