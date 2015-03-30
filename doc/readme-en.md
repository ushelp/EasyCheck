
# ECheck a powerful jQuery plugin to validate forms



> Notice: EasyCheck and ECheck plug-in for the same plug-in. In the early ECheck correspondence in English, EasyCheck corresponding Chinese version after version of `4.0.0`, through language document control, no longer distinguish downloads by region.


EasyCheck aka Echeck, is a front-end based on JS jQuery form validation plugin, without programming through HTML form validation enhancements to complete the work, simplifying the work of front-end development, and to maintain the unity of style to verify and improve efficiency.

![EasyCheck](images/easycheck.png)

![EasyCheck](images/easycheck-engine.png)

**Main features:**

1. Lightweight

2. No JS programming

3. Support class-based, based on a combination of property and validators

4. Built-in 16 commonly used in daily development Validator

5. Verify that the text box to automatically switch styles
 
6. By default, three kinds of errors and correct the prompt message content DIV

7. Tip custom message location

8. Anti-client resubmit function

9. scalability, support for registered users to develop new validator

**Compatibility:**

EasyDataTable fully compatible with IE6 or later, Firefox, Chrome, Safari, Opera, and other kernel (Trident, Gecko, Webkit, Presto) browser, and is compatible with multiple platforms and systems (PC, TabletPC, Mobile).

### [The official site](http://www.easyproject.cn/easycheck/en/index.jsp 'EasyCheck  official site home page')


----------


## 1, Add EasyCheck

```JS
<!-- textbox and show msg style -->
<link rel="stylesheet" type="text/css" href="easycheck/css/easycheck.css"/>  
<!-- jQuery -->
<script type="text/javascript" src="easycheck/jquery-1.9.0.min.js"></script>
<!-- EasyCheck & EasyCheck language file -->
<script type="text/javascript" src="easycheck/easy.easycheck-4.0.0.min.js"></script>
<script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>	
	
<!--  Optional parameters to customize  -->
<script type="text/javascript">
	// Optional Parameters
	EasyCheck.blurChk=true;    //Verify loses focus when opened , false to disable , default is true
	EasyCheck.keyupChk=true;  //Verify that the keyboard pops up when you turn on , false to disable , default is true
	EasyCheck.loadChk=true;   // if the page is loaded immediately after turn on validation rules ( otherwise verified only when the form is submitted , if set to false, blurChk and keyupChk invalid ) , the default is true  
</script>
```


### EasyCheck.css Description : 
EasyCheck support for text boxes and div prompt message for event landscaping, you can dynamically change the text box and the div style according to the event and verify the results, showing different looks in different states, in order to provide a richer validation results.

EasyCheck.css four defined CSS styles:

- Div style related news:    
Verified by message class style `. Easycheck_okInfo`    
Verify that did not pass the message class style `. Easycheck_errorInfo`    

- Text boxes related styles     
Text box has focus when the style class: `easycheck_focusInput`    
Verify text box type style fails when `. Easycheck_errorInput`    


Need more CSS class styles can be modified according to the actual project, set `easycheck_defaultInput` class style consistent with the style of your text box default class; would `easycheck_errorInput` class style modified to error style you need. Or, to redefine the class styles in the page, to replace the default style.

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
/*
* Notice：
* Make style to take effect
* Use the !important to specify the style for each of the highest priority
*/
.easycheck_focusInput{
	border: 1px solid #0066FF !important; 
}
.easycheck_errorInput {
	border: 1px solid #DD080A !important;
}

```

## 2, Use validator 

EasyCkeck built a 16 Validator common everyday development , divided into three types : Class, Attribute, Combination.

#### 5 Class validator class：
Validator class names are inside the EasyCheck begin with:`.`,like:  `.validatorName`.

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
> Help , by default to avoid unnecessary server requests authentication code verification conducted only when the form is submitted , the keyboard does not bounce and validation parameters loses focus . Implementation code :
> 
> EasyCheck.easyCheckIgnore ["vc"] = true;
> Vc verification code rule , when the keyboard pops up and lose focus not verified , validated only when the form is submitted `EasyCheck.easyCheckIgnore`parameters can be set to ignore the validator bounce and focus authentication , and can be modified according to the needs of the keyboard pops up is false, the representative and lose focus when open authentication.
> 


#### 2 Combination combination validator:
```HTML
<Validator internal name>                                  <use>

