var UserModule = angular.module("UserModule", []);

UserModule.factory("UserFactory", [
    "$http",
    "$q",
    "AuthenticationFactory",
    "CourseFactory",
    function ($http, $q, AuthenticationFactory, CourseFactory) {

        var userFactory = {
            addStudent: addStudent,
            getStudents: getStudents,
            getStudent: getStudent,
            editStudent: editStudent,
            deleteStudent: deleteStudent,
            getUserByUserName: getUserByUserName,
            getCourses: getCourses,
            getYears: getYears
        }

        return userFactory;


        function addStudent(student) {
            var deferred = $q.defer();
            $http.post("/api/student/add", student).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getStudents() {
            var deferred = $q.defer();
            $http.get("/api/student/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getStudent(id) {
            var deferred = $q.defer();
            $http.get("/api/student/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editStudent(student) {
            var deferred = $q.defer();
            $http.post("/api/student/edit", student)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteStudent(student) {
            var deferred = $q.defer();
            $http.post("/api/student/delete", student)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getUserByUserName(userName) {
            var user = {};
            AuthenticationFactory.getUserByUserName(userName).then(function (response) {
                angular.copy(response, user);
            });
            return user;
        }

        function getCourses() {
            var courses = [];

            CourseFactory.getCourses().then(function (response) {
                angular.copy(response, courses)
            });

            return courses;
        }

        function getYears(offset, range) {
            var currentYear = new Date().getFullYear();
            var years = [];
            for (var i = 0; i < range + 1; i++) {
                years.push(currentYear + offset + i);
            }
            return years;
        }

    }
]);