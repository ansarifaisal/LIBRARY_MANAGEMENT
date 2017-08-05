var CourseModule = angular.module("CourseModule", []);

CourseModule.factory("CourseFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var courseFactory = {
            addCourse: addCourse,
            getCourses: getCourses,
            getCourse: getCourse,
            editCourse: editCourse,
            deleteCourse: deleteCourse,
            addOrEdit: addOrEdit,
            getSemesters: getSemesters
        }

        return courseFactory;

        function addCourse(course) {
            var deferred = $q.defer();
            $http.post("/api/course/add", course).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResonse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getCourses() {
            var deferred = $q.defer();
            $http.get("/api/course/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getCourse(id) {
            var deferred = $q.defer();
            $http.get("/api/course/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editCourse(course) {
            var deferred = $q.defer();
            $http.post("/api/course/edit", course)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteCourse(course) {
            var deferred = $q.defer();
            $http.post("/api/course/delete", course)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(course) {
            var toDo = {};
            if (course.id === undefined) {
                toDo.action = addCourse(course);
                toDo.errorMessage = "Error Adding Course";
                toDo.successMessage = "Course Added Successfully!";
            } else {
                toDo.action = editCourse(course);
                toDo.errorMessage = "Error Editing Course";
                toDo.successMessage = "Course Edited Successfully!";
            }
            return toDo;
        }

        function getSemesters() {
            semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            //for (var i = 1; i < 11; i++) {
            //    semesters.push(i);
            //}
            return semesters;
        }

    }
]);