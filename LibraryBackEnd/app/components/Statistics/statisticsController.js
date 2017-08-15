StatisticsModule.controller("StatisticsController", [
    "StatisticsFactory",
    "AppService",
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
    function (StatisticsFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        $scope.oneAtATime = true;

        me.booksInCourse = [];

        me.booksInSubject = [];

        me.booksBaughtInYear = [];

        me.studentsInCourse = [];

        me.studentsInYear = [];

        me.config = function () {
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
                   }
               ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(4).notSortable(),
            ];
        }

        me.loadData = function () {
            me.loadBooksInCourse();
            me.loadBooksInSubject();
            me.loadBookBaughtInYear();
            me.loadStudentsInCourse();
            me.loadStudentsInYear();
        }

        me.loadBooksInCourse = function () {
            me.config();
            if (me.booksInCourse.length > 0)
                return;
            StatisticsFactory.getBooksInCourse().then(function (response) {
                me.booksInCourse = response;
            });
        }

        me.loadBooksInSubject = function () {
            me.config();
            if (me.booksInSubject.length > 0)
                return;
            StatisticsFactory.getBooksInSubject().then(function (response) {
                me.booksInSubject = response;
            });
        }

        me.loadBookBaughtInYear = function () {
            me.config();
            if (me.booksBaughtInYear.length > 0)
                return;
            StatisticsFactory.getBookBaughtInYear().then(function (response) {
                me.booksBaughtInYear = response;
            });
        }

        me.loadStudentsInCourse = function () {
            me.config();
            if (me.studentsInCourse.length > 0)
                return;
            StatisticsFactory.getStudentsInCourse().then(function (response) {
                me.studentsInCourse = response;
                console.log(response);
            });
        }

        me.loadStudentsInYear = function () {
            me.config();
            if (me.studentsInYear.length > 0)
                return;
            StatisticsFactory.getStudentsInYear().then(function (response) {
                me.studentsInYear = response;
            });
        }
    }
]);