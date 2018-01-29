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
    function (StatisticsFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window) {

        var me = this;

        $scope.oneAtATime = true;

        me.booksInCourse = [];

        me.booksInSubject = [];

        me.booksBaughtInYear = [];

        me.studentsInCourse = [];

        me.studentsInYear = [];

        me.bookTitles = [];

        me.bookTypes = [];

        me.magazineTiles = [];

        me.magazineCourses = [];

        me.magazineTypes = [];

        me.periodicity = [];

        me.subscription = [];

        me.returnedBooks = {
            year: [],
            books: []
        };

        me.returnedMagazines = {
            year: [],
            magazines: []
        };

        me.config = function () {
            me.dtOptions = AppService.dataTableWithOutFunction();
        }

        me.loadData = function () {
            me.loadBooksInCourse();
            me.loadBooksInSubject();
            me.loadBookBaughtInYear();
            me.loadStudentsInCourse();
            me.loadStudentsInYear();
            me.loadBooksTitles();
            me.loadBookTypes();
            me.loadMagazineTitleData();
            me.loadMagazineCourseData();
            me.loadMagazineTypeData();
            me.loadMagazinePeriodicityData();
            me.loadMagazineSubscriptionData();
            me.loadReturnedBooksInYear();
            me.loadReturnedMagazinesInYear();
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

        me.loadBookTypes = function () {
            me.config();
            if (me.bookTypes.length > 0)
                return;
            StatisticsFactory.getBookTypes().then(function (response) {
                me.bookTypes = response;
            });
        }

        me.loadMagazineTitleData = function () {
            me.config();
            if (me.magazineTiles.length > 0)
                return;
            StatisticsFactory.getMagazineTitles().then(function (response) {
                me.magazineTitles = response;
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

        me.loadBookDataByTypes = function () {
            me.config();
            $rootScope.isBusy = true;
            me.type = $routeParams.type;
            StatisticsFactory.getBookByType(me.type).then(function (response) {
                me.books = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadMagazineDataByTitle = function () {
            me.config();
            $rootScope.isBusy = true;
            me.title = $routeParams.title;
            StatisticsFactory.getMagazineByTitle(me.title).then(function (response) {
                me.magazines = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadMagazineCourseData = function () {
            me.config();
            if (me.magazineCourses.length > 0)
                return;
            StatisticsFactory.getMagazineCourse().then(function (response) {
                me.magazineCourses = response;
            });
        }

        me.loadMagazineDataByCourse = function () {
            me.config();
            $rootScope.isBusy = true;
            me.course = $routeParams.course;
            StatisticsFactory.getMagazineByCourse(me.course).then(function (response) {
                me.magazines = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadMagazineTypeData = function () {
            me.config();
            if (me.magazineTypes.length > 0)
                return;
            StatisticsFactory.getMagazineTypes().then(function (response) {
                me.magazineTypes = response;
            });
        }

        me.loadMagazineDataByType = function () {
            me.config();
            $rootScope.isBusy = true;
            me.type = $routeParams.type;
            StatisticsFactory.getMagazineByTypes(me.type).then(function (response) {
                me.magazines = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadMagazinePeriodicityData = function () {
            me.config();
            if (me.periodicity.length > 0)
                return;
            StatisticsFactory.getMagazinePeriodicity().then(function (response) {
                me.periodicity = response;
            });
        }

        me.loadMagazineDataByPeriodicity = function () {
            me.config();
            $rootScope.isBusy = true;
            me.periodic = $routeParams.periodic;
            StatisticsFactory.getMagazineByPeriodicity(me.periodic).then(function (response) {
                me.magazines = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadMagazineSubscriptionData = function () {
            me.config();
            if (me.subscription.length > 0)
                return;
            StatisticsFactory.getMagazineSubscriptionInYear().then(function (response) {
                me.subscription = response;
            });
        }

        me.loadMagazineDataBySubscription = function () {
            me.config();
            $rootScope.isBusy = true;
            me.year = $routeParams.year;
            StatisticsFactory.getMagazineBySubscription(me.year).then(function (response) {
                me.magazines = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadReturnedBooksInYear = function () {
            me.config();
            $rootScope.isBusy = true;
            StatisticsFactory.getReturnedBooksInYear().then(function (response) {
                me.returnedBooks.year = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadReturnedBooksByYear = function () {
            me.config();
            $rootScope.isBusy = true;
            me.year = $routeParams.year;
            StatisticsFactory.getReturnedBooksByYear(me.year).then(function (response) {
                me.returnedBooks.books = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });

        }


        me.loadReturnedMagazinesInYear = function () {
            me.config();
            $rootScope.isBusy = true;
            StatisticsFactory.getReturnedMagazinesInYear().then(function (response) {
                me.returnedMagazines.year = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });
        }

        me.loadReturnedMagazinesByYear = function () {
            me.config();
            $rootScope.isBusy = true;
            me.year = $routeParams.year;
            StatisticsFactory.getReturnedMagazinesByYear(me.year).then(function (response) {
                me.returnedMagazines.magazines = response;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error fetching data.");
            });

        }

    }
]);