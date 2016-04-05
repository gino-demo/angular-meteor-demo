angular.module('angular-meteor-demo', ['angular-meteor', 'ui.router', 'uiGmapgoogle-maps', 'ngFileUpload', 'ngImgCrop', 'ngAnimate', 'ui.bootstrap']);

angular.module('angular-meteor-demo').config(function($provide) {
    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
});

angular.module('angular-meteor-demo').config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when("",  "main");
    $urlRouterProvider.when("/", "main");
    $urlRouterProvider.otherwise("main");

    $stateProvider

        .state('app', {
            templateUrl: 'client/app/app.ng.html'
        })

        .state('app.main', {
            url: '/main',
            views: {
                'header-view': {
                    templateUrl: 'client/app/header/header.ng.html',
                    controller: 'HeaderCtrl'
                },
                'notification-view': {
                    template: '<anim-toaster />'
                },
                'side-left-view': {
                    templateUrl: 'client/app/side/left/side-left.ng.html',
                    controller: 'SideLeftCtrl'
                },
                'side-left-profile-view@app.main': {
                    templateUrl: 'client/app/profile/profile-edit.ng.html',
                    controller: 'ProfileEditCtrl'
                },
                'content-view': {
                    templateUrl: 'client/app/map/map.ng.html',
                    controller: 'MapCtrl'
                },
                'background-view': {
                    template: '<div anim-background source-video="video/city.mp4" source-image="img/city.jpg"></div>'
                },
                'footer-view@app': {
                    templateUrl: 'client/app/footer/footer.ng.html',
                    controller: 'FooterCtrl'
                }
            }
        })

        .state('app.searchbox', {
            url: '/searchbox',
            views: {
                'header-view': {
                    templateUrl: 'client/app/header/header.ng.html',
                    controller: 'HeaderCtrl'
                },
                'content-view': {
                    template: '<div>hello</div><div><input type="text" style="width:200px" class="form-control" placeholder="Search for an airplane" ng-model="selectedAirplane" typeahead="airplane as airplane.registration for airplane in airplanes | filter:$viewValue | limitTo:3"></div>',
                    controller: function($scope){
                        $scope.airplanes = [
                            {
                                "registration": "C-FNND",
                                "operator": "Air Canada",
                                "manufacturer": "Boeing",
                                "type": "777-200"
                            },
                            {
                                "registration": "PH-BFW",
                                "operator": "KLM Royal Dutch Airlines",
                                "manufacturer": "Boeing",
                                "type": "747-400"
                            },
                            {
                                "registration": "N124US",
                                "operator": "US Airways",
                                "manufacturer": "Airbus",
                                "type": "A320-200"
                            },
                            {
                                "registration": "A6-EEU",
                                "operator": "Emirates",
                                "manufacturer": "Airbus",
                                "type": "A380-800"
                            },
                            {
                                "registration": "VH-LQL",
                                "operator": "Qantas",
                                "manufacturer": "Bombardier",
                                "type": "DHC-8-400"
                            }
                        ];
                    }
                },
                'footer-view@app': {
                    templateUrl: 'client/app/footer/footer.ng.html',
                    controller: 'FooterCtrl'
                }
            }
        })

        .state('app.main.events', {
            url: '/events',
            abstract: true,
            template: '<ui-view/>',
             views: {
                 'side-left-profile-view@app.main': {
                     templateUrl: 'client/app/profile/profile-edit.ng.html',
                     controller: 'ProfileEditCtrl'
                 }
             }
        })
        .state('app.main.events.search', {
            url: '/search',
            abstract: true,
            template: '<ui-view/>'
        })


        /*********************************************************/
        /*
         *               Events
         *
         **********************************************************/

        .state('app.main.events.search.byProfile', {
            url: '/byProfile',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/events/search/byProfile/search-events-list.ng.html',
                    controller: 'SearchEventsListCtrl'
                }
            }
        })
        .state('app.main.events.search.byProfile.detail', {
            url: '/detail',
            params: {
                event: {}
            },
            views: {
                'side-left-event-view@app.main': {
                    templateUrl: 'client/app/events/detail/event-detail.ng.html',
                    controller: 'EventDetailCtrl'
                }
            }
        })

        /*********************************************************/
        /*
         *                   ADMIN STATES
         *
         **********************************************************/

        .state('app.main.admin', {
            url: '/admin',
            abstract: true,
            template: '<ui-view/>',
            views: {
                'side-left-profile-view@app.main': {
                    templateUrl: 'client/app/profile/profile-edit.ng.html',
                    controller: 'ProfileEditCtrl'
                }
            },
            resolve: {
                "currentUser": ["$meteor", "SecurityService", function($meteor, SecurityService){
                    return $meteor.requireValidUser(function(user) {
                        return SecurityService.isAdmin(user);
                    });
                }]
            }
        })

        /*********************************************************/
        /*                   Users
         **********************************************************/
        .state('app.main.admin.users', {
            url: '/users',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.users.all', {
            url: '/all',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/users/list/admin-user-list.ng.html',
                    controller: 'AdminUserListCtrl'
                }
            }
        })
        .state('app.main.admin.users.edit', {
            url: '/edit/:userId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/users/edit/admin-user-edit.ng.html',
                    controller: 'AdminUserEditCtrl'
                }
            }
        })
        /*********************************************************/
        /*                   Events
         **********************************************************/
        .state('app.main.admin.events', {
            url: '/events',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.events.all', {
            url: '/all',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/events/list/admin-event-list.ng.html',
                    controller: 'AdminEventListCtrl'
                }
            }
        })
        .state('app.main.admin.events.create', {
            url: '/create',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/events/create/admin-event-create.ng.html',
                    controller: 'AdminEventCreateCtrl'
                }
            }
        })
        .state('app.main.admin.events.edit', {
            url: '/edit/:eventId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/events/edit/admin-event-edit.ng.html',
                    controller: 'AdminEventEditCtrl'
                }
            }
        })
        /*********************************************************/
        /*                   Lookups
         **********************************************************/
        .state('app.main.admin.lookups', {
            url: '/lookups',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.lookups.all', {
            url: '/all',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/lookups/list/admin-lookup-list.ng.html',
                    controller: 'AdminLookupListCtrl'
                }
            }
        })
        /*********************************************************/
        /*                   Lookups - department
         **********************************************************/
        .state('app.main.admin.lookups.department', {
            url: '/department',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.admin.lookups.department.edit', {
            url: '/edit/:departmentId',
            views: {
                'content-view@app': {
                    templateUrl: 'client/app/admin/lookups/department/edit/admin-department-edit.ng.html',
                    controller: 'AdminDepartmentEditCtrl'
                }
            }
        })

        /*********************************************************/
        /*
         *                   REDIRECT STATES
         *
         **********************************************************/

        .state('app.main.error', {
            url: '/error',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.main.error.required', {
            url: '/required',
            views: {
                'content-view@app': {
                    template: '<div>You must be signed in to access this functionality</div>',
                    controller: function(AnimService){AnimService.stopTransition(1);}
                }
            }
        })
        .state('app.main.error.unauthorized', {
            url: '/unauthorized',
            views: {
                'content-view@app': {
                    template: '<div>You must be authorized in order to access this functionality</div>',
                    controller: function(AnimService){AnimService.stopTransition(1);}
                }
            }
        });
}]);

