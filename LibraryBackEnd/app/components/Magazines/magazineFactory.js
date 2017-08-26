var MagazineModule = angular.module("MagazineModule", []);

MagazineModule.factory("MagazineFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var magazineFactory = {
            getPublishers: getPublishers,
            getPublisher: getPublisher,
            addPublisher: addPublisher,
            editPublisher: editPublisher,
            deletePublisher: deletePublisher,
            addOrEditPublisher: addOrEditPublisher,
            getPeriodicDetails: getPeriodicDetails,
            getPeriodicDetail: getPeriodicDetail,
            addPeriodicDetail: addPeriodicDetail,
            editPeriodicDetail: editPeriodicDetail,
            deletePeriodicDetail: deletePeriodicDetail,
            addOrEditPeriodicDetail: addOrEditPeriodicDetail,
        }
        return magazineFactory;

        function getPublishers() {
            var deferred = $q.defer();
            $http.get("/api/magazine/publisher/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPublisher(id) {
            var deferred = $q.defer();
            $http.get("/api/magazine/get/publisher/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addPublisher(publisher) {
            var deferred = $q.defer();
            $http.post("/api/magazine/publisher/add", publisher)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editPublisher(publisher) {
            var deferred = $q.defer();
            $http.post("/api/magazine/publisher/edit", publisher)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deletePublisher(publisher) {
            var deferred = $q.defer();
            $http.post("/api/magazine/publisher/delete", publisher)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditPublisher(publisher) {
            var toDo = {};
            if (publisher.id === undefined) {
                toDo.action = addPublisher(publisher);
                toDo.errorMessage = "Error Adding Publisher";
                toDo.successMessage = "Publisher Added Successfully!";
            } else {
                toDo.action = editPublisher(publisher);
                toDo.errorMessage = "Error Editing Publisher";
                toDo.successMessage = "Publisher Edited Successfully!";
            }
            return toDo;
        }

        function getPeriodicDetails() {
            var deferred = $q.defer();
            $http.get("/api/magazine/periodic/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPeriodicDetail(id) {
            var deferred = $q.defer();
            $http.get("/api/magazine/get/periodic/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addPeriodicDetail(periodicDetail) {
            var deferred = $q.defer();
            $http.post("/api/magazine/periodic/add", periodicDetail)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editPeriodicDetail(periodicDetail) {
            var deferred = $q.defer();
            $http.post("/api/magazine/periodic/edit", periodicDetail)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deletePeriodicDetail(periodicDetail) {
            var deferred = $q.defer();
            $http.post("/api/magazine/periodic/delete", periodicDetail)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditPeriodicDetail(periodicDetail) {
            var toDo = {};
            if (periodicDetail.id === undefined) {
                toDo.action = addPeriodicDetail(periodicDetail);
                toDo.errorMessage = "Error Adding Magazine";
                toDo.successMessage = "Magazine Added Successfully!";
            } else {
                toDo.action = editPeriodicDetail(periodicDetail);
                toDo.errorMessage = "Error Editing Magazine";
                toDo.successMessage = "Magazine Edited Successfully!";
            }
            return toDo;
        }

    }
]);