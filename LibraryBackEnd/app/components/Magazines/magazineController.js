MagazineModule.controller("MagazineController", [
    "MagazineFactory",
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
    function (MagazineFactory, AppService, AuthenticationFactory, IssueBookFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
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

        me.magazine = {
            id: undefined,
            periodicTitle: '',
            month: '',
            volume: '',
            number: '',
            dateOfRecieved: '',
            recievedBy: '',
            status: '',
            remark: ''
        };

        me.magazineModal = {
            magazine: undefined,
            title: '',
            btnText: ''
        }

        me.issueMagazine = {
            title: '',
            number: '',
            volume: '',
            issuedDate: '',
            returnDate: '',
            issuedBy: '',
            rollNo: '',
            fullName: '',
            course: '',
            email: '',
            fine: ''
        }

        me.issueMagazineModal = {
            issueMagazine: undefined,
            title: '',
            btnText: ''
        }

        me.lostMagazineModal = {
            lostOrReplace: '',
            title: '',
            btnText: ''
        }

        me.lostMagazines = []

        me.magazines = [];

        me.periodicDetails = [];

        me.publishers = [];

        me.issuedMagazines = [];

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

        me.getPeriodicDetail = function (id) {
            MagazineFactory.getPeriodicDetail(id).then(function (periodicDetail) {
                me.periodicDetailModal.periodicDetail = periodicDetail;
                me.periodicDetailModal.title = "Edit Magazine Detail";
                me.periodicDetailModal.btnText = "Save Changes";
                AppService.showModal(me.periodicDetailModal,
                    "magazines/periodicMagazineForm.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            });
        }

        me.deletePeriodicDetailModal = function (id) {
            MagazineFactory.getPeriodicDetail(id).then(function (periodicDetail) {
                me.periodicDetailModal.periodicDetail = periodicDetail;
                me.periodicDetailModal.title = "Delete Periodic Details";
                me.periodicDetailModal.btnText = "Delete";
                AppService.showModal(me.periodicDetailModal,
                    "magazines/deletePeriodicDetails.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            });
        }

        me.getMagazines = function () {
            me.title = $routeParams.title;
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
                   text: "<i class='fa fa-plus'></i> Add Magazine",
                   key: '1',
                   className: 'btn btn-success margin-4x',
                   action: function (e, dt, node, config) {
                       me.showMagazineForm();
                   }
               }

              ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            MagazineFactory.getMagazines(me.title).then(function (magazines) {
                me.magazines = magazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showMagazineForm = function () {
            me.magazineModal.magazine = me.magazine;
            me.magazineModal.title = "Add New Magazine";
            me.magazineModal.btnText = "Add Magazine";
            AppService.showModal(me.magazineModal,
                "magazines/magazineForm.html",
                "MagazineModalController",
                "magazineModalCtrl");
        }

        me.getMagazine = function (id) {
            MagazineFactory.getMagazine(id).then(function (magazine) {
                me.magazineModal.magazine = magazine;
                me.magazineModal.magazine.month = MagazineFactory.parseDate(me.magazineModal.magazine.month);
                me.magazineModal.magazine.dateOfRecieved = MagazineFactory.parseDate(me.magazineModal.magazine.dateOfRecieved);
                me.magazineModal.title = "Edit Magazine";
                me.magazineModal.btnText = "Save Changes";
                AppService.showModal(me.magazineModal,
                    "magazines/magazineForm.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting data");
            });
        }

        me.deleteMagazineModal = function (id) {
            MagazineFactory.getMagazine(id).then(function (magazine) {
                me.magazineModal.magazine = magazine;
                me.magazineModal.title = "Delete Magazine";
                me.magazineModal.btnText = "Delete";
                AppService.showModal(me.magazineModal,
                                     "magazines/deleteMagazine.html",
                                     "MagazineModalController",
                                     "magazineModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error getting data");
            });
        }

        me.getIssuedMagazines = function () {
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
                   text: "<i class='fa fa-plus'></i> Issue Magazine",
                   key: '1',
                   className: 'btn btn-success margin-4x',
                   action: function (e, dt, node, config) {
                       me.showIssueMagazineForm();
                   }
               }

              ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            MagazineFactory.getIssuedMagazines().then(function (issuedMagazines) {
                me.issuedMagazines = issuedMagazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showIssueMagazineForm = function () {
            me.issueMagazine.issuedDate = IssueBookFactory.getIssueDate();
            me.issueMagazine.returnDate = IssueBookFactory.getReturnDate();
            me.issueMagazineModal.issueMagazine = me.issueMagazine;
            me.issueMagazineModal.title = "Issue Magazine";
            me.issueMagazineModal.btnText = "Issue Magazine";
            AppService.showModal(me.issueMagazineModal,
                "magazines/issueMagazineForm.html",
                "MagazineModalController",
                "magazineModalCtrl");
        }

        me.getIssuedMagazine = function (id) {
            MagazineFactory.getIssuedMagazine(id).then(function (issueMagazine) {
                issueMagazine.issuedDate = MagazineFactory.formatDate(issueMagazine.issuedDate);
                issueMagazine.returnDate = MagazineFactory.formatDate(issueMagazine.returnDate);
                me.issueMagazineModal.issueMagazine = issueMagazine;
                me.issueMagazineModal.title = "Edit Issue Magazine";
                me.issueMagazineModal.btnText = "Save Changes";
                AppService.showModal(me.issueMagazineModal,
                    "magazines/issueMagazineForm.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {

                toastr.error("Error getting data");
            });
        }

        me.confirmReturnMagazine = function (id) {
            MagazineFactory.getIssuedMagazine(id).then(function (issueMagazine) {
                me.issueMagazineModal.issueMagazine = issueMagazine;
                me.issueMagazineModal.title = "Return Issue Magazine";
                me.issueMagazineModal.btnText = "Return";
                AppService.showModal(me.issueMagazineModal,
                    "magazines/confirmReturnMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {

                toastr.error("Error getting data");
            });
        }

        me.confirmReplaceOrLostMagazine = function (id) {
            MagazineFactory.getIssuedMagazine(id).then(function (issueMagazine) {
                me.issueMagazineModal.issueMagazine = issueMagazine;
                me.issueMagazineModal.title = "Lost Issue Magazine";
                me.issueMagazineModal.btnText = "Lost";
                AppService.showModal(me.issueMagazineModal,
                    "magazines/confirmLostOrReplaceMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {

                toastr.error("Error getting data");
            });
        }

        me.getLostMagazines = function () {
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

              ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            MagazineFactory.getLostMagazines().then(function (lostMagazines) {
                me.lostMagazines = lostMagazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Magazines");
            });
        }

        me.confirmReplaceMagazine = function (id) {
            MagazineFactory.getLostMagazine(id).then(function (lostOrReplace) {
                me.lostMagazineModal.lostOrReplace = lostOrReplace;
                me.lostMagazineModal.title = "Replace Magazine";
                me.lostMagazineModal.btnText = "Replace";
                AppService.showModal(me.lostMagazineModal,
                    "magazines/confirmReplaceMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error Fetching Magazines");
            });
        }

        me.confirmUndoReplaceMagazine = function (id) {
            MagazineFactory.getLostMagazine(id).then(function (lostOrReplace) {
                me.lostMagazineModal.lostOrReplace = lostOrReplace;
                me.lostMagazineModal.title = "Undo Replace Magazine";
                me.lostMagazineModal.btnText = "Undo Replace";
                AppService.showModal(me.lostMagazineModal,
                    "magazines/confirmUndoReplaceMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error Fetching Magazine");
            });
        }

        me.getReturnMagazines = function () {
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

              ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            MagazineFactory.getReturnMagazines().then(function (magazines) {
                me.magazines = magazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                console.log(errorResponse);
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Magazines");
            });
        }
    }
]);