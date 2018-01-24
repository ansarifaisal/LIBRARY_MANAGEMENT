IssueBookModule.controller("IssueBookController", [
    "IssueBookFactory",
    "AppService",
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
    function (IssueBookFactory, AppService, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window) {

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
            BookFactory.getAccessionNumbers().then(function (accessionNumbers) {
                me.accessionNumbers = accessionNumbers;
            });
            UserFactory.getRollNos().then(function (rollNos) {
                me.rollNos = rollNos;
            });
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
            if (!accessionNumber)
                return;
            BookFactory.getBookByAccessionNumber(accessionNumber).then(function (response) {
                angular.copy(response, me.book);
                me.isBackwardClass = false;
                if (me.book.accessionNumber === accessionNumber) {
                    IssueBookFactory.saveBook(me.book);
                    me.issueBook.bookTitle = me.book.title;
                    if (me.book.typeOfBook === "BC")
                        me.isBackwardClass = true;
                    return;
                }
                return toastr.error("Please provide correct accession number");
            });
        }

        me.getByRollNumber = function (rollNumber, accessionNumber) {
            if (!rollNumber)
                return;
            UserFactory.getStudentByRollNo(rollNumber).then(function (response) {
                me.isError = false;
                angular.copy(response, me.student);
                me.book = IssueBookFactory.loadBook();
                if (me.student.rollNo === rollNumber) {
                    IssueBookFactory.saveUser(me.student);
                    me.issueBook.fullName = me.student.fullName;
                    me.issueBook.course = me.student.course;
                    me.issueBook.email = me.student.email;
                    me.yearOfAdmission = me.student.yearOfAdmission;
                    if (me.student.issueCount >= $rootScope.configuration.noOfBookIssue) {
                        me.isError = true;
                        return toastr.error(me.student.fullName + " already took " + $rootScope.configuration.noOfBookIssue + " books.");
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
            me.issueBook.issuedBy = $rootScope.user.fullName;
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
            me.issueBook.issuedBy = $rootScope.user.fullName;
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
            if (user.role === 'STUDENT' || user.role === 'FACULTY' || user.role === 'NON-TEACHING')
                return;
            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithFunction("Issue Book", me.showIssueForm);
            IssueBookFactory.getIssuedBooks().then(function (issuedBooks) {
                me.issuedBooks = issuedBooks;
                if (me.issuedBooks.length === 0)
                    return;
                var fine = 0
                for (var i = 0; i < me.issuedBooks.length; i++) {
                    var flag = IssueBookFactory.isPastDate(me.issuedBooks[i].returnDate);
                    console.log(flag);
                    if (flag)
                        fine = IssueBookFactory.calculateFine(me.issuedBooks[i].returnDate);
                    else
                        continue;
                    if (fine === me.issuedBooks[i].fine)
                        continue;
                    me.issuedBooks[i].fine = fine;
                    IssueBookFactory.updateFine(me.issuedBooks[i]);
                }
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

            if (user.role === 'ADMIN' || user.role === 'LIBRARIAN')
                return;

            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();

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