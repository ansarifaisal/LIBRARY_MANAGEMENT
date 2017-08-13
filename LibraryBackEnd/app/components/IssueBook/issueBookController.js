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

        me.showIssueForm = function () {
            $window.location.href = ("#!/admin/issueBook/add");
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

        me.getIssuedBooks = function () {

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
                DTColumnDefBuilder.newColumnDef(5).notSortable(),
            ];

            IssueBookFactory.getIssuedBooks().then(function (issuedBooks) {
                me.issuedBooks = issuedBooks;
                me.calculateFine(me.issuedBook);
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

        me.calculateFine = function (issuedBooks) {
            me.issuedBooks = me.issuedBooks;
            var date = new Date();
            var tomorrow = date.setDate(date.getDate() + 1);
            var convert = new Date(tomorrow);
            var returnDate = "";
            for (var i = 0; i < me.issuedBooks.length; i++) {
                returnDate = new Date(me.issuedBooks[i].returnDate);
                if ((convert.getDate() === returnDate.getDate()) &&
                    (convert.getMonth() === returnDate.getMonth()) &&
                    (convert.getFullYear() === returnDate.getFullYear())) {
                    IssueBookFactory.sendNotification(me.issuedBooks[i].email);
                    console.log("true");
                } else {
                    console.log("false");
                }
            }
        }
    }
]);