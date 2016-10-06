# EasyCheck validation framework manual 

EasyCheck is a jQuery based front-end JavaScript forms authentication framework, without programming through HTML enhanced form validation work, simplifying the front-end development work, and maintain a unified style, improve efficiency. Custom interface, and provides a flexible support plug-in extension based on validation engine. 


Latest version: `5.0.0-RELEASE`

### [Official home](http://www.easyproject.cn/easycheck/en/index.jsp 'EasyCheck official home page')

### [Demo](http://www.easyproject.cn/easycheck/en/index.jsp#demo 'Demo - English]')


## Features 

**Main feature:**

1. Lightweight

2. No JavaScript programming

3. Support class-based, based on a combination of property and validators
 
4. Built to meet the daily development of a dozen popular validator

5. Verify that the text box to automatically switch styles

6. By default, errors and correct three kinds of message content

7. Tip custom message location

8. Anti-client resubmit function

9. scalability, support for registered users to develop new validator

10. Engine framework extension, support plug-ins: DIV, ToolTip, Bootstrap3 plug-in


**Compatibility:**
Easy DataTable is fully compatible with IE6 and above, Firefox, Chrome, Safari, Opera and other core (Trident, Gecko, Webkit, Presto) browser, and compatible with multiple platforms and systems (PC, TabletPC, Mobile).


**Support plug-ins:**
- DIV
- ToolTip
- Bootstrap3

> Description: EasyCheck is the same plugin as the ECheck plugin. In the early ECheck corresponds to the English version, EasyCheck corresponds to the Chinese version, in the `4.0.0` version, through the language file control, no longer distinguish by region to download.  


## Architecture 

![EasyCheck Functions](images/easycheck.png)

![EasyCheck Engine](images/easycheck-engine.png)


## 1. Add the validation plug-in

Add CSS and JavaScript file templates:

 ```
 <!-- EasyCheck start -->
 
 <!-- Validation plug-in required CSS ** If there is ** -->
 <link rel="stylesheet" type="text/css" href="easycheck/plugins/XXX/easycheck-XXX.css"/>  
 
 <!-- jQuery must first -->
 <script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
 
 <!-- EasyCheck engine freamwork -->
 <script type="text/javascript" src="easycheck/easy.easycheck-x.y.z.min.js"></script>
 <!-- XXX plugin -->
 <script type="text/javascript" src="easycheck/plugins/XXX/easy.easycheck-XXX.js"></script>
 <!-- Introduced using all: includes the engine framework and XXX plug-ins -->
 <!--
 <script type="text/javascript" src="easycheck/plugins/div/easy.easycheck-div-all.min.js"></script>
 -->
 	
 <!-- EasyCheck language file: i18n message --> 
 <script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-language_COUNTRY.js"></script>
 
 <!-- Optional configuration parameters   -->
 <script type="text/javascript">
 		// EasyCheck.formFocusCss['regForm2']="focus2";
 		// EasyCheck.formErrorCss['regForm2']="error2";
 		EasyCheck.msgs['uname']={
      	'.required':"Required ah!"
      	,
      	'[reg]':'Only allow alphanumeric, cannot begin with Numbers'
 		};
 </script> 
 
 <!-- EasyCheck end -->
 ```

- **DIV plugin**
 ![DIV demo](images/div.png)

 use templates: 

 ```HTML
 <!-- EasyCheck start -->
 
 <!-- Div plugin CSS -->
 <link rel="stylesheet" type="text/css" href="easycheck/plugins/div/easycheck-div.css"/>  
 <!-- <link rel="stylesheet" type="text/css" href="easycheck/plugins/div/easycheck-div2.css"/> -->

 <!-- jQuery: must first -->
 <script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
 <!-- EasyCheck & DIV Plugin JS -->
	<script type="text/javascript" src="easycheck/plugins/div/easy.easycheck-div-all.min.js"></script>
 <!-- EasyCheck language file: i18n message --> 
 <script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>
 
 <!-- Other optional -->
 <script type="text/javascript">
 		EasyCheck.msgs['uname']={
        	'.required':"Required ah!"
        	,
        	'[reg]':'Only allow alphanumeric, cannot begin with Numbers''
 		};
 </script> 

 <!-- EasyCheck end -->
 ```

