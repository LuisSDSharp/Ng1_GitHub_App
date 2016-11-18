angular.module('app', [])
    .controller('gitHubController', ['$scope', '$http', function ($scope, $http) {
        var minInputLength = 3;
        $scope.userFound = false;
        $scope.usersData = [];

        $scope.onUserInputChanged = function() {
            if ($scope.username.length > minInputLength) {
                $http.get("https://api.github.com/users/" + $scope.username)
                    .success(function (data) {
                        $scope.userFound = true;
                        
                        // Coverting object to array
                        for (var key in data) {
                            var tempObj = {}
                            tempObj[key] = data[key];
                            $scope.usersData.push(tempObj);
                        }
                        
                        console.log(data);
                    })
            } else {
                $scope.userFound = false;
            }
        };
}]);