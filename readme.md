# EasyCheck验证插件使用手册


说明：该插件与ECheck插件为同一插件，是ECheck的中文版本，提示消息和使用手册均为中文版。    
Notice：It's same to ECheck,this is Chinese language version, the English version please refer to GitHub：<https://github.com/ushelp/ECheck>


EasyCheck是一个基于jQuery的前端JS表单验证插件，无需编程通过HTML增强即可完成表单验证工作，简化前端开发工作，并保持统一验证风格，提高效率。最大的特点是组件和使用轻量级，但具有完全的灵活性和强的扩展性，支持基于类、基于属性和组合验证器。EasyCheck内置能满足日常开发的十多种常用验证器；支持文本框验证样式自动切换；默认、错误和正确三种DIV提示消息内容；并支持提示消息位置的自定义；支持防客户端重复提交功能；还支持用户开发注册新验证器进行扩展。

**兼容性**：EasyDataTable完全兼容IE6及以上版本、Firefox、Chrome、Safari、Opera等各内核（Trident、Gecko、Webkit、Presto）浏览器，并兼容多平台及系统（PC，TabletPC，Mobile）。

### [官方主页](http://www.lightfeel.com/easy/easycheck/zh-cn/index.jsp 'EasyCheck官网 HOME 主页')

----------



## 1、引入EasyCheck.css，在jQuery后引入EasyCheck.js 

```HTML
<link rel="stylesheet" type="text/css" href="css/EasyCheck.css"/>  
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/EasyCheck.min.js"></script>
<script type="text/javascript">
	//可选参数
	EasyCheck.blurChk=true;    //开启失去焦点时验证，false禁用，默认为true
	EasyCheck.keyupChk=true;  //开启键盘弹起时验证，false禁用，默认为true
	EasyCheck.loadChk=true;   //页面加载完后是否立即开启验证规则（否则仅在提交表单时验证，如果设置为false，blurChk和keyupChk无效），默认为true

    //指定表单元素实际使用的样式，错误提示时，需要切换表单元素默认类样式，如果表单元素使用的默认类样式不是.easycheck_defaultInput，则必须
	EasyCheck.defaultCss="txt";   
</script>
```

### EasyCheck.css说明： 
EasyCheck支持对文本框和div提示消息进行事件美化，可以根据事件及验证结果动态改变文本框和div样式，在不同状态时显示不同外观，使得表单项更加醒目，以提供更丰富的验证效果。
    
EasyCheck.css中定义了五种CSS样式：   
 
- div消息相关样式：    
验证通过消息类样式 `.easycheck_okInfo`    
验证未通过消息类样式 `.easycheck_errorInfo`  

- 文本框相关样式      
默认文本框类样式 `.easycheck_defaultInput`    
获得焦点时的文本框类样式：`easycheck_focusInput`    
验证未通过时的文本框类样式 `.easycheck_errorInput`  


根据实际项目需要可对以上CSS类样式进行修改，请将`.easycheck_defaultInput`类样式与您文本框默认类样式保持一致；将`.easycheck_errorInput`类样式修改为错误提示您需要的样式。或者，在页面重新定义该类样式，以替换默认样式。

```CSS
.easycheck_errorInfo {
	padding: 2px 8px;
	margin-left: 10px;
	background-color:#FFE6BF;
	color:#BF6200;
	display: inline;
	font-weight: bold;
}
.easycheck_okInfo {
	padding: 2px 8px;
	margin-left: 10px;
	background-color: #7AC935;
	color: #fff;
	display: inline;
	font-weight: bold;
}
.easycheck_defaultInput,.txt{
	border: 1px solid #cfcfc9;
}
.easycheck_focusInput{
	border: 1px solid #0066FF;
}
.easycheck_errorInput {
	border: 1px solid #DD080A;
}
```

## 2、在页面使用EasyCheck内置的验证器进行验证

EasyCkeck内置了16个日常开发常用的验证器，分为3种类型：类(Class)、属性(Attribute)、组合(Combination).

#### 5个Class类验证器：
类验证器在EasyCheck内部的名称都是以`.`开头:`.validatorName`。

```HTML
<验证器内部名称>            <使用方法>

.required      必填       <input type="text" name="name" class="required"/>     
.email         邮箱       <input type="text" name="name" class="email"/>
.url           URL        <input type="text" name="name" class="url"/>
.number        数字       <input type="text" name="name" class="number"/>
.integer       整数       <input type="text" name="name" class="integer"/>
```


