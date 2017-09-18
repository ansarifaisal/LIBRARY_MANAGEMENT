RequestModule.controller("RequestController", [
    "RequestFactory",
    "AppService",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (RequestFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.requests = [];

        me.request = {
            title: '',
            author: '',
            rollNo: '',
            name: '',
            studentCourse: '',
        };

        me.requestModal = {
            request: undefined,
            title: '',
            btnText: ''
        }

        me.showRequestForm = function () {
            me.requestModal.request = me.request;
            me.requestModal.title = "Add New Request";
            me.requestModal.btnText = "Add Request";
            AppService.showModal(me.requestModal,
                "requests/requestForm.html",
                "RequestModalController",
                "requestModalCtrl");
        }

        me.getRequest = function (id) {
            RequestFactory.getRequest(id).then(function (request) {
                me.requestModal.request = request;
                me.requestModal.title = "Edit Request";
                me.requestModal.btnText = "Save Changes";
                AppService.showModal(me.requestModal,
                    "requests/requestForm.html",
                    "RequestModalController",
                    "requestModalCtrl");
            });
        }

        me.approveRequest = function (id) {
            RequestFactory.getRequest(id).then(function (request) {
                me.requestModal.request = request;
                me.requestModal.title = "Approve Request";
                me.requestModal.btnText = "Approve";
                AppService.showModal(me.requestModal,
                    "requests/approveRequest.html",
                    "RequestModalController",
                    "requestModalCtrl");
            });
        }

        me.rejectRequest = function (id) {
            RequestFactory.getRequest(id).then(function (request) {
                me.requestModal.request = request;
                me.requestModal.title = "Reject Request";
                me.requestModal.btnText = "Reject";
                AppService.showModal(me.requestModal,
                    "requests/rejectRequest.html",
                    "RequestModalController",
                    "requestModalCtrl");
            });
        }

        me.completeRequest = function (id) {
            RequestFactory.getRequest(id).then(function (request) {
                me.requestModal.request = request;
                me.requestModal.title = "Complete Request";
                me.requestModal.btnText = "Complete";
                AppService.showModal(me.requestModal,
                    "requests/completeRequest.html",
                    "RequestModalController",
                    "requestModalCtrl");
            });
        }

        //get all Requests by Perticular user
        me.getRequests = function () {
            var user = $rootScope.user;

            if (user.role === 'STUDENT' || user.role === 'FACULTY')
                return;

            $rootScope.isBusy = true;
            //me.dtOptions = AppService.dataTableWithFunction("Add Request", me.showRequestForm);
            me.dtOptions = AppService.dataTableWithOutFunction();
            RequestFactory.getRequests().then(function (requests) {
                me.requests = requests;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getByRollNo = function () {
            var user = $rootScope.user;
            if (user.role === 'ADMIN' || user.role === 'LIBRARIAN')
                return;
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithFunction("Add Request", me.showRequestForm);

            RequestFactory.getByRollNo(user.rollNo).then(function (requests) {
                me.requests = requests;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error getting data");
            });
        }
    }
]);