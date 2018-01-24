ReturnBookModule.controller("ReturnBookController", [
    "ReturnBookFactory",
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
    function (ReturnBookFactory, AppService, AuthenticationFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window) {
        var me = this;

        me.returnBooks = [];

        me.getReturnBooks = function () {
            var user = $rootScope.user;

            if (user.role === 'STUDENT' || user.role === 'FACULTY' || user.role === 'NON-TEACHING')
                return;

            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();

            ReturnBookFactory.getReturnBooks().then(function (returnBooks) {
                me.returnBooks = returnBooks;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error fetching return books");
            });
        }

        me.getByRollNumber = function () {
            var user = $rootScope.user;

            if (user.role === 'ADMIN' || user.role === 'LIBRARIAN')
                return;

            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();
            ReturnBookFactory.getByRollNo(user.rollNo).then(function (returnBooks) {
                me.returnBooks = returnBooks;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                toastr.error("Error getting the ");
                $rootScope.isBusy = false;
            });
        }
    }
]);