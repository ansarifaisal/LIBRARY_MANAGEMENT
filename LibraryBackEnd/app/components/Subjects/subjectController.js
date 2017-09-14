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

            me.dtOptions = AppService.dataTableWithFunction("Add Subject", me.showSubjectForm);

            SubjectFactory.getSubjects().then(function (subjects) {
                me.subjects = subjects;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);