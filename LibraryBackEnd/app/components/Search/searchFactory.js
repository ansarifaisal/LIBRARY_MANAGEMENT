var SearchModule = angular.module("SearchModule", []);

SearchModule.factory("SearchFactory", [
    "$http",
    "$q",
    "BookFactory",
    function ($http, $q, BookFactory) {
        var searchFactory = {
            getBookSearchResults: getBookSearchResults,
            getStudentsSearchResults: getStudentsSearchResults,
            getFullName: getFullName,
            getRollNo: getRollNo
        };
        return searchFactory;

        function getBookSearchResults(searchBindingModel) {
            var deferred = $q.defer();
            $http.post("/api/search/books", searchBindingModel).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getStudentsSearchResults(searchStudentsBindingModel) {
            var deferred = $q.defer();
            $http.post("/api/search/students", searchStudentsBindingModel).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getFullName() {
            var deferred = $q.defer();
            $http.get("/api/search/fullNames").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getRollNo() {
            var deferred = $q.defer();
            $http.get("/api/search/rollNos").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);