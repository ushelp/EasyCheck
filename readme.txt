说明：该插件与ECheck插件为同一插件，是ECheck的中文版本，提示消息和使用手册均为中文版。
It's same to ECheck,this is Chinese language version.

1、引入EasyCheck.css，在jQuery后引入EasyCheck.js
在EasyCheck.css中.根据需要修改显示样式，easycheck_okInput类样式为您文本框默认样式；.easycheck_errorInput类样式为错误提示文本框样式。或者，在页面重新定义该类样式，以替换默认样式。

<link rel="stylesheet" type="text/css" href="css/EasyCheck.css"/> 
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/EasyCheck.min.js"></script>


2、使用验证

class类验证：
required    必填       <input type="text" name="name" class=”required”/>     
email         邮箱      <input type="text" name="name" class=”email”/>
url              URL      <input type="text" name="name" class=”url”/>
number    数字      <input type="text" name="name" class=”number”/>
digits         整数     <input type="text" name="name" class=”digits”/>
同时使用多个类验证规则：
不能为空，并且为邮箱    <input type="text" name="name" class=”required email”/>

attribute属性验证:
equalTo      值必须和Id为ElementId指定的元素相等    <input type="password" name="name" equalTo="ElementId"/>
equallength   值长度必须等于equallength     <input type="password" name="name"  equallength ="4"/>
maxlength    最大字符长度不能大于maxlength            <input type="text" name="name" maxlength="20"/>
minlength    最小字符长度不能销于minlength             <input type="text" name="name" minlength="6"/>
max         数字不能大于max                          <input type="text" name="name" max="20"/>
min         数字不能小于min                           <input type="text" name="name" min="2"/>
min         数字不能小于min                           <input type="text" name="name" min="2"/>
extension    验证扩展名，多个扩展名使用英文逗号分隔，默认为"png,jpeg,jpg,gif"
<input type="text" name="name" extension=""/>
reg          自定义正则验证                             <input type="text" name="name" reg="[A-Z]*"/>

同时写上minlength 与 maxlength，此时将进行范围提示：
<input  type="password" value=""  name="urepwd" size="20"  class="txt required"  equalto="upwd" maxlength="12" minlength="6"/>
同时写上min与 max，此时将进行范围提示：
<input  type="password" value=""  name="urepwd" size="20"  class="txt required"  max="20" max="40"/>


3、提交表单时进行验证，为form表单添加指定id属性和onsubmit="return easyCheckForm(this)"事件即可
  <form action="login.action" onsubmit="return easyCheckForm(this)" id="regForm"> 


4、防止客户端重复点击submit提交按钮提交数据功能，默认用户点击submit按钮提交表单过程中禁用submit提交按钮。
通过
EasyCheck.easyCheckSubmitDisable=true;   //默认值，开启提交按钮禁用功能，防止重复提交
EasyCheck.easyCheckSubmitDisable=false;  //取消防重复提交功能


说明：由于Firefox浏览器的从缓存加载数据时的记忆原因，如果提交数据后，通过点击浏览器后退按钮回到网页，提交按钮将依然显示为禁用状态。
解决方法为给提交按钮加上 autocomplete="off" 的属性即可。
autocomplete属性作用说明：
此为了屏蔽浏览器表单默认的记忆功能。淘宝，百度的搜索框也有该属性。autocomplete 属性是非标准的，首先在 IE5 中加入，后 其它浏览器 都 支持。html5 也将其列表标准。

除此之外，如果不希望通修改html页面为提交按钮加autocomplete="off"属性来实现此功能，EasyCheck同样支持通过JS代码实现修正Firefox的功能：
//方法一：直接设置Firefox下后退后不禁用的按钮id数组，可指定多个
EasyCheck.removeDisableBtn=['submitId'];
//方法二：设置Firefox下后退后不禁用的formId数组，可指定多个form表单的ID，在表单中的所有submit按钮在后退后自动转为正常
EasyCheck.removeDisableForm=['formId'];
//方法三：设置强制将页面所有form表单中的submit按钮启用，默认值为false
EasyCheck.removeDisable=true; //（该参数会将所有所有from下禁用的submit按钮启用，所以如果确定项目页面没有默认需要禁用的submit按钮，该设置最为方便，可在EasyCheck.js源文件中将removeDisable参数配置为true达到同样效果）
以上方法支持混合使用


5、禁用验证失败时文本框样式
<textarea  name=" content" class="required" style="width: 400px;height: 100px;border: 1px solid #D4D0C8;" ecss="no"></textarea>
默认情况下验证失败时，除了显示错误提示信息外，文本框会使用.easycheck_errorInput类样式（验证未通过文本框样式）显示，如果需要禁用该显示效果，可以通过给文本框对象加入ecss =“no”属性实现禁用（EasyCheck CSS）。
在页面元素过多时，还可通过全局参数EasyCheck.ecss设置禁用页面所有验证对象的验证未通过样式：
EasyCheck.ecss="no";


6、自定义消息显示位置
（默认情况下，EasyCheck会在验证失败的文本框的后面自动显示提示消息，如果希望将提示信息显示在指定的位置，则可设置如下：
在页面合适位置创建消息提示div，为显示消息的div指定id，命名格式必须为error_ElementName（error_验证元素的name）
[info 属性为可选属性，如果设置了，会作为提示信息的前缀。]EasyCheck验证插件的提示消息会显示在您div指定的位置。）
如：

<div  id="error_uemail"  info="登录邮箱"></div> 

<input  type="text"  name="uemail" value="" class="txt required email" size="20"  /> 



7、自定义新类验证器
//2、定义验证函数(o,e)，检测用户名是否存在
function checkExists(o,e){
/*
自定义新验证插件函数，调用EasyCheck. addChkMethod(o,e,chkCode,msg)实现向系统注册新验证插件
o 触发事件的元素
e 事件对象
chkCode 实现验证的回调函数，返回true或false作为验证是否通过的结果
msg 提示消息
*/
return EasyCheck.addChkMethod(o,e,
function(o){ //o,验证对象
var val=$(o).val();
var res=false; //结果
dwr.engine.setAsync(false); //禁用DWR异步AJAX
UserInfoDWR.checkEmail(val,function(d){
res=d;
});
return res;
},
"该名称已被使用！");
}
//注册类验证器（验证器名称，验证函数）
EasyCheck.chkList.push(new EasyCheck.ChkRule("exists",checkExists));



更多请参考《EasyCheck使用手册》