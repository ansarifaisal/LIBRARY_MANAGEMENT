
//Navigation routes

window.routes = {

    '/login': {

        templateUrl: 'app/components/authentication/login.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']

    },

    '/register': {

        templateUrl: 'app/components/authentication/register.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']

    },

    '/error': {

        templateUrl: 'app/components/authentication/error.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        data:{pageTitle: 'Error'},
        roles: ['GUEST', 'STUDENT']

    },

    '/confirmation': {

        templateUrl: 'app/components/authentication/confirmation.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        data: { pageTitle: 'Confirmation' },
        requireLogin: false,
        roles: ['GUEST']

    },

    '/confirm': {

        templateUrl: 'app/components/authentication/confirm.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']

    },

    '/confirmPassword': {

        templateUrl: 'app/components/authentication/passwordConfirm.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']

    },

    '/home': {

        templateUrl: 'app/components/user/home.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: true,
        roles: ['STUDENT']

    },


}

//Load all the routes

myApp.config(['$routeProvider',
        '$locationProvider',
    function ($routeProvider, $locationProvider) {

        //loading route
        for (var route in window.routes) {
            $routeProvider.when(route, window.routes[route]);
        }

        //load this no path is matched
        $routeProvider.otherwise({
            redirectTo: '/login'
        });

        //config ! mark as prefix of #
        $locationProvider.hashPrefix('!');

    }
]);


//when the app run check whether is authenticated to view this page
//run method is basically use to initialization

myApp.run(function ($rootScope, $location, AuthenticationFactory) {
    //on method is use to listen on event of a given type

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //check if the page refereshed has the same url thene execute the below block
        if (next === current) {
            //if user trying to access page which requires login and is not logged in

            //load the user from the cookies
            $rootScope.user = AuthenticationFactory.loadUserFromCookie();

            //load the Token from the session
            $rootScope.token = AuthenticationFactory.loadTokenFromSession();

            //check whether the user is authenticated
            $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();

            return;
        }

        //Iterate through all the routes
        for (var route in window.routes) {
            //check if the path is present
            if (next.indexOf(route) !== -1) {
                $rootScope.user = AuthenticationFactory.loadUserFromCookie();
                $rootScope.token = AuthenticationFactory.loadTokenFromSession();
                $rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
                if (window.routes[route].requireLogin && !AuthenticationFactory.getUserIsAuthenticated()) {
                    $location.path('/login');
                } else if ((AuthenticationFactory.getUserIsAuthenticated())
                    && (window.routes[route].roles.indexOf(AuthenticationFactory.getRole()) === -1)) {
                    $location.path('/error');
                }
            }
        }

    });

});