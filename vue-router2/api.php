<?php
    header("Content-Type:text/html;charset=UTF-8");
    date_default_timezone_set("PRC");
    $showapi_appid = '36257';  //替换此值,在官网的"我的应用"中找到相关值
    $showapi_secret = 'fd06612e230d449294697a8bdf99242c';  //替换此值,在官网的"我的应用"中找到相关值
    $paramArr = array(
         'showapi_appid'=> $showapi_appid,
         'num'=> "5",
         'page'=> $_GET["page"],
         'rand'=> "1"
         //添加其他参数
    );
     
    //创建参数(包括签名的处理)
    function createParam ($paramArr,$showapi_secret) {
         $paraStr = "";
         $signStr = "";
         ksort($paramArr);
         foreach ($paramArr as $key => $val) {
             if ($key != '' && $val != '') {
                 $signStr .= $key.$val;
                 $paraStr .= $key.'='.urlencode($val).'&';
             }
         }
         $signStr .= $showapi_secret;//排好序的参数加上secret,进行md5
         $sign = strtolower(md5($signStr));
         $paraStr .= 'showapi_sign='.$sign;//将md5后的值作为参数,便于服务器的效验
         //echo "排好序的参数:".$signStr."<br>\r\n";
         return $paraStr;
    }
     
    $param = createParam($paramArr,$showapi_secret);
    $url = 'http://route.showapi.com/197-1?'.$param; 
    //echo "请求的url:".$url."<br>\r\n";
    $result = file_get_contents($url);
    //echo "返回的json数据:<br>\r\n";
    //print $result.'<br>\r\n';
    echo $result;
    $result = json_decode($result);
    //echo "<br>\r\n取出showapi_res_code的值:<br>\r\n";
    //print_r($result->showapi_res_code);
    //echo "<br>\r\n";
?>