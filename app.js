'use strict';

/**
 * @ngdoc overview
 * @name budgy
 * @description
 * # envelope system
 *
 * Main module of the application.
 */
 
(function(){

	var app = angular.module('app', ['ngRoute']);

	app.config(function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'modules/core/views/login.html',
			controller: 'LoginCtrl'
		})
		.when('/envelopes', {
			templateUrl: 'modules/envelope/views/budget.html',
			controller: 'EnvelopeCtrl'
		})
		.when('/manageEnvelopes',{
			templateUrl: 'modules/envelope/views/manageEnvelopes.html',
			controller: 'EnvelopeCtrl'
		})
		.when('/manageTransactions/:envelopeID',{
			templateUrl: 'modules/expense/views/manageTransactions.html',
			controller: 'ExpenseCtrl'
		})
		.when('/reports/', {
			templateUrl: 'modules/reports/views/report1.html',
			controller: 'ReportsCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
	
})();