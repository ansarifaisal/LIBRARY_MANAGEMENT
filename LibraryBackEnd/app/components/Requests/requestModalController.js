RequestModule.controller("RequestModalController", [
    "$uibModalInstance",
    "RequestFactory",
    "BookFactory",
    "$route",
    "$timeout",
    "toastr",
    "$rootScope",
    "modal",
    function ($uibModalInstance, RequestFactory, BookFactory, $route, $timeout, toastr, $rootScope, modal) {

        var me = this;

        me.request = modal.request;
        me.title = modal.title;
        me.btnText = modal.btnText;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.submitForm = function () {
            if (me.request.title === "")
                return;

            var user = $rootScope.user;
            me.request.rollNo = user.rollNo;
            me.request.name = user.fullName;
            me.request.studentCourse = user.course;
            me.request.email = user.email;

            if (!me.request.remark)
                me.request.remark = "Not Provided!";

            var type = me.request.type;

            if (type === "Reference") {
                me.request.semester = 0;
                me.request.subject = "General";
            }

            if (type === "Novel" || type === "Drama") {
                me.request.course = "General";
                me.request.semester = 0;
                me.request.subject = "General";
            }

            var addOrEdit = RequestFactory.addOrEdit(me.request);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Request Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getSemesters = function (courses, courseName) {
            return me.semesters = BookFactory.getSemesters(courses, courseName);
        }

        me.getSubjects = function (courseName, semester) {
            return me.subjects = BookFactory.getSubjects(courseName, semester);
        }

        me.getTypes = function () {
            return me.types = BookFactory.getTypeOfBook();
        }

        me.updateRequestStatus = function (status) {
            me.request.status = status;
            RequestFactory.updateStatus(me.request).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Request " + status + " Successfully!");
            });
        }

        me.getData = function () {
            me.courses = BookFactory.getCourses();
            me.getTypes();
            $timeout(function () {
                if (me.request.bookCourse === undefined)
                    return;
                me.getSemesters(me.courses, me.request.bookCourse);
                if (me.request.bookCourse === undefined || me.request.subject === undefined)
                    return;
                me.getSubjects(me.request.bookCourse, me.request.semester);
            }, 100);
        }

        $uibModalInstance.opened.then(function () {


        })
    }
]);