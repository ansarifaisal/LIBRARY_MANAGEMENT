var MagazineModule = angular.module("MagazineModule", []);

MagazineModule.factory("MagazineFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var magazineFactory = {}
        return magazineFactory;

    }
]);