﻿
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
