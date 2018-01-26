requirejs.config({
    baseUrl: '/js/vendor/',
    paths: {
        'backbone': 'backbone-min',
        'underscore': 'underscore-min',
        'jquery': 'jquery.min',
        'text': 'text',

        'models': '/js/app/models',
        'views': '/js/app/views',
        'collections': '/js/app/collections',
        'templates': '/js/app/templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery']
        }
    }
})