NewspaperModule.controller("NewspaperController", [
    "NewspaperFactory",
    "AppService",
    "AuthenticationFactory",
    "IssueBookFactory",
    "BookFactory",
    "UserFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "$window",
    function (NewspaperFactory, AppService, AuthenticationFactory, IssueBookFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window) {

        var me = this;

        me.publishers = [];

        me.publisher = {
            title: ''
        };

        me.publisherModal = {
            publisher: undefined,
            title: '',
            btnText: ''
        }

        me.periodicNewspapers = [];

        me.periodicNewspaper = {
            title: '',
            amount: '',
            librarian: '',
            remark: ''
        }

        me.periodicNewspaperModal = {
            periodicNewspaper: undefined,
            title: '',
            btnText: ''
        }

        me.newsPaperMonths = [];

        me.newsPaperMonth = {
            month: '',
            billNumber: '',
            amount: '',
            publisher: '',
            title: '',
            librarian: '',
            from: '',
            to: ''
        };

        me.newsPaperMonthModal = {
            newsPaperMonth: undefined,
            title: '',
            btnText: ''
        }

        me.newsPapers = [];

        me.newsPaper = {
            title: '',
            month: '',
            publisher: '',
            date: '',
            price: '',
            librarian: '',
            remark: ''
        };

        me.newsPaperModal = {
            newsPaper: undefined,
            title: '',
            btnText: ''
        }

        me.getPublishers = function () {
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithFunction("Add Publisher", me.showPublisherForm);

            NewspaperFactory.getPublishers().then(function (publishers) {
                me.publishers = publishers;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showPublisherForm = function () {
            me.publisherModal.publisher = me.publisher;
            me.publisherModal.title = "Add New Publisher";
            me.publisherModal.btnText = "Add Publisher";
            AppService.showModal(me.publisherModal,
                "newspaper/publisherForm.html",
                "NewsPaperModalController",
                "newsPaperModalCtrl");
        }

        me.getPublisher = function (id) {
            NewspaperFactory.getPublisher(id).then(function (publisher) {
                me.publisherModal.publisher = publisher;
                me.publisherModal.title = "Edit Publisher";
                me.publisherModal.btnText = "Save Changes";
                AppService.showModal(me.publisherModal,
                    "newspaper/publisherForm.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.deletePublisherModal = function (id) {
            NewspaperFactory.getPublisher(id).then(function (publisher) {
                me.publisherModal.publisher = publisher;
                me.publisherModal.title = "Delete Publisher";
                me.publisherModal.btnText = "Delete";
                AppService.showModal(me.publisherModal,
                    "newspaper/confirmDeletePublisher.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.getPeriodicDetails = function () {
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithFunction("Add Periodic Details", me.showPeriodicDetailsForm);

            NewspaperFactory.getPeriodicNewsPapers().then(function (periodicNewspapers) {
                me.periodicNewspapers = periodicNewspapers;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showPeriodicDetailsForm = function () {
            me.periodicNewspaperModal.periodicNewspaper = me.periodicNewspaper;
            me.periodicNewspaperModal.title = "Add New Periodic Details";
            me.periodicNewspaperModal.btnText = "Add Periodic Details";
            AppService.showModal(me.periodicNewspaperModal,
                "newspaper/periodicNewspaperForm.html",
                "NewsPaperModalController",
                "newsPaperModalCtrl");
        }

        me.getPeriodicDetail = function (id) {
            NewspaperFactory.getPeriodicNewsPaper(id).then(function (periodicNewspaper) {
                me.periodicNewspaperModal.periodicNewspaper = periodicNewspaper;
                me.periodicNewspaperModal.title = "Edit Periodic Details";
                me.periodicNewspaperModal.btnText = "Save Changes";
                AppService.showModal(me.periodicNewspaperModal,
                    "newspaper/periodicNewspaperForm.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.deletePeriodicDetailModal = function (id) {
            NewspaperFactory.getPeriodicNewsPaper(id).then(function (periodicNewspaper) {
                me.periodicNewspaperModal.periodicNewspaper = periodicNewspaper;
                me.periodicNewspaperModal.title = "Delete Periodic Detail";
                me.periodicNewspaperModal.btnText = "Delete";
                AppService.showModal(me.periodicNewspaperModal,
                    "newspaper/confirmDeletePeriodicDetails.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.getNewspaperMonths = function () {
            var title = $routeParams.title;
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithFunction("Add Month", me.showNewspaperMonthForm);

            NewspaperFactory.getNewspaperMonths(title).then(function (newsPaperMonths) {
                me.newsPaperMonths = newsPaperMonths;
                if (me.newsPaperMonths.length === 0)
                    return;
                var totalAmount = 0;
                for (var i = 0; i < newsPaperMonths.length; i++) {
                    me.newsPaperMonths[i].from = NewspaperFactory.formatDate(newsPaperMonths[i].from);
                    me.newsPaperMonths[i].to = NewspaperFactory.formatDate(newsPaperMonths[i].to);
                    if (me.newsPaperMonths[i].title == title)
                        totalAmount = totalAmount + me.newsPaperMonths[i].amount;
                }
                NewspaperFactory.checkExistingPeriodicNewsPaper(title).then(function (periodicNewsPaper) {
                    me.periodicNewspaper = periodicNewsPaper;
                    if (me.periodicNewspaper.amount === totalAmount)
                        return;
                    me.periodicNewspaper.amount = totalAmount;
                    NewspaperFactory.editPeriodicNewsPaper(me.periodicNewspaper);
                });
                $rootScope.isBusy = false; 2
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showNewspaperMonthForm = function () {
            me.newsPaperMonthModal.newsPaperMonth = me.newsPaperMonth;
            me.newsPaperMonthModal.title = "Add New Month";
            me.newsPaperMonthModal.btnText = "Add Month";
            AppService.showModal(me.newsPaperMonthModal,
                "newspaper/newsPaperMonthForm.html",
                "NewsPaperModalController",
                "newsPaperModalCtrl");
        }

        me.getNewspaperMonth = function (id) {
            NewspaperFactory.getNewspaperMonth(id).then(function (newsPaperMonth) {
                newsPaperMonth.month = NewspaperFactory.parseDate(newsPaperMonth.month);
                newsPaperMonth.from = NewspaperFactory.parseDate(newsPaperMonth.from);
                newsPaperMonth.to = NewspaperFactory.parseDate(newsPaperMonth.to);
                me.newsPaperMonthModal.newsPaperMonth = newsPaperMonth;
                me.newsPaperMonthModal.title = "Edit Month";
                me.newsPaperMonthModal.btnText = "Save Changes";
                AppService.showModal(me.newsPaperMonthModal,
                    "newspaper/newsPaperMonthForm.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.deleteNewspaperMonthModal = function (id) {
            NewspaperFactory.getNewspaperMonth(id).then(function (newsPaperMonth) {
                me.newsPaperMonthModal.newsPaperMonth = newsPaperMonth;
                me.newsPaperMonthModal.title = "Delete Month";
                me.newsPaperMonthModal.btnText = "Delete";
                AppService.showModal(me.newsPaperMonthModal,
                    "newspaper/confirmDeletePublisherMonth.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.getNewspapers = function () {
            me.title = $routeParams.title;
            me.month = $routeParams.month;
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithFunction("Add Newspaper", me.showNewspaperForm);

            NewspaperFactory.getNewspapers(me.title, me.month).then(function (newsPapers) {
                me.newsPapers = newsPapers;
                var totalAmount = 0;
                var month;
                if (me.newsPapers.length === 0)
                    return;
                for (var i = 0; i < me.newsPapers.length; i++) {
                    month = me.newsPapers[i].month;
                    if (month == me.month)
                        totalAmount = parseInt(totalAmount) + parseInt(me.newsPapers[i].price);
                }
                me.month = NewspaperFactory.parseDate(me.month);
                NewspaperFactory.checkExistingNewsPaperMonth(me.month).then(function (newsMonth) {
                    me.newsMonth = newsMonth;
                    if (totalAmount === me.newsMonth.amount)
                        return;
                    me.newsMonth.amount = totalAmount;
                    NewspaperFactory.editNewspaperMonth(me.newsMonth);
                });
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });

        }

        me.showNewspaperForm = function () {
            me.newsPaperModal.newsPaper = me.newsPaper;
            me.newsPaperModal.title = "Add New Newspaper";
            me.newsPaperModal.btnText = "Add Newspaper";
            AppService.showModal(me.newsPaperModal,
                "newspaper/newsPaperForm.html",
                "NewsPaperModalController",
                "newsPaperModalCtrl");
        }

        me.getNewsPaper = function (id) {
            NewspaperFactory.getNewspaper(id).then(function (newsPaper) {
                me.newsPaperModal.newsPaper = newsPaper;
                me.newsPaperModal.title = "Edit Newspaper";
                me.newsPaperModal.btnText = "Save Changes";
                AppService.showModal(me.newsPaperModal,
                    "newspaper/newsPaperForm.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.deleteNewsPaperModal = function (id) {
            NewspaperFactory.getNewspaper(id).then(function (newsPaper) {
                me.newsPaperModal.newsPaper = newsPaper;
                me.newsPaperModal.title = "Delete Newspaper";
                me.newsPaperModal.btnText = "Delete";
                AppService.showModal(me.newsPaperModal,
                    "newspaper/confirmNewspaperDelete.html",
                    "NewsPaperModalController",
                    "newsPaperModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }
    }
]);