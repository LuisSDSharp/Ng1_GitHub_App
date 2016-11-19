angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 3;
        $scope.userFound = false;
        $scope.userHasRepos = false;

        $scope.onUserInputChanged = function() {
            $scope.userHasRepos = false;

            if ($scope.username.length > minInputLength) {
                $http.get("https://api.github.com/users/" + $scope.username)
                    .success(function (userData) {
                        $scope.userFound = true;
                        
                        $scope.usersData = userData;
                        console.log("USER:");
                        console.log($scope.usersData);

                        $http.get("https://api.github.com/users/" + $scope.username + "/followers")
                            .then(function(followersData) {
                                $scope.userFollowersData = followersData.data;
                                console.log("FOLLOWERS:");
                                console.log($scope.userFollowersData);
                            });
                    })
                    .error(function () {
                        $scope.userFound = false;
                    });
            } else {
                $scope.userFound = false;
            }
        };

        $scope.showUserRepos = function(userName) {
            $http.get("https://api.github.com/users/" + userName + "/repos")
                .success(function (reposData) {
                  $scope.userHasRepos = true;
                  $scope.userReposData = reposData;
                  console.log("REPOS:");
                  console.log($scope.userReposData);
                });
        };

        $scope.getRepoCommits = function(id) {
            $http.get("https://api.github.com/repositories/" + id + "/commits")
                .success(function(commitsData) {
                    console.log("COMMITS:");
                    console.log(commitsData);
                    return commitsData;
                });
        };
}]);