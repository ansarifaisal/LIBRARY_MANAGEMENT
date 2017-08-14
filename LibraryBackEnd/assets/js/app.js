
var settings = function () {
    "use strict"

    $('#notification').popover({
        content: "This is a test",
        html: true,
        placement: "bottom",
        title: "Notification",
        trigger: "focus"

    });

    $('[data-toggle="tooltip"]').tooltip();

};

settings();

var showAlert = function () {

    $(function () {
        hideAlert();
    }, 2000);

}

var hideAlert = function () {
    $(".alert-msg").fadeTo(3000, 500).slideUp('500', function () {
        $(".alert-msg").slideUp(500);
    });
}

showAlert();