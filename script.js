(function () {
    var app = angular.module('userApp', []);
    app.controller('userCtrl', function ($scope, $http) {
        $http.get("https://jsonplaceholder.typicode.com/users").then(function (response) {
            $scope.userData = response.data;

            angular.forEach(response.data, function (value, key) {
                var R = 6371;
                var lon2 = 30.523333 * Math.PI / 180;
                var lat2 = 50.45 * Math.PI / 180;
                var lon1 = value.address.geo.lng * Math.PI / 180;
                var lat1 = value.address.geo.lat * Math.PI / 180;
                var dlon = (lon2 - lon1);
                var dlat = (lat2 - lat1);
                var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                value.distance = d.toFixed(2);
            });

            $scope.addNewUser = function (itemToAdd) {
                $scope.submitted = false;
                $scope.userNameError = false;
                $scope.emailError = false;
                $scope.phoneNumberError = false;
                $scope.compNameError = false;
                $scope.addressErrorGeoLng = false;
                $scope.addressErrorGeoLat = false;

                for (var i = 0; i < $scope.userData.length; i++) {
                    if ($scope.userData[i].username == itemToAdd.username) {
                        $scope.userNameError = true;
                        return false;
                    } else if ($scope.userData[i].email == itemToAdd.email) {
                        $scope.emailError = true;
                        return false;
                    } else if ($scope.userData[i].company.name == itemToAdd.company.name) {
                        $scope.compNameError = true;
                        return false;
                    }
                }

                $scope.itemToAdd.id = (function () {
                    var idArray = [];
                    for (var i = 0; i < $scope.userData.length; i++) {
                        idArray.push($scope.userData[i].id);
                    }
                    var maxIdValue = Math.max.apply(Math, idArray);
                    return maxIdValue += 1;
                })();


                $scope.isValidAddress = (function () {
                    if (itemToAdd.address == undefined) {
                        return true;
                    }

                    var pattern = /^-?\d+\.?\d*$/;
                    var lat = itemToAdd.address.geo.lat.match(pattern);
                    var lng = itemToAdd.address.geo.lng.match(pattern);

                    if (lat == null) {
                        $scope.addressErrorGeoLat = true;
                        return false;
                    } else if (lng == null) {
                        $scope.addressErrorGeoLng = true;
                        return false;
                    } else {
                        return true;
                    }
                })();

                $scope.itemToAdd.distance = (function () {
                    if (itemToAdd.address == undefined) {
                        return;
                    }
                    var R = 6371;
                    var lon2 = 30.523333 * Math.PI / 180;
                    var lat2 = 50.45 * Math.PI / 180;
                    var lon1 = itemToAdd.address.geo.lng * Math.PI / 180;
                    var lat1 = itemToAdd.address.geo.lat * Math.PI / 180;
                    var dlon = (lon2 - lon1);
                    var dlat = (lat2 - lat1);
                    var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c;
                    return d.toFixed(2);
                })();

                $scope.isValidEmail = (function () {
                    var emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    if (emailPattern.test(itemToAdd.email)) {
                        return true;
                    } else {
                        return false;
                    }
                })();

                $scope.isValidPhone = (function () {
                    if (itemToAdd.phone == undefined) {
                        return true;
                    }

                    var phoneNumber = itemToAdd.phone.replace(/[^\d]+/g, '');
                    if (phoneNumber.length == 10) {
                        $scope.phoneNumberError = false;
                        return true;
                    } else {
                        $scope.phoneNumberError = true;
                        return false;
                    }
                })();

                if ($scope.isValidEmail == false || $scope.isValidPhone == false || $scope.isValidAddress == false) {
                    return false;
                }
                $scope.userData.push(angular.copy(itemToAdd));
                $scope.itemToAdd = {};
            };

        });

        $scope.defaultSortName = 'name';
        $scope.reverse = false;

        $scope.sortBy = function (x) {
            $scope.reverse = ($scope.defaultSortName === x) ? !$scope.reverse : false;
            $scope.defaultSortName = x;
        };

        $scope.sortNameAZ = false;
        $scope.sortUserNameAZ = false;
        $scope.sortEmailAZ = false;
        $scope.sortAddressAZ = false;
        $scope.sortCompanyAZ = false;

        $scope.toggleIcons = function (tableColumnName) {
            if (tableColumnName == "name") {
                if ($scope.sortNameAZ == false) {
                    $scope.sortNameAZ = true;
                    $scope.sortNameZA = false;
                } else if ($scope.sortNameAZ == true) {
                    $scope.sortNameAZ = false;
                    $scope.sortNameZA = true;
                }

                $scope.sortUserNameAZ = false;
                $scope.sortEmailAZ = false;
                $scope.sortAddressAZ = false;
                $scope.sortCompanyAZ = false;

                $scope.sortUserNameZA = false;
                $scope.sortEmailZA = false;
                $scope.sortAddressZA = false;
                $scope.sortCompanyZA = false;
            }

            if (tableColumnName == "username") {
                if ($scope.sortUserNameAZ == false) {
                    $scope.sortUserNameAZ = true;
                    $scope.sortUserNameZA = false;
                } else if ($scope.sortUserNameAZ == true) {
                    $scope.sortUserNameAZ = false;
                    $scope.sortUserNameZA = true;
                }

                $scope.sortNameAZ = false;
                $scope.sortEmailAZ = false;
                $scope.sortAddressAZ = false;
                $scope.sortCompanyAZ = false;

                $scope.sortNameZA = false;
                $scope.sortEmailZA = false;
                $scope.sortAddressZA = false;
                $scope.sortCompanyZA = false;
            }

            if (tableColumnName == "email") {
                if ($scope.sortEmailAZ == false) {
                    $scope.sortEmailAZ = true;
                    $scope.sortEmailZA = false;
                } else if ($scope.sortEmailAZ == true) {
                    $scope.sortEmailAZ = false;
                    $scope.sortEmailZA = true;
                }

                $scope.sortNameAZ = false;
                $scope.sortUserNameAZ = false;
                $scope.sortAddressAZ = false;
                $scope.sortCompanyAZ = false;

                $scope.sortNameZA = false;
                $scope.sortUserNameZA = false;
                $scope.sortAddressZA = false;
                $scope.sortCompanyZA = false;
            }

            if (tableColumnName == "company.name") {
                if ($scope.sortCompanyAZ == false) {
                    $scope.sortCompanyAZ = true;
                    $scope.sortCompanyZA = false;
                } else if ($scope.sortCompanyAZ == true) {
                    $scope.sortCompanyAZ = false;
                    $scope.sortCompanyZA = true;
                }

                $scope.sortNameAZ = false;
                $scope.sortUserNameAZ = false;
                $scope.sortEmailAZ = false;
                $scope.sortAddressAZ = false;

                $scope.sortNameZA = false;
                $scope.sortUserNameZA = false;
                $scope.sortEmailZA = false;
                $scope.sortAddressZA = false;
            }

            if (tableColumnName == "address.street") {
                if ($scope.sortAddressAZ == false) {
                    $scope.sortAddressAZ = true;
                    $scope.sortAddressZA = false;
                } else if ($scope.sortAddressAZ == true) {
                    $scope.sortAddressAZ = false;
                    $scope.sortAddressZA = true;
                }

                $scope.sortNameAZ = false;
                $scope.sortUserNameAZ = false;
                $scope.sortEmailAZ = false;
                $scope.sortCompanyAZ = false;

                $scope.sortNameZA = false;
                $scope.sortUserNameZA = false;
                $scope.sortEmailZA = false;
                $scope.sortCompanyZA = false;
            }
        };

        $scope.phoneNumber = function ($event) {
            var phoneValue = $scope.itemToAdd.phone;
            var key = $event.keyCode || $event.charCode;

            if (key == 8) {
                return false;
            }

            var phoneNumber = phoneValue.replace(/[^\d]+/g, '');

            if (phoneNumber.length == 3) {
                $scope.itemToAdd.phone = "(" + phoneNumber.slice(0, 3) + ") ";
            } else if (phoneNumber.length == 6) {
                $scope.itemToAdd.phone = "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(3, 6) + "-";
            } else if (phoneNumber.length == 10) {
                $scope.itemToAdd.phone = "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(3, 6) + "-" + phoneNumber.slice(6, 10);
            } else if (phoneNumber.length > 8) {
                $scope.itemToAdd.phone = "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(3, 6) + "-" + phoneNumber.slice(6, 10);
            }
        };
    });
})();