- **ToolTip plugin**
 ![DIV demo](images/tooltip.png)

 use templates: 

 ```HTML
 <!-- EasyCheck start -->
 
 <!-- Tooltip plugin CSS -->
 <link rel="stylesheet" type="text/css" href="easycheck/plugins/tooltip/easycheck-tooltip.css"/>  

 <!-- jQuery: must first -->
 <script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
 <!-- EasyCheck & Tooltip Plugin JS -->
 <script type="text/javascript" src="easycheck/plugins/tooltip/easy.easycheck-tooltip-all.min.js"></script>
 <!-- EasyCheck language file: i18n message --> 
 <script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>
 
 <!-- Other optional -->
 <script type="text/javascript">
 		EasyCheck.msgs['uname']={
      	'.required':"Required ah!"
      	,
      	'[reg]':'Only allow alphanumeric, cannot begin with Numbers'
 		};
 </script> 

 <!-- EasyCheck end -->
 ```

- **Bootstrap3 plugin**
 ![DIV demo](images/bootstrap3.png)

 use templates:

 ```HTML
 <!-- EasyCheck start -->

 <!-- jQuery: must first -->
 <script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
 <!-- EasyCheck & DIV Plugin JS -->
 <script type="text/javascript" src="easycheck/plugins/bootstrap3/easy.easycheck-bootstrap3-all.min.js"></script>
 <!-- EasyCheck language file: i18n message --> 
 <script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>
 
 <!-- Other optional -->
 <script type="text/javascript">
 		EasyCheck.msgs['uname']={
      	'.required':"Required ah!"
      	,
      	'[reg]':'Only allow alphanumeric, cannot begin with Numbers'  
 		};
 </script> 

 <!-- EasyCheck end -->

 <!-- Bootstrap3 start-->
 <link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
 <link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap-theme.min.css">
 <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
 <!-- Bootstrap3 end-->
 ```

## 2. Use the validator

EasyCheck built in 16 daily development commonly used validator. Is divided into three types:
- **Class**: 5 
- **Attribute**：9 
- **Combination**： 2 



#### 5 Class validator: 

The name of the class validator within EasyCheck are `. ` start: `.validatorName`。

```HTML
<Validator internal name>      <use>

required      Required        <input type="text" name="name" class="required"/>     
email         Email        <input type="text" name="name" class="email"/>
url           URL        <input type="text" name="name" class="url"/>
number        A number       <input type="text" name="name" class="number"/>
integer       integer        <input type="text" name="name" class="integer"/>
```

Simultaneous use of multiple classes validators , separated by spaces :

```HTML
Can not be empty , and the mailbox   <input type="text" name="name" class=" required email" />
```


#### 9 Attribute attribute validator :
Attribute names EasyCheck internal verifier is to `[]` surround,like: `[validatorName]`.

```HTML
<Validator internal name>                                                <use>

equalTo     value must be equal to the specified element ElementId       <input type="password" name="name" equalTo="ElementId"/>
equallength value must be equal to the length of equallength                <input type="password" name="name"  equallength ="4"/>
maxlength   The maximum character length can not exceed maxlength maxlength             <input type="text" name="name" maxlength="20"/>
minlength  minimum character length can not be eliminated on minlength             <input type="text" name="name" minlength="6"/>
max         number can not be greater than max                          <input type="text" name="name" max="20"/>
min        number can not be less than min                          <input type="text" name="name" min="2"/>
extension   extension validation extension, multiple extensions use a comma -delimited , the default is "png, jpeg, jpg, gif"     <input type="file" name="name" extension=""/>
reg       custom regular verification                             <input type="text" name="name" reg="[A-Z]*"/>
vc          Ajax request using vc vc specified URL, for verification code detection , URL returns true Congress passed , false representatives did not pass   <input type="text" vc="chkvc.jsp" name="vc" />
Server-side custom processing Demo (JSP):
<%  
    //Get the input verification code via text box name
    String vc = request.getParameter("vc");  //data
    String res = "false";
    if (vc != null && vc.equals(session.getAttribute("randomNumber"))) {
	    res = "true";
    }
    out.print(res);  //output true Congress passed , false representatives did not pass
%>
```

