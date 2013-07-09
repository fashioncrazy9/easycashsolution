'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  		when('/login', {templateUrl: 'partials/login.html',   controller: LoginController}).
  		when('/books', {templateUrl: 'partials/book.html',   controller: BookController}).
     	when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
     	when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      	otherwise({redirectTo: '/login'});
}]);
