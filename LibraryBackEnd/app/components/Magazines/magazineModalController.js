MagazineModule.controller("MagazineModalController", [
    "$uibModalInstance",
    "MagazineFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    function ($uibModalInstance, MagazineFactory, $route, toastr, $rootScope, modal, $filter, $scope) {

        var me = this;

        me.publisher = modal.publisher;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.periodicDetail = modal.periodicDetail;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.submitPublisherForm = function () {
            if (me.publisher.title === "")
                return;

            var addOrEdit = MagazineFactory.addOrEditPublisher(me.publisher);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Publisher Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deletePublisher = function () {
            $rootScope.isBusy = true;
            MagazineFactory.deletePublisher(me.publisher).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Course Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Course");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.submitPeriodicMagazineForm = function () {

        }
    }
]);