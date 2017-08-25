UserModule.controller("UserController", [
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
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (UserFactory, AppService, AuthenticationFactory, ReturnBookFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

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
            me.years = UserFactory.getYears(-2, 20);
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
            me.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
                .withOption('scrollX', '100%')
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
                //DTColumnDefBuilder.newColumnDef(9).notSortable(),
            ];

            UserFactory.getStudents().then(function (students) {
                me.students = students;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getFaculties = function () {
            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
                .withOption('scrollX', '100%')
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
                //DTColumnDefBuilder.newColumnDef(9).notSortable(),
            ];

            UserFactory.getFaculties().then(function (faculties) {
                me.faculties = faculties;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getLibrarians = function () {
            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
                .withOption('scrollX', '100%')
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
                //DTColumnDefBuilder.newColumnDef(9).notSortable(),
            ];

            UserFactory.getLibrarians().then(function (librarians) {
                me.librarians = librarians;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getUserByRollNo = function () {
            var rollNo = $routeParams.id;
            UserFactory.getStudentByRollNo(rollNo).then(function (user) {
                me.user = user;
                me.getUserData(me.user.rollNo);
            });

            me.dtOptions = DTOptionsBuilder.newOptions()
           .withBootstrap()
           .withPaginationType('full_numbers')
           .withDOM('Bfrtip')
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
                //DTColumnDefBuilder.newColumnDef(21).notSortable(),
            ];


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