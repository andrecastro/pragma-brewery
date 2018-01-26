require(['/js/app/config.js'], function() {
    require(['views/containers-view', 'collections/containers', 'views/modal-view', 'collections/beers']
    , function (ContainerView, Conteiners, ModalView, Beers) {
        
        // Load the containers
        var containers = new Conteiners();
        var containersView = new ContainerView({ collection: containers });
        containers.fetch({ reset: true });

        // Load beers to modal view
        var beers = new Beers();
        var modal = new ModalView({ collection: beers, containers: containers });
        beers.fetch({ reset: true });

    })  
});
