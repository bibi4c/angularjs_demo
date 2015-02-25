'use strict';

var demoApp = angular.module('demoApp',[
	 	'ngResource',
        'ui.router',
	 ]);

/**
    * @ngdoc config
    * @requires $stateProvider, $urlRouterProvider
**/
// 初期画面のroute設定
demoApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'view/home.html',
            controller: 'IndexCtr',
            data: { pageTitle: 'home' }
        })
        .state('create_user', {
            url: '/create_user',
            templateUrl: 'view/create_edit.html',
            controller: 'CreateEditCtr'
        })
        .state('edit_user', {
            url: '/edit_user/:id',
            templateUrl: 'view/create_edit.html',
            controller: 'CreateEditCtr'
        })
        .state('edit_input', {
            url: '/edit_input',
            templateUrl: 'view/create_edit.html',
            controller: 'CreateEditCtr'
        })
        .state('confirm', {
            url: '/confirm',
            templateUrl: 'view/confirm.html',
            controller: 'ConfirmCtr'
        });
});

/**
    * @ngdoc resource
    * @name User
    * @requires $resource
**/
demoApp.factory('User', function User($resource) {
    return $resource('/api/index.php',{},
    {
      get: {
        method: 'GET',
        isArray: true
      }
	});
});

/**
    * @ngdoc resource
    * @name UserDelete
    * @requires $resource
**/
demoApp.factory('UserDelete', function User($resource) {
    return $resource('/api/delete_user.php');
});

/**
    * @ngdoc resource
    * @name UserCreate
    * @requires $resource
**/
demoApp.factory('UserCreate', function User($resource) {
    return $resource('/api/save_user.php',
        {
        }, {
        saveUser: {
           method:'POST',
           headers : {'Content-Type': 'application/x-www-form-urlencoded'},
           isArray:false
        }
     });
});

/**
    * @ngdoc resource
    * @name UserEdit
    * @requires $resource
**/
demoApp.factory('UserEdit', function UserEdit($resource) {
    return $resource('/api/create_edit.php',{},
    {
        get: {
            method: 'GET',
            isArray: true
        }
    });
});

/**
    * @ngdoc service
    * @name UserService
**/
var UserService = {
        'id': 0,
        'name' : '',
        'sex' : 1,
        'status' : 1,
        'mail' : ''
    };


