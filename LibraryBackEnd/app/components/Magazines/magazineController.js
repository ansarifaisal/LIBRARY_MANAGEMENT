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
    function (MagazineFactory, AppService, AuthenticationFactory, IssueBookFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window) {

        var me = this;

        me.publisher = {
            title: ''
        }

        me.publisherModal = {
            publiser: undefined,
            title: '',
            btnText: ''
        }

        me.change = false;

        me.periodicDetail = {
            title: '',
            subscription: '',
            subscriptionAmount: '',
            subscriptionDate: '',
            subscriptionDuration: '',
            chequeDate: '',
            bundleSentDate: '',
            bundleDeliveryDate: '',
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
            periodicId: '',
            publisher:'',
            month: '',
            volume: '',
            issn: undefined,
            number: '',
            libRef:'',
            dateOfRecieved: '',
            recievedBy: ''
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

        me.bindingMagazine = {
            accessionNumber: '',
            title: '',
            pages: '',
            editor: '',
            issn: '',
            source: '',
            classNo: '',
            billNumber: '',
            billDate: ''
        };

        me.bindingMagazineModal = {
            bindingMagazine: '',
            title: '',
            btnText: ''
        }

        me.lostMagazines = []

        me.magazines = [];

        me.periodicDetails = [];

        me.publishers = [];

        me.issuedMagazines = [];

        me.bindingMagazines = [];

        me.remark = '';

        me.getPublishers = function () {
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithFunction("Add Publisher", me.showPublisherForm);

            MagazineFactory.getPublishers().then(function (publishers) {
                me.publishers = publishers;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
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
            var user = $rootScope.user;
            if (user.role === 'ADMIN')
                me.dtOptions = AppService.dataTableWithFunction("Add Periodical Details", me.showPeriodicDetailForm);
            else
                me.dtOptions = AppService.dataTableWithOutFunction();
            MagazineFactory.getPeriodicDetails().then(function (periodicDetails) {
                me.periodicDetails = periodicDetails;
                for (var i = 0; i < me.periodicDetails.length; i++) {
                    me.periodicDetails[i].billDate = new Date(me.periodicDetails[i].billDate);
                    me.periodicDetails[i].orderDate = new Date(me.periodicDetails[i].orderDate);
                    me.periodicDetails[i].chequeDate = new Date(me.periodicDetails[i].chequeDate);
                    me.periodicDetails[i].bundleSentDate = new Date(me.periodicDetails[i].bundleSentDate);
                    me.periodicDetails[i].bundleDeliveryDate = new Date(me.periodicDetails[i].bundleDeliveryDate);
                }
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showPeriodicDetailForm = function () {
            me.periodicDetailModal.periodicDetail = me.periodicDetail;
            me.periodicDetailModal.title = "Add New Periodic Detail";
            me.periodicDetailModal.btnText = "Add Periodic Detail";
            AppService.showModal(me.periodicDetailModal,
                "magazines/periodicMagazineForm.html",
                "MagazineModalController",
                "magazineModalCtrl");
        }

        me.getPeriodicDetail = function (id) {
            MagazineFactory.getPeriodicDetail(id).then(function (periodicDetail) {
                me.periodicDetailModal.periodicDetail = periodicDetail;
                me.periodicDetailModal.title = "Edit Periodical Detail";
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
            var user = $rootScope.user;
            if (user.role === 'ADMIN' && $routeParams.bundled !== 'yes')
                me.dtOptions = AppService.dataTableWithFunction("Add Periodical", me.showMagazineForm);
            else
                me.dtOptions = AppService.dataTableWithOutFunction();
            MagazineFactory.getMagazines(me.title).then(function (magazines) {
                me.magazines = magazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {

                $rootScope.isBusy = false;
                toastr.error("Error Fetching Publishers");
            });
        }

        me.showMagazineForm = function () {
            me.magazineModal.magazine = me.magazine;
            me.magazineModal.title = "Add New Periodical";
            me.magazineModal.btnText = "Add ";
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
                me.magazineModal.title = "Edit P";
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
            var user = $rootScope.user;
            if (user.role === 'FACULTY' || user.role === 'STUDENT' || user.role === 'NON-TEACHING')
                return;
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithFunction("Issue Magazine", me.showIssueMagazineForm);

            MagazineFactory.getIssuedMagazines().then(function (issuedMagazines) {
                me.issuedMagazines = issuedMagazines;
                $rootScope.isBusy = false;
                if (me.issuedMagazines.length === 0)
                    return;
                var fine = 0;
                for (var i = 0; i < me.issuedMagazines.length; i++) {
                    var flag = IssueBookFactory.isPastDate(me.issuedMagazines[i].returnDate);
                    if (flag)
                        fine = IssueBookFactory.calculateFine(me.issuedMagazines[i].returnDate);
                    if (fine === me.issuedMagazines[i].fine)
                        continue;
                    me.issuedMagazines[i].fine = fine;
                    MagazineFactory.updateFine(me.issuedMagazines[i]);
                }


            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Issued Magazine");
            });

        }

        me.getIssuedMagazineByRollNo = function () {
            var user = $rootScope.user;

            if (user.role === 'ADMIN' || user.role === 'LIBRARIAN')
                return;

            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithOutFunction();

            MagazineFactory.getIssuedMagazineByRollNumber(user.rollNo).then(function (issuedMagazines) {
                me.issuedMagazines = issuedMagazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Issued Periodical");
            });
        }

        me.showIssueMagazineForm = function () {
            me.issueMagazine.issuedDate = IssueBookFactory.getIssueDate();
            me.issueMagazine.returnDate = IssueBookFactory.getReturnDate();
            me.issueMagazineModal.issueMagazine = me.issueMagazine;
            me.issueMagazineModal.title = "Issue Periodical";
            me.issueMagazineModal.btnText = "Issue Periodical";
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
                me.issueMagazineModal.title = "Return Issue Periodical";
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
                me.issueMagazineModal.title = "Lost Issue Periodical";
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

            me.dtOptions = AppService.dataTableWithOutFunction();

            MagazineFactory.getLostMagazines().then(function (lostMagazines) {
                me.lostMagazines = lostMagazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Peridocials");
            });
        }

        me.confirmReplaceMagazine = function (id) {
            MagazineFactory.getLostMagazine(id).then(function (lostOrReplace) {
                me.lostMagazineModal.lostOrReplace = lostOrReplace;
                me.lostMagazineModal.title = "Replace Periodical";
                me.lostMagazineModal.btnText = "Replace";
                AppService.showModal(me.lostMagazineModal,
                    "magazines/confirmReplaceMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error Fetching Periodicals");
            });
        }

        me.confirmUndoReplaceMagazine = function (id) {
            MagazineFactory.getLostMagazine(id).then(function (lostOrReplace) {
                me.lostMagazineModal.lostOrReplace = lostOrReplace;
                me.lostMagazineModal.title = "Undo Replace Periodical";
                me.lostMagazineModal.btnText = "Undo Replace";
                AppService.showModal(me.lostMagazineModal,
                    "magazines/confirmUndoReplaceMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            }, function (errorResponse) {
                toastr.error("Error Fetching Periodical");
            });
        }

        me.getReturnMagazines = function () {
            var user = $rootScope.user;
            if (user.role === 'FACULTY' || user.role === 'STUDENT' || user.role === 'NON-TEACHING')
                return;
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();

            MagazineFactory.getReturnMagazines().then(function (magazines) {
                me.magazines = magazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Periodicals");
            });

        }

        me.getReturnMagazineByRollNumber = function () {
            var user = $rootScope.user;
            if (user.role === 'ADMIN' || user.role === 'LIBRARIAN')
                return;
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();

            MagazineFactory.getReturnedMagazineByRollNo(user.rollNo).then(function (magazines) {
                me.magazines = magazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Periodicals");
            });
        }

        me.getBindingMagazines = function () {
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithFunction("Add Binding Periodical", me.showBindingMagazineForm);

            MagazineFactory.getBindingMagazines().then(function (bindingMagazines) {
                me.bindingMagazines = bindingMagazines;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Binding Periodical Details");
            });
        }

        me.showBindingMagazineForm = function () {
            me.bindingMagazineModal.bindingMagazine = me.bindingMagazine;
            me.bindingMagazineModal.title = "Add New Binding Periodical Details";
            me.bindingMagazineModal.btnText = "Add Binding Details";
            AppService.showModal(me.bindingMagazineModal,
                "magazines/bindingMagazineForm.html",
                "MagazineModalController",
                "magazineModalCtrl");
        }

        me.getBindingMagazine = function (id) {
            MagazineFactory.getBindingMagazine(id).then(function (bindingMagazine) {
                me.bindingMagazineModal.bindingMagazine = bindingMagazine;
                me.bindingMagazineModal.title = "Edit Binding Periodical";
                me.bindingMagazineModal.btnText = "Edit Binding Periodical";
                AppService.showModal(me.bindingMagazineModal,
                    "magazines/bindingMagazineForm.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            });
        }

        me.deleteBindingMagazineModal = function (id) {
            MagazineFactory.getBindingMagazine(id).then(function (bindingMagazine) {
                me.bindingMagazineModal.bindingMagazine = bindingMagazine;
                me.bindingMagazineModal.title = "Delete Binding Periodical Details";
                me.bindingMagazineModal.btnText = "Delete";
                AppService.showModal(me.bindingMagazineModal,
                    "magazines/deleteBindingMagazine.html",
                    "MagazineModalController",
                    "magazineModalCtrl");
            });
        }

    }
]);