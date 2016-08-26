myApp.factory('userFactory', ['$http', '$routeParams', function($http, $routeParams){
	this.signedIn = function(){
		return new Promise(function(resolve, reject){
			$http.get('/users/sessions').then(function(res){
				if(res.data.user){
					resolve(res.data.user);
				}
				reject();
			});
		})
	};
	this.regisErrors = [];
	this.loginErrors = [];
	this.login = function(user, callback){
		$http.post('/orders/admin', user).then(function(res){
			if(res.data.errors){
				callback(res.data.errors) //callback needs appropriate data from returned error
			} else if (res.data.user){
				callback();
			} else {
				callback({error:"The information you entered does not match our records."})
			}
		});
	}
	this.findUser = function(){
		return new Promise(function(resolve, reject){
			$http.get('/users').then(function(data){
				if(data.err){
					reject(data.err)
				} else {
					resolve(data)
				}
			});
		});
	};

	this.create = function(user, callback){
		$http.post('/users', user, function(data){
			if(typeof(data.errors) == 'object'){
				this.regisErrors.push(data.errors)
			}

			if(typeof(data.user) == 'object'){

			}
		})
	};

	this.logout = function(){
		return new Promise(function(resolve, reject){
			$http.get('/users/logout').then(resolve())
		});
	};
    return this;
}]);