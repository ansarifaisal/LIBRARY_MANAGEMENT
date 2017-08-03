var AuthorModule = angular.module("AuthorModule", []);

AuthorModule.factory("AuthorFactory", [
    "$http",
    "$q",
    function ($http, $q) {

        var authorFactory = {
            addAuthor: addAuthor,
            getAuthors: getAuthors,
            getAuthor: getAuthor,
            editAuthor: editAuthor,
            deleteAuthor: deleteAuthor,
            addOrEdit: addOrEdit
        }

        return authorFactory;

        function addAuthor(author) {
            var deferred = $q.defer();
            $http.post("/api/author/add", author)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getAuthors() {
            var deferred = $q.defer();
            $http.get("/api/author/all")
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function getAuthor(id) {
            var deferred = $q.defer();
            $http.get("/api/author/get/" + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function editAuthor(author) {
            var deferred = $q.defer();
            $http.post("/api/author/edit", author)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function deleteAuthor(author) {
            var deferred = $q.defer();
            $http.post("/api/author/delete", author)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        }

        function addOrEdit(author) {
            var toDo = {};
            if (author.id === undefined) {
                toDo.action = addAuthor(author);
                toDo.errorMessage = "Error Adding Author";
                toDo.successMessage = "Author Added Successfully!";
            } else {
                toDo.action = editAuthor(author);
                toDo.errorMessage = "Error Editing Author";
                toDo.successMessage = "Author Edited Successfully!";
            }
            return toDo;
        }
    }
]);