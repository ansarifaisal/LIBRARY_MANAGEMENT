UserModule.controller("UserModalController", ["$uibModalInstance",
    "UserFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    function ($uibModalInstance, UserFactory, $route, toastr, $rootScope, modal, $filter) {

        var me = this;

        me.user = modal.user;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        $uibModalInstance.opened.then(function () {
            me.courses = UserFactory.getCourses();
            me.years = UserFactory.getYears(-2, 20);
        });

        me.submitForm = function () {
            UserFactory.editStudent(me.user).then(function () {
                toastr.success("User Edited Successfully!");
                $route.reload();
            }, function (errorResponse) {
                toastr.error("Error Editing User");
            });
        }

        me.deleteStudent = function () {

            $rootScope.isBusy = true;
            UserFactory.deleteStudent(me.user).then(function () {
                me.ok();
                $route.reload();
                toastr.success("User Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();
                toastr.error("Error Deleting User");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);