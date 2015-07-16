require.config({
    baseUrl: './',
    paths: {
        'text': '../libs/require/text',
        'jquery': '../libs/jquery/jquery.min',
        'underscore': '../libs/underscore/underscore-min',
        'backbone': '../libs/backbone/backbone-min',
        'dot': '../libs/doT/doT.min',
        'core': 'core',
        'BaseScene': 'core/Views/BaseScene'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

require([
    'app',
    'dot',
    'text'
], function(App) {
    App.initialize();
});
