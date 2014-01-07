
# ECheck a powerful jQuery plugin to validate online forms



Notice:the plugin same as EasyCheck,this is English Version,the message and user manual in English.   
说明：该插件与EasyChec插件为同一插件，是EasyCheck的英文版本，中文版本请参考 GitHub:<https://github.com/ushelp/EasyCheck>





EasyCheck is a front-end JS form validation plugin based on jQuery, without programming through HTML forms authentication enhancements to complete the work , simplifying the front-end development work, and to maintain a unified verification style , and improve efficiency. The biggest feature is the use of lightweight components and , but with complete flexibility and strong scalability, support for class-based , based on a combination of attributes and validators . EasyCheck developed to meet the daily built- dozen common validator ; support the text box to verify automatically switch styles ; default , error messages and correct the contents of the three DIV tips ; and support for custom message prompts position ; support for anti- client duplicate submission function ; also supports registered users to develop new validator for expansion.

**Compatibility **: EasyDataTable fully compatible with IE6 and above , Firefox, Chrome, Safari, Opera and other kernel (Trident, Gecko, Webkit, Presto) browser , and is compatible with multiple platforms and systems (PC, TabletPC, Mobile).


----------


## 1,the introduction EasyCheck.css, after introduction EasyCheck.js jQuery

    <link rel="stylesheet" type="text/css" href="css/EasyCheck.css"/>  
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/EasyCheck.min.js"></script>
    <script type="text/javascript">
    	// Optional Parameters
		EasyCheck.blurChk=true;    //Verify loses focus when opened , false to disable , default is true
    	EasyCheck.keyupChk=true;  //Verify that the keyboard pops up when you turn on , false to disable , default is true
    	EasyCheck.loadChk=true;   // if the page is loaded immediately after turn on validation rules ( otherwise verified only when the form is submitted , if set to false, blurChk and keyupChk invalid ) , the default is true

        //Style form elements actually used to specify when the error message , you need to switch the default class style form elements , if the default class style form elements are not using . easycheck_defaultInput, you must
		EasyCheck.defaultCss="txt";   
    </script>



### EasyCheck.css Description : 
EasyCheck support for text boxes and div prompt message for event landscaping, you can dynamically change the text box and the div style according to the event and verify the results, showing different looks in different states, in order to provide a richer validation results.

EasyCheck.css five defined CSS styles:

- Div style related news:    
Verified by message class style `. Easycheck_okInfo`    
Verify that did not pass the message class style `. Easycheck_errorInfo`    

- Text boxes related styles    
The default text box type style `. Easycheck_defaultInput`   
Text box has focus when the style class: `easycheck_focusInput`    
Verify text box type style fails when `. Easycheck_errorInput`    


Need more CSS class styles can be modified according to the actual project, set `easycheck_defaultInput` class style consistent with the style of your text box default class; would `easycheck_errorInput` class style modified to error style you need. Or, to redefine the class styles in the page, to replace the default style.


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

## 2, EasyCheck built-in validator to validate

EasyCkeck built a 16 Validator common everyday development , divided into three types : Class, Attribute, Combination.

#### 5 Class validator class：
	required      Required        <input type="text" name="name" class="required"/>     
	email         Email        <input type="text" name="name" class="email"/>
	url           URL        <input type="text" name="name" class="url"/>
	number        A number       <input type="text" name="name" class="number"/>
	integer       integer        <input type="text" name="name" class="integer"/>

Simultaneous use of multiple classes validators , separated by spaces :

    Can not be empty , and the mailbox   <input type="text" name="name" class=" required email" />

#### 9 Attribute attribute validator :
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


> 
> Help , by default to avoid unnecessary server requests authentication code verification conducted only when the form is submitted , the keyboard does not bounce and validation parameters loses focus . Implementation code :
> 
> EasyCheck.easyCheckIgnore ["vc"] = true;
> Vc verification code rule , when the keyboard pops up and lose focus not verified , validated only when the form is submitted > easyCheckIgnor parameters can be set to ignore the validator bounce and focus authentication , and can be modified according to the needs of the keyboard pops up is false, the representative and lose focus when open authentication.
> 


