'use strict';

var demoApp = angular.module('demoApp');

/**
 * [getUserList 現在のページにユーザのリストを表示に取得]
 * @return ユーザリスト
 */
function getUserList(userList, start, finish) {

	var userData = [];

	// 現在のページのユーザリストを取得
	angular.forEach(userList, function(value, key){

		if (key >= start && key <= finish) {

			var userInfo = value;

			// statusを修理
			if (value.status === 1) {
				userInfo.statusString = '予定';
			} else {
				if (value.status === 2) {
					userInfo.statusString = '参加';
				} else {
					userInfo.statusString = '欠席';
				}
			}

			// 表示するユーザのリストにpush
			this.push(userInfo);
		}
	}, userData);
	return userData;
}

/**
 * @ngdoc controller
 * @name IndexCtr
 * @description  一覧ページにデータを修理
 * @requires $scope、$state, $location, User, UserDelete
 **/
demoApp.controller('IndexCtr',function($scope, $state, $location, User, UserDelete){

	/**
	 * [initPageCtr 初めにデータを設定]
	 */
	$scope.initPageCtr = function() {

		$scope.currentPage = 1;

		// 各ページにユーザがある、 defaultは5です。
		$scope.numberOfPage = 5;

		User.query(function(data) {

			$scope.users = data;

			// 初めの場合、ユーザを最初のnumberOfPage表示する
			$scope.userData = getUserList($scope.users, 0, $scope.numberOfPage - 1);
		});
	};

	/**
	 * [initPageCtr 初めにデータを設定]
	 */
	$scope.setColor = function(sexValue) {

		if (sexValue === 1) {
			return 'maleClass';
		} else {
			return 'femaleClass';
		}
	};

	/**
	 * [getPage ]
	 * @param  {[int]} pageNum [現在のページの数]
	 * @return 表示するユーザリスト
	 */
	$scope.getPage = function(pageNum) {

		if (pageNum < 1) {
			pageNum = 1;
		}

		// 現在のページ数を取得
		if ((pageNum - 1) * $scope.numberOfPage + 1 > $scope.users.length) {
			pageNum--;
		}

		var start = (pageNum - 1) * $scope.numberOfPage;

		var finish = start + $scope.numberOfPage - 1;

		$scope.currentPage = pageNum;

		$scope.userData = getUserList($scope.users, start, finish);
	};

	/**
	 * [searchFunct 検索]
	 * @return 検索したユーザリスト
	 */
	$scope.searchFunct = function() {

		// searchText === undefinedの場合は、この値を''に再セット
		if ($scope.searchText === undefined) {
			$scope.searchText = '';
		}

		// ユーザリストを取得
		User.query({search: $scope.searchText}, function(data) {

			$scope.users = data;

			// 現在のページのユーザリストを取得
			$scope.userData = getUserList($scope.users, 0, $scope.numberOfPage - 1);
		});
	};

	/**
	 * [goDeletePage 削除]
	 * @return 削除の状態
	 */
	$scope.goDeletePage = function(userId) {

		if (confirm('削除してよろしいですか?')) {

			// ユーザを削除にqueryする
			UserDelete.query({userId : userId},function() {
				alert('削除しました!' );

				// ユーザリストを取得
				User.query(function(data) {

					$scope.users = data;

					var pageNum = $scope.currentPage;

					if ((pageNum - 1) * $scope.numberOfPage + 1 > $scope.users.length) {
						pageNum--;
						$scope.currentPage = pageNum;
					}

					var start = (pageNum - 1) * $scope.numberOfPage;

					var finish = start + $scope.numberOfPage - 1;

					// 初めの場合、ユーザを最初のnumberOfPage表示する
					$scope.userData = getUserList($scope.users, start, finish);
				});
			});
	    }
	};
});


