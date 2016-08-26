myApp.controller('ordersController', ['$scope', 'orderFactory', 'productFactory', 'userFactory', '$location', function($scope, orderFactory, productFactory, userFactory, $location){
	//get all poducts currently available
	productFactory.index(function(products){
		$scope.products = products;
	});
	$scope.newProduct = function(){
		$scope.productForm ? $scope.productForm = false : $scope.productForm = true; 
	}

	$scope.createProduct = function(){
		var product = {
		name: $scope.name,
		unit_qty: $scope.qty,
		unit_price: $scope.price*100
		}
		productFactory.create(product).then(function(){
			$scope.dashboard();
		}, function(err){
			console.log(err);
			$scope.prodErrs = err;
		});
	};

	$scope.productForm = false;

	//load all products and orders
	$scope.displayedOrders = 5;
	$scope.orders = [];
	$scope.dashboard = function(numOrders){
		userFactory.signedIn().then(function(user){
			productFactory.index().then(function(products){
				$scope.products = products;
				orderFactory.index().then(function(orders){
						$scope.displayedOrders += 5;
						orders.forEach(function(order){
							order.delivery_date = moment(order.delivery_date).format('MMMM D YYYY');
							products.forEach(function(product){
								if(order._product == product._id){
									order._product = product.name;
								}
							});
						});
						if($scope.displayedOrders > orders.length){
							$scope.displayedOrders = orders.length;
							$scope.orders = orders.splice(0,$scope.displayedOrders);
						} else {
							$scope.orders = orders.splice(0,$scope.displayedOrders);
						}
						$scope.$apply();
				}, function(errors){
					$scope.loadErr = errors;
				});
			});
		}, function(){
			$location.url('/orders')
		});
	}
	$scope.dashboard();
}]);