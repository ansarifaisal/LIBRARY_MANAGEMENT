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
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (ReturnBookFactory, AppService, AuthenticationFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {
        var me = this;

        me.returnBooks = [];

        me.getReturnBooks = function () {
            var user = $rootScope.user;
            if (user.role === 'STUDENT' || user.role === 'FACULTY')
                return;
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
                      extend: 'excel',
                      className: 'btn btn-default ',
                      text: "<i class='fa fa-file-excel-o fa-lg'></i> Excel",
                      exportOptions: {
                          columns: ':not(:last-child)'
                      }
                  }
             ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];

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
                     extend: 'excel',
                     className: 'btn btn-default ',
                     text: "<i class='fa fa-file-excel-o fa-lg'></i> Excel",
                     exportOptions: {
                         columns: ':not(:last-child)'
                     }
                 }
            ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            ReturnBookFactory.getByRollNo(user.rollNo).then(function (returnBooks) {
                me.returnBooks = returnBooks;
                console.log(me.returnBooks);
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                toastr.error("Error getting the ");
                $rootScope.isBusy = false;
            });
        }
    }
]);