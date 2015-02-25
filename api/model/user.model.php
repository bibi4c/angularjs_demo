<?php

include('lib/mongo.php');

/**
* ユーザモデル処理クラス
*
* @package model
* @author n.d.bin
* @version 1.0.0
*/
class User {

    /**
    * POSTパラメーターの取得
    *
    * @param array $where_array 選択の用件
    * @return array ユーザのリスト
    */
    public function selectUser($where_array) {

        try {

                // $where_arrayから、Select要件を設定
                foreach ($where_array as $key => $value) {

                    next($where_array);

                    // 名前で検索する場合
                    if ($key == 'name') $result = MongoCore::searchByName('users', $value);

                    // IDでユーザを取得する場合
                    if ($key == 'id') $result = MongoCore::getById('users', $value);
                }

                // データの順番を表示
                $id_num = 0;
                $users = array();

                // get the result of the search
                foreach ($result as $doc) {

                    $id_num++;

                    $doc['id'] = (string) $doc['_id'];

                    //ユーザの順番を表示
                    $doc['id_num'] = $id_num;

                    $users[] = $doc;
                }

                // var_dump($result);
                return $users;

            } catch (DOException $e) {
                // エラーを表示
                echo "Connection failed: " . $e->getMessage();
                return false;
        }
    }

    /**
    * ユーザの情報を保存
    *
    * @param array  ユーザのデータ
    * @return boolean 保存したらTRUEに戻る
    */
    public function saveUser($data) {
        try {
            // 新規登録したいデータの形を設定
            $new_data = array(
                'name' => $data['name'],
                'sex' => new MongoInt32($data['sex']),
                'status' =>  new MongoInt32($data['status']),
                'mail' => $data['mail'],
                );

            // queryを実行
            MongoCore::insert('users', $new_data);

            return true;
        } catch (DOException $e) {

            // エラーを表示
            echo "Connection failed: " . $e->getMessage();
            return false;
        }
    }

    /**
    * ユーザの情報を更新
    *
    * @param array  ユーザの更新したいデータ
    * @return boolean 更新したらTRUEに戻る
    */
    public function updateUser($data) {

        try {

            // 更新したいデータの形を設定
            $update_data = array(
                'name' => $data['name'],
                'sex' => new MongoInt32($data['sex']),
                'status' => new MongoInt32($data['status']),
                'mail' => $data['mail'],
                );
            $where = array('_id' => new MongoId($data['id']));

            MongoCore::update('users', $where, $update_data);

            return true;
        } catch (DOException $e) {

            // エラーを表示
            echo "Connection failed: " . $e->getMessage();
            return false;
        }
    }

    /**
    * ユーザの削除
    *
    * @param int ユーザのID
    * @return boolean 削除したらTRUEに戻る
    */
    public function deleteUser($userId) {

        try {

            $where = array('_id' => new MongoId($userId));

            MongoCore::remove('users', $where);

            return true;
        } catch (DOException $e) {
            // エラーを表示
            echo "Connection failed: " . $e->getMessage();
            return false;
        }
    }
}
?>