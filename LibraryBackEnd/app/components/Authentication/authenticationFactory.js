var AuthenticationModule = angular.module("AuthenticationModule", ["ngCookies"]);

AuthenticationModule.factory("AuthenticationFactory", [
    "$http",
    "$q",
    "$cookies",
    "$rootScope",
    function ($http, $q, $cookies, $rootScope) {

        //variable to check whether the user is authenticated
        var userIsAuthenticated = false;

        //set the initial role as guest
        var role = 'GUEST';

        //creating authenticationFactory object
        var authenticationFactory = {
            //define the properties of authenticationFactory
            setUserIsAuthenticated: setUserIsAuthenticated,
            getUserIsAuthenticated: getUserIsAuthenticated,
            setRole: setRole,
            getRole: getRole,
            login: login,
            register: register,
            logout: logout,
            saveUser: saveUser,
            saveToken: saveToken,
            saveConfiguration: saveConfiguration,
            loadConfiguration: loadConfiguration,
            loadUserFromCookie: loadUserFromCookie,
            loadTokenFromSession: loadTokenFromSession,
            studentRole: studentRole,
            status: status,
            getUserByUserName: getUserByUserName,
            activateAccount: activateAccount,
            checkExistingAccount: checkExistingAccount,
            sendActivationMail: sendActivationMail,
            forgetPassword: forgetPassword,
            setPassword: setPassword,
            sendReturnBookReminder: sendReturnBookReminder,
            sendLateBookReminder: sendLateBookReminder,
            sendReturnMagazineReminder: sendReturnMagazineReminder,
            sendLateMagazineReminder: sendLateMagazineReminder
        }

        //returning the authenticationFactory object
        return authenticationFactory;

        //function to set userIsAuthenticated Variable
        function setUserIsAuthenticated(value) {
            //setting up userIsAuthentcated
            userIsAuthenticated = value;
        }

        //function to get userIsAuthentcated Variable Value
        function getUserIsAuthenticated() {
            return userIsAuthenticated;
        }

        //function to set  role variable value
        function setRole(value) {
            //setting up the role variable value
            role = value;
        }

        //function to get the role variable value
        function getRole() {
            //getting the user role value
            return role;
        }

        //function to save the user in cookie
        function saveUser(user) {
            //puting user into cookies
            $cookies.putObject('user', user);
            setUserIsAuthenticated(true);
            //userIsAuthenticated = true;
            //setting up role
            setRole(user.role);
            //role = user.role;
        }

        function saveConfiguration(configuration) {
            $cookies.putObject('configuration', configuration);
        }

        function loadConfiguration() {
            var configuration = $cookies.getObject('configuration');
            return configuration;
        }

        //function loadUserFromCookie to load if the user is already logged in
        function loadUserFromCookie() {
            //getting User Object from cookies
            user = $cookies.getObject('user');
            if (user) {
                setUserIsAuthenticated(true);
                setRole(user.role);
            } else {
                //if cookies is empty set user not authenticated and role as guest
                setUserIsAuthenticated(false);
                setRole('GUEST');
            }
            return user;
        }

        //function to register the user into the database
        function register(userInfo) {
            var deferred = $q.defer();
            //calling the function in the backend
            $http.post("/api/Account/Register", userInfo)
                .then(function (response) {
                    //getting the data
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    //error response
                    deferred.reject(errorResponse);
                });
            //returning promise object
            return deferred.promise;

        }

        //function to login
        function login(userLogin) {

            var deferred = $q.defer();

            //setting up the query string
            var data = "grant_type=password&username=" + userLogin.username + "&password=" + userLogin.password;

            //calling the function in the backend
            $http.post("/Token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
               .then(function (response) {
                   //getting the data
                   deferred.resolve(response.data);
               }, function (errorResponse) {
                   //error response
                   deferred.resolve(errorResponse.data);
               });

            //returning promise object
            return deferred.promise;

        }

        //function to save token
        function saveToken(data) {
            //saving the data named as authenticationData from session
            $cookies.putObject('authenticationData', data);
        }

        function loadTokenFromSession() {
            //getting the data named authentictionData from session
            var data = $cookies.getObject('authenticationData');
            return data;
        }

        function logout() {

            var deferred = $q.defer();
            //calling the function in the backend
            $http.post("/api/Account/Register", userInfo)
                .then(function (response) {
                    //getting the data
                    deferred.resolve(response.data);
                }, function (errorResponse) {
                    //error response
                    deferred.reject(errorResponse);
                });
            //returning promise object
            return deferred.promise;

        }

        function studentRole() {
            var role = "STUDENT";
            return role;
        }

        function status() {
            var userStatus = "PENDING";
            return userStatus;
        }

        function getUserByUserName(userName) {

            var deferred = $q.defer();

            $http.get("/api/Home/UserByUserName?userName=" + userName, { headers: { 'Authorization': 'Bearer ' + $rootScope.token.access_token } })
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;

        }

        function activateAccount(confirmAccount) {

            var deferred = $q.defer();

            $http.post("/api/Account/ConfirmEmail", confirmAccount)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;

        }

        function checkExistingAccount(userName) {

            var deferred = $q.defer();

            $http.get("/api/home/checkExistingUser?userName=" + userName)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

        function sendActivationMail(userName) {

            var deferred = $q.defer();

            $http.get("/api/account/sendActivationEmail?userName=" + userName)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;

        }

        function forgetPassword(details) {
            var deferred = $q.defer();

            $http.post("/api/account/ForgetPassword", details)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

        function setPassword(password) {
            var deferred = $q.defer();
            $http.post("/api/account/ResetPassword", password)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

        function sendReturnBookReminder(email, issueBook) {
            var deferred = $q.defer();
            $http.post("/api/email/returnBook?email=" + email, issueBook)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

        function sendLateBookReminder(email, issueBook) {
            var deferred = $q.defer();
            $http.post("/api/email/lateBook?email=" + email, issueBook)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

        function sendReturnMagazineReminder(email, issueMagazine) {
            var deferred = $q.defer();
            $http.post("/api/email/returnMagazine?email=" + email, issueMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

        function sendLateMagazineReminder(email, issueMagazine) {
            var deferred = $q.defer();
            $http.post("/api/email/lateMagazine?email=" + email, issueMagazine)
                .then(function (response) {
                    deferred.resolve(response.data);
                },
            function (errorResponse) {
                deferred.reject(errorResponse);
            });

            return deferred.promise;
        }

    }
]);