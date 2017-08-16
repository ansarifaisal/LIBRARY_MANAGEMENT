var SearchModule = angular.module("SearchModule", []);

SearchModule.factory("SearchFactory", [
    "$http",
    "$q",
    "BookFactory",
    function ($http, $q, BookFactory) {
        var searchFactory = {
            getBookSearchResults: getBookSearchResults
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
    }
]);