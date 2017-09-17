LostOrReplaceModule.controller("LostOrReplaceModalController", [
    "$uibModalInstance",
    "LostOrReplaceFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    function ($uibModalInstance, LostOrReplaceFactory, $route, toastr, $rootScope, modal, $filter, $scope) {
        var me = this;

        me.book = modal.book;

        me.title = modal.title;

        me.btnText = modal.btnText;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        }

        me.replaceBook = function (book) {
            $rootScope.isBusy = true;
            book.librarian = $rootScope.user.fullName;
            LostOrReplaceFactory.replaceBook(book).then(function () {
                $route.reload();
                me.ok();
                $rootScope.isBusy = false;
                toastr.success("Book status changed to replace.");
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error while replacing book.");
            });
        }

        me.undoReplace = function (book) {
            $rootScope.isBusy = false;
            LostOrReplaceFactory.undoReplaceBook(book).then(function () {
                $route.reload();
                me.ok();
                $rootScope.isBusy = false;
                toastr.success("Book status changed to lost.");
            }, function (errorResponse) {
                toastr.error("Error while changing status book.");
            });
        }
    }
]);