同时使用多个类验证器，用空格分隔：

```HTML
不能为空，并且为邮箱    <input type="text" name="name" class=" required email" />
```


#### 9个Attribute属性验证器:
属性验证器在EasyCheck内部的名称都是以`[]`包围：`[validatorName]`。

```HTML
<验证器内部名称>                                       <使用方法>

[equalTo]     值必须和Id为ElementId指定的元素相等       <input type="password" name="name" equalTo="ElementId"/>
[equallength] 值长度必须等于equallength                <input type="password" name="name"  equallength ="4"/>
[maxlength]   最大字符长度不能大于maxlength             <input type="text" name="name" maxlength="20"/>
[minlength]   最小字符长度不能销于minlength             <input type="text" name="name" minlength="6"/>
[max]         数字不能大于max                          <input type="text" name="name" max="20"/>
[min]         数字不能小于min                          <input type="text" name="name" min="2"/>
[extension]   验证扩展名，多个扩展名使用英文逗号分隔，默认为"png,jpeg,jpg,gif"    <input type="file" name="name" extension=""/>
[reg]         自定义正则验证                             <input type="text" name="name" reg="[A-Z]*"/>
[vc]          使用Ajax请求vc指定的URL，进行验证码检测，URL返回true代表通过，false代表未通过   <input type="text" vc="chkvc.jsp" name="vc" />
服务器端自定义处理Demo（JSP）：
<%  
    //通过验证码文本框名称获得输入的
    String vc = request.getParameter("vc");  //数据
    String res = "false";
    if (vc != null && vc.equals(session.getAttribute("randomNumber"))) {
	    res = "true";
    }
    out.print(res);  //输出true代表通过，false代表未通过
%>
```

> 
> 说明，默认情况下为了避免不必要的服务器请求，验证码验证只在提交表单时进行，不在键盘弹起和失去焦点时进行验证的参数。实现代码：
> 
>     EasyCheck.easyCheckIgnore["[vc]"]=true; 
> vc验证码规则，键盘弹起和失去焦点时不验证，只在表单提交时验证`EasyCheck.easyCheckIgnore`参数可以设置弹起和焦点验证时的忽略验证器，可根据需要修改为false，代表进行键盘弹起和失去焦点时开启验证。



#### 2个Combination组合验证器:

```HTML
<验证器内部名称>                                    <使用方法>

[minlength][maxlength]  长度范围组合验证器：同时使用minlength属性验证器 与 maxlength属性验证器 
<input  type="password" value=""  name="urepwd" size="20"  class="txt required"  equalto="upwd" maxlength="12" minlength="6"/>
[min][max]              数字范围组合验证器：同时加入min属性验证器与 max属性验证器 
<input  type="password" value=""  name="urepwd" size="20"  class="txt required"  min="18" max="45"/>
```


**注意：根据EasyCheck内部验证原理，EasyCheck并不强制要求用户为每个表单元素必须指定id属性，可以简化日常元素定义。但如果页面存在`name`相同的表单元素，则需要使用id加以区分。在表单元素存在`id属性`时，`id`属性优先级高于`name`属性，EasyCheck内部将以`id属性`的值作为各个功能实现的参考标识——例如在需要实现与指定元素相关的扩展、配置操作时，优先使用`id`。**

## 3、提交表单时验证

提交表单时进行验证，为`form表单`添加指定`id属性`和`onsubmit="return EasyCheck.checkForm(this)"`事件即可

```HTML
<form action="login.action" onsubmit="return EasyCheck.checkForm(this)" id="regForm" method="post"> 
```


## 4、防止客户端表单重复提交功能

### 4.1、防止客户端表单重复提交功能的开启和禁用
EasyCheck默认开启了客户端防止重复提交功能：防止在用户验证通过提交数据过程中，由于网络未响应，用户多次点击提交等原因，导致重复提交数据功能。默认用户点击submit按钮提交表单过程中将禁用submit提交按钮。
如果在特殊场景下需要禁用该功能，可在引入EasyCheck.js后，设置`EasyCheck.easyCheckSubmitDisable`参数值为`false`即可禁用防重复提交功能：

```JS
EasyCheck.easyCheckSubmitDisable=false;  //取消提交按钮禁用功能，默认为true
```

### 4.2、Firefox中浏览器后退按钮禁用状态恢复配置

