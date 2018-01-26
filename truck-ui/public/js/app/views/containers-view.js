define(['backbone', 'views/container-view'], function (Backbone, ContainerView) {
    return Backbone.View.extend({
        el: $("#containers"),
        
        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render, this);
            this.listenTo(this.collection, 'destroy', this.render, this);
            this.listenTo(this.collection, 'add', this.render, this);
        },

        render: function () {
            this.$el.empty();
            this.collection.each(this.renderContainer, this);
            return this;
        },

        renderContainer: function(container) {
            var containerView = new ContainerView({ model: container });
            this.$el.append(containerView.render().el);
        }
    });
})
