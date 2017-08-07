SubjectModule.controller("SubjectModalController", [
    "$uibModalInstance",
    "SubjectFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "CourseFactory",
    function ($uibModalInstance, SubjectFactory, $route, toastr, $rootScope, modal, $filter, CourseFactory) {

        var me = this;

        me.subject = modal.subject;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.courses = modal.courses;

        me.semesters = [];

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.submitForm = function () {
            if (me.subject.name === "")
                return;

            var addOrEdit = SubjectFactory.addOrEdit(me.subject);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Subject Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteSubject = function () {

            $rootScope.isBusy = true;
            SubjectFactory.deleteSubject(me.subject).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Subject Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Subject");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getSemesters = function () {
            CourseFactory.getCourses().then(function (response) {
                me.courses = response;
                var name = me.subject.courseName;
                if (name === undefined)
                    return;
                me.semesters = [];
                var len = parseInt(me.courses.length);
                for (var i = 0; i < len; i++) {
                    var course = me.courses[i];
                    if (name === course.name) {
                        me.semesters = SubjectFactory.getSemesters(course.noOfSemesters);
                    }
                }
                return me.semesters;
            });
        }

        $uibModalInstance.opened.then(function () {
            me.getSemesters();
        });

    }
]);