[minlength] [maxlength] length combination Validator : Using minlength property validator and validator maxlength attribute
<input type="password" value="" name="urepwd" size="20" class="txt required" equalto="upwd" maxlength="12" minlength="6"/>
[min] [max] a combination of numerical range validator : validator attributes while adding min and max attributes validator
<input type="password" value="" name="urepwd" size="20" class="txt required" min="18" max="45"/>
```

**Note : According to the principle EasyCheck internal validation , EasyCheck not mandatory user for each form element must specify the id attribute , you can simplify routine element definitions . But if the page exists `name` same form elements , you need to distinguish between the use of id . Elements are present in the form `id attribute `, `id` attribute takes precedence over the `name` attribute , EasyCheck internal ` will ` id attribute value as a reference to identify various functions to achieve - for example, the need to achieve the element associated with the specified expansion , when the configuration operations , priority `id`.**

## 3, when the form is submitted to verify


- when the form is submitted to verify:
For the form to add attribute `id`(must) and `easycheck =" true "`.
```HTML
<form action="login.action" method="post" id="regForm" easycheck="true"> 
```

- Manual verification form:
Sometimes the verification form is not required to submit the form, you can verify that the specified form by JS manually.
```JS
//Verify that the selector specified form, but does not submit
var flag=EasyCheck.checkForm("Form Selector");
if(flag){
    //Verified pass
}else{
    //Verified not pass
}
```
With form elements of `onsubmit` events, results and `easycheck = "true" `the same:
```
<form action="login.action" method="post" id="regForm" onsubmit="return EasyCheck.checkForm(this)"> 
```

## 4, to prevent duplicate submission form functional client

### 4.1 , Open and prevent duplicate submission form disabling client function
EasyCheck client is enabled by default to prevent duplicate submission function. Prevent the user authentication process by submitting data, because the network is not responding, you repeatedly click submit other reasons, led to resubmit data capabilities. The default user clicks the submit button to submit the form in the process of disabling submit submit button.
If, in exceptional scenarios need to disable this feature in the introduction EasyCheck.js, set `EasyCheck.easyCheckSubmitDisable` parameter value `false` to disable the anti-duplicate submission function:

```JS
// cancel the submit button to disable the function, the default is true
EasyCheck.easyCheckSubmitDisable = false; 
```
### 4.2 , Firefox, the browser back button to restore the configuration disabled
**Firefox under special instructions:**
 Since the Firefox browser to load data from the cache memory when the reason, if the data is submitted by clicking on the browser back button to return to the page, the submit button will still be displayed as disabled.

 The workaround is to add the submit button `autocomplete = "off"` attribute can be.

> Description autocomplete attribute:
> The default browser forms to shield memory function. Taobao, Baidu 's search box also has the attribute. Autocomplete attribute is nonstandard, first added in IE5, and the other browsers are supported. Html5 also be a list of criteria.
>
 
Additionally, if you do not want to modify the html page through the submit button to add autocomplete = "off" attribute to implement this feature , EasyCheck also support the achievement of correction Firefox browser back button functionality is enabled by JS code :


Method One: Set directly under Firefox after disabling the back button id array , you can specify multiple
```JS
 EasyCheck.removeDisableBtn=['submitId']; 
```

Method Two : Set array formId back after disabling the next Firefox , you can specify more than one form of the form ID, all the submit button in a form automatically back to normal after
```JS
 EasyCheck.removeDisableForm=['formId']; 
