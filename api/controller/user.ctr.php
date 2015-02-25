<?php

include('lib/common.php');
include('model/user.model.php');

/**
* ユーザの操作処理クラス
*
* @package controller
* @author n.d.bin
* @version 1.0.0
*/
class UserController
{

	/**
    * index page function
    *
    */
    function index()
    {
		// 検索しているkeywordを取得
		$searchText =  Common::getGetParam('search');

		// default場合は、searchTexy = ''
		if (!$searchText) $searchText = '';

		// $_GETから$current_pageを取得する
		$current_page = Common::getGetParam('current_page');

		// default場合は、current_page = 1
		if ($current_page) {
		    $this->current_page = $current_page;
		    if ($current_page == 0) $this->current_page = 1;
		} else {
		    $this->current_page = 1;
		}

		// set conditions
		$where_array = array('name' => $searchText);

		// get users from database
		$newUser = new User();
		$this->users = $newUser->selectUser($where_array);

		// 結果のjson形で戻る
		echo json_encode($this->users);
    }

    /**
    * save user function
    *
    */
    function save_user()
    {
	    $data = array();

	    // $_POSTでユーザのデータを取得する
	    $input_data = json_decode(file_get_contents('php://input'), true);

	    //ユーザのデータを保存に設定
	    $data['id'] = $input_data['id'];
	    $data['name'] = $input_data['name'];
	    $data['sex'] =  $input_data['sex'];
	    $data['status'] = $input_data['status'];
	    $data['mail'] = $input_data['mail'];

	    // 結果を表示する
	    // データの中に、IDが保存されいる場合、状態はUPDATEになっています。
	    if ($data['id'] > 0) {
	        if (User::updateUser($data)) {
	            echo '更新しました!';
	        } else {
	            echo '更新出来ない!';
	        }

	    // IDが保存しない場合、状態は新しい登録になっています。
	    } else {
	        if (User::saveUser($data)) {
	            echo '保存しました!';
	        } else {
	            echo '保存出来ない!';
	        }
	    }
    }

    /**
    * Create Edit function
    *
    */
    function create_edit()
    {
		// はじめに、ユーザのデータを設定
	    $data = array();
	    $data['id'] = 0;
	    $data['name'] = '';
	    $data['sex'] = 1;
	    $data['status'] = '2';
	    $data['mail'] = '';

	    // 更新ボタンをクリックすると、$_GETでユーザのIDを取得する
	    if (Common::getGetParam('id')) {
	        $data['id'] = Common::getGetParam('id');
	    };

	    // user_id > 0という場合は,ユーザを更新している状態なので、DBからユーザ情報を取得する
	    if ($data['id'] > 0) {

	    	//set conditions
	    	$where_array = array('id' => $data['id']);

	        // get users from database
	        $user = User::selectUser($where_array);
	    }

	    // json形で結果が戻らる
	    echo json_encode($user);
    }

    /**
    * Delete User function
    *
    * @param user_id $_GETから取得
    *
    */
    function delete_user()
    {
	    // $_GETでユーザのIDを取得する
	    if (Common::getGetParam('userId')) {
	        $user_id = Common::getGetParam('userId');
	    };

	    // ユーザの情報を削除する
	    // 結果を表示する
	    if ($user_id > 0) {
	        if (User::deleteUser($user_id)) {
	            echo '削除しました!';
	        } else {
	            echo 'エラーが発生しています!';
	        }
	    }
    }
}
?>