var StatisticsModule = angular.module("StatisticsModule", []);

StatisticsModule.factory("StatisticsFactory", [
    "$http",
    "$q",
    function ($http, $q) {
        var statisticsFactory = {
            getBooksInCourse: getBooksInCourse,
            getBooksByCourse: getBooksByCourse,
            getBooksInSubject: getBooksInSubject,
            getBooksBySubject: getBooksBySubject,
            getStudentsInCourse: getStudentsInCourse,
            getStudentsByCourse: getStudentsByCourse,
            getStudentsInYear: getStudentsInYear,
            getStudentsByYear: getStudentsByYear,
            getBookBaughtInYear: getBookBaughtInYear,
            getBookBaughtByYear: getBookBaughtByYear,
            getBooksTitles: getBooksTitles,
            getBooksByTitle: getBooksByTitle
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

        function getBooksByCourse(courseName) {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksByCourse?courseName=" + courseName).then(function (response) {
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

        function getBooksBySubject(subject) {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksBySubject?subject=" + subject).then(function (response) {
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

        function getBookBaughtByYear(year) {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksByYear/" + year).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
        function getBooksTitles() {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksTitles").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBooksByTitle(title) {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksByTitles?title=" + title).then(function (response) {
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

        function getStudentsByCourse(courseName) {
            var deferred = $q.defer();
            $http.get("/api/statistics/studentsByCourse?courseName=" + courseName).then(function (response) {
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

        function getStudentsByYear(year) {
            var deferred = $q.defer();
            $http.get("/api/statistics/studentsByYear/" + year).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);