CommitteeMemberModule.controller("CommitteeMemberController", [
    "CommitteeMemberFactory",
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
    function (CommitteeMemberFactory, AppService, $scope, $location, $route, $routeParams, $timeout, $rootScope,
        toastr, DTOptionsBuilder, DTColumnDefBuilder) {

        var me = this;

        me.committeeMembers = [];

        me.committeeMember = {
            name: '',
            designation: '',
            committeeRole: '',
        }

        me.committeeMemberModal = {
            committeeMember: undefined,
            title: '',
            btnText: ''
        }

        me.getCommitteeMembers = function () {
            if ($rootScope.user.role == 'ADMIN')
                me.dtOptions = AppService.dataTableWithFunction("Add Committee Member", me.showCommitteeMemberForm);
            else
                me.dtOptions = AppService.dataTableWithOutFunction();
            CommitteeMemberFactory.getCommitteeMembers().then(function (committeeMembers) {
                me.committeeMembers = committeeMembers;
            }, function (errorResponse) {
                toastr.error("Error getting response");
            });
        }

        me.showCommitteeMemberForm = function () {
            me.committeeMemberModal.committeeMember = me.committeeMember;
            me.committeeMemberModal.title = "Add New Committee Member";
            me.committeeMemberModal.btnText = "Add Committee Member";
            AppService.showModal(me.committeeMemberModal,
                "committee/committeeMemberForm.html",
                "CommitteeMemberModalController",
                "committeeMemberModalCtrl");
        }

        me.getCommitteeMember = function (id) {
            CommitteeMemberFactory.getCommitteeMember(id).then(function (committeeMember) {
                me.committeeMemberModal.committeeMember = committeeMember;
                me.committeeMemberModal.title = "Edit Committee Member";
                me.committeeMemberModal.btnText = "Save Changes";
                AppService.showModal(me.committeeMemberModal,
                    "committee/committeeMemberForm.html",
                    "CommitteeMemberModalController",
                    "committeeMemberModalCtrl");
            });
        }

        me.deleteCommitteeMemberModal = function (id) {
            CommitteeMemberFactory.getCommitteeMember(id).then(function (committeeMember) {
                me.committeeMemberModal.committeeMember = committeeMember;
                me.committeeMemberModal.title = "Delete Committee Member";
                me.committeeMemberModal.btnText = "Delete";
                AppService.showModal(me.committeeMemberModal,
                    "committee/deleteCommitteeMember.html",
                    "CommitteeMemberModalController",
                    "committeeMemberModalCtrl");
            });
        }

    }
]);