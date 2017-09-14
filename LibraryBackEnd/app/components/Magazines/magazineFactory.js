var MagazineModule = angular.module("MagazineModule", []);

MagazineModule.factory("MagazineFactory", [
    "$http",
    "$q",
    "$filter",
    "uibDateParser",
    function ($http, $q, $filter, uibDateParser) {

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
            checkExistingPeriodicDetail: checkExistingPeriodicDetail,
            getPaidBy: getPaidBy,
            getPeriodicity: getPeriodicity,
            addOrEditPeriodicDetail: addOrEditPeriodicDetail,
            dateParse: dateParse,
            parseDate: parseDate,
            formatDate: formatDate,
            getMagazines: getMagazines,
            getMagazine: getMagazine,
            addMagazine: addMagazine,
            editMagazine: editMagazine,
            deleteMagazine: deleteMagazine,
            addOrEditMagazine: addOrEditMagazine,
            getIssuedMagazines: getIssuedMagazines,
            getIssuedMagazine: getIssuedMagazine,
            addIssuedMagazine: addIssuedMagazine,
            editIssuedMagazine: editIssuedMagazine,
            deleteIssuedMagazine: deleteIssuedMagazine,
            returnIssuedMagazine: returnIssuedMagazine,
            addOrEditIssuedMagazine: addOrEditIssuedMagazine,
            getLostMagazines: getLostMagazines,
            getLostMagazine: getLostMagazine,
            addLostMagazine: addLostMagazine,
            editLostMagazine: editLostMagazine,
            undoReplaceMagazine: undoReplaceMagazine,
            deleteLostMagazine: deleteLostMagazine,
            returnLostMagazine: returnLostMagazine,
            addOrEditLostMagazine: addOrEditLostMagazine,
            getReturnMagazines: getReturnMagazines,
            getMagazineByNumber: getMagazineByNumber,
            getStatus: getStatus,
            getIssuedMagazineByRollNumber: getIssuedMagazineByRollNumber,
            getReturnedMagazineByRollNo: getReturnedMagazineByRollNo,
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

        function checkExistingPeriodicDetail(title) {
            var deferred = $q.defer();
            $http.get("/api/magazine/periodic/checkExisting?title=" + title)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPaidBy() {
            var paidBy = ["Cheque", "Cash"]
            return paidBy;
        }

        function getPeriodicity() {
            var periodicity = ["Weekly", "Monthly", "Quaterly", "Yearly"];
            return periodicity;
        }

        function addOrEditPeriodicDetail(periodicDetail) {
            var toDo = {};
            if (periodicDetail.id === undefined) {
                toDo.action = addPeriodicDetail(periodicDetail);
                toDo.errorMessage = "Error Adding Periodic Details";
                toDo.successMessage = "Periodic Details Added Successfully!";
            } else {
                toDo.action = editPeriodicDetail(periodicDetail);
                toDo.errorMessage = "Error Editing Periodic Details";
                toDo.successMessage = "Periodic Details Edited Successfully!";
            }
            return toDo;
        }

        function dateParse(date) {
            return $filter('date')(date, "yyyy/MMM/d");
        }

        function parseDate(date) {
            var filtered = $filter('date')(date, "yyyy/MMM/d");
            return uibDateParser.parse(filtered, "yyyy/MMM/d");
        }

        function formatDate(date) {
            return $filter('date')(date, "EEE MMM, dd yyyy");
        }

        function getMagazines(title) {
            var deferred = $q.defer();
            $http.get("/api/magazine/all?title=" + title)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getMagazine(id) {
            var deferred = $q.defer();
            $http.get("/api/magazine/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addMagazine(magazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/add", magazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editMagazine(magazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/edit", magazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteMagazine(magazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/delete", magazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditMagazine(magazine) {
            var toDo = {};
            if (magazine.id === undefined) {
                toDo.action = addMagazine(magazine);
                toDo.errorMessage = "Error Adding Magazine";
                toDo.successMessage = "Magazine Added Successfully!";
            } else {
                toDo.action = editMagazine(magazine);
                toDo.errorMessage = "Error Editing Magazine";
                toDo.successMessage = "Magazine Edited Successfully!";
            }
            return toDo;
        }


        function getIssuedMagazines() {
            var deferred = $q.defer();
            $http.get("/api/issuedMagazine/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getIssuedMagazine(id) {
            var deferred = $q.defer();
            $http.get("/api/issuedMagazine/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addIssuedMagazine(issueMagazine) {
            var deferred = $q.defer();
            $http.post("/api/issuedMagazine/add", issueMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editIssuedMagazine(issueMagazine) {
            var deferred = $q.defer();
            $http.post("/api/issuedMagazine/edit", issueMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteIssuedMagazine(issueMagazine) {
            var deferred = $q.defer();
            $http.post("/api/issuedMagazine/delete", issueMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function returnIssuedMagazine(returnMagazine) {
            var deferred = $q.defer();
            $http.post("/api/issuedMagazine/return", returnMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditIssuedMagazine(issueMagazine) {
            var toDo = {};
            if (issueMagazine.id === undefined) {
                toDo.action = addIssuedMagazine(issueMagazine);
                toDo.errorMessage = "Error Issuing Magazine";
                toDo.successMessage = "Magazine Issued Successfully!";
            } else {
                toDo.action = editIssuedMagazine(issueMagazine);
                toDo.errorMessage = "Error Editing Issue Magazine";
                toDo.successMessage = "Magazine Issue Details Edited Successfully!";
            }
            return toDo;
        }


        function getMagazineByNumber(number) {
            var deferred = $q.defer();
            $http.get("/api/magazine/getByNumber/" + number)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getLostMagazines() {
            var deferred = $q.defer();
            $http.get("/api/magazine/lost/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getLostMagazine(id) {
            var deferred = $q.defer();
            $http.get("/api/magazine/lost/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addLostMagazine(lostMagazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/lost/add", lostMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editLostMagazine(lostMagazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/lost/edit", lostMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function undoReplaceMagazine(lostMagazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/lost/undoReplace", lostMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteLostMagazine(lostMagazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/lost/delete", lostMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function returnLostMagazine(returnMagazine) {
            var deferred = $q.defer();
            $http.post("/api/magazine/lost/return", returnMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getReturnMagazines() {
            var deferred = $q.defer();
            $http.get("/api/magazine/return/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditLostMagazine(lostMagazine) {
            var toDo = {};
            if (lostMagazine.id === undefined) {
                toDo.action = addLostMagazine(lostMagazine);
                toDo.errorMessage = "Error Issuing Magazine";
                toDo.successMessage = "Magazine Issued Successfully!";
            } else {
                toDo.action = editLostMagazine(lostMagazine);
                toDo.errorMessage = "Error Editing Issue Magazine";
                toDo.successMessage = "Magazine Issue Details Edited Successfully!";
            }
            return toDo;
        }

        function getStatus() {
            return status = ["Available", "Donated"]
        }

        function getIssuedMagazineByRollNumber(rollNo) {
            var deferred = $q.defer();
            $http.get("/api/issuedMagazine/getByRollNo?rollNo=" + rollNo)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getReturnedMagazineByRollNo(rollNo) {
            var deferred = $q.defer();
            $http.get("/api/magazine/return/byRollNo?rollNo=" + rollNo)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }
    }
]);