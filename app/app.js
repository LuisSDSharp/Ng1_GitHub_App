var app = angular.module('app', []);

app.controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 3;
        $scope.userFound = false;
        $scope.userHasRepos = false;
        $scope.currentUser = "";

        // Fetch user info and its followers
        $scope.onUserInputChanged = function() {
            $scope.userHasRepos = false;

            if ($scope.username.length > minInputLength) {
                $http.get("https://api.github.com/users/" + $scope.username)
                    .success(function (userData) {
                        $scope.userFound = true;
                        $scope.usersData = userData;

                        $http.get("https://api.github.com/users/" + $scope.username + "/followers")
                            .then(function(followersData) {
                                $scope.userFollowersData = followersData.data;
                            });
                    })
                    .error(function () {
                        $scope.userFound = false;
                    });
            } else {
                $scope.userFound = false;
            }
        };

        // Fetch clicked user repos
        $scope.showUserRepos = function(userName) {
            $http.get("https://api.github.com/users/" + userName + "/repos")
                .then(function (reposData) {
                  $scope.userHasRepos = true;
                  $scope.userReposData = reposData.data;

                  $scope.currentUser = userName;
                });
        };

        // Fetch current repo commits
        $scope.getRepoCommits = function(id) {
            $http.get("https://api.github.com/repositories/" + id + "/commits")
                .then(function(commitsData) {
                    $scope.userCommitsData = commitsData.data;
                });
        };

        // Filter only by commits made by current repo owner
        $scope.userOnly = function(commit) {
            if (commit.committer === null) {
                return false;
            }

            return commit.committer.login === $scope.currentUser;
        };
}]);