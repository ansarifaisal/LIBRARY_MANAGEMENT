var NewspaperModule = angular.module("NewspaperModule", []);
NewspaperModule.factory("NewspaperFactory", [
    "$http",
    "$q",
    "$filter",
    "uibDateParser",
    function ($http, $q, $filter, uibDateParser) {
        var newsPaperFactory = {
            getPublishers: getPublishers,
            getPublisher: getPublisher,
            addPublisher: addPublisher,
            editPublisher: editPublisher,
            deletePublisher: deletePublisher,
            addOrEditPublisher: addOrEditPublisher,
            getPeriodicNewsPapers: getPeriodicNewsPapers,
            getPeriodicNewsPaper: getPeriodicNewsPaper,
            addPeriodicNewsPaper: addPeriodicNewsPaper,
            editPeriodicNewsPaper: editPeriodicNewsPaper,
            deletePeriodicNewsPaper: deletePeriodicNewsPaper,
            addOrEditPeriodicNewsPaper: addOrEditPeriodicNewsPaper,
            getNewspaperMonths: getNewspaperMonths,
            getNewspaperMonth: getNewspaperMonth,
            addNewspaperMonth: addNewspaperMonth,
            editNewspaperMonth: editNewspaperMonth,
            deleteNewspaperMonth: deleteNewspaperMonth,
            addOrEditNewspaperMonth: addOrEditNewspaperMonth,
            dateParse: dateParse,
            parseDate: parseDate,
            formatDate: formatDate,
            getNewspapers: getNewspapers,
            getNewspaper: getNewspaper,
            addNewspaper: addNewspaper,
            editNewspaper: editNewspaper,
            deleteNewspaper: deleteNewspaper,
            addOrEditNewspaper: addOrEditNewspaper,
        }
        return newsPaperFactory;


        function getPublishers() {
            var deferred = $q.defer();
            $http.get("/api/newspaper/publisher/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPublisher(id) {
            var deferred = $q.defer();
            $http.get("/api/newspaper/publisher/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addPublisher(publisher) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/publisher/add", publisher)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editPublisher(publisher) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/publisher/edit", publisher)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deletePublisher(publisher) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/publisher/delete", publisher)
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

        function getPeriodicNewsPapers() {
            var deferred = $q.defer();
            $http.get("/api/newspaper/periodic/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPeriodicNewsPaper(id) {
            var deferred = $q.defer();
            $http.get("/api/newspaper/periodic/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addPeriodicNewsPaper(periodicDetail) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/periodic/add", periodicDetail)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editPeriodicNewsPaper(periodicDetail) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/periodic/edit", periodicDetail)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deletePeriodicNewsPaper(periodicDetail) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/periodic/delete", periodicDetail)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditPeriodicNewsPaper(periodicDetail) {
            var toDo = {};
            if (periodicDetail.id === undefined) {
                toDo.action = addPeriodicNewsPaper(periodicDetail);
                toDo.errorMessage = "Error Adding Periodic Details";
                toDo.successMessage = "Periodic Details Added Successfully!";
            } else {
                toDo.action = editPeriodicNewsPaper(periodicDetail);
                toDo.errorMessage = "Error Editing Periodic Details";
                toDo.successMessage = "Periodic Details Edited Successfully!";
            }
            return toDo;
        }

        function getNewspaperMonths(title) {
            var deferred = $q.defer();
            $http.get("/api/newspaper/month/all?title=" + title)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getNewspaperMonth(id) {
            var deferred = $q.defer();
            $http.get("/api/newspaper/month/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addNewspaperMonth(newsPaperMonth) {
            var deferred = $q.defer();
            console.log(newsPaperMonth);
            $http.post("/api/newspaper/month/add", newsPaperMonth)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editNewspaperMonth(newsPaperMonth) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/month/edit", newsPaperMonth)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteNewspaperMonth(newsPaperMonth) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/month/delete", newsPaperMonth)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditNewspaperMonth(newsPaperMonth) {
            var toDo = {};
            if (newsPaperMonth.id === undefined) {
                toDo.action = addNewspaperMonth(newsPaperMonth);
                toDo.errorMessage = "Error Adding Newspaper Month";
                toDo.successMessage = "Newspaper Month Added Successfully!";
            } else {
                toDo.action = editNewspaperMonth(newsPaperMonth);
                toDo.errorMessage = "Error Editing Newspaper Month";
                toDo.successMessage = "Newspaper Month Edited Successfully!";
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
            if (date === "")
                return "NA";
            var tempDate = new Date(date);
            return $filter('date')(tempDate, "MMM, yyyy");
        }

        function getNewspapers(title, month) {
            var deferred = $q.defer();
            $http.get("/api/newspaper/paper/all?title=" + title + "&month=" + month)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getNewspaper(id) {
            var deferred = $q.defer();
            $http.get("/api/newspaper/paper/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addNewspaper(newsPaper) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/paper/add", newsPaper)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editNewspaper(newsPaper) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/paper/edit", newsPaper)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteNewspaper(newsPaper) {
            var deferred = $q.defer();
            $http.post("/api/newspaper/paper/delete", newsPaper)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEditNewspaper(newsPaper) {
            var toDo = {};
            if (newsPaper.id === undefined) {
                toDo.action = addNewspaper(newsPaper);
                toDo.errorMessage = "Error Adding Newspaper";
                toDo.successMessage = "Newspaper Added Successfully!";
            } else {
                toDo.action = editNewspaper(newsPaper);
                toDo.errorMessage = "Error Editing Newspaper";
                toDo.successMessage = "Newspaper Edited Successfully!";
            }
            return toDo;
        }

    }
]);