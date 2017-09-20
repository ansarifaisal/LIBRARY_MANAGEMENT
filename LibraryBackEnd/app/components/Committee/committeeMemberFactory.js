var CommitteeMemberModule = angular.module("CommitteeMemberModule", []);

CommitteeMemberModule.factory("CommitteeMemberFactory", [
    "$http",
    "$q",
    function ($http, $q) {
        var committeeMemberFactory = {
            addCommitteeMember: addCommitteeMember,
            getCommitteeMembers: getCommitteeMembers,
            getCommitteeMember: getCommitteeMember,
            editCommitteeMember: editCommitteeMember,
            deleteCommitteeMember: deleteCommitteeMember,
            getByName: getByName,
            addOrEdit: addOrEdit
        }
        return committeeMemberFactory;

        function addCommitteeMember(committeeMember) {
            var deferred = $q.defer();
            $http.post("/api/committee/add", committeeMember)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getCommitteeMembers() {
            var deferred = $q.defer();
            $http.get("/api/committee/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getCommitteeMember(id) {
            var deferred = $q.defer();
            $http.get("/api/committee/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editCommitteeMember(committeeMember) {
            var deferred = $q.defer();
            $http.post("/api/committee/edit", committeeMember)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteCommitteeMember(committeeMember) {
            var deferred = $q.defer();
            $http.post("/api/committee/delete", committeeMember)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getByName(name) {
            var deferred = $q.defer();
            $http.get("/api/committee/byName?name=" + name)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(committeeMember) {
            var toDo = {};
            if (committeeMember.id === undefined) {
                toDo.action = addCommitteeMember(committeeMember);
                toDo.errorMessage = "Error Adding Committee Member";
                toDo.successMessage = "Committee Member Added Successfully!";
            } else {
                toDo.action = editCommitteeMember(committeeMember);
                toDo.errorMessage = "Error Editing Committee Member";
                toDo.successMessage = "Committee Member Edited Successfully!";
            }
            return toDo;
        }

    }
]);