```

Method three : Set to force all pages form a form submit button is enabled, the default value is false
```JS
//This parameter will disable all all from under the submit button is enabled
//If it is determined that all project page does not need to disable the submit button by default , this setting is most convenient
EasyCheck.removeDisable=true;  
 ```


## 5 , Text box style management
EasyCheck has extensive appearance customization features that can automatically change the validation does not pass when the appearance of the form elements , making more eye-catching form item , the customer experience richer.

EasyCheck support for text boxes refer to different styles in three states: default text box style, style the text box gets the focus, the error text box style.
The default text box style defined by the user, the text box has focus and error text style box style by `.easycheck_focusInput`, `.easycheck_errorInput` designated.

These styles are stored in the following parameter values, and set up EasyCheck.css predefined styles :
```JS
EasyCheck.focusCss="easycheck_focusInput"；
EasyCheck.errorCss="easycheck_errorInput"；
```

If you want to redefine the text box has focus style , wrong style, you can use JavaScript to be modified.

- Modify the text box has focus when the class styles :
  ```JS
	// Specify the global has focus css class style used in the form
	EasyCheck.focusCss = "focus";
	
	// If the page has multiple forms, class style used in different forms in different elements , you can specify the class style used elements in the form
	EasyCheck.formDefaultCss ['formId'] ​​= "focus2"; // Specifies the id of the form element is formId using .focus2 style
  ```

- When you modify the error text box type styles :
  ```JS
	// Specify the global the error text box css class style used in the form
	EasyCheck.errorCss = "error";
	
	// If the page has multiple forms, class style used in different forms in different elements , you can specify the class style used elements in the form
	EasyCheck.formDefaultCss ['formId'] ​​= "error2"; // Specifies the id of the form element is formId using .error2 style
  ```


## 6 , disable text box style validation fails

```HTML
<input type="text" name="content" class="required" ecss="no"></textarea>
```

 By default, when the validation fails , in addition to displaying the error message , the text box will use `. Easycheck_errorInput` class style ( not verified via text box style ) shows that if you need to disable the display, can be added to the text box object `ecss = "no" ` attribute to achieve disable error style.

When too many elements on the page , the page can be set to disable all authentication to verify the object does not pass through the global parameters EasyCheck.ecss style :
```JS
//Specify the page to completely disable error text box style
EasyCheck.ecss="no";
```

//Disable error id specified text box style form elements as regForm2
```JS
EasyCheck.formEcss['regForm2']="no";
```


## 7 , custom global error message content

EasyCheck authentication prompt message definitions in the lang directory corresponding language file. Such as:

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
};
```



Specify validation rules can be modified according to the needs prompt message content , grammar :
```JS
EasyCheck.msg [' validation rules corresponding message name' ] = " message prompts Content" ;
```

EasyCheck message support placeholders , such as:
```JS
EasyCheck.msg ['required'] = "is required";
EasyCheck.msg ['lengthRange'] = " { 0} is the minimum length , maximum length of { 1} ! " ;
```


## 8 , custom default , correct error message

### 8.1, EasyCheck support manually specify the type 3 message (by default, correct the error) for each verification elements:

- **The message is defined in the body of the tag**
Defined error (errorMsg) and the correct mentioning (correctMsg) shows the message, EasyCheck will default to hidden, only in the appropriate state to show hidden automatically. But because EasyCheck rendering is executed after the page is loaded, so the page rendering still may briefly appear in the page, so you must set the `style =" display: none "`.
```HTML
<!-- Default prompt DIV id: (id Named: `default_ElementId`)-->
<span id="default_ElementId"> The default form elementID prompt message </span>
<!-- Correct prompt DIV id: (id Named: `correct_ElementId`，use `.easycheck_okInfo`)-->
<span id="correct_ElementId" style="display:none"> The correct form elementID prompt message  </span>
<!-- Error prompt DIV id: (id Named: `error_ElementId`，use `.easycheck_errorInfo`) -->
<span id="error_ElementId" style="display:none"> The error form elementID prompt message  </span>
```
  - Error content DIV is optional, if you specify the prompts other prompt message will be overwritten.
  - Error message DIV has an optional attribute:
  `perfix`: optional attribute, add a prefix to the content of the error message
 ```HTML
 <span id="error_ElementID" style="display:none" perfix="username "></span>
 ```


