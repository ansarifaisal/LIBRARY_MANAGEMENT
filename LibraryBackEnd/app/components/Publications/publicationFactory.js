var PublicationModule = angular.module("PublicationModule", []);

PublicationModule.factory("PublicationFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var publicationFactory = {
            addPublication: addPublication,
            getPublications: getPublications,
            getPublication: getPublication,
            editPublication: editPublication,
            deletePublication: deletePublication,
            addOrEdit: addOrEdit
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

        function editPublication(publication) {
            var deferred = $q.defer();
            $http.post("/api/publication/edit", publication)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deletePublication(publication) {
            var deferred = $q.defer();
            $http.post("/api/publication/delete", publication)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(publication) {
            var toDo = {};
            if (publication.id === undefined) {
                toDo.action = addPublication(publication);
                toDo.errorMessage = "Error Adding Publication";
                toDo.successMessage = "Publication Added Successfully!";
            } else {
                toDo.action = editPublication(publication);
                toDo.errorMessage = "Error Editing Publication";
                toDo.successMessage = "Publication Edited Successfully!";
            }
            return toDo;
        }


    }
]);