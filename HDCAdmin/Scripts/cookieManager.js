
var sessionInjector = function ($q, $location) {
    return {
        request: function (config) {
            var aCookie = new cookie();
            checkCookie(aCookie);
            //if (angular.isDefined(aCookie.Merchanttoken) && aCookie.Merchanttoken != "") {
            //    config.headers['x-auth-merch-token'] = aCookie.Merchanttoken;
            //}
            return config;
        },

        response: function (result) {
            return result;
        },

        responseError: function (rejection) {
            if (rejection.status == 401) {
                //var email = getCookie("email");
                //if (email != "")
                //    $location.path('/frontend/login.html?email=' + email);
                //else
                //    $location.path('/frontend/login.html');
            }
            return $q.reject(rejection);
        }
    }
};

var sManager = angular.module('sessionManager', []);

sManager.config(function ($httpProvider) {
    $httpProvider.interceptors.push(sessionInjector);
});


// ---------------- Cookie Management functions -----------------

// Cookie object
function cookie() {
     
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(aCookie) {
    aCookie.MaterialId = getCookie("MaterialId");
    aCookie.CompanyId = getCookie("CompanyId");
}