#### 2 Combination combination validator:
    [minlength] [maxlength] length combination Validator : Using minlength property validator and validator maxlength attribute
    <input type="password" value="" name="urepwd" size="20" class="txt required" equalto="upwd" maxlength="12" minlength="6"/>
    [min] [max] a combination of numerical range validator : validator attributes while adding min and max attributes validator
    <input type="password" value="" name="urepwd" size="20" class="txt required" min="18" max="45"/>

**Note : According to the principle EasyCheck internal validation , EasyCheck not mandatory user for each form element must specify the id attribute , you can simplify routine element definitions . But if the page exists `name` same form elements , you need to distinguish between the use of id . Elements are present in the form `id attribute `, `id` attribute takes precedence over the `name` attribute , EasyCheck internal ` will ` id attribute value as a reference to identify various functions to achieve - for example, the need to achieve the element associated with the specified expansion , when the configuration operations , priority `id`.**

## 3, when the form is submitted to verify

Validated when the form is submitted, the form of `form` id `add the specified attribute` and `onsubmit =" return EasyCheck.checkForm (this) "` event to

	<form action="login.action" onsubmit="return EasyCheck.checkForm(this)" id="regForm" method="post">action" onsubmit="return EasyCheck.checkForm(this)" id="regForm" method="post"> 


## 4, to prevent duplicate submission form functional client
EasyCheck client is enabled by default to prevent duplicate submission function. Prevent the user authentication process by submitting data, because the network is not responding, you repeatedly click submit other reasons, led to resubmit data capabilities. The default user clicks the submit button to submit the form in the process of disabling submit submit button.
If, in exceptional scenarios need to disable this feature in the introduction EasyCheck.js, set `EasyCheck.easyCheckSubmitDisable` parameter value `false` to disable the anti-duplicate submission function:

EasyCheck.easyCheckSubmitDisable = false; / / cancel the submit button to disable the function, the default is true

>
> Firefox under special instructions:
> Since the Firefox browser to load data from the cache memory when the reason, if the data is submitted by clicking on the browser back button to return to the page, the submit button will still be displayed as disabled.
>
> The workaround is to add the submit button autocomplete = "off" attribute can be.
>
Role Description >> autocomplete attribute:
> The default browser forms to shield memory function. Taobao, Baidu 's search box also has the attribute. Autocomplete attribute is nonstandard, first added in IE5, and the other browsers are supported. Html5 also be a list of criteria.
>
 
Additionally, if you do not want to modify the html page through the submit button to add autocomplete = "off" attribute to implement this feature , EasyCheck also support the achievement of correction Firefox browser back button functionality is enabled by JS code :


Method One: Set directly under Firefox after disabling the back button id array , you can specify multiple

	 EasyCheck.removeDisableBtn=['submitId']; 
	 
Method Two : Set array formId back after disabling the next Firefox , you can specify more than one form of the form ID, all the submit button in a form automatically back to normal after

	 EasyCheck.removeDisableForm=['formId']; 

Method three : Set to force all pages form a form submit button is enabled, the default value is false

	//This parameter will disable all all from under the submit button is enabled
	//If it is determined that all project page does not need to disable the submit button by default , this setting is most convenient
    EasyCheck.removeDisable=true;  
 

## 5 , Text box style management
EasyCheck has extensive appearance customization features that can automatically change the validation does not pass when the appearance of the form elements , making more eye-catching form item , the customer experience richer.

EasyCheck support for the text boxes refer to different styles of three states: default text box style , style text box gets the focus , the error text box style - these three states are quoted `EasyCheck.css` in `easycheck_defaultInput`, `. . easycheck_focusInput `,`. easycheck_errorInput `.

These styles are stored in the following parameter values ​​, and set up EasyCheck.css predefined styles :

    EasyCheck.defaultCss="easycheck_defaultInput"；
    EasyCheck.focusCss="easycheck_focusInput"；
    EasyCheck.errorCss="easycheck_errorInput"；

