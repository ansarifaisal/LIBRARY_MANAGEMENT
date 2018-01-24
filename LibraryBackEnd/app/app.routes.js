
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
        roles: ['GUEST', 'STUDENT', 'FACULTY', 'ADMIN', 'LIBRARIAN', 'NON-TEACHING']

    },


    '/user/denyLogin': {

        templateUrl: 'app/components/authentication/denyLogin.html',
        controller: 'AuthenticationController',
        controllerAs: 'authCtrl',
        requireLogin: false,
        data: { pageTitle: 'Error' },
        roles: ['GUEST', 'STUDENT', 'FACULTY', 'LIBRARIAN', 'NON-TEACHING']

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
        roles: ['STUDENT', 'ADMIN', 'FACULTY', 'LIBRARIAN', 'NON-TEACHING']
    },

    '/user/moreDetails': {

        templateUrl: 'app/components/user/moreDetails.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['STUDENT', 'FACULTY', 'LIBRARIAN', 'ADMIN', 'NON-TEACHING']
    },

    '/user/settings': {

        templateUrl: 'app/components/user/settings.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['STUDENT', 'FACULTY', 'LIBRARIAN', 'ADMIN', 'NON-TEACHING']
    },

    '/admin/students': {

        templateUrl: 'app/components/user/students.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/faculties': {

        templateUrl: 'app/components/user/faculties.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/librarians': {

        templateUrl: 'app/components/user/librarians.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/user/get/:id': {

        templateUrl: 'app/components/user/user.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
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
    * Loading Subject Module
    */

    '/admin/subjects': {

        templateUrl: 'app/components/subjects/subjects.html',
        controller: 'SubjectController',
        controllerAs: 'subjectCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
     * Loading Book Module
     */

    '/user/books': {

        templateUrl: 'app/components/books/books.html',
        controller: 'BookController',
        controllerAs: 'bookCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'STUDENT', 'LIBRARIAN', 'FACULTY', 'NON-TEACHING']
    },

    '/admin/book/add': {
        templateUrl: 'app/components/books/addBookForm.html',
        controller: 'BookController',
        controllerAs: 'bookCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/book/edit/:id': {
        templateUrl: 'app/components/books/editBookForm.html',
        controller: 'BookController',
        controllerAs: 'bookCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/user/book/:id': {
        templateUrl: 'app/components/books/book.html',
        controller: 'BookController',
        controllerAs: 'bookCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'FACULTY', 'NON-TEACHING']
    },

    /*
   * Loading Book Module
   */

    '/user/issuedBooks': {

        templateUrl: 'app/components/issueBook/issuedBooks.html',
        controller: 'IssueBookController',
        controllerAs: 'issueBookCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'FACULTY', 'NON-TEACHING']
    },
    '/admin/issueBook/add': {
        templateUrl: 'app/components/issueBook/issueBook.html',
        controller: 'IssueBookController',
        controllerAs: 'issueBookCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/issueBook/edit/:id': {
        templateUrl: 'app/components/issueBook/editIssueBook.html',
        controller: 'IssueBookController',
        controllerAs: 'issueBookCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
     * Loading Return Book Module
     */

    '/user/returnedBooks': {

        templateUrl: 'app/components/returnBook/returnBooks.html',
        controller: 'ReturnBookController',
        controllerAs: 'returnBookCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'FACULTY', 'NON-TEACHING']
    },

    /*
     * Loading Lost or Replace Book Module
     */

    '/admin/lostOrReplace': {

        templateUrl: 'app/components/lostOrReplace/lostOrReplace.html',
        controller: 'LostOrReplaceBookController',
        controllerAs: 'lostOrReplaceBookCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
    * Loading Statistics Module
    */

    '/admin/statistics': {

        templateUrl: 'app/components/statistics/statistics.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/booksByCourse/:courseName': {

        templateUrl: 'app/components/statistics/booksByCourse.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/booksBySubject/:subject': {

        templateUrl: 'app/components/statistics/booksBySubjects.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/booksBought/:year': {

        templateUrl: 'app/components/statistics/booksBought.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/bookTitles/:title': {

        templateUrl: 'app/components/statistics/booksTitles.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/studentsJoined/:year': {

        templateUrl: 'app/components/statistics/studentsJoined.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },
    '/admin/studentsByCourse/:courseName': {

        templateUrl: 'app/components/statistics/studentsByCourse.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/admin/bookTypes/:type': {

        templateUrl: 'app/components/statistics/booksByTypes.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/admin/magazineTitle/:title': {

        templateUrl: 'app/components/statistics/magazineTitles.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/admin/magazineCourse/:course': {

        templateUrl: 'app/components/statistics/magazineByCourse.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/admin/magazineType/:type': {

        templateUrl: 'app/components/statistics/magazineByType.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/admin/magazinePeriodicity/:periodic': {

        templateUrl: 'app/components/statistics/magazineByPeriodicity.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    '/admin/magazineYear/:year': {

        templateUrl: 'app/components/statistics/magazineBySubscription.html',
        controller: 'StatisticsController',
        controllerAs: 'statisticsCtrl',
        requireLogin: true,
        roles: ['ADMIN']
    },

    /*
   * Loading Statistics Module
   */

    '/admin/search': {

        templateUrl: 'app/components/search/search.html',
        controller: 'SearchController',
        controllerAs: 'searchCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/searchForStudents': {

        templateUrl: 'app/components/search/searchStudent.html',
        controller: 'SearchController',
        controllerAs: 'searchCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    /*
    * Loading Request Module
    */

    '/user/requests': {

        templateUrl: 'app/components/requests/requests.html',
        controller: 'RequestController',
        controllerAs: 'requestCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN', 'FACULTY', 'STUDENT', 'NON-TEACHING']
    },

    /*
    * Loading Magazine Module
    */

    '/admin/magazines/:title/:id': {

        templateUrl: 'app/components/magazines/magazines.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/magazine/publications': {

        templateUrl: 'app/components/magazines/publications.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/magazine/periodic': {

        templateUrl: 'app/components/magazines/periodicMagazines.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/user/magazine/issued': {

        templateUrl: 'app/components/magazines/issuedMagazine.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'FACULTY', 'NON-TEACHING']
    },

    '/user/magazine/returned': {

        templateUrl: 'app/components/magazines/returnMagazines.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'FACULTY', 'NON-TEACHING']
    },

    '/admin/magazine/lost': {

        templateUrl: 'app/components/magazines/lostOrReplaceMagazines.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/magazine/binding': {

        templateUrl: 'app/components/magazines/bindingMagazines.html',
        controller: 'MagazineController',
        controllerAs: 'magazineCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },


    /*
    * Loading Newspaper Module
    */

    '/admin/newspaper/publication': {
        templateUrl: 'app/components/newspaper/newsPaperPublisher.html',
        controller: 'NewspaperController',
        controllerAs: 'newsPaperCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/newspaper/periodic': {
        templateUrl: 'app/components/newspaper/periodicNewsPapers.html',
        controller: 'NewspaperController',
        controllerAs: 'newsPaperCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/newspaper/month/:title': {
        templateUrl: 'app/components/newspaper/newsPaperMonths.html',
        controller: 'NewspaperController',
        controllerAs: 'newsPaperCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/newspaper/month/:title/:month': {
        templateUrl: 'app/components/newspaper/newspapers.html',
        controller: 'NewspaperController',
        controllerAs: 'newsPaperCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    '/admin/newspapers': {
        templateUrl: 'app/components/newspaper/newspapers.html',
        controller: 'NewspaperController',
        controllerAs: 'newsPaperCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },

    /*
    * Loading Committee Member Module
    */

    '/admin/committee': {
        templateUrl: 'app/components/committee/committeeMembers.html',
        controller: 'CommitteeMemberController',
        controllerAs: 'committeeMemberCtrl',
        requireLogin: true,
        roles: ['ADMIN', 'LIBRARIAN']
    },


    /*
     * Loading Configuration Module
     */
    '/admin/configuration': {
        templateUrl: 'app/components/configuration/configuration.html',
        controller: 'ConfigurationController',
        controllerAs: 'configurationCtrl',
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
            preventDuplicates: false,
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

myApp.run(function ($rootScope, $location, AuthenticationFactory, $window, $cookies, $timeout, IssueBookFactory, AppService, MagazineFactory) {
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

            $rootScope.configuration = AuthenticationFactory.loadConfiguration();
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

    $rootScope.configuration = AuthenticationFactory.loadConfiguration();

    //$window.onbeforeunload = function () {
    //    AppService.unLoad();
    //    $location.path('/error');
    //};

    $rootScope.logOut = function () {
        AppService.unLoad();
        $location.path('/login');
    }

    //Method to redirect on login page
    $rootScope.loginRedirect = function () {
        $rootScope.count = 5;
        AppService.unLoad();
        $rootScope.countDown();
        $timeout(function () {
            $location.path("/login");
        }, 5000);
    }

    //Method to show count down
    $rootScope.countDown = function () {
        $timeout(function () {
            $rootScope.count--;
            if ($rootScope.count === -1)
                return;
            $rootScope.countDown();
        }, 1000);
    }
    
    function getTomorrowDate() {
        var date = new Date();
        var tom = date.setDate(date.getDate() + 1, date.getMonth, date.getFullYear);
        return new Date(tom);
    }

    $rootScope.sendNotifications = function () {
        IssueBookFactory.getIssuedBooks().then(function (issuedBooks) {
            var tomorrow = getTomorrowDate();
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
            var tomorrow = getTomorrowDate();
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

    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0, 0) - now;
    if (millisTill10 < 0)
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.

    setTimeout(function () {
        $rootScope.sendNotifications();
    }, millisTill10);
});
