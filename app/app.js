angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 3;
        $scope.userFound = false;
        $scope.userHasRepos = false;

        $scope.onUserInputChanged = function() {
            if ($scope.username.length > minInputLength) {
                $http.get("https://api.github.com/users/" + $scope.username)
                    .success(function (data) {
                        $scope.userFound = true;
                        
                        $scope.usersData = data;
                        console.log($scope.usersData);

                        $http.get("https://api.github.com/users/" + $scope.username + "/followers")
                            .then(function(data) {
                                $scope.userFollowersData = data.data;
                                console.log($scope.userFollowersData);
                            });
                    })
                    .error(function () {
                        $scope.userFound = false;
                        $scope.userHasRepos = false;
                    });
            } else {
                $scope.userFound = false;
            }
        };

        $scope.showUserRepos = function(userName) {
            $http.get("https://api.github.com/users/" + userName + "/repos")
                .success(function (data) {
                  $scope.userHasRepos = true;
                  $scope.userReposData = data;
                  console.log($scope.userReposData);
                });
        };
}]);