> 
> That by default in order to avoid unnecessary server requests, only when the form is submitted captcha validation, not in the key up and lose focus when validated parameters. The implementation code: 
> EasyCheck.easyCheckIgnore["[vc]"]=true; 
> `EasyCheck.easyCheckIgnore` parameter can be set up and the focus of the validation to ignore the validator, can according to need to modify to false, representatives of key up and validation of the open when loses focus. 



#### 2 Combination validator:

```HTML
<Validator internal name>                                  <use>

[minlength] [maxlength] length combination Validator : Using minlength property validator and validator maxlength attribute
<input type="password" value="" name="urepwd" size="20" class="txt required" equalto="upwd" maxlength="12" minlength="6"/>
[min] [max] a combination of numerical range validator : validator attributes while adding min and max attributes validator
<input type="password" value="" name="urepwd" size="20" class="txt required" min="18" max="45"/>
```

#### Notice:
**Recommendations for each test element specifies the only element id, in order to avoid unnecessary conflict. **
> EasyCheck is not mandatory for each form element specifies the id attribute. But if the page `name` same form element, you need to use `id` distinction. EasyCheck the internal `id`  attribute values for each functional implementation reference marker - such as the need to implement the expansion of the associated with the specified element, configuration, operation, use `id` priority. 



## 3. Run the form validation 

- **Submit the form automatically validated form: **

 Must set `id` and `easycheck="true"` to form。
 
 ```HTML
 <form action="login.action" method="post" id="regForm" easycheck="true"> 
 ```

- **Manual verification form form: **

 Sometimes validate form does not need to submit the form, can be obtained by manual validation JS specified form. 
 
 ```JS
 //Verify the selector specified form, but not submitted 
 var flag=EasyCheck.checkForm("formSelector");
 if(flag){
     // pass
 }else{
     // not pass
 }
 ```

 Use on `onsubmit` event，the same as`easycheck="true"`:

 ```
 <form action="login.action" method="post" id="regForm" onsubmit="return EasyCheck.checkForm(this)"> 
 ```


## 4. The prompt message management 


### 4.1 The global error message management 

EasyCheck global validation message definition in lang directory corresponding i18n language file, message support placeholder. Such as: 

```JS
EasyCheck.msg = {
     required:"Is required",
     email:"Invalid email",
     url:"Invalid url",
     number:"Invalid number",
     integer:"Invalid integer",
     equalto:"Didn't match input",
     equallength:"length  has to be {0}",
     lengthrange:"Please use between {0} and {1} characters",
     minlength:"Use at least {0} characters",
     maxlength:"Must have at most {0} characters",
     numberrange:"Value is between{0}and{1}",
     min:"The minimum value of {0}",
     max:"The maximum value of {0}",
     regexp:"Invalid value",
     extension:"Invalid extension,only {0}",
     vc:"Didn't match the word verification"
}
```

Prompt message content of modified to specify validation rules, grammar: 

```JS
// EasyCheck.msg['validatorName']="content";
EasyCheck.msg['required']="is required";
EasyCheck.msg['lengthRange']="Minimum length {0}, maximum length {1}! ";
```


### 4.2 For the element to assign specific error messages 

EasyCheck support completely custom error message content, and can be used for each form element each validator different messages. 

- **The error message custom: **
 ```JS
 EasyCheck.msgs['ElementId'||'ElementName']={  
     '.classValidator':"Content",
     '[attributeValidator]': "Content",
     '[validator1][validator2]':'Content'
     ……
 };
 ```

 - If the form element exists ` id ` attribute, use will be the priority ` ElementId ` 
 - The class validator start with `.`, attribute validator round with `[]` . 

 
 Example: 
 
 ```JS
 EasyCheck.msgs['uname']={
  // required class validator（**.**）
 	'.required': '必须有啊！',
  // reg attribute validator（**[]**）
 	'[reg]':'只能包含字母和数字'
 };
 ```

