(function() {
    angular.module('login', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .otherwise({
                    templateUrl: '/views/landing.html',
                    controller: 'IndexController',
                    controllerAs: 'index'
                });

            $locationProvider.html5Mode(true); //Use html5Mode so your angular routes don't have #/route
        }])
        .controller('IndexController', ['$http', '$scope', function($http, $scope) {
            // Custom Index functionality
        }])

})();
