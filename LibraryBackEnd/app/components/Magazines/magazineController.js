MagazineModule.controller("MagazineController", [
    "MagazineFactory",
    "AppService",
    "AuthenticationFactory",
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
    function (MagazineFactory, AppService, AuthenticationFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.publisher = {
            title: ''
        }

        me.publisherModal = {
            publiser: undefined,
            title: '',
            btnText: ''
        }

        me.periodicDetail = {
            title: '',
            periodicity: '',
            subscription: '',
            from: '',
            to: '',
            volume: '',
            source: '',
            orderNo: '',
            orderDate: '',
            billNo: '',
            billDate: '',
            amount: '',
            chequeNo: ''
        }

        me.periodicDetailModal = {
            periodicDetail: undefined,
            title: '',
            btnText: ''
        }

        me.periodicDetails = [];

        me.publishers = [];

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
            MagazineFactory.getPublishers().then(function (publishers) {
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
                "magazines/publicationForm.html",
                "MagazineModalController",
                "magazineModalCtrl");
        }

        me.getPublisher = function (id) {
            MagazineFactory.getPublisher(id).then(function (publisher) {
                me.publisherModal.publisher = publisher;
                me.publisherModal.title = "Edit Publisher";
                me.publisherModal.btnText = "Edit Publisher";
                AppService.showModal(me.publisherModal,
                    "magazines/publicationForm.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            });
        }

        me.deletePublisherModal = function (id) {
            MagazineFactory.getPublisher(id).then(function (publisher) {
                me.publisherModal.publisher = publisher;
                me.publisherModal.title = "Delete Publisher";
                me.publisherModal.btnText = "Delete";
                AppService.showModal(me.publisherModal,
                    "magazines/deletePublisher.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
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
                       me.showPeriodicDetailForm();
                   }
               }

              ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            MagazineFactory.getPeriodicDetails().then(function (periodicDetails) {
                me.periodicDetails = periodicDetails;
                console.log(me.periodicDetails);
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showPeriodicDetailForm = function () {
            me.periodicDetailModal.periodicDetail = me.periodicDetail;
            me.periodicDetailModal.title = "Add New Magazine Detail";
            me.periodicDetailModal.btnText = "Add Magazine Detail";
            AppService.showModal(me.periodicDetailModal,
                "magazines/periodicMagazineForm.html",
                "MagazineModalController",
                "magazineModalCtrl");
        }
    }
]);