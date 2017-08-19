IssueBookModule.controller("IssueBookController", [
    "IssueBookFactory",
    "AppService",
    "AuthenticationFactory",
    "BookFactory",
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
    function (IssueBookFactory, AppService, AuthenticationFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {

        $timeout(function () {
            settings();
        }, 100);

        var me = this;

        me.issueBook = {
            issuedDate: '',
            accessionNumber: undefined,
            bookTitle: '',
            rollNo: '',
            fullName: '',
            course: '',
            returnDate: '',
            email: ''
        }

        me.bookModal = {
            issueBook: undefined,
            title: '',
            btnText: ''
        }

        me.issueBookBindingModel = {
            issueBook: undefined,
            book: undefined,
            user: undefined
        }

        me.book = {};

        me.student = {};

        me.isError = false;

        me.getData = function () {
            me.issueBook.issuedDate = IssueBookFactory.getIssueDate();
            me.issueBook.returnDate = IssueBookFactory.getReturnDate();
        }

        me.showIssueForm = function () {
            $window.location.href = "#!/admin/issueBook/add";
        }

        me.showEditIssueBookForm = function (id) {
            $window.location.href = "#!/admin/issueBook/edit/" + id;
        }

        me.getEditData = function () {
            var id = $routeParams.id;
            IssueBookFactory.getIssueBook(id).then(function (issueBook) {
                me.issueBook = issueBook;
                me.issueBook.issuedDate = IssueBookFactory.formatDate(me.issueBook.issuedDate);
                me.issueBook.returnDate = IssueBookFactory.formatDate(me.issueBook.returnDate);
            });
        }

        me.getByAccessionNumber = function (accessionNumber) {

            BookFactory.getBookByAccessionNumber(accessionNumber).then(function (response) {
                angular.copy(response, me.book);
                if (me.book.accessionNumber === accessionNumber) {
                    IssueBookFactory.saveBook(me.book);
                    me.issueBook.bookTitle = me.book.title;
                    return;
                }
                return toastr.error("Please provide correct accession number");
            });
        }

        me.getByRollNumber = function (rollNumber, accessionNumber) {
            UserFactory.getStudentByRollNo(rollNumber).then(function (response) {
                me.isError = false;
                angular.copy(response, me.student);
                me.book = IssueBookFactory.loadBook();
                if (me.student.rollNo === rollNumber) {
                    IssueBookFactory.saveUser(me.student);
                    me.issueBook.fullName = me.student.fullName;
                    me.issueBook.course = me.student.course;
                    me.issueBook.email = me.student.email;
                    console.log(me.issueBook.email);
                    if (me.book.course !== me.student.course) {
                        me.isError = true;
                        return toastr.error(me.student.fullName + " is not from " + me.book.course);
                    } else if (me.student.issueCount >= 2) {
                        me.isError = true;
                        return toastr.error(me.student.fullName + " already took 2 books.");
                    } else if (me.student.status !== "APPROVED") {
                        me.isError = true;
                        return toastr.error(me.student.fullName + " is not approved yet.");
                    } else if (me.book.status === "Issued") {
                        me.isError = true;
                        return toastr.error(me.book.title + " is already issued.");
                    }
                    return;
                } else {
                    me.isError = true;
                    return toastr.error("Please provide correct roll number.");
                }
            }, function (errorResponse) {
                return toastr.error("Error fetching user details.")
            });
        }

        me.submitForm = function () {
            me.issueBookBindingModel.issueBook = me.issueBook;
            me.issueBookBindingModel.book = IssueBookFactory.loadBook();
            me.issueBookBindingModel.user = IssueBookFactory.loadUser();
            $rootScope.isBusy = true;
            IssueBookFactory.issueBook(me.issueBookBindingModel).then(function () {
                $route.reload();
                IssueBookFactory.removeCookies();
                toastr.success("Book issued successfully!");
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("error while issuing");
            });
        }

        me.submitEditForm = function () {
            $rootScope.isBusy = true;
            IssueBookFactory.editIssueBook(me.issueBook).then(function () {
                $rootScope.isBusy = false;
                toastr.success("Issued Book Details Edited Successfully.");
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Editing Issued Book Details.");
            });
        }

        me.getIssuedBooks = function () {
            var user = $rootScope.user;
            if (user.role === 'STUDENT' || user.role === 'FACULTY')
                return;
            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
               .withBootstrap()
               .withPaginationType('full_numbers')
               .withDOM('Bfrtip')
               .withOption('scrollX', '100%')
               .withOption('scrollY', '100%')
               .withOption('scrollCollapse', true)
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
                        text: "<i class='fa fa-plus'></i> Issue Book",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showIssueForm();
                        }
                    }
               ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(8).notSortable(),
            ];

            IssueBookFactory.getIssuedBooks().then(function (issuedBooks) {
                me.issuedBooks = issuedBooks;
            }).finally(function () {
                $rootScope.isBusy = false;
            });

        }

        me.deleteIssueBook = function (id) {
            IssueBookFactory.getIssueBook(id).then(function (issueBook) {
                me.bookModal.issueBook = issueBook;
                me.bookModal.title = "Delete Issue Book";
                me.bookModal.btnText = "Delete";
                AppService.showModal(me.bookModal,
               "issuebook/deleteissuebook.html",
               "IssueBookModalController",
               "issueBookModalCtrl");
            });
        }

        me.confirmReturnBook = function (id) {
            IssueBookFactory.getIssueBook(id).then(function (issueBook) {
                me.bookModal.issueBook = issueBook;
                me.bookModal.title = "Return Issue Book";
                me.bookModal.btnText = "Return";
                AppService.showModal(me.bookModal,
               "issuebook/returnIssueBook.html",
               "IssueBookModalController",
               "issueBookModalCtrl");
            });
        }

        me.confirmReplaceOrLostBook = function (id) {
            IssueBookFactory.getIssueBook(id).then(function (issueBook) {
                me.bookModal.issueBook = issueBook;
                me.bookModal.title = "Lost Issue Book";
                me.bookModal.btnText = "Lost";
                AppService.showModal(me.bookModal,
               "issuebook/replaceOrLost.html",
               "IssueBookModalController",
               "issueBookModalCtrl");
            });
        }

        me.getIssuedDataByRollNumber = function () {
            var user = $rootScope.user;
            if (user.role === 'ADMIN' || user.role === 'LIBARIAN')
                return;

            $rootScope.isBusy = true;
            me.dtOptions = DTOptionsBuilder.newOptions()
               .withBootstrap()
               .withPaginationType('full_numbers')
               .withDOM('Bfrtip')
               .withOption('scrollX', '100%')
               .withOption('scrollY', '100%')
               .withOption('scrollCollapse', true)
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
                //DTColumnDefBuilder.newColumnDef(8).notSortable(),
            ];


            IssueBookFactory.getByRollNumber(user.rollNo).then(function (issuedBooks) {
                me.issuedBooks = issuedBooks;
                $rootScope.isBusy = false;
            }, function () {
                $rootScope.isBusy = false;
                toastr.error("Error getting data");
            });
        }

    }
]);