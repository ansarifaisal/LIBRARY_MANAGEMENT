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
            name: ''
        }

        me.courses = [];

        me.courseModal = {
            course: undefined,
            title: '',
            btnText: ''
        }

        me.showCourseForm = function () {
            me.courseModal.course = me.course;
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
                    },
                    {
                        text: "<i class='fa fa-plus fa-lg'></i> Add Course",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showCourseForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable(),
            ];

            CourseFactory.getCourses().then(function (courses) {
                me.courses = courses;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);