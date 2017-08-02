PublicationModule.controller("PublicationController", [
    "PublicationFactory",
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$timeout",
    "$rootScope",
    "toastr",
    "$uibModal",
    "DTOptionsBuilder",
    "DTColumnDefBuilder",
    function (PublicationFactory, $scope, $location, $route, $routeParams, $timeout, toastr,
        $rootScope, $uibModal, DTOptionsBuilder, DTColumnDefBuilder) {

        me = this;

        me.publications = [];

        me.publication = {};

        //launch a add publication modal
        me.showPublicationForm = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: true,
                keyboard: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/components/publications/publicationForm.html',
                controller: 'ModalInstanceController',
                controllerAs: 'modalInstanceCtrl'
            });
        }

        me.getPublication = function (id) {

            PublicationFactory.getPublication(id).then(function (publication) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: true,
                    keyboard: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/app/components/publications/publicationForm.html',
                    controller: 'ModalInstanceController',
                    controllerAs: 'modalInstanceCtrl',
                    resolve: {
                        publication: function () {
                            return publication;
                        }
                    }
                });
            });

        }


        //get all publisher
        me.getPublications = function () {

            me.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('frtip')
                .withBootstrap()
                .withButtons([
                    { extend: 'copy', className: 'btn btn-default fa fa-clipboard fa-lg', text: '' },
                    { extend: 'print', className: 'btn btn-default fa fa-print fa-lg', text: '' },
                    { extend: 'excel', className: 'btn btn-default fa fa-file-excel-o fa-lg', text: '' },
                    {
                        text: '',
                        key: '1',
                        className: 'btn btn-success fa fa-plus fa-lg margin-4x',
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
            });
        }
        
        me.ok = function testing($uibModalInstance) {
            $uibModalInstance.close();
        }

    }
]);

PublicationModule.controller('ModalInstanceController', [
    "$uibModalInstance",
    "PublicationFactory",
    "$scope",
    "$route",
    "toastr",
    "$rootScope",
    "publication",
    function ($uibModalInstance, PublicationFactory, $scope, $route, toastr, $rootScope, publication) {

        var $ctrl = this;

        $ctrl.errorMessage = "";
        $ctrl.successMessage = "";
        $rootScope.isBusy = false;

        $ctrl.ok = function () {
            $uibModalInstance.close("Closed");
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss("Cancel");
        };

        $ctrl.newPublication = {
            id: undefined,
            name: ''
        };

        
    
        $ctrl.newPublication = publication;
        $ctrl.submitPublicationForm = function () {
            debugger;
            if ($ctrl.newPublication.name === "")
                return;

            $rootScope.isBusy = true;
            PublicationFactory.addPublication($ctrl.newPublication).then(function () {
                $route.reload();
                toastr.success("Publication Added Successfully!");
            }, function (errorResponse) {
                toastr.error("Error Adding Publication");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

    }]);