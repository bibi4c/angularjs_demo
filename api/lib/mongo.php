<?php

/**
* Mongoのコネクト処理クラス
*
* @package lib
* @author n.d.bin
* @version 1.0.0
*/
class MongoCore {

	/**
    * MongoDBのコネクト処理
    *
    * @return MongoDB接続しているオブジェクト
    */
	private static function connectCollection($collectionName) {

		$connection = new MongoClient();

		// DBを選択
		$db = $connection->selectDB("demo");

		//collectionを選択
        $collection = $connection->selectCollection($db, $collectionName);

		return $collection;
	}

	/**
    * IDで取得
    *
    * @param string  $collectionName
    * @param string  $id 検索したいID
    * @return array  collectionから情報array
    */
	public static function getById($collectionName, $id) {

		// collectionをインストール
		$collection = self::connectCollection($collectionName);

        // 要件を設定
        $where = array('_id' => new MongoId($id));

        return $collection->find($where);
	}

	/**
    * $regex変数で検索
    *
    * @param string  $collectionName
    * @param string  $name 検索したい名前
    * @return array  collectionから情報array
    */
	public static function searchByName($collectionName, $name) {

		// collectionをインストール
		$collection = self::connectCollection($collectionName);

        // 要件を設定
        $where = array('name' => array('$regex' => $name));

        return $collection->find($where);
	}

	/**
    * 情報を更新
    *
    * @param string  $collectionName
    * @param array   $data 新規登録したいデータ
    * @return boolean 新規登録したらTRUEに戻る
    */
	public static function insert($collectionName, $data) {

		// collectionをインストール
		$collection = self::connectCollection($collectionName);

        // 要件を設定
        $collection->insert($data);
	}

	/**
    * 情報を更新
    *
    * @param string  $collectionName
    * @param array   $where 更新要件
    * @param array   $data 更新したいデータ
    * @return boolean 更新したらTRUEに戻る
    */
	public static function update($collectionName, $where, $data) {

		// collectionをインストール
		$collection = self::connectCollection($collectionName);

        // 要件を設定
        return $collection->update($where, $data);
	}

	/**
    * 情報を更新
    *
    * @param string  $collectionName
    * @param array   $where 更新要件
    * @param array   $data 更新したいデータ
    * @return boolean 削除したらTRUEに戻る
    */
	public static function remove($collectionName, $where) {

		// collectionをインストール
		$collection = self::connectCollection($collectionName);

        //データを削除
        $collection->remove($where);
	}
}

?>