- **Message attributes are defined in the info**
You can also define the prompt message prompted label `info` properties, display problems can be avoided.
```HTML
<!-- Default prompt DIV id: (id Named: `default_ElementId`)-->
<span id="default_ElementId" info="The default form elementID prompt message"> </span>
<!-- Correct prompt DIV id: (id Named: `correct_ElementId`，use `.easycheck_okInfo`)-->
<span id="correct_ElementId" info="The correct form elementID prompt message">  </span>
<!-- Error prompt DIV id: (id Named: `error_ElementId`，use `.easycheck_errorInfo`) -->
<span id="error_ElementId" info="The error form elementID prompt message">   </span>
```
If you use `info` attribute defines the default prompt message (defMsg), also need to call after the page has finished loading `EasyCheck.initDefMsg (); ` to take effect.
```JS
$(function(){
    //Manually initialize the default message to take effect
	EasyCheck.initDefMsg();
})
```

- **Priority**
`info attribute of the message content`> `tag body of the message content` 

- **Example:**

```HTML
<input type="text" id="uname" name="uname" class="txt2 required" reg="^[A-Za-z][A-Za-z0-9]*$"/>
<span id="default_uname" info="Required, start with a letter, can contain only letters and numbers"></span> 
<span id="correct_uname" info="Correct"></span> 
<span id="error_uname"  prefix="name "  style="display:none">only letter and number</span> 
```

### 8.2. Message content format extensions
Tips for developing a variety of appearance (for example: EasyCheck ToolTip), EasyCheck can extend unified message formats, such as unified messaging will be prompted DIV fragment packaged in one self-definition. In a custom message fragments using `{0}` mark references prompt message content.

- **Global settings：**
```JS
// Set the global default, errors, correct message formatting tips
EasyCheck.defMsg='<div class="tip">Default message: {0}</div>';
EasyCheck.errorMsg='<div class="tip">Error message: {0}</div>';
EasyCheck.correctMsg='<div class="tip">Correct message: {0}</div>';
```
- **Local settings(Id specified for the extended Form or Element)**
```
// To specify the default message format regForm form
EasyCheck.defMsgs["regForm"]='<div class="tip">Default message: {0}</div>';
// To specify the error message format username element
EasyCheck.errorMsg["username"]='<div class="tip">Error message: {0}</div>';
// To specify the ok message format regForm form
EasyCheck.correctMsgs["regForm"]='<div class="tip">Correct message: {0}</div>';
```

- **Format Priority**
`ElementId format` > `FormId format` > `Global format`
`EasyCheck.defMsgs["elementId"]` > `EasyCheck.defMsgs["formId"]` > `EasyCheck.defMsg`.

- **The default prompt message manual initialization**
When modify the default prompt message (defMsg) format, you need to manually call `initDefMsg()`, so that the default information modified to take effect.
```JS
$(function(){
    //In the custom ready function, modify the default prompt message
	EasyCheck.defMsg='<div class="tooltip-right-def tooltip-def">'+
	'<div class="tooltip-content-def">{0}</div>'+
	'<div class="tooltip-arrow-outer-def"></div>'+
	'<div class="tooltip-arrow-def" ></div>'+
	'</div>';
    // Manually initialize the default message into force
	EasyCheck.initDefMsg();
})
```

- **Custom message mark**
The default reference message is marked as ` {0}`, if you need to customize `msgMark` properties can be modified directly.
```JS
// Custom message mark 
EasyCheck.msgMark="{msg}";
// Use a custom mark {msg}
EasyCheck.defMsg='<div class="tip">Default message: {msg}</div>';
```

<div style='height:800px'></div>

### 8.3 , EasyChek support error message content is fully customizable, support for each element of each form validator uses different message formats:
** If the form element id attribute exists , then the priority ElementId**

```JS
EasyCheck.msgs['ElementId'||'ElementName']={  
	 Validator Name 1 ': "prompt content",
	 Validator Name 2 ': "prompt content"
	……
};
```

**When you define a class name preceded validator point , using the name attribute validator brackets [ ] . **

For example, the elements required for the uname class Validator ( ** preceded points . ** ) And reg attribute validator ( ** use brackets [ ] ** ) to specify a custom message.

```JS
EasyCheck.msgs['uname']={
	'.required': 'There must be ah !',
	'[reg]':'can only contain letters and numbers '
};
```