**Firefox下按钮状态特别说明：**

 由于Firefox浏览器的从缓存加载数据时的记忆原因，如果提交数据后，通过点击浏览器后退按钮回到网页，提交按钮将依然显示为禁用状态。
 
解决方法为给提交按钮加上 `autocomplete="off" `的属性即可。
> 
>  autocomplete属性作用说明：
> 此为了屏蔽浏览器表单默认的记忆功能。淘宝，百度的搜索框也有该属性。autocomplete 属性是非标准的，首先在 IE5 中加入，后 其它浏览器 都 支持。html5 也将其列表标准。
> 
 
除此之外，如果不希望通修改html页面为提交按钮加`autocomplete="off"`属性来实现此功能，EasyCheck同样支持通过JS代码实现修正Firefox浏览器后退按钮启用的功能：

方法一：直接设置Firefox下后退后不禁用的按钮id数组，可指定多个
```JS
 EasyCheck.removeDisableBtn=['submitId']; 
```

方法二：设置Firefox下后退后不禁用的formId数组，可指定多个form表单的ID，在表单中的所有submit按钮在后退后自动转为正常
```JS
 EasyCheck.removeDisableForm=['formId']; 
```

方法三：设置强制将页面所有form表单中的submit按钮启用，默认值为false
```JS
//该参数会将所有所有from下禁用的submit按钮启用
//所有如果确定项目页面没有默认需要禁用的submit按钮，该设置最为方便
EasyCheck.removeDisable=true;  
```

## 5、文本框样式管理
EasyCheck拥有丰富的外观自定义功能，能够在验证未通过时自动更改表单元素外观，使得表单项更加醒目，客户体验更加丰富。

EasyCheck支持为文本框在三种状态引用不同样式：默认文本框样式、获得焦点文本框样式、错误文本框样式——这三类状态分别引用了`EasyCheck.css`中的`.easycheck_defaultInput`、`.easycheck_focusInput`、`.easycheck_errorInput`。


这些样式值保存在如下参数中，并设置了EasyCheck.css中预定义的样式:
```JS
EasyCheck.defaultCss="easycheck_defaultInput"；
EasyCheck.focusCss="easycheck_focusInput"；
EasyCheck.errorCss="easycheck_errorInput"；
```

*由于默认情况下EasyCheck会使用`EasyCheck.css`中的`.easycheck_defaultInput`样式来重新定义文本框样式，所以需要将`.easycheck_defaultInput`样式同您表单的默认样式设置为一致。*    
 
如果希望为文本框重新定义使用的默认样式、获得焦点样式，错误样式，可以使用JavaScript进行修改。

- 修改文本框默认类样式：

  ```JS
	//指定全局表单元素默认使用的表单css类样式
	EasyCheck.defaultCss="txt";
	
	//如果页面有多个表单，不同表单中元素使用的类样式不同，则可分别指定表单中元素使用的类样式
	EasyCheck.formDefaultCss['formId']="txt2";  //指定id为formId的表单中元素使用的是.txt2样式
  ```

- 修改获得焦点时文本框类样式：

  ```JS
	//指定全局表单元素获得焦点时使用的表单css类样式
	EasyCheck.focusCss="focus";

	//如果页面有多个表单，不同表单中元素使用的类样式不同，则可分别指定表单中元素使用的类样式
	EasyCheck.formFocusCss['formId']="focus2";  //指定id为formId的表单中元素使用的是.focus2样式
  ```

- 修改错误时文本框类样式：

  ```JS
	//指定全局表单元素验证失败时使用的表单css类样式
	EasyCheck.errorCss="error";

	//如果页面有多个表单，不同表单中元素使用的类样式不同，则可分别指定表单中元素使用的类样式
	EasyCheck.formErrorCss['formId']="error2";  //指定id为formId的表单中元素使用的是.error2样式
  ```



## 6、禁用验证失败时文本框样式

```HTML
<input type="text" name="content" class="required" ecss="no"></textarea>
```

 默认情况下验证失败时，除了显示错误提示信息外，文本框会使用`.easycheck_errorInput`类样式（验证未通过文本框样式）显示，如果需要禁用该显示效果，可以通过给文本框对象加入`ecss ="no"`属性实现禁用错误样式。

在页面元素过多时，还可通过全局参数EasyCheck.ecss设置禁用页面所有验证对象的验证未通过样式：

