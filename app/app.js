var app = angular.module('app', []);

app.directive('emitOnEachRepo', function() {
    return function (scope) {
        if(scope.$last) {
            scope.$emit('OnEachRepo');
        }
    };
});
    
app.controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 3;
        $scope.userFound = false;
        $scope.userHasRepos = false;
        $scope.currentUser = "";

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
                .then(function (reposData) {
                  $scope.userHasRepos = true;
                  $scope.userReposData = reposData.data;

                  $scope.currentUser = userName;

                  console.log("REPOS:");
                  console.log($scope.userReposData);
                });
        };

        $scope.getRepoCommits = function(id) {
            $scope.userCommitsData = [];

            $http.get("https://api.github.com/repositories/" + id + "/commits")
                .then(function(commitsData) {
                    $scope.userCommitsData = commitsData.data;

                    console.log("COMMITS FOR: " + id);
                    console.log($scope.userCommitsData);
                });

            return $scope.userCommitsData;
        };

        $scope.userOnly = function(commit) {
            if (commit.committer === null) {
                return false;
            }

            return commit.committer.login === $scope.currentUser;
        };

        $scope.$on('OnEachRepo', function(scope) {
            console.log("Repo scope");
            console.log(scope);
        });
}]);