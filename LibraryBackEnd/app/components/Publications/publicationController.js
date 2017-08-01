PublicationModule.controller("PublicationController", [
    "PublicationFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    function (PublicationFactory, $scope, $location, $route, $routeParams, $timeout, toastr, $rootScope) {

        me = this;

        me.newPublication = {
            name: ''
        };

        me.publications = [];

        me.publication = {};

        me.addPublication = function () {
            console.log(me.newPublication);
        }
    }
]);