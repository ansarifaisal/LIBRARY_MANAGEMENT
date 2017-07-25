
AuthenticationModule.controller("AuthenticationController", [
    "AuthenticationFactory",
    "$scope",
    "$location",
    "$timeout",
    "$rootScope",
    function (AuthenticationFactory, $scope, $location, $timeout, $rootScope) {

        //here `me` is use to reffer the current value
        var me = this;

        //object to store credentials
        me.credentials = {};

        //error flag
        me.error = false;

        //creating new user object
        me.newUser = {};

        me.user = {};

        me.data = {};

        me.login = function () {

            AuthenticationFactory.login(me.credentials)
                .then(function (data) {
                    me.data = data;
                    //save token in the session
                    AuthenticationFactory.saveToken(me.data);
                    //getting the user
                    AuthenticationFactory.getUserByUserName(data.userName).then(function (user) {
                        if (user) {
                            AuthenticationFactory.saveUser(user);
                            AuthenticationFactory.setUserIsAuthenticated(true);
                            AuthenticationFactory.setRole(user.role);
                            $location.path("/home");
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

    }
]);