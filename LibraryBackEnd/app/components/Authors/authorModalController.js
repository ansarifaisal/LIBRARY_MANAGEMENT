
AuthorModule.controller("AuthorModalController", [
    "$uibModalInstance",
    "AuthorFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    function ($uibModalInstance, AuthorFactory, $route, toastr, $rootScope, modal) {
        var me = this;

        me.author = modal.author;

        me.title = modal.title;

        me.btnText = modal.btnText;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.submitForm = function () {
            if (me.author.name === "")
                return;

            var addOrEdit = AuthorFactory.addOrEdit(me.author);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Author Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteAuthor = function () {

            $rootScope.isBusy = true;
            AuthorFactory.deleteAuthor(me.author).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Author Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Author");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);