- **Message processing functions:**

 Example:
 
 ```JS
 EasyCheck.msgs['upwd']={
 	'[minlength][maxlength]':
 	// Message function, o is current jqueryDOM
 	function(o){ 
 		return EasyCheck.formatMsg("password length: {0}-{1}!" , o.attr('minlength') , o.attr('maxlength'));
 	}
 };
 ```
 
 or
 
 ```JS
 // Message function, o is current jqueryDOM
 var upwdMsg = function(o){
 	return EasyCheck.formatMsg("password length: {0}-{1}!", o.attr('minlength') , o.attr('maxlength'));
 };
 	
 EasyCheck.msgs['upwd']={
 	'[minlength][maxlength]':upwdMsg
 };
 ```

 > Note: when using a custom message, generally do not use the info in error DIV attribute set prompt message, if you use the info attribute set prompt message will cover more than a custom message content. 



### 4.3 Default, Correct, Error 3 message management 

EasyCheck in news tips and management provides great flexibility. Each form elements on the message content and appearance can be customized, you can manually for each message element specifies three class (the default, correct and error). 


Messages can be defined in ` div `, ` p `, ` span ` container tag, shown in the location specified. Recommended ` span `, can be in the same line, according to the error and correct prompt default set to hide (` display: none `). 



- **Message defined in the tag body**

 ```HTML
 <!-- Default （id: `default_ElementId`）-->
 <span id="default_ElementID"> The default message for elementId </span>
 <!-- Correct （id: `correct_ElementId`,use `.easycheck_okInfo` style）-->
 <span id="correct_ElementID" style="display:none"> The correct message for elementId </span>
 <!-- Error（id: `error_ElementId`,use `.easycheck_errorInfo` style）-->
 <span id="error_ElementID" style="display:none"> The error message for elementId</span>
 ```

The content of the error message is optional, if you specify the prompt content, will cover other prompt message. Error messages TAB has an optional attribute ` perfix ` can add a prefix for the error information content: 
  ```HTML
  <span id="error_表单元素ID" style="display:none" perfix="username "></span>
  ```

- **Message defined in the info attribute**
 
 Prompt message can also define the `info` attribute, can avoid the display problems. 

 ```HTML
 <span id="default_ElementID" info="The default message for elementId"></span>
 <span id="correct_ElementID" info="The correct message for elementId"></span>
 <span id="error_ElementID" info="The error message for elementId"></span>
 ```

 If you use a ` info ` attribute defines the default prompt message (`defMsg`), also need the page is loaded after the completion of the call `EasyCheck. InitDefMsg(); ` effect. 


 ```JS
 $(function(){
      //Manually initialize the default message to take effect
      EasyCheck.initDefMsg();
 })
 ```

- **priority**

 `info attribute` > `tag body`

- **Example**

 ```HTML
 <input type="text" id="uname" name="uname" class="txt2 required" reg="^[A-Za-z][A-Za-z0-9]*$"/>
 <span id="default_uname" info="Mandatory, letter, can only contain letters and Numbers "></span> 
 <span id="correct_uname" info="OK!"></span> 
 <span id="error_uname"  prefix="username " style="display:none">can only use letters and Numbers</span> 
 ```

- **Bootstrap3**

 Bootstrap3 prompt message must be add `class="help-block"` 

 ```HTML
 <span id="default_usermail" class="help-block">required&amp;email</span >
 <span id="correct_usermail" class="help-block" info="correct"></span> 
 ```



### 4.4 Manual removal and setting up the error message 

#### 4.4.1 Remove all of the error message 

Clear error message. 

`formId`: optional. When specified, only remove specifies the error message in the form; All the error messages is not specified, the removal of the current page. 

```JS
EasyCheck.clearAllError( [formId] );
```

#### 4.4.2 Restore of the message 
 
Restore messages (error, prompt, correct display the default prompt) 
 
Scene: the form in the pop-up layer, close the layer to open, clear layer form before all the validation message. 

`formId`: optional. When specified, only restore specifies the error message in the form; All the error messages is not specified, the restore of the current page. 

