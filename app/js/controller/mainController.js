mainApp.controller('mainController', ["$scope", "$http", function ($scope, $http) {

    $scope.productData = {};
    $scope.categories = {};
    $scope.tabletProducts = {};
    $scope.tvProducts = {};
    $scope.activeProductPage = "smartphones";
    $scope.activeProductNumber = 0;
    $scope.articleTitle = "Smartphone";


    $scope.getProductsInfo = function () {
        $http.get("/json/products-data.json")
            .then(function (response) {
                $scope.productData = response.data;
            }, function (error) {
                console.log("error on getting product data1");
            });
    }

    $scope.getCategoriesInfo = function () {
        $http.get("/json/categories.json")
            .then(function (response) {
                $scope.categories = response.data;
            }, function (error) {
                console.log("error on getting product data2");
            });
    }

    $scope.getTVInfo = function () {
        $http.get("/json/TV.json")
            .then(function (response) {
                $scope.tvProducts = response.data;
            }, function (error) {
                console.log("error on getting product data3");
            });
    }

    $scope.getTabletsProductsInfo = function () {
        $http.get("/json/tablets.json")
            .then(function (response) {
                $scope.tabletProducts = response.data;
            }, function (error) {
                console.log("error on getting product data4");
            });
    }

    //Displaying different lists of products when click on filter buttons:
    $scope.changeCategory = function (event) {
        $scope.articleTitle = $(event.target).text().trim();
        $scope.activeProductPage = $(event.target).text().toLowerCase().trim();
        $(".changeCategoryBtn").removeClass("active");
        $scope.activeProductNumber = $(event.target).data("number");
    }

    $scope.getProductsInfo();
    $scope.getCategoriesInfo();
    $scope.getTVInfo();
    $scope.getTabletsProductsInfo();

}]);
