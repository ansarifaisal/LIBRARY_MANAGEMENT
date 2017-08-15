var StatisticsModule = angular.module("StatisticsModule", []);

StatisticsModule.factory("StatisticsFactory", [
    "$http",
    "$q",
    function ($http, $q) {
        var statisticsFactory = {
            getBooksInCourse: getBooksInCourse,
            getBooksInSubject: getBooksInSubject,
            getStudentsInCourse: getStudentsInCourse,
            getStudentsInYear: getStudentsInYear,
            getBookBaughtInYear: getBookBaughtInYear
        };
        return statisticsFactory;

        function getBooksInCourse() {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksInCourse").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBooksInSubject() {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksInSubject").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getStudentsInCourse() {
            var deferred = $q.defer();
            $http.get("/api/statistics/studentsInCourse").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getStudentsInYear() {
            var deferred = $q.defer();
            $http.get("/api/statistics/studentsInYear").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBookBaughtInYear() {
            var deferred = $q.defer();
            $http.get("/api/statistics/bookBaughtInYear").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);