```JS
EasyCheck.restoreAll( [formId] );
```

#### 4.4.3 For the specified form elements manually error message (you can use the unified style tips custom messages). 
 
Can use this method to display the specified message returned from the server. 

`elementId || elementName || elementDOM`: specify the form element id, or form elements DOM object. 
 
`msg`: an error message. 

```JS
EasyCheck.showError('elementId'||'elementName'||elementDOM , 'msg' );
```

#### 4.4.4 Clear error message specified form elements. 

`elementId || elementName || elementDOM`: specify the form element id, or form elements DOM object. 

```JS
EasyCheck.clearError('elementId'||'elementName'||elementDOM  );
```

### 4.5 The message content format extension 

Tip to diversify its appearance (e.g., ` ToolTip `), EasyCheck can be extended to unified message appearance, for example will prompt message unified packaging on a custom ` DIV ` fragment. In the custom segments of the message, use the ` {0} ` tag references prompt message content. 


- **Global Settings:**

 ```JS
 EasyCheck.defMsg='<div class="tip">default: {0}</div>';
 EasyCheck.errorMsg='<div class="tip">error: {0}</div>';
 EasyCheck.correctMsg='<div class="tip">correct: {0}</div>';
 ```


- **Local Settings (for id specified FormId or ElementId extension)**

 ```
 EasyCheck.defMsgs["regForm"]='<div class="tip">default: {0}</div>';
 EasyCheck.errorMsg["username"]='<div class="tip"error: {0}</div>';
 EasyCheck.correctMsgs["regForm"]='<div class="tip">correct: {0}</div>';
 ```

- **Format the priority**

 `elementId` > `formId` > `global`
 
 `EasyCheck.defMsgs["elementId"]` > `EasyCheck.defMsgs["formId"]` > `EasyCheck.defMsg`.


- **The default prompt message initialized manually**
 
 Changed the default prompt message (` defMsg `) format, need to manually call ` initDefMsg ` (), let the modified default information to take effect. 

 ```JS
 $(function(){
 	EasyCheck.defMsg='<div class="tooltip-right-def tooltip-def">'+
   	'<div class="tooltip-content-def">{0}</div>'+
   	'<div class="tooltip-arrow-outer-def"></div>'+
   	'<div class="tooltip-arrow-def" ></div>'+
   	'</div>';
    // initialize the default message manually to take effect 
   	EasyCheck.initDefMsg();
 })
 ```

- **Custom message tag **

 The default reference message is marked as ` {0} `, if you need a custom can directly modify ` msgMark ` properties. 
 
 ```JS
 EasyCheck.msgMark="{msg}";
 EasyCheck.defMsg='<div class="tip">默认内容：{msg}</div>';
 ```


## 5. Custom appearance 

### 5.1 Messages and input global style 

EasyCheck can dynamically change the text box according to the event and the results of the validation and div style, show different appearance in different states, make the form item more eye-catching, to provide more abundant validation effect. 
 
Part of the validation plug-in (DIV, Tooltip) need to first introduce the corresponding CSS file. And supports the following four types of CSS style class for customization: 

- pass tip: `.easycheck_okInfo`  
- not pass tip: `.easycheck_errorInfo`    
- focus input: `easycheck_focusInput`    
- not pass input: `.easycheck_errorInput`  
 
According to the practical projects need to modify CSS class above style: 

```CSS
.easycheck_errorInfo {
	margin-left: 10px;
	color:#FF2A2B;
	display: inline;
	font-size: 13px;
}
.easycheck_okInfo {
	margin-left: 10px;
	display: inline;
	font-size: 13px;
	color:#007C00;
}

.easycheck_focusInput{
	border: 1px solid #0066FF !important; 
}
.easycheck_errorInput {
	border: 1px solid #DD080A !important;
}

```

> The Bootstrap is the default state of check, don't need to configure the CSS style. 


## 5.2 The text box appearance management 
 
By default validation fails, in addition to display an error message text box will change with calibration status. 
EasyCheck support for text box in the three states reference different styles: 

