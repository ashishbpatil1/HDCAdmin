define(['ui-router', 'ngStorage', 'ngCookies'], function () {

    //defining angularjs module
    var app = angular.module("app", ['ui.router', 'ngCookies', 'ngStorage']);

    //global service
    app.constant("utility",
        {
            baseAddress: "http://localhost:5100/api/"
        });

    //manual bootstrap
    app.init = function () {
        angular.bootstrap(document, ['app']);
    };

    //defining routes
    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("Dashboard", {
                url: "/",
                templateUrl: 'Views/Home/Dashboard.cshtml',
                controller: 'HDCAdminCtrl'
            })
        .state("Material", {
            url: "/about",
            templateUrl: 'Views/Home/Material.cshtml',
            controller: 'HDCAdminCtrl'
        });
    });
    return app;
});