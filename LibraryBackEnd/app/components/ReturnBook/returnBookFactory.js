var ReturnBookModule = angular.module("ReturnBookModule", []);

ReturnBookModule.factory("ReturnBookFactory", [
    "$q",
    "$http",
    function ($q, $http) {
        var returnBookFactory = {
            getReturnBooks: getReturnBooks,
            getReturnBook: getReturnBook,
            getByRollNo: getByRollNo
        }
        return returnBookFactory;

        function getReturnBooks() {
            var deferred = $q.defer();
            $http.get("/api/returnBook/all").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getReturnBook(accessionNumber) {
            var deferred = $q.defer();
            $http.get("/api/returnBook/get?accessionNumber=" + accessionNumber).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getByRollNo(rollNo) {
            var deferred = $q.defer();
            $http.get("/api/returnBook/getByRollNo?rollNo=" + rollNo).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);