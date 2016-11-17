angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        
        if ($scope.username.length > 4) {
            $http.get("https://api.github.com/users/" + $scope.username)
                .success(function (data) {
                    console.log(data);
                })
        }
}]);