```JS
//指定页面完全禁用错误文本框样式
EasyCheck.ecss="no";
```

指定id为regForm2的表单元素禁用错误文本框样式:

```JS
	EasyCheck.formEcss['regForm2']="no";
```

## 7、自定义全局错误消息内容
可根据需要修改指定验证规则的提示消息内容，语法：
```JS
	EasyCheck.msg['验证规则对应的消息名']="消息提示内容";
```

EasyCheck的消息支持占位符，如：
```JS
	EasyCheck.msg['required']="is required";
	EasyCheck.msg['lengthRange']="最小长度{0}，最大长度{1}！";
```

`EasyCheck.msg`列表中默认的消息名称和默认值如下：

```JS
// 验证消息列表
msg:{
  required:"不能为空",
  email:"邮箱格式不正确",
  url:"网址有误",
  number:"必须为数字",
  integer:"必须为整数",

  equalto:"输入不一致",
  minlength:"长度不能小于{0}",
  maxlength:"长度不能大于{0}",
  numberrange:"值必须在{0}和{1}之间",
  min:"不能小于{0}",
  max:"不能大于{0}",
  regexp:"格式有误",
  extension:"文件后缀只能为{0}",
  vc:"输入有误",

  equallength:"长度必须为{0}位",
  lengthrange:"长度必须在{0}到{1}之间"
},
```



## 8、自定义默认，正确，错误提示消息

### 8.1、EasyCheck支持手动为每个验证元素指定3类提示信息：默认提示，错误提示，正确提示。

提供如下id命名的DIV即可（如果表单元素name相同，则使用id区分。表单元素存在`id`属性，则使用`XXX_ElementId`命名优先）：

- 默认提示DIV id：`default_ElementId` || `default_ElementName`
- 正确提示DIV id：`ok_ElementId` || `ok_ElementName`（会使用`.easycheck_okInfo`样式）
- 错误提示DIV id：`error_ElementId` || `error_ElementName`（会使用`.easycheck_errorInfo`样式）

```HTML
<div id="default_uname"  style="display: inline;">必填，字母开头，只能包含字母和数字</div> 
<div id="ok_uname" style="display: inline;">正确</div>
<div id="error_uname"   prefix="用户名" style="display: inline;"></div>

<div id="error_uemail"  info="请填写邮箱！"  style="display: inline;"></div>
```

使用错误提示DIV可以将提示信息显示在指定的位置（默认情况下，错误提示信息的DIV无需指定和手动创建，EasyCheck会自动创建并显示在文本框后）。错误信息DIV具有以下两个可选属性：  
`info`：可选属性，错误提示信息（会覆盖默认提示内容）   
`perfix`：可选属性，错误信息提示前缀  
如：  

```HTML
<tr>  
      <td align="left"  width="300px">
       	<label class="lbl"><div style="color:#FF0000; display:inline">*</div>登录邮箱</label>
          <div  id="error_uemail"  info="请填写登录邮箱！"></div> 
       /td>
</tr>
	<tr>  
        <td align="left">
<input  type="text"  name="uemail" value="" class="txt required email" size="20"  /> 
</td>
</tr>
```
### 8.2、EasyChek支持错误提示信息内容的完全自定义，支持为每个表单元素的每个验证器使用不同消息，格式为：
**如果表单元素存在id属性，则优先使用ElementId**
```JS
EasyCheck.msgs['ElementId'||'ElementName']={  
	'验证器名称1':"提示内容",
	'验证器名称2': "提示内容",
	……
};
```

**定义时，类验证器名前面加点.，属性验证器名使用中括号[]。**

如，为uname元素的required类验证器（**前面加点.**）和reg属性验证器（**使用中括号[]**）指定自定义提示信息。	

```JS
EasyCheck.msgs['uname']={
	'.required': '必须有啊！',
	'[reg]':'只能包含字母和数字'
};
```


EasyCheck的消息支持使用占位符，如果消息含有占位符（`{0}`,`{1}`,……）,则需要通过**消息函数**处理和返回消息，并使用`EasyCheck.formatMsg("消息内容","占位参数值1"，……)`对消息进行格式化。

如，为upwd元素的长度范围组合验证器指定自定义提示信息，并格式化占位符消息：

```JS
EasyCheck.msgs['upwd']={
	'[minlength][maxlength]':
	//消息函数，o 当前DOM对象
	function(o){ 
		return EasyCheck.formatMsg("密码位数：{0}-{1}" , o.attr('minlength') , o.attr('maxlength'));
	}
};
```

