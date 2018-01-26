define(['backbone', 'text!templates/containers-template.html'], function (Backbone, ContainersTemplate) {
    return Backbone.View.extend({
        el: $("#containers"),
        template: _.template(ContainersTemplate),
        
        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            this.$el.html(this.template({ containers: this.collection.toJSON() }));
            return this;
        }
    });
})
