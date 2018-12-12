myApp.controller('tpCtrl', function ($scope, $window, $rootScope, $resource, TemplateService, NavigationService, CsrfTokenService, $timeout, $http, apiService, $state, $uibModal, Menuservice, tts, $cookies, $sce, $location, $document, Idle, livechatapi) {
    $scope.template = TemplateService.getHTML("content/tp.html");
    TemplateService.title = "tp"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    console.log("HEY HEY ------CONNECTED-------");
	$(document).ready(function(){
		var url = "http://10.240.21.21:5000/";
		var socket = io.connect(url+"td");
		socket.on("msg", function(){
			console.log("HEY HEY CONNECTED");
		})
	})
});