*Due to default EasyCheck use `EasyCheck.css` in `. Easycheck_defaultInput` styles to redefine the text box style , so you need to `. Easycheck_defaultInput` style form with your default style set to the same.*

If you want to redefine the default style used for the text box has focus style , wrong style, you can use JavaScript to be modified.


- Modify the text box default class style :

		// Specify the global default css class style used in the form
		EasyCheck.defaultCss = "txt";
		
		// If the page has multiple forms, class style used in different forms in different elements , you can specify the class style used elements in the form
		EasyCheck.formDefaultCss ['formId'] ​​= "txt2"; / / specify an id regForm2 form elements using txt2 style.


- Modify the text box has focus when the class styles :

		// Specify the global default css class style used in the form
		EasyCheck.defaultCss = "txt";
		
		// If the page has multiple forms, class style used in different forms in different elements , you can specify the class style used elements in the form
		EasyCheck.formDefaultCss ['formId'] ​​= "txt2"; / / specify an id regForm2 form elements using txt2 style.

- When you modify the error text box type styles :

		// Specify the global default css class style used in the form
		EasyCheck.defaultCss = "txt";
		
		// If the page has multiple forms, class style used in different forms in different elements , you can specify the class style used elements in the form
		EasyCheck.formDefaultCss ['formId'] ​​= "txt2"; / / specify an id regForm2 form elements using txt2 style.

## 6 , disable text box style validation fails
	<input type="text" name="content" class="required" ecss="no"></textarea>

 By default, when the validation fails , in addition to displaying the error message , the text box will use `. Easycheck_errorInput` class style ( not verified via text box style ) shows that if you need to disable the display, can be added to the text box object `ecss = "no" ` attribute to achieve disable error style.

When too many elements on the page , the page can be set to disable all authentication to verify the object does not pass through the global parameters EasyCheck.ecss style :

	//Specify the page to completely disable error text box style
	EasyCheck.ecss="no";

//Disable error id specified text box style form elements as regForm2

	EasyCheck.formEcss['regForm2']="no";


## 7 , custom global error message content
Specify validation rules can be modified according to the needs prompt message content , grammar :

EasyCheck.msg [' validation rules corresponding message name' ] = " message prompts Content" ;
EasyCheck message support placeholders , such as:

EasyCheck.msg ['required'] = "is required";
EasyCheck.msg ['lengthRange'] = " { 0} is the minimum length , maximum length of { 1} ! " ;

Name and default value `EasyCheck.msg` default message list as follows :

      required:"Is required",
      email:"Invalid email",
      url:"Invalid url",
      number:"Invalid number",
      integer:"Invalid integer",

      equalto:"Didn't  match input",
      equallength:"length  has to be {0}",   
      minlength:"Use at least {0} characters",
      maxlength:"Must have at most {0} characters",
      min:"The minimum value of {0}",
      max:"The maximum value of {0}",
      regexp:"Invalid value",
      extension:"Invalid extension,only {0}",
      vc:"Didn't match the word verification",

      lengthrange:"Please use between {0} and {1} characters",
      numberrange:"Value is between{0}and{1}"

## 8 , custom default , correct error message

### 8.1,EasyCheck support each validation element specifies three types of message manually : The default prompts , error messages , correct Tip. 

Provides the following named DIV id can ( if the form element name are the same, using the id to distinguish between form elements exist `id` attribute , use the `XXX_ElementId` name takes precedence. ) :

- Default prompt DIV id: `default_ElementId` | | `default_ElementName`
- Correct Tip DIV id: `ok_ElementId` | | `ok_ElementName` ( using `easycheck_okInfo` style. )
- Error DIV id: `error_ElementId` | | `error_ElementName` ( using `easycheck_errorInfo` style. )


		<div id="default_uname"  style="display: inline;"> required , start with a letter and can only contain letters and numbers </div> 
		<div id="ok_uname" style="display: inline;">correct </div>
		<div id="error_uname"   prefix="user name" style="display: inline;"></div>
	
		<div id="error_uemail"  info="email please!"  style="display: inline;"></div>

