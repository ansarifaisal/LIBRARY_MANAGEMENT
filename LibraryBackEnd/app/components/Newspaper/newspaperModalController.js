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

        me.newsPaper = modal.newsPaper;

        me.change = false;

        me.monthPickers = function () {
            me.monthPicker.opened = true;
        };

        me.monthPicker = {
            opened: false
        };

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

        me.newsPaperDatePickers = function () {
            me.newsPaperDatePicker.opened = true;
        };

        me.newsPaperDatePicker = {
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

        me.trackChanges = function () {
            me.change = true;
        }

        me.checkExistingPublisher = function (name) {
            if (!name || !me.change)
                return;
            NewspaperFactory.checkExistingPublisher(name).then(function (newsPaper) {
                me.exists = false;
                if (newsPaper)
                    me.exists = true;
                return me.exists;
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
            if (me.periodicNewspaper.title === "")
                return;
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

        me.checkExistingPeriodicNewsPaper = function (name) {
            if (!name || !me.change)
                return;
            NewspaperFactory.checkExistingPeriodicNewsPaper(name).then(function (periodicNewspaper) {
                me.exists = false;
                if (periodicNewspaper)
                    me.exists = true;
                return me.exists;
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

        me.submitNewspaperMonthForm = function () {

            var publisher = $routeParams.publisher;

            if (me.newsPaperMonth.amount === "")
                me.newsPaperMonth.amount = 0;

            if (me.newsPaperMonth.billNumber === "")
                me.newsPaperMonth.billNumber = 0;

            if (me.newsPaperMonth.publisher === "" || me.newsPaperMonth.publisher === null)
                me.newsPaperMonth.publisher = publisher;

            if (me.newsPaperMonth.title === "")
                me.newsPaperMonth.title = $routeParams.title;


            me.newsPaperMonth.librarian = $rootScope.user.fullName;
            if (me.newsPaperMonth.month)
                me.newsPaperMonth.month = NewspaperFactory.dateParse(me.newsPaperMonth.month);

            if (me.newsPaperMonth.from === "")
                me.newsPaperMonth.from = NewspaperFactory.dateParse(me.newsPaperMonth.from);

            if (me.newsPaperMonth.to === "")
                me.newsPaperMonth.to = NewspaperFactory.dateParse(me.newsPaperMonth.to);

            var addOrEdit = NewspaperFactory.addOrEditNewspaperMonth(me.newsPaperMonth);

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

        me.checkExistingNewsPaperMonth = function (date) {
            if (!date || !me.change)
                return;
            NewspaperFactory.checkExistingNewsPaperMonth(date).then(function (newsPaperMonth) {
                me.exists = false;
                if (newsPaperMonth)
                    me.exists = true;
                return me.exists;
            });
        }

        me.deleteNewspaperMonth = function () {
            $rootScope.isBusy = true;
            NewspaperFactory.deleteNewspaperMonth(me.newsPaperMonth).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Newspaper Month Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();
                toastr.error("Error Deleting Newspaper Month.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.initNewspaperData = function () {
            me.newsPaper.date = NewspaperFactory.parseDate(new Date);
        }

        me.submitNewspaperForm = function () {

            if (me.newsPaper.price === "")
                return;
            me.newsPaper.title = $routeParams.title;
            me.newsPaper.month = NewspaperFactory.dateParse($routeParams.month);
            me.newsPaper.publisher = $routeParams.publisher;
            me.newsPaper.librarian = $rootScope.user.fullName;
            me.newsPaper.date = NewspaperFactory.dateParse(me.newsPaper.date);
            if (me.newsPaper.remark === "")
                me.newsPaper.remark = "NA";
            var addOrEdit = NewspaperFactory.addOrEditNewspaper(me.newsPaper);
            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                me.ok();
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteNewspaper = function () {
            $rootScope.isBusy = true;
            NewspaperFactory.deleteNewspaper(me.newsPaper).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Newspaper Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();
                toastr.error("Error Deleting Newspaper.");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }
    }
]);