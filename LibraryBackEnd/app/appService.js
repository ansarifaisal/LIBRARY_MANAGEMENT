
myApp.factory('httpRequestInterceptor', function ($rootScope) {
    return {
        request: request
    };

    function request(config) {
        config.headers['Authorization'] = 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==';

        if ($rootScope.token !== undefined)
            config.headers['Authorization'] = 'Bearer ' + $rootScope.token.access_token;

        return config;
    }
});

myApp.service('AppService', [
    "$uibModal",
    "$cookies",
    "AuthenticationFactory",
    function ($uibModal, $cookies, AuthenticationFactory) {

        return {
            showModal: showModal,
            unLoad: unLoad,
        }

        function showModal(modal, templateURL, controller, controllerAs) {
            $uibModal.open({
                animation: true,
                backdrop: true,
                keyboard: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/components/' + templateURL,
                controller: controller,
                controllerAs: controllerAs,
                resolve: {
                    modal: function () {
                        return modal;
                    }
                }
            });
        }

        function unLoad() {
            $cookies.remove('user');
            $cookies.remove('authenticationData');
            AuthenticationFactory.setUserIsAuthenticated(false);
        }

        function dataTable() {
            DTOptionsBuilder.newOptions()
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
                        text: "<i class='fa fa-plus fa-lg'></i> Add Publication",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showPublicationForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable(),
            ];
        }
    }
]);