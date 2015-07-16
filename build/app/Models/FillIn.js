define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.Model.extend({
        defaults: {
            "id": null,
            "label": null,
            "answer": null,
            "isExample": null
        }
    });
});