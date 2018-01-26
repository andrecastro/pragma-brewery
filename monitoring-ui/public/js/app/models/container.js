define(['backbone', 'models/beer'], function (Backbone, Beer) {
    return Backbone.Model.extend({
        parse: function (data) {
            this.beer = new Beer(data.beer || null, {
                parse: true
            });

            delete data.beer;

            return data;
        }
    });
})
