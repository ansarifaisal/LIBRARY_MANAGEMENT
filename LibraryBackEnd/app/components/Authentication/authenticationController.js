
AuthenticationModule.controller("AuthenticationController", [
    "AuthenticationFactory",
    "$scope",
    "$location",
    "$timeout",
    "$rootScope",
    "$routeParams",
    "$route",
    function (AuthenticationFactory, $scope, $location, $timeout, $rootScope, $routeParams, $route) {

        //here `me` is use to reffer the current value
        var me = this;

        //object to store credentials
        me.credentials = {
            username: '',
            password: ''
        };

        $scope.count = 5;

        $scope.isEmailAlert = false;

        $scope.errorMessage = "";

        $scope.successMessage = "";

        //creating new user object
        me.newUser = {};

        me.user = {};

        me.data = {};

        $scope.isBusy = false;

        me.confirmAccount = {}

        $timeout(function () {
            settings();
        }, 1000);

        me.login = function () {

            if (!me.credentials.username || !me.credentials.password)
                return;

            $scope.isBusy = true;
            AuthenticationFactory.login(me.credentials)
                .then(function (data) {
                    me.data = data;
                    AuthenticationFactory.saveToken(me.data);
                    $rootScope.token = AuthenticationFactory.loadTokenFromSession();
                    //if the credentials is wrong
                    if (me.data.error === 'invalid_grant') {
                        showAlert();
                        return $scope.errorMessage = me.data.error_description;
                    }
                    //getting the user
                    AuthenticationFactory.getUserByUserName(me.data.userName).then(function (user) {
                        if (user) {
                            if (user.status === 'PENDING') {
                                showAlert();
                                return $scope.errorMessage = "Your account is pending"
                            } else if (user.status === 'REJECTED') {
                                showAlert();
                                return $scope.errorMessage = "Your account request is rejected";
                            } else if (user.emailConfirmed === false) {
                                showAlert();
                                return $scope.emailError = true;
                            } else if (user.emailConfirmed === true && user.status === 'APPROVED') {
                                //save token in the session
                                AuthenticationFactory.saveUser(user);
                                AuthenticationFactory.setUserIsAuthenticated(true);
                                AuthenticationFactory.setRole(user.role);
                                $location.path("/home");
                            }
                        } else {
                            AuthenticationFactory.setUserIsAuthenticated(false);
                            AuthenticationFactory.setRole("GUEST");
                            $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                            $location.path("/login");
                        }
                    });

                },
                function (errorResponse) {
                    showAlert();
                    return $scope.errorMessage = "Error While Login!";
                }).finally(function () {
                    $scope.isBusy = false;
                });
        }

        me.register = function () {
            me.newUser.Role = AuthenticationFactory.studentRole();
            me.newUser.Status = AuthenticationFactory.status();
            $scope.isBusy = true;
            AuthenticationFactory.register(me.newUser)
                .then(function () {
                    AuthenticationFactory.setUserIsAuthenticated(false);
                    $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                    $location.path('/confirmation');
                },
            function (errorResponse) {
                AuthenticationFactory.setUserIsAuthenticated(false);
                $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                $location.path('/register');
                showAlert();
                $scope.errorMessage = "Error while registration";
            }).finally(function () {
                $scope.isBusy = false;
            });
        }


        me.activateAccount = function () {
            me.confirmAccount.userId = $routeParams.userId;
            me.confirmAccount.code = $routeParams.code;
            me.confirmAccount.userName = $routeParams.userName;
            $scope.isBusy = true;
            AuthenticationFactory.activateAccount(me.confirmAccount)
                .then(function (response) {
                    //Needs to write check to check password
                    $location.path("/confirm");
                },
            function (errorResponse) {
                showAlert();
                $scope.errorMessage = "Error activating account";
            }).finally(function () {
                $scope.isBusy = false;
            });
        }

        me.checkExistingAccount = function () {
            var userName = me.newUser.Email;
            $scope.isBusy = true;
            AuthenticationFactory.checkExistingAccount(userName).then(function (exists) {
                me.exists = false;
                if (exists === true)
                    me.exists = true;
            },
            function (errorResponse) {
                showAlert();
                $scope.errorMessage = "Error while checking username";
            });
        }


        me.sendActivationLink = function () {
            var userName = me.credentials.username;
            $scope.isBusy = true;
            AuthenticationFactory.sendActivationMail(userName).then(function () {
                $scope.isSuccess = true;
                showAlert();
                $scope.successMessage = "Email has been sent to your provided mail id.";
            }, function (errorResponse) {
                showAlert();
                $scope.errorMessage = "Error sending activation link.";
            }).finally(function () {
                $scope.isBusy = false;
            });
        }

        me.loginRedirect = function () {
            me.countDown();
            $timeout(function () {
                $location.path("/login");
            }, 5000);
        }

        me.countDown = function () {
            $timeout(function () {
                $scope.count--;
                if ($scope.count === -1)
                    return;
                me.countDown();
            }, 1000);
        }


    }
]);
