'use strict';

/* App Module */

var app = angular.module('ecs', ['ecsFilters']).
  config(['$routeProvider', function($routeProvider) {
  	
  	$routeProvider.  		
  		when('/login', {templateUrl: 'partials/login.html',   controller: LoginController}).
  		when('/books', {templateUrl: 'partials/book.html',   controller: BookController}).
  		when('/test', {templateUrl: 'partials/test.html',   controller: TestController}).
     	when('/service', {templateUrl: 'partials/testService.html',   controller: HelloCtrl}).
     	when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
     	when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      	otherwise({redirectTo: '/login'});
    // $locationProvider.html5Mode(true);
}]);