EasyCheck messages support the use of placeholders , if the message contains placeholders ( `{ 0 } `, ` {1 }` , ...... ) , you need to function ** ** handling and return messages via message and use `EasyCheck . formatMsg (" message content ", " placeholder parameter 1 " , ...... ) message format ' .

For example, to specify a custom message length range validator upwd combination of elements and format placeholders message:

```JS
EasyCheck.msgs['upwd']={
	'[minlength][maxlength]':
	// Message functions , o the current DOM object
	function(o){ 
		return EasyCheck.formatMsg("Password digits : {0}-{1}" , o.attr('minlength') , o.attr('maxlength'));
	}
};
```

Or

```JS
// Message functions , o the current DOM object
var upwdMsg = function(o){
	return EasyCheck.formatMsg("Password digits : {0}-{1}！", o.attr('minlength') , o.attr('maxlength'));
};
	
EasyCheck.msgs['upwd']={
	'[minlength][maxlength]':upwdMsg
};
```

*Note: Use a custom message in error DIV generally do not use the info attribute prompt message if using the info attribute is set prompt message will cover more than a custom message content.*

## 9 , manually clear the error message and setting

### 9.1 , clear all the error messages .
Clear error.
`formId`: Optional. When specified, only the specified form in clear error message ; do not specify , clear the current page for all error messages.

```JS
	EasyCheck.clearAllError( [formId] );
```


### 9.2 , restore messages.
Clear error and clear the correct prompt displays the default prompt.
For example, the verification form in the pop-up layer , the layer re-open the closed , all empty layers forms authentication prompt information before .
`formId`: Optional. When specified, only the specified form in clear error message ; do not specify , clear the current page for all error messages.
```JS
	EasyCheck.restoreAll( [formId] );
```


### 9.3 , set the error messages to the specified form elements manually (You can use a unified style tips custom message).
You can use this method to display the specified message returned from the server .
`elementId || elementName || elementDOM`: id specified form elements or form elements DOM object.
msg: the error message.
```JS
	EasyCheck.showError( 'elementId'||'elementName'||elementDOM , 'msg' );
```

###  9.4 , clear form elements specified error message.
`elementId || elementName || elementDOM`: id specified form elements or form elements DOM object.
```JS
	EasyCheck.clearError( 'elementId'||'elementName'||elementDOM  );
