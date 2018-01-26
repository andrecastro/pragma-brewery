require(['/js/app/config.js'], function() {
    require(['views/containers-view', 'collections/containers'], function (ContainerView, Conteiners) {
        var containers = new Conteiners();

        var containersView = new ContainerView({ collection: containers });
        containersView.render();

        const agentUrl = $('#agent-url').val();

        // -- Web socket
        var connection = new WebSocket(agentUrl);
        connection.onopen = function () {
            console.info('Websocket is connected...');
        };
    
        // Log errors
        connection.onerror = function (error) {
            console.error('WebSocket Error ' + error);
        };
    
        // Log messages from the server
        connection.onmessage = function (event) {
            console.info('Receiving data from server...')
            
            var data = JSON.parse(event.data);
            containers.reset(data.containers)
        };
    })  
});
