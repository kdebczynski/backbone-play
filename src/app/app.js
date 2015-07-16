define([
    'router'
], function(Router) {
    var initialize = function() {
        console.log('App:initialize');
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});