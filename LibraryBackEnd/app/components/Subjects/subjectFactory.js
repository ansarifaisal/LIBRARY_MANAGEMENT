var SubjectModule = angular.module("SubjectModule", []);

SubjectModule.factory("SubjectFactory", [
    "$http",
    "$q",
    "CourseFactory",
    function ($http, $q, CourseFactory) {

        var subjectFactory = {
            addSubject: addSubject,
            getSubjects: getSubjects,
            getSubject: getSubject,
            editSubject: editSubject,
            deleteSubject: deleteSubject,
            addOrEdit: addOrEdit,
            getSemesters: getSemesters
        }
        return subjectFactory;

        function addSubject(subject) {
            var deferred = $q.defer();
            $http.post("/api/subject/add", subject).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getSubjects() {
            var deferred = $q.defer();
            $http.get("/api/subject/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getSubject(id) {
            var deferred = $q.defer();
            $http.get("/api/subject/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editSubject(subject) {
            var deferred = $q.defer();
            $http.post("/api/subject/edit", subject)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteSubject(subject) {
            var deferred = $q.defer();
            $http.post("/api/subject/delete", subject)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(subject) {
            var toDo = {};
            if (subject.id === undefined) {
                toDo.action = addSubject(subject);
                toDo.errorMessage = "Error Adding Subject";
                toDo.successMessage = "Subject Added Successfully!";
            } else {
                toDo.action = editSubject(subject);
                toDo.errorMessage = "Error Editing Subject";
                toDo.successMessage = "Subject Edited Successfully!";
            }
            return toDo;
        }

        function getSemesters(noOfSemesters) {
            semesters = [];
            for (var i = 1; i <= noOfSemesters; i++) {
                semesters.push(i);
            }
            return semesters;
        }

    }
]);