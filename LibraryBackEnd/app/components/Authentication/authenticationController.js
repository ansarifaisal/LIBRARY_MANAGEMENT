
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

        $rootScope.count = 5;

        $scope.isEmailAlert = false;

        $scope.errorMessage = "";

        $scope.successMessage = "";

        //creating new user object
        me.newUser = {};

        me.user = {};

        me.data = {};

        me.confirmAccount = {}

        $timeout(function () {
            settings();
        }, 1000);

        me.login = function () {

            if (!me.credentials.username || !me.credentials.password)
                return;

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
                            } else if (user.status === 'PENDING') {
                                showAlert();
                                return $scope.errorMessage = "Your account is '<string>'pending'<strong>'"
                                //} else if (user.emailConfirmed === false) {
                                //    showAlert();
                                //    return $scope.emailError = true;
                            } else if (user.status === 'APPROVED') {
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
                });
        }

        me.register = function () {
            me.newUser.Role = AuthenticationFactory.studentRole();
            me.newUser.Status = AuthenticationFactory.status();

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

            });
        }


        me.activateAccount = function () {
            me.confirmAccount.userId = $routeParams.userId;
            me.confirmAccount.code = $routeParams.code;
            me.confirmAccount.userName = $routeParams.userName;

            AuthenticationFactory.activateAccount(me.confirmAccount)
                .then(function (response) {
                    me.countDown();
                    $timeout(function () {
                        $location.path("/login");
                    }, 5000);
                },
            function (errorResponse) {
                console.log("errorMessage");
            });
        }

        me.checkExistingAccount = function () {

            var userName = me.newUser.Email;
            AuthenticationFactory.checkExistingAccount(userName).then(function (exists) {
                me.exists = false;
                if (exists === true)
                    me.exists = true;

            },
            function (errorResponse) {

            });
        }


        me.sendActivationLink = function () {
            var sendTo = me.credentials.username;
            console.log(sendTo);
        }

        me.loginRedirect = function () {
            me.countDown();
            $timeout(function () {
                $location.path("/login");
            }, 5000);
        }

        me.countDown = function () {
            $timeout(function () {
                $rootScope.count--;
                if ($rootScope.count === -1)
                    return;
                me.countDown();
            }, 1000);
        }


    }
]);
