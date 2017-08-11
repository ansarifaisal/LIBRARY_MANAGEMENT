SubjectModule.controller("SubjectController", [
    "SubjectFactory",
    "AppService",
    "CourseFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (SubjectFactory, AppService, CourseFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.subject = {
            name: '',
            CourseName: '',
            Semester: undefined
        }

        me.courses = [];

        me.subjects = [];

        me.subjectModal = {
            subject: undefined,
            courses: undefined,
            title: '',
            btnText: ''
        }

        me.showSubjectForm = function () {
            me.subjectModal.subject = me.subject;
            me.subjectModal.title = "Add New Subject";
            me.subjectModal.btnText = "Add Subject";
            AppService.showModal(me.subjectModal,
                "subjects/subjectForm.html",
                "SubjectModalController",
                "subjectModalCtrl");
        }

        me.getSubject = function (id) {
            SubjectFactory.getSubject(id).then(function (subject) {
                me.subjectModal.subject = subject;
                me.subjectModal.title = "Edit Subject";
                me.subjectModal.btnText = "Save Changes";
                AppService.showModal(me.subjectModal,
               "subjects/subjectForm.html",
               "SubjectModalController",
               "subjectModalCtrl");
            });
        }

        me.deleteSubjectModal = function (id) {
            SubjectFactory.getSubject(id).then(function (subject) {
                me.subjectModal.subject = subject;
                me.subjectModal.title = "Delete Subject";
                me.subjectModal.btnText = "Delete";
                AppService.showModal(me.subjectModal,
               "subjects/deleteSubject.html",
               "SubjectModalController",
               "subjectModalCtrl");
            });
        }

        //get all Subjects
        me.getSubjects = function () {
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
                        text: "<i class='fa fa-plus fa-lg'></i> Add Subject",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showSubjectForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(4).notSortable(),
            ];

            SubjectFactory.getSubjects().then(function (subjects) {
                me.subjects = subjects;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);