<?php
/**
* 共通関数処理クラス
*
* @package lib
* @author n.d.bin
* @version 1.0.0
*/
class Common {

/**
* POSTパラメーターの取得
*
* @param string $post_name、default：null
* @return string 値
*/
public static function getPostParam($post_name = null) {

    //$_POST中に、データがない場合
    if (empty($_POST)) {
        return FALSE;
    }
    //$_POST中に、すべてのデータを取得場合
    if ($post_name == null) {
        return $_POST;
    }

    // $_POST中に、get_namaが既存している場合
    if (array_key_exists($post_name, $_POST)) {
        return $_POST[$para_name];
    } else {
        return FALSE;
    }
}

/**
* GETのパラメーターの取得
*
* @param string $get_name、default：null
* @return string 値
*/
public static function getGetParam($get_name = null) {

    //$_GET中に、データがない場合
    if (empty($_GET)) {
        return FALSE;
    }

    //$_GET中に、すべてのデータを取得場合
    if ($get_name == null) {
        return $_GET;
    }

     //$_GET中に、get_namaが既存している場合
    if (array_key_exists($get_name, $_GET)) {
        return $_GET[$get_name];
    } else {
        return FALSE;
    }
}


}
?>