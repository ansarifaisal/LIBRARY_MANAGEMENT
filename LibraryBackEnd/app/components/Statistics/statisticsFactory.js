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
            getBooksByTitle: getBooksByTitle,
            getBookTypes: getBookTypes,
            getBookByType: getBookByType,
            getMagazineTitles: getMagazineTitles,
            getMagazineByTitle: getMagazineByTitle,
            getMagazineCourse: getMagazineCourse,
            getMagazineByCourse: getMagazineByCourse,
            getMagazineTypes: getMagazineTypes,
            getMagazineByTypes: getMagazineByTypes,
            getMagazinePeriodicity: getMagazinePeriodicity,
            getMagazineByPeriodicity: getMagazineByPeriodicity,
            getMagazineSubscriptionInYear: getMagazineSubscriptionInYear,
            getMagazineBySubscription: getMagazineBySubscription,
            getReturnedBooksInYear: getReturnedBooksInYear,
            getReturnedBooksByYear: getReturnedBooksByYear,
            getReturnedMagazinesInYear: getReturnedMagazinesInYear,
            getReturnedMagazinesByYear: getReturnedMagazinesByYear
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

        function getBookTypes() {
            var deferred = $q.defer();
            $http.get("/api/statistics/bookTypes").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBookByType(type) {
            var deferred = $q.defer();
            $http.get("/api/statistics/booksByType?type=" + type).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        //function getStudentsByYear(year) {
        //    var deferred = $q.defer();
        //    $http.get("/api/statistics/studentsByYear/" + year).then(function (response) {
        //        deferred.resolve(response.data);
        //    }, function (errorResponse) {
        //        deferred.reject(errorResponse);
        //    });
        //    return deferred.promise;
        //}

        function getMagazineTitles() {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineTitles").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getMagazineByTitle(title) {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineByTitle?title=" + title).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getMagazineCourse() {
            var deferred = $q.defer();
            $http.get("/api/statistics/magazineCourses").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getMagazineByCourse(course) {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineByCourse?course=" + course).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getMagazineTypes() {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineTypes").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getMagazineByTypes(type) {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineByType?type=" + type).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;


        }

        function getMagazinePeriodicity() {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazinePeriodicity").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getMagazineByPeriodicity(periodicity) {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineByPeriodicity?periodicity=" + periodicity).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getMagazineSubscriptionInYear() {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineSubscription").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getMagazineBySubscription(year) {

            var deferred = $q.defer();
            $http.get("/api/statistics/magazineBySubscription/" + year).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getReturnedBooksInYear() {

            var deferred = $q.defer();
            $http.get("/api/returnBook/returnedBookInYears").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }
        function getReturnedBooksByYear(year) {

            var deferred = $q.defer();
            $http.get("/api/returnBook/returnedBookInYear/" + year).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }

        function getReturnedMagazinesInYear() {

            var deferred = $q.defer();
            $http.get("/api/magazine/return/returnedMagazineInYears").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }
        function getReturnedMagazinesByYear(year) {

            var deferred = $q.defer();
            $http.get("/api/magazine/return/returnedMagazineInYear/" + year).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;

        }
    }
]);