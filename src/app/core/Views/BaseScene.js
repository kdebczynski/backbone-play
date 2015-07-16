define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.View.extend({
        
        initialize: function() {
            this.el.classList.add('scene');
        },
        
        show: function() {
            this.el.classList.add('active');
        },
        
        hide: function() {
            this.el.classList.remove('active');
        }

    });
});