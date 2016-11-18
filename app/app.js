angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 4;

        $scope.onUserInputChanged = function() {
            if ($scope.username.length > minInputLength) {
                console.log("FUNCA");
                $http.get("https://api.github.com/users/" + $scope.username)
                    .success(function (data) {
                        console.log(data);
                    })
            }
        };
}]);