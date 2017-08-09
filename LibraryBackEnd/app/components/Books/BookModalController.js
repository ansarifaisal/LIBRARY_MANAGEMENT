BookModule.controller("BookModalController", [
    "$uibModalInstance",
    "BookFactory",
    "AuthorFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    function ($uibModalInstance, BookFactory, AuthorFactory, $route, toastr, $rootScope, modal, $filter, $scope) {

        var me = this;

        me.book = modal.book;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.courses = modal.courses;

        me.authors = [];

        me.semesters = [];

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.billDatePicker = function () {
            me.billDatePopup.opened = true;
        };

        me.billDatePopup = {
            opened: false
        };

        me.dateOfPublicationDatePicker = function () {
            me.dateOfPublicationPopup.opened = true;
        };

        me.dateOfPublicationPopup = {
            opened: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };


        me.submitForm = function () {
            if (me.book.name === "")
                return;
            var date = me.book.billDate;

            //var addOrEdit = BookFactory.addOrEdit(me.book);

            //$action = addOrEdit.action;
            //$rootScope.isBusy = true;

            //$action.then(function () {
            //    $route.reload();
            //    toastr.success(addOrEdit.successMessage);
            //}, function (errorResponse) {
            //    $route.reload();
            //    if (errorResponse.status === 400)
            //        return toastr.error("Book Already Exists");
            //    toastr.error(addOrEdit.errorMessage);
            //}).finally(function () {
            //    $rootScope.isBusy = false;
            //});
        }

        me.deleteBook = function () {

            $rootScope.isBusy = true;
            BookFactory.deleteBook(me.book).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Book Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Book");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getSemesters = function () {
            CourseFactory.getCourses().then(function (response) {
                me.courses = response;
                var name = me.book.courseName;
                if (name === undefined)
                    return;
                me.semesters = [];
                var len = parseInt(me.courses.length);
                for (var i = 0; i < len; i++) {
                    var course = me.courses[i];
                    if (name === course.name) {
                        me.semesters = BookFactory.getSemesters(course.noOfSemesters);
                    }
                }
                return me.semesters;
            });
        }

        me.getAuthor = function () {
            AuthorFactory.getAuthors().then(function (authors) {
                me.authors = authors;
                return me.authors;
            });
        }

        $uibModalInstance.opened.then(function () {
            me.getAuthor();
        });



    }
]);