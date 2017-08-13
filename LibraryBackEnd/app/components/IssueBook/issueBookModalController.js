IssueBookModule.controller("IssueBookModalController", [
    "$uibModalInstance",
    "IssueBookFactory",
    "AuthorFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    function ($uibModalInstance, IssueBookFactory, AuthorFactory, $route, toastr, $rootScope, modal, $filter, $scope) {

        var me = this;

        me.issueBook = modal.issueBook;

        me.title = modal.title;

        me.btnText = modal.btnText;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };


        me.deleteIssueBook = function () {

            $rootScope.isBusy = true;
            IssueBookFactory.deleteIssueBook(me.issueBook).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Issue Book Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Issue Book");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);