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
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (IssueBookFactory, AppService, AuthenticationFactory, BookFactory, UserFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.issueBook = {
            issueDate: '',
            accessionNumber: undefined,
            title: '',
            rollNumber: '',
            fullName: '',
            course: ''
        }

        me.book = {};

        me.student = {};

        me.isError = false;

        me.getData = function () {
            me.issueBook.issueDate = IssueBookFactory.getIssueDate();
            me.issueBook.returnDate = IssueBookFactory.getReturnDate();
        }

        me.getByAccessionNumber = function (accessionNumber) {

            BookFactory.getBookByAccessionNumber(accessionNumber).then(function (response) {
                angular.copy(response, me.book);
                if (me.book.accessionNumber === accessionNumber) {
                    IssueBookFactory.saveBook(me.book);
                    me.issueBook.title = me.book.title;
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
                    me.issueBook.fullName = me.student.fullName;
                    me.issueBook.course = me.student.course;
                    if (me.book.course !== me.student.course) {
                        me.isError = true;
                        return toastr.error(me.student.fullName + " is not from " + me.book.course);
                    } else if (me.student.issueCount >= 2) {
                        me.isError = true;
                        return toastr.error(me.student.fullName + " already took 2 books.");
                    }
                    return;
                } else {
                    me.isError = true;
                    return toastr.error("Please provide correct roll number.");
                }

            });
        }
    }
]);