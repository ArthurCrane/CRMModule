(function() {
	angular.module('app', [				
	/*
	 * Self modules
	 */ 
	'app.controllers',
	'app.services',
	'ui.router',
	'angularUtils.directives.dirPagination',
	'ngAnimate',
	'xeditable',
	'ui.bootstrap',
	'ui.router',
	'googlechart',
	'chart.js'


	/*
	 * Feature areas
	 */
	

	
	]).run(runBlock);

	runBlock.$inject = ['$state', '$localStorage'] ;

	function runBlock($state, $localStorage) {
		//This function exectues when the app loads		
	}

angular.module('app.controllers', []);
angular.module('app.services', []);
})();


