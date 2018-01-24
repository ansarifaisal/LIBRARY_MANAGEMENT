BookModule.controller("BookController", [
    "BookFactory",
    "AppService",
    "CourseFactory",
    "ReturnBookFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "$window",
    function (BookFactory, AppService, CourseFactory, ReturnBookFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window) {


        var me = this;

        me.book = {}

        me.courses = [];

        me.books = [];

        me.titles = [];

        me.bookModal = {
            book: undefined,
            courses: undefined,
            title: '',
            btnText: ''
        }

        me.exists = false;

        me.change = false;

        me.bookForm = {
            book: undefined,
            courses: undefined,
            semesters: undefined,
            subjects: undefined,
            publishers: undefined,
            isbn: undefined,
            typesOfBook: undefined,
            status: status,
            title: '',
            btnText: '',
        }

        me.billDatePicker = function () {
            me.billDatePopup.opened = true;
        };

        me.billDatePopup = {
            opened: false
        };

        me.dateOfPublicationDatePicker = function () {
            me.dateOfPublicationPopup.opened = true;
        };

        me.dateOfPublicationPopup = {
            opened: false
        };

        me.publicationDateOptions = {
            formatYear: 'yy',
            //maxDate: new Date(),
            minMode: "month",
            datepickerMode: "month",
            startingDay: 1
        };

        me.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };


        me.showAddBookForm = function () {
            $window.location.href = '#!/admin/book/add';
        }

        me.showEditBookForm = function (id) {
            $window.location.href = "#!/admin/book/edit/" + id;
        }

        me.getSemesters = function (courses, courseName) {
            return me.bookForm.semesters = BookFactory.getSemesters(courses, courseName);
        }

        me.getSubjects = function (courseName, semester) {
            return me.bookForm.subjects = BookFactory.getSubjects(courseName, semester);
        }

        me.getPublishers = function () {
            return me.bookForm.publishers = BookFactory.getPublishers();
        }

        me.getCourses = function () {
            return me.bookForm.courses = BookFactory.getCourses();
        }

        me.getTypeOfBook = function () {
            return me.bookForm.typesOfBook = BookFactory.getTypeOfBook();
        }

        me.gotBy = function () {
            return me.bookForm.gotBy = BookFactory.gotBy();
        }

        me.isBaught = function (gotBy) {
            me.baught = false;
            me.getStatus();
            if (gotBy === 'Purchased')
                return me.baught = true;
            me.bookForm.book.billDate = new Date();
            return me.baught;
        }

        me.getStatus = function () {
            return me.bookForm.status = BookFactory.getStatus();
        }

        me.calculateDiscount = function (price, discount) {
            return me.bookForm.book.discountPrice = BookFactory.calculateDiscount(price, discount);
        }

        me.getTitles = function () {
            var titles = []
            BookFactory.getTitles().then(function (response) {
                angular.copy(response, me.titles);
            });
            return titles;
        }

        me.addBookForm = function () {
            me.titles = me.getTitles();
            me.bookForm.book = me.book;
            me.getPublishers();
            me.bookForm.title = "Add Book Form",
            me.bookForm.btnText = "Add Book";
        }

        me.getBook = function () {
            var id = $routeParams.id;
            BookFactory.getBook(id).then(function (book) {
                me.titles = me.getTitles();
                me.bookForm.book = book;
                me.bookForm.book.dateOfPublication = BookFactory.parseDate(me.bookForm.book.dateOfPublication);
                me.getPublishers();
                $timeout(function () {
                    me.getCourses();
                }, 100);

                $timeout(function () {
                    me.getSemesters(me.bookForm.courses, me.bookForm.book.course);
                    me.getSubjects(me.bookForm.book.course, me.bookForm.book.semester);
                }, 200);

                me.bookForm.book.billDate = BookFactory.parseDate(me.bookForm.book.billDate);
                me.calculateDiscount(me.bookForm.book.actualPrice, me.bookForm.book.discount);
                me.getTypeOfBook();
                me.gotBy();
                me.isBaught(me.bookForm.book.get);
                me.bookForm.title = "Edit Book Form",
                me.bookForm.btnText = "Save Changes";
            });
        }

        me.deleteBookModal = function (id) {
            BookFactory.getBook(id).then(function (book) {
                me.bookModal.book = book;
                me.bookModal.title = "Delete Book";
                me.bookModal.btnText = "Delete";
                AppService.showModal(me.bookModal,
               "books/deletebook.html",
               "BookModalController",
               "bookModalCtrl");
            });
        }

        //get all publisher
        me.getBooks = function () {

            var user = $rootScope.user;
            var action = null;
            $rootScope.isBusy = true;
            if (user.role === 'ADMIN')
                me.dtOptions = AppService.dataTableWithFunction("Add Book", me.showAddBookForm);
            else
                me.dtOptions = AppService.dataTableWithOutFunction();

            if (user.role === 'ADMIN')
                action = BookFactory.getBooks();
            else
                action = BookFactory.getUserBooks();

            action.then(function (books) {
                me.books = books;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.submitForm = function () {
            if (me.bookForm.book.title === undefined)
                return;

            me.bookForm.book.billDate = BookFactory.dateParse(me.bookForm.book.billDate);
            me.bookForm.book.dateOfPublication = BookFactory.dateParse(me.bookForm.book.dateOfPublication);

            var type = me.bookForm.book.typeOfBook;

            if (type === "Reference") {
                me.bookForm.book.semester = 0;
                me.bookForm.book.subject = "General";
            }

            if (type === "Novel" || type === "Drama") {
                me.bookForm.book.course = "General";
                me.bookForm.book.semester = 0;
                me.bookForm.book.subject = "General";
            }

            var addOrEdit = BookFactory.addOrEdit(me.bookForm.book);
            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $location.path("/user/books");
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Book Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.getBookData = function () {
            $rootScope.isBusy = true;

            me.dtOptions = AppService.dataTableWithOutFunction();

            var id = $routeParams.id;
            BookFactory.getBook(id).then(function (book) {
                me.book = book;
                me.getIssuedData(me.book.accessionNumber);
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error loading data");
            });
        }

        me.getIssuedData = function (accessionNumber) {
            ReturnBookFactory.getReturnBook(accessionNumber).then(function (issued) {
                me.issued = issued;
            });
        }

        me.trackChanges = function () {
            me.change = true;
        }

        me.getByAccessionNumber = function (accessionNumber) {
            if (!accessionNumber || !me.change)
                return;
            me.exists = false;
            var id = $routeParams.id;
            BookFactory.getBookByAccessionNumber(accessionNumber).then(function (book) {
                if (book === null)
                    return me.exists = false;
                if (book.accessionNumber === accessionNumber)
                    return me.exists = true;
            }, function (errorResponse) {
                toastr.error("Error Getting Response");
            });
        }

        me.getBookByTitle = function (title) {
            console.log(title);
            if (title === "" || title === undefined)
                return;
            BookFactory.getBookByTitle(title).then(function (book) {
                if (!book)
                    return;
                me.getCourses();
                $timeout(function () {
                    me.getSemesters(me.bookForm.courses, book.course);
                    me.getSubjects(book.course, book.semester);
                    me.getTypeOfBook();
                    me.gotBy()
                    me.isBaught(book.get);
                }, 2000);

                me.bookForm.book.author = book.author;
                me.bookForm.book.actualPrice = book.actualPrice;
                me.bookForm.book.billDate = BookFactory.parseDate(book.billDate);
                me.bookForm.book.billNo = book.billNo;
                me.bookForm.book.classNo = book.classNo;
                me.bookForm.book.course = book.course;
                me.bookForm.book.date = book.date;
                me.bookForm.book.dateOfPublication = BookFactory.parseDate(book.dateOfPublication);
                me.bookForm.book.discount = book.discount;
                me.bookForm.book.discountPrice = book.discountPrice;
                me.bookForm.book.edition = book.edition;
                me.bookForm.book.get = book.get;
                me.bookForm.book.isbn = book.isbn;
                me.bookForm.book.pages = book.pages;
                me.bookForm.book.placeOfPublication = book.placeOfPublication;
                me.bookForm.book.publisher = book.publisher;
                me.bookForm.book.semester = book.semester;
                me.bookForm.book.source = book.source;
                me.bookForm.book.subject = book.subject;
                me.bookForm.book.typeOfBook = book.typeOfBook;

            }, function (errorResponse) {
                toastr.error("Error Getting Response");
            });
        }

        me.getUserBooks = function () {
            var user = $rootScope.user

            if (user.role === 'ADMIN' || user.role === 'LIBRARIAN')
                return;

            $rootScope.isBusy = true;
            me.dtOptions = AppService.dataTableWithOutFunction();
            var course = user.course;
            BookFactory.getByCourse(course).then(function (books) {
                me.books = books;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error getting data");
            });
        }

    }
]);