'use strict';

/* Filters */

angular.module('ecsFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