```



### 10 , senior extension : New custom validator plugin extensions EasyCheck validation framework

EasyCheck has flexible scalability, use `EasyCheck.addChk` function only easy step to add new custom validator ! 

###  10.1 , a new custom validator (Class, Attribute)

Call `EasyCheck.addChk (chkName, chkFun, chkMsg)` function can be realized to the new verification system to register a custom plugin function .
```JS
/*
* `CheckName` registered validator attribute or class name ( only letters and numbers )
* `ChkFun` verification callback
* `ChkMsg` validation failure alert message or message function
* /
```
**Authentication name naming convention: **   
- **Registration class validator : validator name must begin with a dot , such as `exists`**   
- **Registration attribute validator : validator name must use brackets [ ] to enclose , such as `[theme]` **
    
Sign EasyCheck validator class and attribute syntax:
	
```JS
EasyCheck.addChk("validator name",
	//o represents the current DOM object
	function(o){
		//Verify achieve
        // var val=$(o).val();
        // return $.trim(val)!="";
	   //Returns true or verified by false.true behalf ; false representatives did not pass , chkMsg message will be displayed
	}
	,
	"Authentication failed when the message string");
```

### 10.2 , a new combination of custom validator (Combination):
EasyCheck supports the use of multiple combinations of registered validators to create new combinations of validators.
Such as: `min through a combination of existing properties and ` max ` validator validator attribute ` , digital detection range validator .
Validator naming convention is: ` validator1 validator2`
Example, the combined new validator registered name `[min][max]`: This validator **only when the user while using min and max attributes validator **work, the use of a combination of the validator `[min]` and `[max]` independent verification control function will be ignored, direct execution `[min][max]` combination validator validation function.

### 10.3 , using the message function to obtain the message string
10.3 , using the message function to obtain the message string
Some contents of the message with the current value of a property or related form elements , EasyCheck **message function** supports return a message string.

```JS
EasyCheck.addChk("validator name",
	//o代表当前DOM对象
	function(o){
	//o represents the current DOM object
	function(o){
		//Verify achieve
        // var val=$(o).val();
        // return $.trim(val)!="";
	   //Returns true or verified by false.true behalf ; false representatives did not pass , chkMsg message will be displayed
	}
	,
	// Function instead of using the prompt message string  
    // O represents the current DOM object
	function(o){
		  // var val=$(o).val();
          // return the string return a message when validation fails
	});
```

### 10.4 , custom validator validation trigger event
EasyCheck supports three authentication trigger events : keyboard bounce onkeyup validation, verification loses focus onblur , submit the form onsubmit validation. The default validator registered in three types of events are triggered verified.

EasyCheck support for validation and form elements trigger events ( keyboard pops onkeyup validation, loses focus onblur validation ) be managed , and some may disable some validators sure to affect the performance or verification triggering event under the circumstances .

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



## 11 , Advanced Options : Custom new validator instance
Assuming page requires a user name to detect whether there is a validator class , you can directly define .

```JS
//Register the new class Validator ( validator name verification function , the error message ) , to detect the user name exists
EasyCheck.addChk(".exists",
	function(o){
			 var val=$(o).val();
		 var res=false; //result , Ajax return test results
		 dwr.engine.setAsync(false); //disable asynchronous AJAX DWR
		 UserInfoDWR.checkEmail(val,function(d){
			res=d;
		 });
		 return res;
	}
	,
	"该名称已被使用！");
```

## 12, Senior Extension: prompt message content authentication framework 

### 12.1 , list management messages using EasyCheck.msg

In order to facilitate the prompt message for unified management , unified messaging can be prompted to define EasyCheck.msg list.


**EasyCheck.msg [" custom message name " ] = " message content , you can use { 0 } , { 1} ...... placeholder" ;**

Since the new validation function in the definition of news tips section, use `EasyCheck.msg [" custom message name " ] ` to get the message content , such as:

```JS
// Define validator prompt message
EasyCheck.msg["exists"]=" This name is already in use ! ";

EasyCheck.addChk(".exists",
	function(o){
		if($(o).val()=='jay'){
			return false;
		}
		return true;
	}
	,
	EasyCheck.msg["exists"]  //get the message
);
```

### 12.2 , if the content of the message contains placeholders ( { 0 } , { 1} , ...... ) , use the message processing function
Messages via `EasyCheck.formatMsg (" message content "," placeholder parameter 1 " , ...... ) ' format , such as:

```JS
//Define validator prompt message
EasyCheck.msg["exists"]="“{0}”This name is already in use !";

EasyCheck.addChk(".exists",
	function(o){
		if($(o).val()=='jay'){
			return false;
		}
		return true;
	}
	,
   //Message functions
	function(o){
		return EasyCheck.formatMsg(EasyCheck.msg["exists"],$(o).val());
	}
);
```


## 13 , EasyChek Tooltip
```HTML
<!-- jQuery -->
<script type="text/javascript" src="easycheck/jquery-1.9.0.min.js"></script>
<!-- EasyCheck -->
<link rel="stylesheet" type="text/css" href="easycheck/css/easycheck.css"/>  
<script type="text/javascript" src="easycheck/easy.easycheck-4.0.0.js"></script>
<script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>
<!-- EasyCheck tooltip -->
<link rel="stylesheet" type="text/css" href="easycheck/tooltip/easycheck-tooltip.css"/>  
<script type="text/javascript" src="easycheck/tooltip/easy.easycheck-tooltip.js"></script>
```


[Demo online](http://www.easyproject.cn/easycheck/en/index.jsp#demo 'Demo online')

Contact, feedback, custom Email: <inthinkcolor@gmail.com>

<p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="inthinkcolor@gmail.com">
<input type="hidden" name="item_name" value="EasyProject development Donation">
<input type="hidden" name="no_note" value="1">
<input type="hidden" name="tax" value="0">
<input type="image" src="http://www.easyproject.cn/images/paypaldonation5.jpg"  title="PayPal donation"  border="0" name="submit" alt="Make payments with PayPal - it's fast, free and secure!">
</form>
</P>
