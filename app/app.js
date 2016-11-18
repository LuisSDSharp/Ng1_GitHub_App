angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 4;
        $scope.userFound = false;
        $scope.usersData = {};

        $scope.onUserInputChanged = function() {
            if ($scope.username.length > minInputLength) {
                $http.get("https://api.github.com/users/" + $scope.username)
                    .success(function (data) {
                        $scope.userFound = true;
                        $scope.usersData = data;
                        console.log(data);
                    })
                    .error(function() {
                        $scope.userFound = false;
                    })
            }
        };
}]);