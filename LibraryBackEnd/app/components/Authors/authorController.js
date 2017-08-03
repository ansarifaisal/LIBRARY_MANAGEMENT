
AuthorModule.controller("AuthorController", [
    "AuthorFactory",
    "AppService",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (AuthorFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.author = {
            id: undefined,
            name: ''
        };

        me.authors = [];

        me.authorModal = {
            author: undefined,
            title: '',
            btnText: ''
        }


        me.showAuthorForm = function () {
            me.authorModal.author = me.author;
            me.authorModal.title = "Add New Author";
            me.authorModal.btnText = "Add Author";
            AppService.showModal(me.authorModal,
                "authors/authorForm.html",
                "AuthorModalController",
                "authorModalCtrl");
        }

        me.getAuthor = function (id) {
            AuthorFactory.getAuthor(id).then(function (author) {
                me.authorModal.author = author;
                me.authorModal.title = "Edit Author";
                me.authorModal.btnText = "Save Changes";
                AppService.showModal(me.authorModal,
               "authors/authorForm.html",
               "AuthorModalController",
               "authorModalCtrl");
            });
        }

        me.deleteAuthorModal = function (id) {
            AuthorFactory.getAuthor(id).then(function (author) {
                me.authorModal.author = author;
                me.authorModal.title = "Delete Author";
                me.authorModal.btnText = "Delete";
                AppService.showModal(me.authorModal,
               "authors/deleteAuthor.html",
               "AuthorModalController",
               "authorModalCtrl");
            });
        }

        //get all publisher
        me.getAuthors = function () {
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
                        text: "<i class='fa fa-plus fa-lg'></i> Add Author",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showAuthorForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable(),
            ];

            AuthorFactory.getAuthors().then(function (authors) {
                me.authors = authors;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);

AuthorModule.controller("AuthorModalController", [
    "$uibModalInstance",
    "AuthorFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    function ($uibModalInstance, AuthorFactory, $route, toastr, $rootScope, modal) {
        var me = this;

        me.author = modal.author;

        me.title = modal.title;

        me.btnText = modal.btnText;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        };

        me.submitForm = function () {
            if (me.author.name === "")
                return;

            var addOrEdit = AuthorFactory.addOrEdit(me.author);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                if (errorResponse.status === 400)
                    return toastr.error("Author Already Exists");
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteAuthor = function () {

            $rootScope.isBusy = true;
            AuthorFactory.deleteAuthor(me.author).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Author Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();

                toastr.error("Error Deleting Author");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }
]);