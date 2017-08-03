var PublicationModule = angular.module("PublicationModule", []);

PublicationModule.factory("PublicationFactory", [
    "$http",
    "$q",
    "$uibModal",
    function ($http, $q, $uibModal) {

        var publicationFactory = {
            addPublication: addPublication,
            getPublications: getPublications,
            getPublication: getPublication,
            editPublication: editPublication,
            deletePublication: deletePublication,
            checkExisting: checkExisting,
            showModal: showModal,
            showDeleteModal: showDeleteModal,
            addOrEdit: addOrEdit
        }

        return publicationFactory;

        function addPublication(publication) {
            var deferred = $q.defer();
            $http.post("/api/publication/add", publication)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPublications() {
            var deferred = $q.defer();
            $http.get("/api/publication/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getPublication(id) {
            var deferred = $q.defer();
            $http.get("/api/publication/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editPublication(publication) {
            var deferred = $q.defer();
            $http.post("/api/publication/edit", publication)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deletePublication(publication) {
            var deferred = $q.defer();
            $http.post("/api/publication/delete", publication)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }


        function checkExisting(name) {
            var deferred = $q.defer();
            $http.get("/api/publication/checkExisting?name=" + name)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function showModal(publicationModal, templateURL, controller, controllerAs) {
            $uibModal.open({
                animation: true,
                backdrop: true,
                keyboard: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/components/' + templateURL,
                controller: controller,
                controllerAs: controllerAs,
                resolve: {
                    publicationModal: function () {
                        return publicationModal;
                    }
                }
            });
        }

        function showDeleteModal(publicationModal) {
            $uibModal.open({
                animation: true,
                backdrop: true,
                keyboard: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/components/publications/deletePublication.html',
                controller: 'ModalInstanceController',
                controllerAs: 'modalInstanceCtrl',
                resolve: {
                    publicationModal: function () {
                        return publicationModal;
                    }
                }
            });
        }

        function addOrEdit(publication) {
            var toDo = {};
            if (publication.id === undefined) {
                toDo.action = addPublication(publication);
                toDo.errorMessage = "Error Adding Publication";
                toDo.successMessage = "Publication Added Successfully!";
            } else {
                toDo.action = editPublication(publication);
                toDo.errorMessage = "Error Editing Publication";
                toDo.successMessage = "Publication Edited Successfully!";
            }
            return toDo;
        }


    }
]);