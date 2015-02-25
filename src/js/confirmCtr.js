'use strict';

var demoApp = angular.module('demoApp');

/**
	* @ngdoc object
	* @name demoApp.controller:ConfirmCtr
	* @description
	* @requires $scope
	* @requires $state
	* @requires UserCreate $resource
**/
demoApp.controller('ConfirmCtr',function($scope, $state, UserCreate){

	/**
	 * [initPageCtr 初めにデータを設定]
	 */
	$scope.initPageCtr = function() {

		$scope.user = UserService;

		// データがない場合は、作成画面に戻る
		if ($scope.user.name === '' || $scope.user.mail === '') {
			$state.go('create_user');
		}

		// 性別を修理
		if ($scope.user.sex === 1) {
			$scope.user.sexString = '男性';
		} else {
			$scope.user.sexString = '女性';
		}

		// statusを修理
		if ($scope.user.status === 1) {
			$scope.user.statusString = '予定';
		} else {
			if ($scope.user.status === 2) {
				$scope.user.statusString = '参加';
			} else {
				$scope.user.statusString = '欠席';
			}
		}
	};

	/**
	 * [formSubmitCtr データを保存]
	 */
	$scope.formSubmitCtr = function() {

		// ユーザの情報を保存
	   	UserCreate.saveUser({
           	id : $scope.user.id,
           	name: $scope.user.name,
           	sex: $scope.user.sex,
           	status: $scope.user.status,
           	mail: $scope.user.mail
        });

	   	// 通知
		alert('保存しました!');
		// 一覧に戻る
		$state.go('index');
	};
});