Use DIV error message can be displayed in the specified location ( by default , the error message without specifying the DIV and manually create , EasyCheck automatically created and displayed in the text box ) . DIV error message has the following two optional attributes :
`info`: optional attribute error message ( overrides the default prompt content )
`perfix`: an optional attribute , an error message prefix
Such as:

	<tr>  
	      <td align="left"  width="300px">
	       	<label class="lbl"><div style="color:#FF0000; display:inline">*</div>登录邮箱</label>
	          <div  id="error_uemail"  info="input your email please！"></div> 
	       /td>
	</tr>
		<tr>  
	        <td align="left">
	<input  type="text"  name="uemail" value="" class="txt required email" size="20"  /> 
	</td>
	</tr>




### 8.2、EasyChek support error message content is fully customizable, support for each element of each form validator uses different message formats:
** If the form element id attribute exists , then the priority ElementId**

	EasyCheck.msgs['ElementId'||'ElementName']={  
		 Validator Name 1 ': "prompt content",
		 Validator Name 2 ': "prompt content"
		……
	};

**When you define a class name preceded validator point , using the name attribute validator brackets [ ] . **

For example, the elements required for the uname class Validator ( ** preceded points . ** ) And reg attribute validator ( ** use brackets [ ] ** ) to specify a custom message.

	EasyCheck.msgs['uname']={
		'.required': 'There must be ah !',
		'[reg]':'can only contain letters and numbers '
	};



