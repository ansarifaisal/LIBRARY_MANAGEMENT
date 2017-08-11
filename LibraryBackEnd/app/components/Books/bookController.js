BookModule.controller("BookController", [
    "BookFactory",
    "AppService",
    "CourseFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    "$window",
    function (BookFactory, AppService, CourseFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder, $window) {


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

        me.bookForm = {
            book: undefined,
            courses: undefined,
            semesters: undefined,
            subjects: undefined,
            publishers: undefined,
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
            maxDate: new Date(),
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
            console.log(me.titles);
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
                me.getCourses();
                $timeout(function () {
                    me.getSemesters(me.bookForm.courses, me.bookForm.book.course);
                    me.getSubjects(me.bookForm.book.course, me.bookForm.book.semester);
                }, 100);
                me.bookForm.book.billDate = BookFactory.parseDate(me.bookForm.book.billDate);
                me.calculateDiscount(me.bookForm.book.actualPrice, me.bookForm.book.discount);
                me.getTypeOfBook();
                me.getStatus();
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
                        text: "<i class='fa fa-plus fa-lg'></i> Add Subject",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showAddBookForm();
                        }
                    }
               ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(21).notSortable(),
            ];

            BookFactory.getBooks().then(function (books) {
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

            var addOrEdit = BookFactory.addOrEdit(me.bookForm.book);
            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $location.path("/admin/books");
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

    }
]);