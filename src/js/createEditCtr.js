'use strict';

var demoApp = angular.module('demoApp');



/**
 * Mailのvalidatをチェック
 *
 * @param string mailadress
 * @return bool true OR false
 */
function checkMail(mail) {
    var atpos = mail.indexOf('@');
    var dotpos = mail.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= mail.length) {
        return false;
    }
    return true;
}

/**
 * Nameのvalidatをチェック
 *
 * @param string name
 * @return bool true OR false
 */
function checkName(name) {

    if (name === null || name === '') {
        return false;
    }
    return true;
}

/**
	* @ngdoc object
	* @name demoApp.controller:CreateEditCtr
	* @description
	* @requires $scope
	* @requires $state
	* @requires UserEdit $resource
**/
demoApp.controller('CreateEditCtr',function($scope, $state, UserEdit){

	/**
	 * [initPageCtr 初めにデータを設定]
	 */
	$scope.initPageCtr = function() {

		// 初めの通知メッセージを設定
		$scope.message = {
			nameError: '',
			mailError: ''
		};

		//ユーザを新規登録場合
		if ($state.current.name === 'create_user') {

			// 初めのユーザの情報を設定
			$scope.user = {
				'id': 0,
				'name' : '',
				'sex' : 1,
				'status' : 1,
				'mail' : ''
			};

		//ユーザを更新場合
		} else {
			if ($state.current.name === 'edit_user') {

				// 編集したいユーザの情報を取得
				UserEdit.query({id : $state.params.id},function(user) {
					$scope.user = user[0];
				});

			//入力した情報を更新場合
			} else {

				$scope.user = UserService;
			}
		}
	};

	/**
	 * [formSubmitCtr データを送る]
	 */
	$scope.formSubmitCtr = function() {

        UserService = $scope.user;

        // 入力した名前が正くない場合
        if (!checkName($scope.user.name)) {
	        $scope.message.nameError = '名前を入力してください';
	    } else {
	    	$scope.message.nameError = '';
	    }

	    // 入力したメールアドレスが正くない場合
	    if (!checkMail($scope.user.mail)) {
	         $scope.message.mailError = 'メールアドレスを入力してください';
	    } else {
	    	$scope.message.mailError = '';
	    }

	    // 入力したデータが正しい場合
	    if (checkName($scope.user.name) && checkMail($scope.user.mail)) {
	        $state.go('confirm');
	    }
	};

});


