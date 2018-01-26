define(['backbone', 'text!templates/container-template.html'], function (Backbone, ContainerTemplate) {
    return Backbone.View.extend({
        template: _.template(ContainerTemplate),
        className: 'col-md-4',
        events: {
            'click .remove': 'remove',
            'click .increase': 'increaseTemperature',
            'click .decrease': 'decreaseTemperature'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var container = this.model.toJSON()
            this.$el.html(this.template({ container: container }));
            return this;
        },

        remove: function(event) {
            event.stopImmediatePropagation();
            this.model.destroy();
        },

        increaseTemperature: function(event) {
            event.stopImmediatePropagation();
            var temperature = this.model.get('currentTemperature');
            this.model.set('currentTemperature', ++temperature);
            this.model.save();
        },
        
        decreaseTemperature: function(event) {
            event.stopImmediatePropagation();
            var temperature = this.model.get('currentTemperature');
            this.model.set('currentTemperature', --temperature);
            this.model.save();
        }
    });
})
