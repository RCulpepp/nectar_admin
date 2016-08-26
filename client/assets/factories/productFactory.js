myApp.factory('productFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.index = function(){
		return new Promise(function(resolve, reject){
		$http.get('/products').then(function(res){
			if(res.data.errors) {
				reject();
			} else {
				resolve(res.data.products);
			}
		}, function(res){
			reject();
			});
		});
	};

	this.create = function(product){
		return new Promise(function(resolve, reject){
			$http.post('/products', product).then(function(res){
				if(res.data.errors){
					reject();
				} else {
					resolve(res.data.errors);
				}
			});	
		});
	}
	return this;
}]);