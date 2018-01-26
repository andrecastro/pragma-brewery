define(['backbone', 'models/container'], function (Backbone, Container) {
    return Backbone.Collection.extend({
        url: function() {
            return window.apiUrl + '/containers';
        },
        model: Container
    });
})
