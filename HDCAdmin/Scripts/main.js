require.config({
    baseurl: '/Scripts/',
    paths: {
        'angular': 'angular',
        'ngStorage': 'libs/ngStorage',
        'ngCookies': 'libs/angular-cookies',
        'ui-router': 'libs/angular-ui-router',
        'jquery': 'jquery-1.10.2',
        'bootstrap': 'bootstrap',
        'service': 'services/service',
        'HDCAdminCtrl': "app/HDCAdminCtrl",
    },
    shim: {
        ngStorage: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngCookies: {
            deps: ['angular'],
            exports: 'angular'
        },
        'ui-router': {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports: 'angular'
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    deps: ['app']
});

require([
    "app",
    "bootstrap",
    "HDCAdminCtrl",
],

    function (app) {
        //bootstrapping app
        app.init();
    }
);