或

```JS
//消息函数，o 当前DOM对象
var upwdMsg = function(o){
	return EasyCheck.formatMsg("密码位数：{0}-{1}！", o.attr('minlength') , o.attr('maxlength'));
};
	
EasyCheck.msgs['upwd']={
	'[minlength][maxlength]':upwdMsg
};
```

*注意：使用自定义消息时，一般请勿在错误提示DIV中使用info属性设置提示消息，如果使用info属性设置提示消息会覆盖以上自定义的消息内容。*


## 9、手动清除和设置错误提示消息

### 9.1、清除所有的错误提示。  
清除错误提示。  
`formId`： 可选。指定时，仅清除指定form中的错误消息；不指定，清除当前页面所有错误消息。
```JS
EasyCheck.clearAllError( [formId] );
```

### 9.2、还原消息。  
清除错误提示，并清除正确提示，显示默认提示。  
例如，验证表单在弹出层中时，关闭层重新打开时，清空层中表单之前的所有验证提示信息。  
`formId`：可选。指定时，仅清除指定form中的错误消息；不指定，清除当前页面所有错误消息。
```JS
EasyCheck.restoreAll( [formId] );
```

### 9.3、为指定表单元素手动设置错误消息(可以使用统一风格提示自定义的消息)。
可使用此方法来显示从服务器返回的指定消息。  
`elementId || elementName || elementDOM`：指定表单元素的id，或者表单元素DOM对象。  
msg：错误消息。
```JS
EasyCheck.showError('elementId'||'elementName'||elementDOM , 'msg' );
```

### 9.4、清除指定表单元素的错误消息。
`elementId || elementName || elementDOM`：指定表单元素的id，或者表单元素DOM对象。
```JS
EasyCheck.clearError('elementId'||'elementName'||elementDOM  );
```

## 10、高级扩展：自定义新验证器插件，扩展EasyCheck验证框架

EasyCheck具有灵活的扩展性，使用`EasyCheck.addChk`函数仅需轻松一步即可加入自定义新验证器！  

### 10.1、自定义新的验证器（Class,Attribute）

调用 `EasyCheck.addChk(chkName,chkFun,chkMsg)`函数即可实现向系统注册自定义新验证插件函数。

```JS
/*    
* `checkName`    注册的属性或类验证器名称（只能使用英文字母和数字）   
* `chkFun`       验证回调函数   
* `chkMsg`       验证失败的提示消息或消息函数   
*/   
```

**验证器名称命名规范：**   
- **注册类验证器：验证器名称必须以点.开头，如`.exists`**   
- **注册属性验证器：验证器名称必须使用中括号[]括起，如`[theme]`**
    
 注册EasyCheck类和属性验证器语法：

```JS
EasyCheck.addChk("验证器名称",
	//o代表当前DOM对象
	function(o){
		//验证实现 
        // var val=$(o).val();
        // return $.trim(val)!="";
	   //返回true或false.true代表验证通过；false代表未通过，将显示chkMsg的消息
	}
	,
	"验证失败时的消息字符串");
```

### 10.2、自定义新的组合验证器（Combination）：
EasyCheck支持组合使用多个已注册的验证器来创建新的组合验证器。  
如：通过组合已有的`min属性验证器`和`max属性验证器`，实现数字范围检测验证器。   
验证器命名规范为：`验证器1验证器2`  
例，组合后的新验证器注册名`[min][max]` ：该验证器仅在用户**同时使用min和max属性验证器时**工作，使用组合验证器时`[min]`和`[max]`的独立验证器函数会被忽略，直接执行`[min][max]` 组合验证器的验证函数。

### 10.3、使用消息函数获得消息字符串
某些消息内容同当前表单元素的属性或值相关，EasyCheck支持使用**消息函数**返回消息字符串。

```JS
EasyCheck.addChk("验证器名称",
	//o代表当前DOM对象
	function(o){
		//验证实现 
        // var val=$(o).val();
        // return $.trim(val)!="";
	   //返回true或false.true代表验证通过；false代表未通过，将显示chkMsg的消息
	}
	,
	// 使用提示函数代替消息字符串  
    // o 代表当前DOM对象
	function(o){
		  // var val=$(o).val();
          //return 返回验证失败时的消息字符串
	});
```

