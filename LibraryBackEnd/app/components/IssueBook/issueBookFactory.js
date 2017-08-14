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
            convertToDate: convertToDate,
            formatDate: formatDate,
            getByAccessionNumber: getByAccessionNumber,
            saveBook: saveBook,
            loadBook: loadBook,
            saveUser: saveUser,
            loadUser: loadUser,
            issueBook: issueBook,
            editIssueBook: editIssueBook,
            parseDate: parseDate,
            getIssuedBooks: getIssuedBooks,
            deleteIssueBook: deleteIssueBook,
            getIssueBook: getIssueBook,
            removeCookies: removeCookies,
            checkToSendNotification: checkToSendNotification,
            sendNotification: sendNotification,
            calculateFine: calculateFine,
            updateFine: updateFine,
            returnBook: returnBook
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

        function convertToDate(date) {
            return new Date(date);
        }

        function formatDate(date) {
            return $filter('date')(date, "EEE MMM, dd yyyy");
        }

        function getByAccessionNumber(accessionNumber) {
            var book;
            BookFactory.getBookByAccessionNumber(accessionNumber).then(function (response) {
                angular.copy(response, book);
            });
            return book;
        }

        function parseDate(date) {
            var convert = convertToDate(date);
            return $filter('date')(convert, "yyyy/MMM/d");
        }

        function saveBook(book) {
            return $cookies.putObject('book', book);
        }

        function loadBook() {
            return $cookies.getObject('book');
        }

        function saveUser(borrower) {
            return $cookies.putObject('borrower', borrower);
        }

        function loadUser() {
            return $cookies.getObject('borrower');
        }

        function issueBook(issueBookBindingModel) {
            var deferred = $q.defer();
            $http.post("/api/issueBook/add", issueBookBindingModel).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                console.log(errorResponse);
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function editIssueBook(issueBook) {
            var deferred = $q.defer();
            $http.post("/api/issueBook/edit", issueBook).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                console.log(errorResponse);
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getIssuedBooks() {
            var deferred = $q.defer();
            $http.get("/api/issueBook/all").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                console.log(errorResponse);
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function deleteIssueBook(issueBook) {
            var deferred = $q.defer();
            $http.post("/api/issueBook/delete", issueBook).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                console.log(errorResponse);
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getIssueBook(id) {
            var deferred = $q.defer();
            $http.get("/api/issueBook/get/" + id).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                console.log(errorResponse);
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function removeCookies() {
            $cookies.remove('book');
            $cookies.remove('borrower');
        }

        function checkToSendNotification(tomorrow, returnDate, email) {
            var tempTomDate = parseDate(tomorrow);
            var tempReturnDate = parseDate(returnDate);
            if (tempTomDate === tempReturnDate)
                sendNotification(email);
        }

        function sendNotification(email) {
            var deferred = $q.defer();
            $http.get("/api/issueBook/sendEmail?email=" + email).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function calculateFine(date, returnDate) {
            var tempDate = parseDate(date);
            var tempReturnDate = parseDate(returnDate);
            var numberOfDays = Math.round(convertToDate(tempDate) - convertToDate(tempReturnDate)) / (1000 * 60 * 60 * 24);
            if (numberOfDays > 0)
                var fine = numberOfDays * 10;
            return fine;
        }

        function updateFine(issuedBook) {
            var deferred = $q.defer();
            $http.put("/api/issueBook/fine", issuedBook).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function returnBook(issuedBook) {
            var deferred = $q.defer();
            $http.put("/api/issueBook/return", issuedBook).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

    }
]);