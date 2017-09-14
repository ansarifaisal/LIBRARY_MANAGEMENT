CourseModule.controller("CourseModalController", [
    "$uibModalInstance",
    "CourseFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    function ($uibModalInstance, CourseFactory, $route, toastr, $rootScope, modal) {

        var me = this;

        me.course = modal.course;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.semesters = modal.semesters;

        me.change = false;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.submitForm = function () {
            if (me.course.name === "")
                return;

            var addOrEdit = CourseFactory.addOrEdit(me.course);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Course Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteCourse = function () {

            $rootScope.isBusy = true;
            CourseFactory.deleteCourse(me.course).then(function () {
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

        me.trackChanges = function () {
            me.change = true;
        }

        me.checkExisting = function (name) {
            if (!name || !me.change)
                return;
            CourseFactory.checkExisting(name).then(function (course) {
                me.exists = false;
                if (course)
                    me.exists = true;
                return me.exists;

            });
        }

    }
]);