mainApp.controller('mainController', ["$scope", "$http", function ($scope, $http) {

    $scope.categories = {};
    $scope.productData = {};
    $scope.tabletProducts = {};
    $scope.tvProducts = {};
    $scope.articleTitle = "Smartphone";
    $scope.quantity = 8;
    $scope.searchCoeficient = 0;
    $scope.srcPage = ["view/smartphones.html", "view/tablets.html", "view/tv.html", "view/search.html"];
    $scope.activeProductPage = (sessionStorage.getItem("activePage")) ? sessionStorage.getItem("activePage") : "smartphones";

    $scope.activeProductNumber = (sessionStorage.getItem("activeProduct")) ? sessionStorage.getItem("activeProduct") : 0;

    $scope.mainSearchVal = {};

    $scope.mainSearchRes = {};
    $scope.wholeProductsData = [{}];

    $scope.propertyName = 'price';
    $scope.reverse = true;


    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.getProductsInfo = function () {
        $http.get("/json/smartphones.json")
            .then(function (response) {
                $scope.productData = response.data;
                $scope.wholeProduct($scope.productData);
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
                $scope.wholeProduct($scope.tvProducts);
            }, function (error) {
                console.log("error on getting product data3");
            });
    }

    $scope.getTabletsProductsInfo = function () {
        $http.get("/json/tablets.json")
            .then(function (response) {
                $scope.tabletProducts = response.data;
                $scope.wholeProduct($scope.tabletProducts);
            }, function (error) {
                console.log("error on getting product data4");
            });
    }

    //Displaying different lists of products when click on filter buttons:
    $scope.changeCategory = function (event) {
        $scope.articleTitle = $(event.target).text().trim();                    // displayed in the top article of the page
        $scope.activeProductPage = $(event.target).text().toLowerCase().trim(); // used only in ng-include to load appropriate htmls category block
        $(".changeCategoryBtn").removeClass("active");
        $scope.activeProductNumber = $(event.target).data("number");            // needed to highlight clicked category button
        sessionStorage.setItem("activePage", $scope.activeProductPage);
        sessionStorage.setItem("activeProduct", $scope.activeProductNumber);
    }

    $scope.getBtnLoad = function () {
        $scope.quantity += 8;
    }

    $scope.getShowMainSearchResults = function () {
        $scope.activeProductPage = 'search';

    }

    $scope.wholeProduct = function (array) {
        $.each(array, function (i, elem) {
            $scope.wholeProductsData.push(elem);
        });
       
    }

    $scope.openSearchPage = function (searchPageNumber) {
        if ($scope.mainSearchVal.value != '' && $scope.mainSearchVal.value != undefined) {
            $scope.activeProductNumber = searchPageNumber;

            // $.each($scope.wholeProductsData, function (i, elem) {
            //     $.each(elem, function (k, value) {
            //         $scope.test = value.indexOf($scope.mainSearchVal.value);
            //         if ($scope.test != -1) {
            //             $scope.searchCoeficient++;
            //         }
            //     })
            //
            // })
        }
    }

    $scope.getProductsInfo();
    $scope.getCategoriesInfo();
    $scope.getTVInfo();
    $scope.getTabletsProductsInfo();

}]);
