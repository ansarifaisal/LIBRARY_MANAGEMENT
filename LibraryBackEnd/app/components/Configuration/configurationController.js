ConfigurationModule.controller("ConfigurationController", [
    "ConfigurationFactory",
    "AuthenticationFactory",
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
    function (ConfigurationFactory, AuthenticationFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.configuration = {
            id: undefined,
            email: '',
            password: '',
            fine: '',
            issueDays: '',
            noOfBookIssue: '',
            adminName: '',
            canLogin: '',
            canRegister: ''
        }

        me.getConfigurations = function () {
            ConfigurationFactory.getConfigurations().then(function (configurations) {
                me.configurations = configurations;
                me.options = ConfigurationFactory.getOptions();
                if (me.configurations.length === 0)
                    return;
                for (var i = 0; i < me.configurations.length; i++) {
                    me.configuration = {
                        id: me.configurations[i].id,
                        email: me.configurations[i].email,
                        password: me.configurations[i].password,
                        fine: me.configurations[i].fine,
                        issueDays: me.configurations[i].issueDays,
                        noOfBookIssue: me.configurations[i].noOfBookIssue,
                        adminName: me.configurations[i].adminName,
                        canLogin: me.configurations[i].canLogin,
                        canRegister: me.configurations[i].canRegister,
                    }
                    return;
                }
            });
        }

        me.saveConfig = function (configuration) {

            me.config = {
                id: configuration.id,
                fine: configuration.fine,
                issueDays: configuration.issueDays,
                noOfBookIssue: configuration.noOfBookIssue,
                adminName: configuration.adminName,
                canLogin: configuration.canLogin,
                canRegister: configuration.canRegister,
                notificationSent: configuration.notificationSent
            }
            AuthenticationFactory.saveConfiguration(me.config);
        }

        me.submitForm = function () {
            var addOrEdit = ConfigurationFactory.addOrEdit(me.configuration);
            $action = addOrEdit.action;
            $rootScope.isBusy = true;
            $action.then(function () {
                me.saveConfig(me.configuration);
                $rootScope.configuration = AuthenticationFactory.loadConfiguration();
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }
    }
]);