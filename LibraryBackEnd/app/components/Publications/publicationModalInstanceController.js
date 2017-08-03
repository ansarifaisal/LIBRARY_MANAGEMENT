
PublicationModule.controller('ModalInstanceController', [
    "$uibModalInstance",
    "PublicationFactory",
    "$scope",
    "$route",
    "toastr",
    "$rootScope",
    "publicationModal",
    function ($uibModalInstance, PublicationFactory, $scope, $route, toastr, $rootScope, publicationModal) {

        var $ctrl = this;

        $rootScope.isBusy = false;

        $ctrl.ok = function () {
            return $uibModalInstance.close("Closed");
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss("cancel");
        };

        $ctrl.publication = publicationModal.publication;
        $ctrl.title = publicationModal.title;
        $ctrl.btnText = publicationModal.btnText;

        $ctrl.submitPublicationForm = function () {
            if ($ctrl.publication.name === "")
                return;

            var addOrEdit = PublicationFactory.addOrEdit($ctrl.publication);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;
            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Publication Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        $ctrl.deletePublication = function () {

            $rootScope.isBusy = true;
            PublicationFactory.deletePublication($ctrl.publication).then(function () {
                $ctrl.ok();
                $route.reload();
                toastr.success("Publication Deleted Successfully!");
            }, function (errorResponse) {
                $ctrl.cancel();

                toastr.error("Error Deleting Publication");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        $ctrl.checkExisting = function () {
            var name = $ctrl.publication.name;
            PublicationFactory.checkExisting(name).then(function (exists) {
                $ctrl.exists = false;
                if (exists === true)
                    $ctrl.exists = true;
                return $ctrl.exists;

            }, function (errorResponse) {
                toastr.error("Error checking publication");
            });
        }

    }]);