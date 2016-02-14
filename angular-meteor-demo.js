Events = new Mongo.Collection("events");

if (Meteor.isClient) {
  angular.module('angular-meteor-demo', ['angular-meteor', 'ui.router']);


  angular.module('angular-meteor-demo').config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when("",  "events");
    $urlRouterProvider.when("/", "events");
    $urlRouterProvider.otherwise("events");

    $stateProvider

        .state('app', {
            templateUrl: 'app.html'
        })

        .state('app.events', {
            url: '/events',
            views: {
                'header-view@app': {
                    templateUrl: 'header.html'
                },
                'content-view': {
                    templateUrl: 'events.html',
                    controller: 'EventsCtrl'
                },
                'footer-view@app': {
                    template: '<footer></footer>'
                }
            }
        });

  }]);


  angular.module('angular-meteor-demo').controller('EventsCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
      $scope.events = $meteor.collection(function () {
          return Events.find ({}, {sort: {}, limit: 10});
      });
  }]);

}




if (Meteor.isServer) {
    Meteor.startup(function () {
        Events.remove({});
        if (Events.find().count() === 0) {
            var events = [
                {
                    'name': 'Apero time !',
                    'description': 'Can we please just drink one beer ?'
                },{
                    'name': 'Restaurant time !',
                    'description': 'Can we have some glass of wine ??'
                },{
                    'name': 'Blabla event',
                    'description': 'Bla bla event can be everywhere if we can have some good beers.'
                },{
                    'name': 'Apero time again ',
                    'description': 'Often come after a first apero time and a nice restaurant.'
                },{
                    'name': 'Dancing Event',
                    'description': 'You can be ready to dance on the table my lord !!'
                },{
                    'name': 'End event ?',
                    'description': 'It can never be stopped !!!'
                },{
                    'name': 'After event',
                    'description': 'Only the brave ! Diesel.'
                }

            ];

            for (var i = 0; i < events.length; i++) {
                Events.insert(events[i]);
            }
        }
    });

}
