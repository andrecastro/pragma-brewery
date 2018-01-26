define(['backbone', 'models/container'], function (Backbone, Container) {
    return Backbone.Collection.extend({
        model: Container,
        parse: function (data) {
            return data.containers;
        }
    });
})
