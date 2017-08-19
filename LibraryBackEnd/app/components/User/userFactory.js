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
            getFaculties: getFaculties,
            getLibrarians: getLibrarians,
            getStudent: getStudent,
            editStudent: editStudent,
            deleteStudent: deleteStudent,
            getUserByUserName: getUserByUserName,
            getCourses: getCourses,
            getYears: getYears,
            getStatus: getStatus,
            getRoles: getRoles,
            getStudentByRollNo: getStudentByRollNo,
            changePassword: changePassword,
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
            $http.get("/api/student/students")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getFaculties() {
            var deferred = $q.defer();
            $http.get("/api/student/faculties")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getLibrarians() {
            var deferred = $q.defer();
            $http.get("/api/student/librarians")
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

        function getStatus() {
            var status = ["PENDING", "APPROVED", "DEFAULT", "REJECT"];
            return status;
        }

        function getRoles() {
            var role = ["STUDENT", "FACULTY", "LIBRARIAN"];
            return role;
        }

        function getStudentByRollNo(rollNumber) {
            var deferred = $q.defer();
            $http.get("/api/student/byRollNo?rollNumber=" + rollNumber)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function changePassword(password) {
            var deferred = $q.defer();
            $http.post("/api/Account/ChangePassword", password)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

    }
]);