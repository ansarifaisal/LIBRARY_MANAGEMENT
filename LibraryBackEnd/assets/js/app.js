
var settings = function () {
    "use strict"



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