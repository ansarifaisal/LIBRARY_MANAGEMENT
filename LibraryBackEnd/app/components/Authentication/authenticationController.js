
AuthenticationModule.controller("AuthenticationController", [
    "AuthenticationFactory",
    "IssueBookFactory",
    "ConfigurationFactory",
    "MagazineFactory",
    "$scope",
    "$location",
    "$timeout",
    "$rootScope",
    "$routeParams",
    "$route",
    "toastr",
    function (AuthenticationFactory, IssueBookFactory, ConfigurationFactory, MagazineFactory, $scope, $location, $timeout, $rootScope, $routeParams, $route, toastr) {

        //here `me` is use to reffer the current value
        var me = this;

        //object to store credentials
        me.credentials = {
            username: '',
            password: ''
        };

        me.configuration = {
            id: undefined,
            email: '',
            password: '',
            fine: '',
            issueDays: '',
            noOfBookIssue: '',
            adminName: '',
            canLogin: '',
            canRegister: '',
            notificationSent: ''
        };

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

        me.getConfigurations = function () {
            ConfigurationFactory.getConfigurations().then(function (configurations) {
                me.configurations = configurations;
                if (me.configurations.length === 0)
                    return;
                for (var i = 0; i < me.configurations.length; i++) {
                    me.configuration = {
                        id: me.configurations[i].id,
                        fine: me.configurations[i].fine,
                        issueDays: me.configurations[i].issueDays,
                        noOfBookIssue: me.configurations[i].noOfBookIssue,
                        adminName: me.configurations[i].adminName,
                        canLogin: me.configurations[i].canLogin,
                        canRegister: me.configurations[i].canRegister,
                        notificationSent: me.configurations[i].notificationSent
                    }
                }
                AuthenticationFactory.saveConfiguration(me.configuration);
                return;
            });
        }

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
                    //strong configuration into global scope
                    $rootScope.configuration = AuthenticationFactory.loadConfiguration();
                    //if the credentials is wrong
                    if (me.data.error === 'invalid_grant')
                        return $scope.errorMessage = me.data.error_description;
                    //getting the user
                    AuthenticationFactory.getUserByUserName(me.data.userName).then(function (user) {

                        if ($rootScope.configuration.canLogin === "No" && user.role !== "ADMIN")
                            return $location.path("/user/denyLogin");

                        if (user) {
                            if (user.status === 'PENDING') {
                                return $scope.errorMessage = "Your account is pending"
                            } else if (user.status === 'REJECTED') {
                                return $scope.errorMessage = "Your account request is rejected";
                            } else if (user.emailConfirmed === false) {
                                return $scope.emailError = true;
                            } else if (user.emailConfirmed === true && user.status === 'APPROVED'
                                || user.emailConfirmed === true && user.status === 'DEFAULT') {
                                //save the user into cookies
                                AuthenticationFactory.saveUser(user);
                                AuthenticationFactory.setUserIsAuthenticated(true);
                                AuthenticationFactory.setRole(user.role);
                                if (user.modified === false && user.role === "STUDENT"
                                    || user.modified === false && user.role === "FACULTY"
                                    || user.modified === false && user.role === "LIBRARIAN"
                                    || user.modified === false && user.role === "ADMIN")
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
                    $rootScope.loginRedirect();
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
        me.checkExistingAccount = function (userName) {
            if (userName === "")
                return;
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
                    $scope.successMessage = "Password changed successfully, You will be redirected in 5 seconds.";
                    $rootScope.loginRedirect();
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

        me.checkReturn = function () {
            if (!user)
                return $location.path("/error");
            me.submitTom = false;
            IssueBookFactory.getByRollNumber(user.rollNo).then(function (issuedBooks) {
                me.issuedBooks = issuedBooks;
                var date = new Date();
                var tom = new Date(date.setDate(date.getDate() + 1));
                var returnDate = "";
                var userRollNo = $rootScope.user.rollNo;
                var rollNo = "";
                for (var i = 0; i < me.issuedBooks.length; i++) {
                    returnDate = new Date(me.issuedBooks[i].returnDate);
                    rollNo = me.issuedBooks[i].rollNo;
                    if (userRollNo === rollNo
                        && returnDate.getDate() === tom.getDate()
                        && returnDate.getMonth() === tom.getMonth()
                        && returnDate.getYear() === tom.getYear()) {
                        me.bookTitle = me.issuedBooks[i].bookTitle;
                        me.submitTom = true;
                    }
                }
                me.checkLateBook();
            }, function () {
                toastr.error("Error getting data");
            });
        }

        me.checkLateBook = function () {
            if (!user)
                return $location.path("/error");
            IssueBookFactory.getByRollNumber(user.rollNo).then(function (issuedBooks) {
                var date = new Date();
                date = new Date(date.setDate(date.getDate(), date.getMonth(), date.getYear()));
                for (var i = 0; i < issuedBooks.length; i++) {
                    issuedBooks[i].returnDate = new Date(issuedBooks[i].returnDate);

                    if (issuedBooks[i].returnDate < date) {
                        me.late = true;
                        me.bookTitle = issuedBooks[i].bookTitle;
                        me.fine = issuedBooks[i].fine;
                    }
                }

            }, function () {
                toastr.error("Error getting data");
            });
        }

        me.getTomorrowDate = function () {
            date = new Date();
            date = date.setDate(date.getDate() + 1);
            return new Date(date);
        }

        me.sendNotifications = function () {
            IssueBookFactory.getIssuedBooks().then(function (issuedBooks) {
                var tomorrow = me.getTomorrowDate();
                var date = new Date();
                for (var i = 0; i < issuedBooks.length; i++) {
                    issuedBooks[i].returnDate = new Date(issuedBooks[i].returnDate);
                    if (issuedBooks[i].returnDate.getDate() === tomorrow.getDate()
                        && issuedBooks[i].returnDate.getMonth() === tomorrow.getMonth()
                        && issuedBooks[i].returnDate.getFullYear() === tomorrow.getFullYear())
                        AuthenticationFactory.sendReturnBookReminder(issuedBooks[i].email, issuedBooks[i]);
                    if (issuedBooks[i].returnDate < date)
                        AuthenticationFactory.sendLateBookReminder(issuedBooks[i].email, issuedBooks[i]);
                }
            }, function (errorResponse) {
                toastr.error("Error getting issued books");
            });

            MagazineFactory.getIssuedMagazines().then(function (issuedMagazines) {
                var tomorrow = me.getTomorrowDate();
                var date = new Date();
                for (var i = 0; i < issuedMagazines.length; i++) {
                    issuedMagazines[i].returnDate = new Date(issuedMagazines[i].returnDate);
                    if (issuedMagazines[i].returnDate.getDate() === tomorrow.getDate()
                        && issuedMagazines[i].returnDate.getMonth() === tomorrow.getMonth()
                        && issuedMagazines[i].returnDate.getFullYear() === tomorrow.getFullYear())
                        AuthenticationFactory.sendReturnMagazineReminder(issuedMagazines[i].email, issuedMagazines[i]);
                    if (issuedMagazines[i].returnDate < date)
                        AuthenticationFactory.sendLateMagazineReminder(issuedMagazines[i].email, issuedMagazines[i]);
                }
            }, function (errorResponse) {
                toastr.error("Error getting issued magazine");
            });
        }
    }
]);