angular.module('angular-meteor-demo').run(["$rootScope", "$urlRouter", "$state", "AnimService", '$location', function ($rootScope, $urlRouter, $state, AnimService, $location) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error);
        switch(error) {
            case "AUTH_REQUIRED":
                $state.go("app.main.error.required");
                break;
            case "FORBIDDEN":
                $state.go("main");
                break;
            case "UNAUTHORIZED":
                $state.go("app.main.error.unauthorized");
                break;
            default:
                $state.go("app.main.error");
        }
    });

    var animRoutingConfig = {
        includes : [{
            from : 'app.main.events.search.*',
            to : 'app.main'
        },{
            from : 'app.main',
            to : 'app.main.events.search.*'
        },{
            from : 'app.main.admin.*',
            to : 'app.main'
        },{
            from : 'app.main.events.search.byProfile.detail',
            to : 'app.main.events.search.myEvents'
        },{
            from : 'app.main.events.search.myEvents.edit',
            to : 'app.main.events.search.byProfile'
        },{
            from : 'app.main.events.search.byProfile',
            to : 'app.main.events.search.myEvents'
        },{
            from : 'app.main.events.search.myEvents',
            to : 'app.main.events.search.byProfile'
        },{
            from : 'app.main.events.search.myEvents.create',
            to : 'app.main.events.search.byProfile'
        }
            /*,{
             from : 'app.main.events.search.myEvents.*',
             to : 'app.main.events.search.byProfile'
             },{
             from : 'app.main.events.search.byProfile.*',
             to : 'app.main.events.search.myEvents'
             }*/

        ]
    };
    AnimService.setRoutingConfig(animRoutingConfig);

}]);



