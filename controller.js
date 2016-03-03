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
			
			
			
			$scope.getNewickFromS3Bucket = function() {

				//var AWS = require('aws-sdk');
				
				AWS.config.update(
				  {
					accessKeyId: "AKIAIPG5APNTFXVOISIA",
					secretAccessKey: "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",
					region: 'us-west-2'
				  }
				);
				
				var s3 = new AWS.S3();
				var options = {
					Bucket    : "smx.spark.bio.bucket",
					Key    : "treeOutput/newick",
				};
				
				var fileStream = s3.getObject(options).createReadStream();
				
				var string = ''
				fileStream.on('readable',function(buffer){
				  var part = buffer.read().toString();
				  string += part;
				  console.log('stream data ' + part);
				});


				fileStream.on('end',function(){
				 console.log('final output ' + string);
				 
				 $scope.newick = data;
					
					var dataObject = { newick: $scope.newick };

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