### 10.4、自定义验证器的验证触发事件
EasyCheck支持三种验证触发事件：键盘弹起onkeyup验证、失去焦点onblur验证、提交表单onsubmit验证。默认注册的验证器会在三类事件中都触发验证。

EasyCheck支持对验证器和表单元素的的触发事件(键盘弹起onkeyup验证、失去焦点onblur验证)进行管理，部分验证器可根据情况禁用某些影响性能或务必要的验证触发事件。    

#### 验证器触发事件管理

如果注册的验证器只需要在提交表单时验证（如验证码，无需失去焦点或键盘弹起验证），则可注册如下代码：

- `EasyCheck.easyCheckIgnore`：指定的验证器忽略验证，设置后同时忽略失去焦点事件和键盘弹起事件的验证。
```JS
EasyCheck.easyCheckIgnore["验证器名称"]=true;
```

- `EasyCheck.easyCheckBlurIgnore`：指定的验证器忽略失去焦点事件验证
```JS
EasyCheck.easyCheckBlurIgnore["验证器名称"]=true;
```

- `EasyCheck.easyCheckKeyupIgnore`：指定的验证器忽略键盘弹起事件验证
```JS
EasyCheck.easyCheckKeyupIgnore["验证器名称"]=true;
```

#### 表单元素触发事件管理

  指定表单元素elementId或elementName:（**elementId优先**）

- `EasyCheck.easyCheckEleIgnore`：指定表单元素,盘弹起和失去焦点事件忽略验证
```JS
EasyCheck.easyCheckEleIgnore["表单元素id或name"]=true;
```

- `EasyCheck.easyCheckEleBlurIgnore`：指定表单元素，失去焦点事件忽略验证
```JS
EasyCheck.easyCheckEleBlurIgnore["表单元素id或name"]=true;
```

- `EasyCheck.easyCheckEleKeyupIgnore`：指定表单元素，键盘弹起事件忽略验证
```JS
EasyCheck.easyCheckEleKeyupIgnore["表单元素id或name"]=true;
```

## 11、高级选项：自定义新验证器实例
假设页面需要一个检测进行用户名是否存在的类验证器，则可直接定义。

```JS
//注册新的类验证器（验证器名称，验证函数，错误消息），检测用户名是否存在
EasyCheck.addChk(".exists",
	function(o){
			 var val=$(o).val();
		 var res=false; //结果,Ajax返回检测结果
		 dwr.engine.setAsync(false); //禁用DWR异步AJAX
		 UserInfoDWR.checkEmail(val,function(d){
			res=d;
		 });
		 return res;
	}
	,
	"该名称已被使用！");
```


## 12、高级扩展：验证框架提示消息内容维护管理

### 12.1、使用EasyCheck.msg列表管理消息

为了方便对提示消息进行统一管理，可以将提示消息统一定义在EasyCheck.msg列表中。

**EasyCheck.msg["自定义消息名称"]= "消息内容，可使用{0}，{1}……占位符"；**

在自定义的新验证函数的消息提示部分，使用`EasyCheck.msg["自定义消息名称"]`来获取消息内容，如：

```JS
//定义验证器提示消息
EasyCheck.msg["exists"]="该名称已被使用！";

EasyCheck.addChk(".exists",
	function(o){
		if($(o).val()=='jay'){
			return false;
		}
		return true;
	}
	,
	EasyCheck.msg["exists"]  //获取消息
);
```

### 12.2、如果消息内容含有占位符（{0}，{1}，……），则使用消息函数处理
消息通过`EasyCheck.formatMsg("消息内容","占位参数值1"，……)`进行格式化，如：
```JS
//定义验证器提示消息
EasyCheck.msg["exists"]="“{0}”该名称已被使用！";

EasyCheck.addChk(".exists",
	function(o){
		if($(o).val()=='jay'){
			return false;
		}
		return true;
	}
	,
   //消息函数
	function(o){
		return EasyCheck.formatMsg(EasyCheck.msg["exists"],$(o).val());
	}
);
```

[在线Demo](http://www.lightfeel.com/easy/easycheck/zh-cn/index.jsp#demo '在线实例')

联系、反馈、定制Email：<inthinkcolor@gmail.com>




<p>
<strong>支付宝钱包扫一扫捐助：</strong>
</p>
<p>

<img alt="支付宝钱包扫一扫捐助" src="http://www.lightfeel.com/easy/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>

