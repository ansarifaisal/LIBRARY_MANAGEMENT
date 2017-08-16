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

        me.bookTitles = [];

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

                   },
                   {
                       extend: 'print',
                       className: 'btn btn-default',
                       text: "<i class='fa fa-print fa-lg'></i> Print",

                   },
                   {
                       extend: 'excel',
                       className: 'btn btn-default ',
                       text: "<i class='fa fa-file-excel-o fa-lg'></i> Excel",

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
            me.loadBooksTitles();
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

        me.loadBooksTitles = function () {
            me.config();
            if (me.bookTitles.length > 0)
                return;
            StatisticsFactory.getBooksTitles().then(function (response) {
                me.bookTitles = response;
            });
        }

        me.loadDataByCourse = function () {
            me.config();
            $rootScope.isBusy = true;
            me.courseName = $routeParams.courseName;
            StatisticsFactory.getBooksByCourse(me.courseName).then(function (response) {
                me.books = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });

        }

        me.loadDataBySubject = function () {
            me.config();
            $rootScope.isBusy = true;
            me.subject = $routeParams.subject;
            StatisticsFactory.getBooksBySubject(me.subject).then(function (response) {
                me.books = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadDataByYear = function () {
            me.config();
            $rootScope.isBusy = true;
            me.year = $routeParams.year;
            StatisticsFactory.getBookBaughtByYear(me.year).then(function (response) {
                me.books = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadDataByTitle = function () {
            me.config();
            $rootScope.isBusy = true;
            me.title = $routeParams.title;
            StatisticsFactory.getBooksByTitle(me.title).then(function (response) {
                me.books = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadStudentDataByCourse = function () {
            me.config();
            $rootScope.isBusy = true;
            me.courseName = $routeParams.courseName;
            console.log(me.courseName);
            StatisticsFactory.getStudentsByCourse(me.courseName).then(function (response) {
                me.students = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadStudentDataByYear = function () {
            me.config();
            $rootScope.isBusy = true;
            me.year = $routeParams.year;
            StatisticsFactory.getStudentsByYear(me.year).then(function (response) {
                me.students = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }
    }
]);