var ReturnBookModule = angular.module("ReturnBookModule", []);

ReturnBookModule.factory("ReturnBookFactory", [
    "$q",
    "$http",
    function ($q, $http) {
        var returnBookFactory = {
            getReturnBooks: getReturnBook
        }
        return returnBookFactory;

        function getReturnBook() {
            var deferred = $q.defer();
            $http.get("/api/returnBook/all").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                console.log(errorResponse);
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);