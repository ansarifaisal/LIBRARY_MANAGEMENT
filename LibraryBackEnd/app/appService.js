
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
    "DTOptionsBuilder",
    "$route",
    function ($uibModal, $cookies, AuthenticationFactory, DTOptionsBuilder, $route) {

        return {
            showModal: showModal,
            unLoad: unLoad,
            dataTableWithFunction: dataTableWithFunction,
            dataTableWithOutFunction: dataTableWithOutFunction
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

        function dataTableWithFunction(btnName, actionCalled) {
            var dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withOption('scrollX', '100%')
                .withOption('scrollY', '100%')
                .withOption('scrollCollapse', true)
               //.withOption('order', [[0, 'desc']])
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
                         text: "<i class='fa fa-refresh fa-lg'></i> Refresh",
                         key: '1',
                         className: 'btn btn-default margin-4x',
                         action: function (e, dt, node, config) {
                             $route.reload();
                         }
                     },
                       {
                           text: "<i class='fa fa-plus fa-lg'></i> " + btnName,
                           key: '1',
                           className: 'btn btn-success margin-4x',
                           action: function (e, dt, node, config) {
                               actionCalled();
                           }
                       }
                ]);
            return dtOptions;
        }

        function dataTableWithOutFunction() {
            var dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
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
                        text: "<i class='fa fa-refresh fa-lg'></i> Refresh",
                        key: '1',
                        className: 'btn btn-default margin-4x',
                        action: function (e, dt, node, config) {
                            $route.reload();
                        }
                    }
                ]);
            return dtOptions;
        }
    }
]);