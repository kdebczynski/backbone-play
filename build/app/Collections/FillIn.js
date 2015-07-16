define([
    'backbone',
    'Models/FillIn'
], function(
    Backbone,
    FillIn
) {
    return Backbone.Collection.extend({
        model: FillIn
    });
});