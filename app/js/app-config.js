mainApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "/view/main.html"
	})
	.when("/contacts", {
		templateUrl : "/view/contacts.html"
	})
	.when("/product", {
		templateUrl : "/view/product.html"
	})
	.otherwise({
		templateUrl : "/view/404.html"
	});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

}]);