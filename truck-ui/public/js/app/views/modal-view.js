define(['backbone', 'text!templates/modal-template.html'], function (Backbone, ModalTemplate) {
    return Backbone.View.extend({
        el: $("#add-container"),
        template: _.template(ModalTemplate),
        events: {
            'click .save': 'save'
        },
        initialize: function(options) {
            this.containers = options.containers;
            this.listenTo(this.collection, 'reset', this.render, this);
        },

        render: function () {
            this.$el.html(this.template({ beers: this.collection.toJSON() }));
            return this;
        },

        save: function() {
            var selectedBeer = this.collection.get(this.$('.beer').val());
            var temperature = this.$('.temperature').val();

            var container = {
                beer: selectedBeer.toJSON(),
                currentTemperature: temperature,
                configuredTemperature: temperature
            }

            // save container
            this.containers.create(container, { wait: true });
        }
    });
})
