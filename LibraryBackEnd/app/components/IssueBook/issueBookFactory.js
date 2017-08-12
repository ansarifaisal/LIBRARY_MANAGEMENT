var IssueBookModule = angular.module("IssueBookModule", []);

IssueBookModule.factory("IssueBookFactory", [
    "$http",
    "$q",
    "$filter",
    "$cookies",
    "BookFactory",
    function ($http, $q, $filter, $cookies, BookFactory) {
        var issueBookFactory = {
            getIssueDate: getIssueDate,
            getReturnDate: getReturnDate,
            formatDate: formatDate,
            getByAccessionNumber: getByAccessionNumber,
            saveBook: saveBook,
            loadBook: loadBook
        }
        return issueBookFactory;

        function getIssueDate() {
            var date = new Date();
            return formatDate(date);
        }

        function getReturnDate() {
            var date = new Date();
            var returnDate = date.setDate(date.getDate() + 7);
            return formatDate(returnDate);
        }

        function formatDate(date) {
            return ($filter)("date")(date, "EEE MMM, dd yyyy");
        }

        function getByAccessionNumber(accessionNumber) {
            var book;
            BookFactory.getBookByAccessionNumber(accessionNumber).then(function (response) {
                angular.copy(response, book);
            });
            console.log(book);
            return book;
        }

        function saveBook(book) {
            return $cookies.putObject('book', book);
        }

        function loadBook() {
            return $cookies.getObject('book');
        }
    }
]);