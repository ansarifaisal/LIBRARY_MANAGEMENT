var BookModule = angular.module("BookModule", []);

BookModule.factory("BookFactory", [
    "$http",
    "$q",
    "CourseFactory",
    "SubjectFactory",
    "PublicationFactory",
    "$filter",
    "uibDateParser",
    function ($http, $q, CourseFactory, SubjectFactory, PublicationFactory, $filter, uibDateParser) {

        var bookFactory = {
            addBook: addBook,
            getBooks: getBooks,
            getBook: getBook,
            editBook: editBook,
            deleteBook: deleteBook,
            addOrEdit: addOrEdit,
            getSemesters: getSemesters,
            getCourses: getCourses,
            getSubjects: getSubjects,
            getPublishers: getPublishers,
            getTypeOfBook: getTypeOfBook,
            getStatus: getStatus,
            parseDate: parseDate,
            dateParse: dateParse,
            calculateDiscount: calculateDiscount,
            getTitles: getTitles,
            getAccessionNumbers: getAccessionNumbers,
            getBookByAccessionNumber: getBookByAccessionNumber,
            getByCourse: getByCourse
        };

        return bookFactory;

        function addBook(book) {
            var deferred = $q.defer();
            $http.post("/api/book/add", book).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBooks() {
            var deferred = $q.defer();
            $http.get("/api/book/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getBook(id) {
            var deferred = $q.defer();
            $http.get("/api/book/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editBook(book) {
            var deferred = $q.defer();
            $http.post("/api/book/edit", book)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteBook(book) {
            var deferred = $q.defer();
            $http.post("/api/book/delete", book)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(book) {
            var toDo = {};
            if (book.id === undefined) {
                toDo.action = addBook(book);
                toDo.errorMessage = "Error Adding Book";
                toDo.successMessage = "Book Added Successfully!";
            } else {
                toDo.action = editBook(book);
                toDo.errorMessage = "Error Editing Book";
                toDo.successMessage = "Book Edited Successfully!";
            }
            return toDo;
        }

        function getSemesters(courses, courseName) {
            semesters = [];
            for (var i = 0; i < courses.length; i++) {
                var course = courses[i];
                if (courseName === course.name) {
                    for (var j = 1; j <= course.noOfSemesters; j++) {
                        semesters.push(j);
                    }
                }
            }
            return semesters;
        }

        function getCourses() {
            var courses = [];
            CourseFactory.getCourses().then(function (response) {
                angular.copy(response, courses);
            });
            return courses;
        }

        function getSubjects(courseName, semester) {
            var subjects = [];
            SubjectFactory.getByCourse(courseName, semester).then(function (response) {
                angular.copy(response, subjects);
            });
            return subjects;
        }

        function getPublishers() {
            var publishers = [];
            PublicationFactory.getPublications().then(function (response) {
                angular.copy(response, publishers);
            });
            return publishers;
        }

        function getTypeOfBook() {
            var type = ["General", "Reference", "Digest", "Novel"];
            return type;
        }

        function getStatus() {
            var status = ["Available", "Not Available", "Withdrawl", "Lost", "Issued"];
            return status;
        }

        function parseDate(date) {
            var filtered = $filter('date')(date, "yyyy/MMM/d");
            return uibDateParser.parse(filtered, "yyyy/MMM/d");
        }

        function dateParse(date) {
            return $filter('date')(date, "yyyy/MMM/d");
        }

        function calculateDiscount(price, discount) {
            var discountAmount = (discount / 100) * price;
            return (price - discountAmount);
        }

        function getTitles() {
            var deferred = $q.defer();
            $http.get("/api/book/bookTitles").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getAccessionNumbers() {
            var deferred = $q.defer();
            $http.get("/api/book/accessionNumbers").then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getBookByAccessionNumber(accessionNumber) {

            var deferred = $q.defer();
            $http.get("/api/book/byAccessionNumber/" + accessionNumber).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }

        function getByCourse(course) {
            var deferred = $q.defer();
            $http.get("/api/book/booksByCourse?course=" + course).then(function (response) {
                deferred.resolve(response.data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        }
    }
]);