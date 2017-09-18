IssueBookModule.controller("IssueBookModalController", [
    "$uibModalInstance",
    "IssueBookFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    function ($uibModalInstance, IssueBookFactory, $route, toastr, $rootScope, modal, $filter, $scope) {

        var me = this;

        me.issueBook = modal.issueBook;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.returnBook = {
            bookTitle: '',
            accessionNumber: '',
            issuedDate: '',
            returnDate: '',
            librarian: '',
            course: '',
            fullName: '',
            rollNo: '',
            email: '',
            fine: undefined,
            remark: ''
        }
        me.remark = '';

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };


        me.deleteIssueBook = function () {
            $rootScope.isBusy = true;
            IssueBookFactory.deleteIssueBook(me.issueBook).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Issue Book Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Issue Book");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.lostIssueBook = function (issueBook) {
            $rootScope.isBusy = true;
            me.lostOrReplace = {
                librarian: $rootScope.user.fullName,
                accessionNumber: issueBook.accessionNumber,
                bookTitle: issueBook.bookTitle,
                course: issueBook.course,
                email: issueBook.email,
                issuedDate: issueBook.issuedDate,
                returnDate: issueBook.returnDate,
                fullName: issueBook.fullName,
                fine: issueBook.fine,
                rollNo: issueBook.rollNo,
                remark: "NA"
            }
            IssueBookFactory.deleteIssueBook(issueBook).then(function () {
                me.ok();
                IssueBookFactory.lostBook(me.lostOrReplace).then(function () {
                    $route.reload();
                    toastr.success("Issue Book Deleted Successfully!");
                    $rootScope.isBusy = false;
                }, function (errorResponse) {
                    me.cancel();
                    $rootScope.isBusy = false;
                    toastr.error("Error Deleting Issue Book");
                });
            });
        }

        me.returnIssueBook = function (issueBook) {
            //$rootScope.isBusy = true;
            me.returnBook = {
                bookTitle: issueBook.bookTitle,
                accessionNumber: issueBook.accessionNumber,
                issuedDate: issueBook.issuedDate,
                returnDate: issueBook.returnDate,
                librarian: $rootScope.user.fullName,
                course: issueBook.course,
                fullName: issueBook.fullName,
                rollNo: issueBook.rollNo,
                email: issueBook.email,
                fine: issueBook.fine,
                remark: me.remark
            }
            IssueBookFactory.deleteIssueBook(issueBook).then(function () {
                IssueBookFactory.returnBook(me.returnBook).then(function () {
                    me.ok();
                    $route.reload();
                    toastr.success("Issue Book Deleted Successfully!");
                    $rootScope.isBusy = false;
                }, function (errorResponse) {
                    me.cancel();
                    $rootScope.isBusy = false;
                    toastr.error("Error Deleting Issue Book");
                });
            });

        }
        me.showForm = false;
        me.showFineForm = function () {
            return me.showForm = true;
        }

    }
]);