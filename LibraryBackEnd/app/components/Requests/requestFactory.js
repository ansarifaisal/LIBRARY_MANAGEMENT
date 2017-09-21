var RequestModule = angular.module("RequestModule", []);

RequestModule.factory("RequestFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var requestFactory = {
            addRequest: addRequest,
            getRequests: getRequests,
            getRequest: getRequest,
            editRequest: editRequest,
            deleteRequest: deleteRequest,
            getByRollNo: getByRollNo,
            addOrEdit: addOrEdit,
            updateStatus: updateStatus
        }
        return requestFactory;


        function addRequest(request) {
            var deferred = $q.defer();
            $http.post("/api/request/add", request)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getRequests() {
            var deferred = $q.defer();
            $http.get("/api/request/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getRequest(id) {
            var deferred = $q.defer();
            $http.get("/api/request/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editRequest(request) {
            var deferred = $q.defer();
            $http.post("/api/request/edit", request)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteRequest(request) {
            var deferred = $q.defer();
            $http.post("/api/request/delete", request)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getByRollNo(rollNo) {
            var deferred = $q.defer();
            $http.get("/api/request/byRollNo?rollNo=" + rollNo)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(request) {
            var toDo = {};
            if (request.id === undefined) {
                toDo.action = addRequest(request);
                toDo.errorMessage = "Error Adding Request";
                toDo.successMessage = "Request Added Successfully!";
            } else {
                toDo.action = editRequest(request);
                toDo.errorMessage = "Error Editing Request";
                toDo.successMessage = "Request Edited Successfully!";
            }
            return toDo;
        }

        function updateStatus(request) {
            var deferred = $q.defer();
            $http.post("/api/request/updateStatus", request)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }
    }
]);