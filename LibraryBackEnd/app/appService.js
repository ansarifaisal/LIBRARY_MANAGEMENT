
myApp.factory('httpRequestInterceptor', function ($rootScope) {
    return {
        request: request
    };

    function request(config) {
        config.headers['Authorization'] = 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==';

        if ($rootScope.token !== undefined)
            config.headers['Authorization'] = 'Bearer ' + $rootScope.token.access_token;

        return config;
    }
});

myApp.service('AppService', [function ($window, $cookies) {

    return {
        unLoad: unLoad
    }

    function unLoad() {
        $cookies.remove('user');
        $cookies.remove('authenticationData');
        AuthenticationFactory.setUserIsAuthenticated(false);
    }
}]);