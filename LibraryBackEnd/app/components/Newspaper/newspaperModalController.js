NewspaperModule.controller("NewsPaperModalController", [
    "$uibModalInstance",
    "NewspaperFactory",
    "UserFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    "$routeParams",
    function ($uibModalInstance, NewspaperFactory, UserFactory, $route, toastr, $rootScope, modal, $filter, $scope, $routeParams) {

        var me = this;

        me.btnText = modal.btnText;

        me.title = modal.title;

        me.publisher = modal.publisher;

        me.periodicNewspaper = modal.periodicNewspaper;

        me.newsPaperMonth = modal.newsPaperMonth;

        me.fromMonthPickers = function () {
            me.fromMonthPicker.opened = true;
        };

        me.fromMonthPicker = {
            opened: false
        };

        me.toMonthPickers = function () {
            me.toMonthPicker.opened = true;
        };

        me.toMonthPicker = {
            opened: false
        };

        me.orderDatePickers = function () {
            me.orderDatePicker.opened = true;
        };

        me.orderDatePicker = {
            opened: false
        };


        me.billDatePickers = function () {
            me.billDatePicker.opened = true;
        };

        me.billDatePicker = {
            opened: false
        };

        me.monthPickerOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minMode: "month",
            datepickerMode: "month",
            startingDay: 1
        };

        me.datePickerOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

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

            var addOrEdit = NewspaperFactory.addOrEditPublisher(me.publisher);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deletePublisher = function () {
            $rootScope.isBusy = true;
            NewspaperFactory.deletePublisher(me.publisher).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Publisher Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Publisher.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.setData = function () {
            NewspaperFactory.getPublishers().then(function (publishers) {
                me.publishers = publishers;
            });
        }

        me.submitPeriodicDetailsForm = function () {

            if (me.periodicNewspaper.amount === "")
                me.periodicNewspaper.amount = 0;
            if (me.periodicNewspaper.remark === "")
                me.periodicNewspaper.remark = "NA";
            me.periodicNewspaper.librarian = $rootScope.user.fullName;
            var addOrEdit = NewspaperFactory.addOrEditPeriodicNewsPaper(me.periodicNewspaper);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deletePeriodicDetail = function () {
            $rootScope.isBusy = true;
            NewspaperFactory.deletePeriodicNewsPaper(me.periodicNewspaper).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Periodic Details Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Periodic Details.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);