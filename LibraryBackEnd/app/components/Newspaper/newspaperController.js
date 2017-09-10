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
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (NewspaperFactory, AppService, AuthenticationFactory, IssueBookFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {

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

        me.getPublishers = function () {
            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
          .withBootstrap()
          .withPaginationType('full_numbers')
          .withDOM('Bfrtip')
          .withOption('scrollX', '100%')
          .withOption('scrollY', '100%')
          .withOption('scrollCollapse', true)
          .withButtons([
               {
                   extend: 'copy',
                   className: 'btn btn-default',
                   text: "<i class='fa fa-clipboard fa-lg'></i> Copy",
                   exportOptions: {
                       columns: ':not(:last-child)'
                   }
               },
               {
                   extend: 'print',
                   className: 'btn btn-default',
                   text: "<i class='fa fa-print fa-lg'></i> Print",
                   exportOptions: {
                       columns: ':not(:last-child)'
                   }
               },
               {
                   text: "<i class='fa fa-plus'></i> Add Publisher",
                   key: '1',
                   className: 'btn btn-success margin-4x',
                   action: function (e, dt, node, config) {
                       me.showPublisherForm();
                   }
               }

          ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
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
            me.dtOptions = DTOptionsBuilder.newOptions()
          .withBootstrap()
          .withPaginationType('full_numbers')
          .withDOM('Bfrtip')
          .withOption('scrollX', '100%')
          .withOption('scrollY', '100%')
          .withOption('scrollCollapse', true)
          .withButtons([
               {
                   extend: 'copy',
                   className: 'btn btn-default',
                   text: "<i class='fa fa-clipboard fa-lg'></i> Copy",
                   exportOptions: {
                       columns: ':not(:last-child)'
                   }
               },
               {
                   extend: 'print',
                   className: 'btn btn-default',
                   text: "<i class='fa fa-print fa-lg'></i> Print",
                   exportOptions: {
                       columns: ':not(:last-child)'
                   }
               },
               {
                   text: "<i class='fa fa-plus'></i> Add Periodic Details",
                   key: '1',
                   className: 'btn btn-success margin-4x',
                   action: function (e, dt, node, config) {
                       me.showPeriodicDetailsForm();
                   }
               }

          ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
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
            me.dtOptions = DTOptionsBuilder.newOptions()
          .withBootstrap()
          .withPaginationType('full_numbers')
          .withDOM('Bfrtip')
          .withOption('scrollX', '100%')
          .withOption('scrollY', '100%')
          .withOption('scrollCollapse', true)
          .withButtons([
               {
                   extend: 'copy',
                   className: 'btn btn-default',
                   text: "<i class='fa fa-clipboard fa-lg'></i> Copy",
                   exportOptions: {
                       columns: ':not(:last-child)'
                   }
               },
               {
                   extend: 'print',
                   className: 'btn btn-default',
                   text: "<i class='fa fa-print fa-lg'></i> Print",
                   exportOptions: {
                       columns: ':not(:last-child)'
                   }
               },
               {
                   text: "<i class='fa fa-plus'></i> Add Month",
                   key: '1',
                   className: 'btn btn-success margin-4x',
                   action: function (e, dt, node, config) {
                       me.showNewspaperMonthForm();
                   }
               }

          ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            NewspaperFactory.getNewspaperMonths(title).then(function (newsPaperMonths) {
                me.newsPaperMonths = newsPaperMonths;
                $rootScope.isBusy = false;
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
    }
]);