- **The default style of a text box**：user-defined 
- **The style of a text box on focus**：`.easycheck_focusInput`
- **The style of a text box not pass**：`.easycheck_errorInput`


### Modify when the text box focus class style: 

```JS
// global
EasyCheck.focusCss="focus";

// only this form
EasyCheck.formFocusCss['formId']="focus2"; 
```

### Modify when the text box not pass class style: 

```JS
// global
EasyCheck.errorCss="error";

// only this form
EasyCheck.formErrorCss['formId']="error2";  
```

### Disable validation failure style of a text box 

`ecss ="no"` attribute for disable the not pass text style. 


```HTML
<input type="text" name="content" class="required" ecss="no"></textarea>
```

You can also use `EasyCheck.ecss` to settings:

```JS
// global
EasyCheck.ecss="no";
// only this form
EasyCheck.formEcss['regForm']="no";
```


## 6. Repeat submit function to prevent the client form 

EasyCheck support the client to prevent repeat submit function: when users click on the submit button will disable the submit button submits the form. Prevent the user authentication by submitting data in the process, because the network did not response, users click the submit, lead to repeat submit data function. 
 
Shut down to prevent repeat submit function form: 

```JS
// close the submit button to disable the function, the default is true 
EasyCheck.easyCheckSubmitDisable=false; 
```

### Firefox button state special instructions 
 
As a result of the Firefox browser load the data from the cache memory, if the submitted data, by clicking on the browser back button to return to web page, the submit button will still show for the disabled state. 

- add `autocomplete="off"` on submit button.
> 
>  autocomplete ahielding browser forms the default memory function. 

> 
 
Also can set by JS

- Method One: Set directly under Firefox after disabling the back button id array , you can specify multiple
 ```JS
  EasyCheck.removeDisableBtn=['submitId']; 
 ```

- Method Two : Set array formId back after disabling the next Firefox , you can specify more than one form of the form ID, all the submit button in a form automatically back to normal after
 ```JS
  EasyCheck.removeDisableForm=['formId']; 
 ```

- Method three : Set to force all pages form a form submit button is enabled, the default value is false
 ```JS
 //This parameter will disable all all from under the submit button is enabled
 //If it is determined that all project page does not need to disable the submit button by default , this setting is most convenient
 EasyCheck.removeDisable=true;  
  ```



## 7. The optional configuration parameters 

```JS
<!-- The optional configuration parameters  -->
<script type="text/javascript">
    // When using loses focus, false to disable, the default is true 
    EasyCheck.blurChk=true;    

    // When using the keyboard pop-up authentication, false to disable, the default is true 
    EasyCheck.keyupChk=true;  
    
    // Immediately after the page is loaded whether to open the validation rules (or only when submitting the form validation, if set to false, blurChk and keyupChk invalid), the default is true 
    EasyCheck.loadChk=true;   

   // Whether form elements gains focus when the reduction for the default prompt, the default is false (Bootstrap3 defaults to true) 
   EasyCheck.resetOnFocus=false;

   // Bootstrap3, whether to display the bootstrap small icon, the default is true 
   EasyCheck.icon=true; 
</script>
```


## 8. Add a new validator 

Using ` EasyCheck. AddChk ` function only easy step can add new custom validator! 

### 8.1 The custom new validator (Class, Attribute) 

Call ` EasyCheck.AddChk (chkName chkFun, chkMsg) ` function can be realized to the system registry new custom validation plug-in function. 


**The validator name naming conventions: **   
- Add class validator, must start with `.`, `.exists`
- Add attribute validator, must round with `[]`, `[theme]`

```JS
/*    
* `checkName`    string, Registered [Attribute] Attribute, or .Class validator names (can only use English letters and Numbers) 
* `chkFun`       function, To validate the callback function 
* `chkMsg`       string, To validate the tip message or function of failure 
*/   
EasyCheck.addChk(chkName,chkFun,chkMsg);
```


### 8.2 The custom new composite validator (Combination) : 
 
EasyCheck support combined with multiple registered validators combined to create a new validator. 

The validator naming conventions for: `Validator1Validator2` validator 

