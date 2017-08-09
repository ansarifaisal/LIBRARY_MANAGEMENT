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
    function (BookFactory, AppService, CourseFactory, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {


        var me = this;

        me.book = {
            //accessionNumber: undefined,
            //title: '',
            //pages: '',
            //author: '',
            //publisher: '',
            //placeOfPublication: '',
            //dateOfPublication: undefined,
            //course: '',
            //semester: undefined,
            //subject: '',
            //typeOfBook: '',
            //source: '',
            //edition: '',
            //classNo: undefined,
            //actualPrice: undefined,
            //discount: undefined,
            //discountPrice: undefined,
            //billNo: '',
            //billDate: undefined,
            //status: ''
        }

        me.courses = [];

        me.books = [];

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

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minMode: "month",
            datepickerMode: "month",
            startingDay: 1
        };


        me.showBookForm = function () {

            me.addBookForm();
        }

        me.addBookForm = function () {

            me.bookForm.book = me.book;
            me.bookForm.courses = BookFactory.getCourses();
            me.bookForm.publishers = BookFactory.getPublishers();
            me.bookForm.typesOfBook = BookFactory.getTypeOfBook();
            me.bookForm.status = BookFactory.getStatus();
            me.bookForm.title = "Add Book Form",
            me.bookForm.btnText = "Add Book";
        }

        me.getSemesters = function (courses, courseName) {
            me.bookForm.semesters = BookFactory.getSemesters(courses, courseName);
        }

        me.getSubjects = function (courseName, semester) {
            me.bookForm.subjects = BookFactory.getSubjects(courseName, semester);
        }

        me.getPublishers = function () {
            me.bookForm.publishers = BookFactory.getPublishers();
        }

        me.getBook = function (id) {
            BookFactory.getBook(id).then(function (book) {
                me.bookModal.book = book;
                me.bookModal.title = "Edit Book";
                me.bookModal.btnText = "Save Changes";
                AppService.showModal(me.bookModal,
               "books/bookForm.html",
               "BookModalController",
               "bookModalCtrl");
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
                .withPaginationType('full_numbers')
                .withDOM('Bfrtip')
                .withBootstrap()
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
                        text: "<i class='fa fa-plus fa-lg'></i> Add Book",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showBookForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(4).notSortable(),
            ];

            BookFactory.getBooks().then(function (books) {
                me.books = books;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.submitForm = function () {

            if (me.bookForm.book.title === "")
                return;
            console.log(me.bookForm.book);

            var addOrEdit = BookFactory.addOrEdit(me.bookForm.book);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
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