(function() {
    angular.module('profile', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/profile', {
                    templateUrl: '/views/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'profile'
                });

            $locationProvider.html5Mode(true);
        }])
        .controller('ProfileController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data; //Expose the user data to your angular scope
                });
                
            $scope.newSearchName = "";
            $scope.newSearchString = "";
                
            $scope.addSearch = function() {
                if($scope.newSearchName == "" || $scope.newSearchString == "")
                {
                    alert("need to enter things");
                    return;
                }
                $http.post('/api/searchString', {
                    search: {
                        name: $scope.newSearchName,
                        search: $scope.newSearchString
                    }
                })
                .success(function (data, status, headers, config) {
                   alert('good');
                })
                .error(function (data, status, headers, config) {
                    alert('bad');
                });
            };    
 
            $scope.delSearch = function(searchToDel) {
                $http({ url: '/api/searchString', 
                    method: 'DELETE', 
                    data: {                    
                        search: {
                            name: searchToDel.name,
                            search: searchToDel.search
                        }
                    }, 
                    headers: {"Content-Type": "application/json;charset=utf-8"}
                })
                .success(function (data, status, headers, config) {
                   alert('good');
                })
                .error(function (data, status, headers, config) {
                    alert('bad');
                });
            };    


        }]);
})();