Such as: By combining the existing `min attribute verifier` and `max property verifier`, the realization of digital range detection verifier. The validator registration name is `[min] [max]`.

The validator **works only if both the min and max property verifiers are used**. The independent validator functions for `[min]` and `[max]` are ignored and the validation function for the `[min] [max]` combinatorial validator is executed directly.


### 8.3 Example
Check user name whether exsist.

```JS
EasyCheck.addChk(".exists",
  function(o){
      var val=$(o).val();
      var res=false; 
      dwr.engine.setAsync(false); 
      UserInfoDWR.checkEmail(val,function(d){
           res=d;
      });
      return res;
  }
  ,
  "The name has been used!");
```

#### Use the Easy Check.msg list to manage messages

In order to facilitate the unified management of the prompt message, you can prompt the message is defined in the `EasyCheck.msg` list.

**EasyCheck.msg["msgName"]= "Content, {0}, {1}……";**

如：

```JS
EasyCheck.msg["exists"]="The name has been used!";

EasyCheck.addChk(".exists",
	function(o){
		if($(o).val()=='jay'){
			return false;
		}
		return true;
	}
	,
	EasyCheck.msg["exists"]  // get message
);
```

**If the message contents contain placeholders ({0}, {1}, ...), the message function is used**


```JS
// Defines a validator prompt message
EasyCheck.msg["exists"]="'{0}' the name has been used!";

EasyCheck.addChk(".exists",
    function(o){
        if($(o).val()=='jay'){
            return false;
        }
        return true;
    }
    ,
    // Format the message function
    function(o){
        return EasyCheck.formatMsg(EasyCheck.msg["exists"],$(o).val());
    }
);
```


### 8.4 Manages validator validation triggering events

EasyCheck supports three types of validation triggering events, and the default registered validator triggers validation in three types of events:

- Keyboard up onkeyup validation
- Lose focus onblur validation
- Submit form onsubmit validation


EasyCheck supports the triggering of validators and form elements (key-up `onkeyup` validation, loss of focus` onblur`) and some validators can disable certain validation triggers that affect performance or are necessary.   

#### Validators trigger event management

If the registered validator only need to verify ( eg verification code , without losing focus or keyboard bounce verification ) at the time of submitting the form , you can registered the following code:


- `EasyCheck.easyCheckIgnore`: Specifies the validator to ignore validation, verification after setting while ignoring loses keyboard focus events and pop events.

 ```JS
 EasyCheck.easyCheckIgnore[" validator name "]=true;
 ```

- `EasyCheck.easyCheckBlurIgnore`: Specifies the validator to ignore lost focus event validation

  ```JS
  EasyCheck.easyCheckBlurIgnore[" validator name "]=true;
  ```

- `EasyCheck.easyCheckKeyupIgnore`: Specifies the validator to ignore the keyboard pops up event validation

 ```JS
 EasyCheck.easyCheckKeyupIgnore[" validator name "]=true;
 ```

####  Form element triggering event management

Specify the form elements elementId or elementName: (** elementId priority ** )

- `EasyCheck.easyCheckEleIgnore`: Specifies the form elements, disc bounce and lost focus event to ignore verification

 ```JS
 EasyCheck.easyCheckEleIgnore["element id or name"]=true;
 ```

- `EasyCheck.easyCheckEleBlurIgnore`: Specifies the form element loses focus event to ignore verification

 ```JS
 EasyCheck.easyCheckEleBlurIgnore["element id or name"]=true;
 ```

- `EasyCheck.easyCheckEleKeyupIgnore`: Specifies the form elements, ignoring the keyboard up event validation

 ```JS
 EasyCheck.easyCheckEleKeyupIgnore["element id or name"]=true;
 ```


## End

[Demo - English](http://www.easyproject.cn/easycheck/en/index.jsp#demo 'Demo - English]')


[Official home page](http://www.easyproject.cn/easycheck/en/index.jsp 'Official home page')

[Comments](http://www.easyproject.cn/easycheck/en/index.jsp#donation 'Message comments')

If you have more comments, suggestions or ideas, please contact me.

Contact, Feedback, Custom, Train Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")


We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")
