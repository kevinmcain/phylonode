'use strict';

/**
 * @ngdoc overview
 * @name navigation
 * @description
 * # controller for the navigation bar
 *
 */
 
// wrapping your javascript in closure is a good habit
(function(){

	var app = angular.module('app');
	
	app.controller('Controller', [
		'$scope', 
		'$rootScope',
		'$http', 
		function($scope, $rootScope, $http) {
		
			$scope.getNewickFromS3BucketViaNode = function() {

				var url = '/treeOutput/';
			
				$http.get(url).success(function(data, status, headers, config) {
					
					$scope.newick =  JSON.stringify(data, undefined, 2);
					
					var dataObject = { newick: data };

					phylocanvas = new Smits.PhyloCanvas(
						dataObject,
						'svgCanvas',
						333, 500
						//,'circular'
					);

				});
			};
		}
	]);
	
})();
