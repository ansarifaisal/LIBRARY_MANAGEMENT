var PublicationModule = angular.module("PublicationModule", []);

PublicationModule.factory("PublicationFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var publicationFactory = {
            addPublication: addPublication,
            getPublications: getPublications,
            getPublication: getPublication
        }

        return publicationFactory;

        function addPublication(publication) {
            var deferred = $q.defer();
            $http.post("/api/publication/add", publication)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPublications() {
            var deferred = $q.defer();
            $http.get("/api/publication/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPublication(id) {
            var deferred = $q.defer();
            $http.get("/api/publication/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

    }
]);