var ConfigurationModule = angular.module("ConfigurationModule", []);

ConfigurationModule.factory("ConfigurationFactory", [
    "$http",
    "$q",
    function ($http, $q) {
        var configurationFactory = {
            getConfigurations: getConfigurations,
            getConfiguration: getConfiguration,
            editConfiguration: editConfiguration,
            getOptions: getOptions,
            addOrEdit: addOrEdit
        };

        return configurationFactory;

        function getConfigurations() {
            var deferred = $q.defer();
            $http.get("/api/configuration/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getConfiguration(id) {
            var deferred = $q.defer();
            $http.get("/api/configuration/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addConfiguration(configuration) {
            var deferred = $q.defer();
            $http.post("/api/configuration/add", configuration)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editConfiguration(configuration) {
            var deferred = $q.defer();
            $http.post("/api/configuration/edit", configuration)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getOptions() {
            options = ["Yes", "No"];
            return options;
        }

        function addOrEdit(configuration) {
            var toDo = {};
            if (configuration.id === undefined) {
                toDo.action = addConfiguration(configuration);
                toDo.errorMessage = "Error Adding Configuration";
                toDo.successMessage = "Configuration Added Successfully!";
            } else {
                toDo.action = editConfiguration(configuration);
                toDo.errorMessage = "Error Editing Configuration";
                toDo.successMessage = "Configuration Edited Successfully!";
            }
            return toDo;
        }
    }
]);