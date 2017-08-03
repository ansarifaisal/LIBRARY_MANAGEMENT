﻿PublicationModule.controller("PublicationController", [
    "PublicationFactory",
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
    function (PublicationFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        me = this;

        me.publications = [];

        me.publication = {
            id: undefined,
            name: ''
        };

        me.publicationModal = {
            publication: undefined,
            title: '',
            btnText: ''
        }

        //launch a add publication modal
        me.showPublicationForm = function () {
            me.publicationModal.publication = me.publication;
            me.publicationModal.title = "Add New Publication";
            me.publicationModal.btnText = "Add Publication";
            AppService.showModal(me.publicationModal,
                "publications/publicationForm.html",
                "ModalInstanceController",
                "modalInstanceCtrl");
        }

        me.getPublication = function (id) {
            PublicationFactory.getPublication(id).then(function (publication) {
                me.publicationModal.publication = publication;
                me.publicationModal.title = "Edit Publication";
                me.publicationModal.btnText = "Save Changes";
                AppService.showModal(me.publicationModal,
                "publications/publicationForm.html",
                "ModalInstanceController",
                "modalInstanceCtrl");
            });
        }

        me.deletePublicationModal = function (id) {
            PublicationFactory.getPublication(id).then(function (publication) {
                me.publicationModal.publication = publication;
                me.publicationModal.title = "Delete Publication";
                me.publicationModal.btnText = "Delete";
                AppService.showModal(me.publicationModal,
               "publications/deletePublication.html",
               "ModalInstanceController",
               "modalInstanceCtrl");
            });
        }

        //get all publisher
        me.getPublications = function () {
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
                        text: "<i class='fa fa-plus fa-lg'></i> Add Publication",
                        key: '1',
                        className: 'btn btn-success margin-4x',
                        action: function (e, dt, node, config) {
                            me.showPublicationForm();
                        }
                    }
                ]);
            me.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable(),
            ];

            PublicationFactory.getPublications().then(function (publications) {
                me.publications = publications;
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }
    }
]);
