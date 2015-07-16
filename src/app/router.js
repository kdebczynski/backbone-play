define([
    'jquery',
    'underscore',
    'backbone',
    'core/sceneManager'
], function($, _, Backbone, sceneManager) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultRoute'
        }
    });

    var initialize = function() {
        console.log('Router:initialize');

        var app_router = new AppRouter();

        app_router.on('route:defaultRoute', function(actions) {
            sceneManager.show('mainScene');
        });

        Backbone.history.start();
    };
    
    return {
        initialize: initialize
    };
});