EasyCheck messages support the use of placeholders , if the message contains placeholders ( `{ 0 } `, ` {1 }` , ...... ) , you need to function ** ** handling and return messages via message and use `EasyCheck . formatMsg (" message content ", " placeholder parameter 1 " , ...... ) message format ' .

For example, to specify a custom message length range validator upwd combination of elements and format placeholders message:

	EasyCheck.msgs['upwd']={
		'[minlength][maxlength]':
		/ / Message functions , o the current DOM object
		function(o){ 
			return EasyCheck.formatMsg("Password digits : {0}-{1}" , o.attr('minlength') , o.attr('maxlength'));
		}
	};

Or

	/ / Message functions , o the current DOM object
	var upwdMsg = function(o){
		return EasyCheck.formatMsg("Password digits : {0}-{1}！", o.attr('minlength') , o.attr('maxlength'));
	};
		
	EasyCheck.msgs['upwd']={
		'[minlength][maxlength]':upwdMsg
	};

*Note: Use a custom message in error DIV generally do not use the info attribute prompt message if using the info attribute is set prompt message will cover more than a custom message content.*

## 9 , manually clear the error message and setting

### 9.1 , clear all the error messages .
Clear error.
`formId`: Optional. When specified, only the specified form in clear error message ; do not specify , clear the current page for all error messages.

	EasyCheck.clearAllError( [formId] );

### 9.2 , restore messages.
Clear error and clear the correct prompt displays the default prompt.
For example, the verification form in the pop-up layer , the layer re-open the closed , all empty layers forms authentication prompt information before .
`formId`: Optional. When specified, only the specified form in clear error message ; do not specify , clear the current page for all error messages.

	EasyCheck.restoreAll( [formId] );

### 9.3 , set the error messages to the specified form elements manually (You can use a unified style tips custom message).
You can use this method to display the specified message returned from the server .
`elementId | | elementDOM`: id specified form elements or form elements DOM object.
msg: the error message.

	EasyCheck.showError( 'elementId'|elementDOM , 'msg' );

###  9.4 , clear form elements specified error message.
`elementId | | elementDOM`: id specified form elements or form elements DOM object.

	EasyCheck.clearError( 'elementId'|elementDOM  );




### 10 , senior extension : New custom validator plugin extensions EasyCheck validation framework

EasyCheck has flexible scalability, use `EasyCheck.addChk` function only easy step to add new custom validator ! 

###  10.1 , a new custom validator (Class, Attribute)

Call `EasyCheck.addChk (chkName, chkFun, chkMsg)` function can be realized to the new verification system to register a custom plugin function .

/ *
* `CheckName` registered validator attribute or class name ( only letters and numbers )
* `ChkFun` verification callback
* `ChkMsg` validation failure alert message or message function
* /
**Authentication name naming convention: **   
- **Registration class validator : validator name must begin with a dot , such as `exists`**   
- **Registration attribute validator : validator name must use brackets [ ] to enclose , such as `[theme]` **
    
 Sign EasyCheck validator class and attribute syntax:
	
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


### 10.2 , a new combination of custom validator (Combination):
EasyCheck supports the use of multiple combinations of registered validators to create new combinations of validators.
Such as: `min through a combination of existing properties and ` max ` validator validator attribute ` , digital detection range validator .
Validator naming convention is: ` validator validator 1 2`
Example , the combined new validator registered name : `[min] [max]`
The validator will be used ** when the min and max validator**  in user . 

### 10.3 , using the message function to obtain the message string
10.3 , using the message function to obtain the message string
Some contents of the message with the current value of a property or related form elements , EasyCheck **message function** supports return a message string.

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

### 10.4 , custom validator validation trigger event
EasyCheck supports three authentication trigger events : keyboard bounce onkeyup validation, verification loses focus onblur , submit the form onsubmit validation. The default validator registered in three types of events are triggered verified.

EasyCheck support for validation and form elements trigger events ( keyboard pops onkeyup validation, loses focus onblur validation ) be managed , and some may disable some validators sure to affect the performance or verification triggering event under the circumstances .

#### Validators trigger event management

If the registered validator only need to verify ( eg verification code , without losing focus or keyboard bounce verification ) at the time of submitting the form , you can registered the following code:


- `EasyCheck.easyCheckIgnore`: Specifies the validator to ignore validation, verification after setting while ignoring loses keyboard focus events and pop events.

		EasyCheck.easyCheckIgnore[" validator name "]=true;

- `EasyCheck.easyCheckBlurIgnore`: Specifies the validator to ignore lost focus event validation

		EasyCheck.easyCheckBlurIgnore[" validator name "]=true;


- `EasyCheck.easyCheckKeyupIgnore`: Specifies the validator to ignore the keyboard pops up event validation

		EasyCheck.easyCheckKeyupIgnore[" validator name "]=true;

####  Form element triggering event management

  Specify the form elements elementId or elementName: (** elementId priority ** )

- `EasyCheck.easyCheckEleIgnore`: Specifies the form elements, disc bounce and lost focus event to ignore verification

		EasyCheck.easyCheckEleIgnore["element id or name"]=true;

- `EasyCheck.easyCheckEleBlurIgnore`: Specifies the form element loses focus event to ignore verification

		EasyCheck.easyCheckEleBlurIgnore["element id or name"]=true;

- `EasyCheck.easyCheckEleKeyupIgnore`: Specifies the form elements, ignoring the keyboard up event validation

		EasyCheck.easyCheckEleKeyupIgnore["element id or name"]=true;




## 11 , Advanced Options : Custom new validator instance
Assuming page requires a user name to detect whether there is a validator class , you can directly define .

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


## 12, Senior Extension: prompt message content authentication framework 

### 12.1 , list management messages using EasyCheck.msg

In order to facilitate the prompt message for unified management , unified messaging can be prompted to define EasyCheck.msg list.


**EasyCheck.msg [" custom message name " ] = " message content , you can use { 0 } , { 1} ...... placeholder" ;**

Since the new validation function in the definition of news tips section, use `EasyCheck.msg [" custom message name " ] ` to get the message content , such as:

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

### 12.2 , if the content of the message contains placeholders ( { 0 } , { 1} , ...... ) , use the message processing function
Messages via `EasyCheck.formatMsg (" message content "," placeholder parameter 1 " , ...... ) ' format , such as:

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





[Demo online](http://www.lightfeel.com/easy/easycheck/en/index.jsp 'Demo online')

Contact, feedback, custom Email: <in.think@gmail.com>
