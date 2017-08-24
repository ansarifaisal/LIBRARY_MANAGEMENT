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


        //get all Requests by Perticular user
        me.getRequests = function () {
            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
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
                        extend: 'excel',
                        className: 'btn btn-default ',
                        text: "<i class='fa fa-file-excel-o fa-lg'></i> Excel",
                        exportOptions: {
                            columns: ':not(:last-child)'
                        }
                    },
                    {
                        text: "<i class='fa fa-plus fa-lg'></i> Add Request",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showRequestForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(1).notSortable(),
            ];

            RequestFactory.getRequests().then(function (requests) {
                me.requests = requests;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getByRollNo = function () {
            var user = $rootScope.user;

            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
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
                        extend: 'excel',
                        className: 'btn btn-default ',
                        text: "<i class='fa fa-file-excel-o fa-lg'></i> Excel",
                        exportOptions: {
                            columns: ':not(:last-child)'
                        }
                    },
                    {
                        text: "<i class='fa fa-plus fa-lg'></i> Add Request",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showRequestForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(1).notSortable(),
            ];

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