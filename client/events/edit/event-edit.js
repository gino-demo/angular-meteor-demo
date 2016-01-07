angular.module('angular-meteor-demo').controller('EventEditCtrl', function ($scope, $meteor, $state, $stateParams) {

    $scope.event = $meteor.object(Events, $stateParams.eventId, false);

    $scope.update = function() {
        $scope.event.save().then(function(){$state.go("app.main.events");},function(error){alert(error);});
    };

    $scope.cancel = function(){
        $state.go("app.main.events");
    };
});

