angular.module('angular-meteor-demo').controller('EventCreateCtrl', function ($scope, $meteor, $state) {

    $scope.event = {};

    $scope.create = function() {
        Events.insert($scope.event);
        $state.go("app.main.events");
    };

    $scope.cancel = function(){
        $state.go("app.main.events");
    };

});

