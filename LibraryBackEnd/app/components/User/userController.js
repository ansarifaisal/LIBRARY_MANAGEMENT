﻿UserModule.controller("UserController", [
    "UserFactory",
    "AppService",
    "AuthenticationFactory",
    "ReturnBookFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    function (UserFactory, AppService, AuthenticationFactory, ReturnBookFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr) {

        var me = this;

        me.students = [];

        me.faculties = [];

        me.librarians = [];

        me.student = {};

        me.userModal = {
            user: undefined,
            title: '',
            btnText: ''
        }

        me.passwordModel = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        me.getData = function () {
            me.user = UserFactory.getUserByUserName($rootScope.user.userName);
            me.courses = UserFactory.getCourses();
            me.years = UserFactory.getYears(-2, 1);
        }

        me.checkByRollNumber = function (rollNo) {
            console.log(rollNo);
            UserFactory.getStudentByRollNo(rollNo).then(function (user) {
                me.exists = false;
                if (user)
                    me.exists = true;
                return me.exists;
            }, function (errorResponse) {

            });
        }

        me.submitForm = function () {
            me.user.modified = true;
            UserFactory.editStudent(me.user).then(function () {
                toastr.success("Details Saved Successfully!");
                AuthenticationFactory.saveUser(me.user);
                $location.path("/home");
            }, function (errorResponse) {
                toastr.error("Error Saving Details");
            });
        }

        me.getStudent = function (userName) {
            me.userModal.user = UserFactory.getUserByUserName(userName);
            me.userModal.title = "Edit User";
            me.userModal.btnText = "Save Changes";
            AppService.showModal(me.userModal,
           "user/editStudent.html",
           "UserModalController",
           "userModalCtrl");

        }

        me.getFaculty = function (userName) {
            me.userModal.user = UserFactory.getUserByUserName(userName);
            me.userModal.title = "Edit Faculty";
            me.userModal.btnText = "Save Changes";
            AppService.showModal(me.userModal,
           "user/editForm.html",
           "UserModalController",
           "userModalCtrl");
        }

        me.getLibrarian = function (userName) {
            me.userModal.user = UserFactory.getUserByUserName(userName);
            me.userModal.title = "Edit Librarian";
            me.userModal.btnText = "Save Changes";
            AppService.showModal(me.userModal,
           "user/editForm.html",
           "UserModalController",
           "userModalCtrl");
        }

        me.deleteUser = function (id) {
            me.userModal.user = UserFactory.getUserByUserName($rootScope.user.userName);
            me.userModal.title = "Delete Subject";
            me.userModal.btnText = "Delete";
            AppService.showModal(me.userModal,
           "user/deleteUser.html",
           "UserModalController",
           "userModalCtrl");
        }

        me.getStudents = function () {
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();

            UserFactory.getStudents().then(function (students) {
                me.students = students;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getFaculties = function () {
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithOutFunction();

            UserFactory.getFaculties().then(function (faculties) {
                me.faculties = faculties;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getLibrarians = function () {
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithOutFunction();

            UserFactory.getLibrarians().then(function (librarians) {
                me.librarians = librarians;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getUserByRollNo = function () {
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithOutFunction();

            var rollNo = $routeParams.id;
            UserFactory.getStudentByRollNo(rollNo).then(function (user) {
                me.user = user;
                me.getUserData(me.user.rollNo);
                $rootScope.isBusy = false;

            });
        }

        me.getUserData = function (rollNo) {
            ReturnBookFactory.getByRollNo(rollNo).then(function (issued) {
                me.issued = issued;
            }, function (errorResponse) {
                toastr.error("Error while loading user data");
            });

        }

        me.changePassword = function () {
            UserFactory.changePassword(me.passwordModel).then(function () {
                $route.reload();
                toastr.success("Password changed successfully");
            }, function (errorResponse) {
                toastr.error("Incorrect old password.");
            });
        }


    }
]);