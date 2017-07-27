
var settings = function () {
    "use strict"



};

settings();

var showAlert = function () {

    $(function () {
        if ($(".alert-msg").hasClass("alert-info")) {
            $(".alert-link").click(function () {
                hideAlert();
            });
        } else {
            hideAlert();
        }

        function hideAlert() {
            $(".alert-msg").fadeTo(3000, 500).slideUp('500', function () {
                $(".alert-msg").slideUp(500);
            });
        }
    });

}

showAlert();