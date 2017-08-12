
AuthenticationModule.controller("AuthenticationController", [
    "AuthenticationFactory",
    "$scope",
    "$location",
    "$timeout",
    "$rootScope",
    "$routeParams",
    "$route",
    "toastr",
    function (AuthenticationFactory, $scope, $location, $timeout, $rootScope, $routeParams, $route, toastr) {

        //here `me` is use to reffer the current value
        var me = this;

        //object to store credentials
        me.credentials = {
            username: '',
            password: ''
        };

        $scope.count = 5;

        $scope.errorMessage = "";

        $scope.successMessage = "";

        $scope.infoMessage = "";

        //creating new user object
        me.newUser = {};

        me.user = {};

        me.data = {};

        me.setNewPassword = {
            password: '',
            confirmPassword: '',
            code: '',
            userName: ''
        }

        me.forget = {
            userName: ''
        }

        $rootScope.isBusy = false;

        me.confirmAccount = {}

        $timeout(function () {
            settings();
        }, 1000);

        //Method to login.
        me.login = function () {

            //check whether object is filled or not
            if (!me.credentials.username || !me.credentials.password)
                return;
            //variable to show loading icon
            $rootScope.isBusy = true;
            AuthenticationFactory.login(me.credentials)
                .then(function (data) {
                    me.data = data;
                    //saving token into the cookies
                    AuthenticationFactory.saveToken(me.data);
                    //storing token into global scope
                    $rootScope.token = AuthenticationFactory.loadTokenFromSession();
                    //if the credentials is wrong
                    if (me.data.error === 'invalid_grant')
                        return $scope.errorMessage = me.data.error_description;

                    //getting the user
                    AuthenticationFactory.getUserByUserName(me.data.userName).then(function (user) {
                        if (user) {
                            if (user.status === 'PENDING') {
                                return $scope.errorMessage = "Your account is pending"
                            } else if (user.status === 'REJECTED') {
                                return $scope.errorMessage = "Your account request is rejected";
                            } else if (user.emailConfirmed === false) {
                                return $scope.emailError = true;
                            } else if (user.emailConfirmed === true && user.status === 'APPROVED') {
                                //save the user into cookies
                                AuthenticationFactory.saveUser(user);
                                AuthenticationFactory.setUserIsAuthenticated(true);
                                AuthenticationFactory.setRole(user.role);
                                if (user.modified === false && user.role === "STUDENT")
                                    return $location.path("/user/moreDetails");
                                $location.path("/home");
                            }
                        } else {
                            //if no user found
                            AuthenticationFactory.setUserIsAuthenticated(false);
                            AuthenticationFactory.setRole("GUEST");
                            $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                            $location.path("/login");
                        }
                    });

                },
                function (errorResponse) {
                    return $scope.errorMessage = "Error While Login!";
                }).finally(function () {
                    if ($scope.errorMessage !== "")
                        toastr.error($scope.errorMessage);

                    if ($scope.successMessage !== "")
                        toastr.success($scope.successMessage);

                    $scope.emailError = false;
                    $scope.errorMessage = "";
                    $scope.successMessage = "";
                    $rootScope.isBusy = false;
                });
        }

        //Method to register
        me.register = function () {
            //me.newUser.fullName = "NA";
            //me.newUser.rollNo = "NA";
            //me.newUser.yearOfAdmission = 0;
            //me.newUser.course = "NA";
            //me.newUser.issueCount = 0;
            //me.newUser.fine = 0;
            //me.newUser.modified = false;
            //me.newUser.role = AuthenticationFactory.studentRole();
            //me.newUser.status = AuthenticationFactory.status();
            if (!me.newUser)
                return;
            $rootScope.isBusy = true;
            AuthenticationFactory.register(me.newUser)
                .then(function () {
                    AuthenticationFactory.setUserIsAuthenticated(false);
                    $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                    $location.path('/confirmation');
                },
            function (errorResponse) {
                console.log(errorResponse);
                AuthenticationFactory.setUserIsAuthenticated(false);
                $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                $location.path('/register');
                $scope.errorMessage = "Error while registration";
            }).finally(function () {
                if ($scope.errorMessage !== "")
                    toastr.error($scope.errorMessage);
                $scope.errorMessage = "";
                $rootScope.isBusy = false;
            });
        }

        //method to activate account
        me.activateAccount = function () {
            me.confirmAccount.userId = $routeParams.userId;
            me.confirmAccount.code = $routeParams.code;
            me.confirmAccount.userName = $routeParams.userName;
            if (!me.confirmAccount) {
                if (!me.confirmAccount.code && !me.confirmAccount.userName && !me.confirmAccount.userId) {
                    toastr.error("Sorry! there is nothing you can do, You will be redirect in " + $scope.count + " seconds");
                    me.loginRedirect();
                }
                return;
            }
            $rootScope.isBusy = true;
            AuthenticationFactory.activateAccount(me.confirmAccount)
                .then(function (response) {
                    //Needs to write check to check password
                    $location.path("/confirm");
                },
            function (errorResponse) {
                $scope.errorMessage = "Error activating account";
            }).finally(function () {
                if ($scope.errorMessage !== "")
                    toastr.error($scope.errorMessage);
                $scope.errorMessage = "";
                $rootScope.isBusy = false;
            });
        }


        //check whether the user exists
        me.checkExistingAccount = function () {
            var userName = me.newUser.Email;
            AuthenticationFactory.checkExistingAccount(userName).then(function (exists) {
                me.exists = false;
                if (exists === true)
                    me.exists = true;
            },
            function (errorResponse) {
                $scope.errorMessage = "Error while checking username";
            }).finally(function () {
                if ($scope.errorMessage !== "")
                    toastr.error($scope.errorMessage);

                $scope.errorMessage = "";
            });
        }

        //send activation link
        me.sendActivationLink = function () {
            var userName = me.credentials.username;
            $rootScope.isBusy = true;
            AuthenticationFactory.sendActivationMail(userName).then(function () {
                $route.reload();
                $scope.successMessage = "Email has been sent to your provided mail id.";
            }, function (errorResponse) {
                $scope.errorMessage = "Error sending activation link.";
            }).finally(function () {
                if ($scope.successMessage !== "")
                    toastr.success($scope.successMessage);

                if ($scope.errorMessage !== "")
                    toastr.error($scope.errorMessage);

                $scope.successMessage = "";
                $scope.errorMessage = "";
                $rootScope.isBusy = false;
            });
        }

        me.forgetPassword = function () {

            if (!me.forget)
                return;

            $rootScope.isBusy = true;
            AuthenticationFactory.forgetPassword(me.forget)
                .then(function () {
                    $route.reload();
                    $scope.successMessage = "Reset Mail has been sent to your email.";
                }, function (errorResponse) {
                    $scope.errorMessage = "Error while sending email.";
                }).finally(function () {
                    if ($scope.successMessage !== "")
                        toastr.success($scope.successMessage);

                    if ($scope.errorMessage !== "")
                        toastr.error($scope.errorMessage);

                    $scope.successMessage = "";
                    $scope.errorMessage = "";
                    $rootScope.isBusy = false;
                });
        }

        me.setPassword = function () {

            me.setNewPassword.code = $routeParams.code;
            me.setNewPassword.userName = $routeParams.userName;
            if (!me.setNewPassword)
                return;
            $rootScope.isBusy = true;
            AuthenticationFactory.setPassword(me.setNewPassword)
                .then(function () {
                    $route.reload();
                    $scope.successMessage = "Password changed successfully, You will be redirected in " + $rootScope.count + " seconds.";
                    me.loginRedirect();
                }, function (errorResponse) {
                    $scope.errorMessage = "Error while changing password."
                }).finally(function () {
                    if ($scope.successMessage !== "")
                        toastr.success($scope.successMessage);

                    if ($scope.errorMessage !== "")
                        toastr.error($scope.errorMessage);

                    $scope.successMessage = "";
                    $scope.errorMessage = "";

                    $rootScope.isBusy = false;
                });
        }

        //Method to redirect on login page
        me.loginRedirect = function () {
            me.countDown();
            $timeout(function () {
                $location.path("/login");
            }, 5000);
        }

        //Method to show count down
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
