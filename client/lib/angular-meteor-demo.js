angular.module('angular-meteor-demo', ['angular-meteor', 'ui.router']);

angular.module('angular-meteor-demo').config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

$urlRouterProvider.when("",  "events");
$urlRouterProvider.when("/", "events");
$urlRouterProvider.otherwise("events");

$stateProvider

    .state('app', {
        templateUrl: 'client/app.html'
    })

    .state('app.main', {
        views: {
            'header-view@app': {
                templateUrl: 'client/header/header.html'
            },
            'footer-view@app': {
                template: '<footer></footer>'
            }
        }
    })

    .state('app.main.events', {
        url: '/events',
        views: {
            'content-view@app': {
                templateUrl: 'client/events/all/event-all.html',
                controller: 'EventAllCtrl'
            }
        }
    })

    .state('app.main.events.create', {
        url: '/create',
        views: {
            'content-view@app': {
                templateUrl: 'client/events/create/event-create.html',
                controller: 'EventCreateCtrl'
            }
        }
    })

    .state('app.main.events.edit', {
        url: '/edit/:eventId',
        views: {
            'content-view@app': {
                templateUrl: 'client/events/edit/event-edit.html',
                controller: 'EventEditCtrl'
            }
        }
    });


}]);