SearchModule.controller("SearchController", [
    "SearchFactory",
    "AppService",
    "BookFactory",
    "CourseFactory",
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
    function (SearchFactory, AppService, BookFactory, CourseFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.books = [];

        me.searchBindingModel = {
            accessionNumber: '',
            title: ''
        }

        me.searchStudentsBindingModel = {
            fullName: '',
            rollNo: ''
        }

        me.loadData = function () {
            CourseFactory.getCourses().then(function (courses) {
                me.courses = courses;
            });
            me.status = BookFactory.getStatus();
            BookFactory.getTitles().then(function (titles) {
                me.titles = titles;
            });
            BookFactory.getAccessionNumbers().then(function (accessionNumbers) {
                me.accessionNumbers = accessionNumbers;
            });
            me.types = BookFactory.getTypeOfBook();
        }

        me.loadStudentData = function () {
            CourseFactory.getCourses().then(function (courses) {
                me.courses = courses;
            });
            me.status = UserFactory.getStatus();
            me.role = UserFactory.getRoles();
            SearchFactory.getFullName().then(function (fullName) {
                me.fullName = fullName;
            });
            SearchFactory.getRollNo().then(function (rollNo) {
                me.rollNo = rollNo;
            });
        }

        me.config = function () {
            me.dtOptions = AppService.dataTableWithOutFunction();
        }

        me.searchBooks = function () {
            SearchFactory.getBookSearchResults(me.searchBindingModel).then(function (response) {
                me.books = response;
            }, function (errorResponse) {
                toastr.error("Error Fetching Data");
            });
        }

        me.searchStudents = function () {
            SearchFactory.getStudentsSearchResults(me.searchStudentsBindingModel).then(function (students) {
                me.students = students;
            }, function (errorResponse) {
                toastr.error("Error Fetching Data.");
            });
        }
    }
]);