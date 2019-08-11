$(function () {
    $(".radio_btn i").click(function (e) {
        $(".radio_btn i").removeClass().addClass("far fa-circle");
        $(".pay_card").removeClass("active_card");
        var target = e.target;
        $(target).removeClass().addClass("fas fa-check-circle");
        $(target).parents(".pay_card").addClass("active_card");
    });

});

// =========================