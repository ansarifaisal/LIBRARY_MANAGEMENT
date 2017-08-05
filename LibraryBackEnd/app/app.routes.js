
//Navigation routes

window.routes = {

    /*
     * Loading Authentication Module
     */

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
        data: { pageTitle: 'Error' },
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

    '/forget': {
        templateUrl: 'app/components/authentication/forget.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },

    '/setPassword': {
        templateUrl: 'app/components/authentication/setPassword.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },

    '/passwordChanged': {
        templateUrl: 'app/components/authentication/passwordChanged.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },

    /**
     * Loading Home Page
     */

    '/home': {

        templateUrl: 'app/components/user/home.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: true,
        roles: ['STUDENT', 'ADMIN']
    },

    /**
     * Loading Publication Module
     */

    '/admin/publications': {

        templateUrl: 'app/components/publications/publication.html',
        controller: 'PublicationController',
        controllerAs: 'publicationCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
     * Loading Author Module
     */

    '/admin/authors': {

        templateUrl: 'app/components/authors/authors.html',
        controller: 'AuthorController',
        controllerAs: 'authorCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
     * Loading Course Module
     */

    '/admin/courses': {

        templateUrl: 'app/components/courses/courses.html',
        controller: 'CourseController',
        controllerAs: 'courseCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
    * Loading Course Module
    */

    '/admin/subjects': {

        templateUrl: 'app/components/subjects/subjects.html',
        controller: 'SubjectController',
        controllerAs: 'subjectCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
}

//Load all the routes

myApp.config(['$routeProvider',
        '$locationProvider',
        '$httpProvider',
        'toastrConfig',
        'cfpLoadingBarProvider',
    function ($routeProvider, $locationProvider, $httpProvider, toastrConfig, cfpLoadingBarProvider) {

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

        //config to change the header to authorize the user
        $httpProvider.interceptors.push('httpRequestInterceptor');

        //toaster configuration
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 3,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            preventOpenDuplicates: true,
            target: 'body',
            allowHtml: true,
            closeButton: true,
            timeOut: 5000,
            progressBar: true,
        });

        //loading bar configuration
        cfpLoadingBarProvider.includeSpinner = false;
    }
]);




//when the app run check whether is authenticated to view this page
//run method is basically use to initialization

myApp.run(function ($rootScope, $location, AuthenticationFactory, $window, $cookies) {
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

    //$cookies.getObject('user');
    //$cookies.getObject('authenticationData');

    //$(window).on('beforeunload', function () {

    //    $cookies.remove('user');
    //    $cookies.remove('authenticationData');
    //    AuthenticationFactory.setUserIsAuthenticated(false);

    //});

    //$rootScope.logOut = function () {
    //    AppService.unLoad();
    //    $location.path('/login');
    //}
});
