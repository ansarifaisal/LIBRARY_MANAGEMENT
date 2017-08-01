var PublicationModule = angular.module("PublicationModule", []);

PublicationModule.factory("PublicationFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var publicationFactory = {}

        return publicationFactory;
    
    }
]);