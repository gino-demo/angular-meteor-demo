angular.module("angular-meteor-demo").factory("SearchEventService", function($rootScope, CollectionService, $q){

    var searchEventService = {
        searchEventFilter: {}
    };


    return searchEventService;
});
