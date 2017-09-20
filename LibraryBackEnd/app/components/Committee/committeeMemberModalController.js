CommitteeMemberModule.controller("CommitteeMemberModalController", [
    "$uibModalInstance",
    "CommitteeMemberFactory",
    "$route",
    "toastr",
    "$rootScope",
    "modal",
    "$filter",
    "$scope",
    function ($uibModalInstance, CommitteeMemberFactory, $route, toastr, $rootScope, modal, $filter, $scope) {
        var me = this;

        me.title = modal.title;

        me.btnText = modal.btnText;

        me.committeeMember = modal.committeeMember;

        me.change = false;

        $rootScope.isBusy = false;

        me.ok = function () {
            return $uibModalInstance.close("Closed");
        }

        me.cancel = function () {
            return $uibModalInstance.dismiss("Cancel");
        }

        me.submitForm = function () {
            if (me.committeeMember.name === "")
                return;

            var addOrEdit = CommitteeMemberFactory.addOrEdit(me.committeeMember);

            $action = addOrEdit.action;
            $rootScope.isBusy = true;

            $action.then(function () {
                $route.reload();
                toastr.success(addOrEdit.successMessage);
            }, function (errorResponse) {
                $route.reload();
                toastr.error(addOrEdit.errorMessage);
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.deleteCommitteeMember = function () {
            $rootScope.isBusy = true;
            CommitteeMemberFactory.deleteCommitteeMember(me.committeeMember).then(function () {
                me.ok();
                $route.reload();
                toastr.success("Committee Member Deleted Successfully!");
            }, function (errorResponse) {
                me.cancel();
                toastr.error("Error Deleting Committee Member");
            }).finally(function () {
                $rootScope.isBusy = false;
            });
        }

        me.trackChanges = function () {
            me.change = true;
        }

        me.checkExisting = function (name) {
            if (name === "" || !me.change)
                return;
            CommitteeMemberFactory.getByName(name).then(function (committeeMember) {
                if (committeeMember === null)
                    me.exists = false;
                if (committeeMember.name === name)
                    me.exists = true;
                return me.exists;
            });
        }

    }
]);