angular.module('angular-meteor-demo').controller('EventAllCtrl', function ($scope, $meteor) {

    $scope.events = $meteor.collection(function (){
        return Events.find ({}, {sort: {}, limit: 10});
    });

    $scope.remove = function(e){
        Events.remove({_id: e._id});
    };

});

