myApp.factory('orderFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.index = function(){ 
		return new Promise(function(resolve, reject){
			$http.get('/orders').then(function(res){
				if(res.data){
					resolve(res.data);
				} else {
					reject(res.errors);
				}
			});
		});
	}
	return this	
}]);