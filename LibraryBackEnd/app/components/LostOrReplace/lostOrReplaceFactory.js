var LostOrReplaceModule = angular.module("LostOrReplaceModule", []);

LostOrReplaceModule.factory("LostOrReplaceFactory", [
    "$q",
    "$http",
    function ($q, $http) {
        var lostOrReplaceFactory = {
            getBooks: getBooks,
            getBook: getBook,
            replaceBook: replaceBook,
            undoReplaceBook: undoReplaceBook
        }
        return lostOrReplaceFactory;

        function getBooks() {
            var deferred = $q.defer();
            $http.get("/api/lostOrReplace/all").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function replaceBook(lostBook) {
            var deferred = $q.defer();
            $http.put("/api/lostOrReplace/replace", lostBook).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBook(id) {
            var deferred = $q.defer();
            $http.get("/api/lostOrReplace/get/" + id).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function undoReplaceBook(book) {
            var deferred = $q.defer();
            $http.put("/api/lostOrReplace/undoReplace", book).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);