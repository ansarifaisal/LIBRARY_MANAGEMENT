CourseModule.controller("CourseController", [
    "CourseFactory",
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
    function (CourseFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.course = {
            name: '',
            noOfSemesters: undefined
        }

        me.courses = [];

        me.courseModal = {
            course: undefined,
            semesters: undefined,
            title: '',
            btnText: ''
        }

        me.showCourseForm = function () {
            me.courseModal.course = me.course;
            me.courseModal.semesters = CourseFactory.getSemesters();
            me.courseModal.title = "Add New Course";
            me.courseModal.btnText = "Add Course";
            AppService.showModal(me.courseModal,
                "courses/courseForm.html",
                "CourseModalController",
                "courseModalCtrl");
        }

        me.getCourse = function (id) {
            CourseFactory.getCourse(id).then(function (course) {
                me.courseModal.course = course;
                me.courseModal.semesters = CourseFactory.getSemesters();
                me.courseModal.title = "Edit Course";
                me.courseModal.btnText = "Save Changes";
                AppService.showModal(me.courseModal,
               "courses/courseForm.html",
               "CourseModalController",
               "courseModalCtrl");
            });
        }

        me.deleteCourseModal = function (id) {
            CourseFactory.getCourse(id).then(function (course) {
                me.courseModal.course = course;
                me.courseModal.title = "Delete Course";
                me.courseModal.btnText = "Delete";
                AppService.showModal(me.courseModal,
               "courses/deleteCourse.html",
               "CourseModalController",
               "courseModalCtrl");
            });
        }

        //get all publisher
        me.getCourses = function () {
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithFunction("Add Course", me.showCourseForm);
            CourseFactory.getCourses().then(function (courses) {
                me.courses = courses;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);