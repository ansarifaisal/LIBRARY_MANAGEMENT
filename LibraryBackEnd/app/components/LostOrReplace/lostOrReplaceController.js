LostOrReplaceModule.controller("LostOrReplaceBookController", [
    "LostOrReplaceFactory",
    "AppService",
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
    function (LostOrReplaceFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, $window, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.books = [];

        me.book = {};

        me.bookModal = {
            book: undefined,
            title: '',
            btnText: ''
        }

        me.getLostReplaceBooks = function () {
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
               }
          ]);
            me.dtColumnDefs = [
                //DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
            LostOrReplaceFactory.getBooks().then(function (books) {
                me.books = books;
                $rootScope.isBusy = false;
            }, function (errorResponse) {
                $rootScope.isBusy = false;
                toastr.error("Error Fetching Books");
            });
        }

        me.replaceBook = function (id) {
            LostOrReplaceFactory.getBook(id).then(function (lostBook) {
                me.bookModal.book = lostBook;
                me.bookModal.title = "Replace Book";
                me.bookModal.btnText = "Replace";
                AppService.showModal(me.bookModal,
               "lostOrReplace/replaceBook.html",
               "LostOrReplaceModalController",
               "lostOrReplaceModalCtrl");
            });
        }

        me.undoReplace = function (id) {
            LostOrReplaceFactory.getBook(id).then(function (book) {
                me.bookModal.book = book;
                me.bookModal.title = "Undo Replace";
                me.bookModal.btnText = "Undo Replace";
                AppService.showModal(me.bookModal,
               "lostOrReplace/undoReplaceBook.html",
               "LostOrReplaceModalController",
               "lostOrReplaceModalCtrl");
            });
        }
    }
]);