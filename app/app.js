angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 3;
        $scope.userFound = false;

        $scope.onUserInputChanged = function() {
            if ($scope.username.length > minInputLength) {
                $http.get("https://api.github.com/users/" + $scope.username)
                    .then(function (data) {
                        $scope.userFound = true;
                        
                        $scope.usersData = data.data;
                        console.log($scope.usersData);

                        $http.get("https://api.github.com/users/" + $scope.username + "/followers")
                            .then(function(data) {
                                $scope.userFollowersData = data.data;
                                console.log($scope.userFollowersData);
                            });
                    });
            } else {
                $scope.userFound = false;
            }
        };
}]);