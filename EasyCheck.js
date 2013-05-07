// jQuery EasyCheck Plugin
//
// Version 2.0.1
//
// Copy By RAY
// inthinkcolor@gmail.com
// 2012
//
// http://plugins.jquery.com/EasyCheck/
//
var EasyCheck={
	     "loadChk":true,//页面加载完后是否立即开启验证规则（否则仅在提交表单时验证，如果设置为false，blurChk和keyupChk无效），默认为true
	     "blurChk":true,   //开启失去焦点时验证，false禁用，默认为true
		"keyupChk":true, //开启键盘弹起时验证，false禁用，默认为true
	    "email":/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	     "url":/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
	    "number":/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
		"integer":/^\d+$/,
		"English" : /^[A-Za-z]+$/,
		"Chinese" :  /^[\u0391-\uFFE5]+$/,
		"Zip" : /^[1-9]\d{5}$/,
		"Currency" : /^\d+(\.\d+)?$/,
		"Require" : /.+/,
		"ipv4":/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i,
		"ipv6":/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/,
	   "showError":function(o,msg){  //错误提示
			var eo = $("[id*='error_"+$(o).attr("name")+"']");
			if(eo.size()==0){
				     $(o).after("<div id='error_"+$(o).attr("name")+"'></div>"); //创建消息div
					 eo = $("[id='error_"+$(o).attr("name")+"']");
			}
					eo.removeClass();
					eo.addClass("easycheck_errorInfo");
				
					if(EasyCheck.ecss!="no"){
						if(!($(o).attr("ecss")&&$(o).attr("ecss")!="yes")){//禁用错误提示时文本框改变样式——easycheck_errorInput
							$(o).removeClass("easycheck_okInput");
							$(o).addClass("easycheck_errorInput");
						}
					}
					
					var info =eo.attr("info");
					if(info){
					   eo.html(info+msg);
					}else{
						  eo.html(msg);
					}
					eo.show();
		
			
		},
		"clearError":function(o,msg){   //OK提示
				var eo = $("[id='error_"+$(o).attr("name")+"']");
				if(eo){
					eo.removeClass();
					if(EasyCheck.ecss!="no"){
					if(!($(o).attr("ecss")&&$(o).attr("ecss")!="yes")){//禁用错误提示时文本框改变样式——easycheck_errorInput
						$(o).removeClass("easycheck_errorInput");
						$(o).addClass("easycheck_okInput");
					}
					}
					
					eo.addClass("easycheck_okInfo");
					if(msg){
						eo.html(msg);
					}else{
						eo.html("");	
					}
					eo.hide();
								
			}
		},
	"clearAllError":function(){
			$("[id^='error_']").each(function(){
				var oName=$(this).attr("id").replace("error_","");
				var n=$("[name='"+oName+"']");
				if(EasyCheck.ecss!="no"){
					if(!(n.attr("ecss")&&n.attr("ecss")!="yes")){//禁用错误提示时文本框改变样式——easycheck_errorInput
						n.removeClass("easycheck_errorInfo");
						n.addClass("easycheck_okInput");
					}
				}
			});

			$("[id^='error_']").hide();
		},
		"formatMsg":function(){
			var ary = [];
 			 for(var i = 1 ; i < arguments.length ; i++){
  				 ary.push(arguments[i]);
		  }
		   return arguments[0].replace(/\{(\d+)\}/g,function(m ,i){
  				 return ary[i];
 			 });
		}		,
			/*
	自定义新验证插件函数，调用EasyCheck.addChkMethod(o,e,chkCode,msg)实现向系统注册新验证插件
	o 触发事件的元素
	e 事件对象
	chkCode 验证回调函数
	msg 提示消息

	*/
		"addChkMethod":function (o,e,chkCode,msg){
			if(!chkCode(o)){
					EasyCheck.showError(o,msg);
					if(e){
							e.stopImmediatePropagation(); //取消执行其他的事件处理函数并取消事件冒泡
					}
					return false;
		  }else{
				  EasyCheck.clearError(o);
				 return true;
		  }
	}
	,
		/*
			验证规则对象
			定义的类或属性名称，定义的验证处理函数，[是否是属性验证,true代表是]
	*/
	"ChkRule":function(chkName,chkFunction,chkAttr){
			this.chkName=chkName;
			this.chkFunction=chkFunction;
			this.chkAttr=chkAttr;
	},
	"chkList":"",  //验证列表
    "msg":{
		"required":"不能为空",
		"email":"邮箱格式不正确",
		"url":"网址有误",
		"number":"必须为数字",
		"integer":"必须为整数",
		"equalto":"输入不一致",
		"equallength":"长度必须为{0}位",
		"minlength][maxlength":"长度必须在{0}到{1}之间",
		"minlength":"长度不能小于{0}",
		"maxlength":"长度不能大于{0}",
		"min][max":"值必须在{0}和{1}之间",
		"min":"不能小于{0}",
		"max":"不能大于{0}",
		"regexp":"格式有误",
		 "extension":"文件扩展名只能为{0}",
		 "vc":"输入有误" //验证码

		},
		"easyCheckIgnore":{},  //指定忽略验证的规则，设置后同时忽略失去焦点事件和键盘弹起事件的验证（只对提交表单验证）
		"easyCheckBlurIgnore":{},  //焦点事件忽略进行验证的列表，（只对键盘弹起和表单验证），适合只在提交表单时验证的对象，如验证码
		"easyCheckKeyupIgnore":{},   //指定键盘弹起事件忽略验证的规则（只对失去焦点和表单验证）
		"easyCheckEleIgnore":{},//键盘弹起和失去焦点时忽略验证的DOM元素名称（只对提交表单有效）
		"easyCheckSubmitDisable":true,  //默认开启客户端防重复提交功能
		"removeDisableBtn":[], //Firefox下恢复禁用的按钮
		"removeDisableForm":[],  //firefox下恢复禁用按钮的表单
		"removeDisable":false, //是否移除页面表单中所有禁用的submit按钮，默认为不移除
		"ecss":"yes" //是否使用easycheck_errorInput验证未通过文本框样式，默认为是
}
/*
 验证规则对象列表
 有新的验证函数需要在此进行注册
*/
EasyCheck.chkList=[
 		new EasyCheck.ChkRule("required",checkRequired),
	   new EasyCheck.ChkRule("email",checkEmail),
	   new  EasyCheck.ChkRule("url",checkUrl),
	   new  EasyCheck.ChkRule("number",checkNumber),
	   new  EasyCheck.ChkRule("integer",checkInteger),
	   new  EasyCheck.ChkRule("equalto",checkEqualto,true),
	   new  EasyCheck.ChkRule("equallength",checkEquallength,true),
	   new  EasyCheck.ChkRule("minlength][maxlength",checkRangeLength,true),
	   new  EasyCheck.ChkRule("minlength",checkMinlength,true),
	   new  EasyCheck.ChkRule("maxlength",checkMaxlength,true),
	   new  EasyCheck.ChkRule("min][max",checkRange,true),
	    new  EasyCheck.ChkRule("min",checkMin,true),
		new  EasyCheck.ChkRule("max",checkMax,true),
		new  EasyCheck.ChkRule("reg",checkRegExp,true),
		new  EasyCheck.ChkRule("extension",checkExtension,true),
		new  EasyCheck.ChkRule("vc",checkVc,true)
 ];
 
 /*
  * 忽略注册的规则列表
  */  
  EasyCheck.easyCheckIgnore["vc"]=true; //vc验证码规则，键盘弹起和失去焦点时不验证，只在表单提交时验证
  //EasyCheck.easyCheckBlurIgnore["vc"]=true;
 // EasyCheck.easyCheckKeyupIgnore["vc"]=true;
  EasyCheck.easyCheckEleIgnore["uservc"]=true; //如果元素名称为uservc，则只在提交表单时验证
 
  
  /*检测用户名是否存在
  function checkExists(o,e){
	 	 return EasyCheck.addChkMethod(o,e,
				 function(o){
					 var val=$(o).val();
					 var res=false;
					 dwr.engine.setAsync(false);
						 UserInfoDWR.checkEmail(val,function(d){
							 res=d;
						 });
						 if(res=="true"){
							 CompanyInfoDWR.checkEmail(val,function(d){
								 res=d;
							 });
						 }
					 return res;
				},
				EasyCheck.msg["exists"]);
	 }*/

  
 function checkVc(o,e){
 	 return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 var res=false;
				 $.ajaxSetup({"async":false});
				 $.post($(o).attr("vc"),$(o).attr("name")+"="+val+"&n="+new Date(),function(d){
					res=d.replace(/\r\n/g,"");
				 },"text");
				 return res=="true";
			},
			EasyCheck.msg["vc"]);
 }

   function checkRegExp(o,e){
	   return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 var reg= new RegExp('^(?:' + $(o).attr("reg") + ')$');
				 return !($.trim(val)!=""&&!reg.test(val));
			},
			EasyCheck.msg["regexp"]);
  }
   //验证扩展名，多个扩展名使用英文逗号分隔
     function checkExtension(o,e){
		 ex="png,jpeg,jpg,gif";
	   return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 ex=$(o).attr("extension");
				 
				 var extensionList=ex!=""?ex.replace(/,/g, '|'):"png|jpe?g|gif";
				 return!($.trim(val)!=""&&!val.match(new RegExp(".(" + extensionList + ")$", "i")));
			},
				EasyCheck.formatMsg(EasyCheck.msg["extension"],ex));
  }


	function checkRequired(o,e){	
		
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 
				 return $.trim(val)!="";
				
			},
			EasyCheck.msg["required"]);
	}


	function checkEmail(o,e){		
			return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val)!=""&&!EasyCheck.email.test(val));
			},
			EasyCheck.msg["email"]);

	}
	function checkUrl(o,e){
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val)!=""&&!EasyCheck.url.test(val));
			},
				EasyCheck.msg["url"]);

	}
	function  checkNumber(o,e){
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val)!=""&&!EasyCheck.number.test(val));
			},
				EasyCheck.msg["number"]);
	}
	
	function checkInteger(o,e){
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val)!=""&&!EasyCheck.integer.test(val));
			},
				EasyCheck.msg["integer"]);
}

function checkEqualto(o,e){
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !(val!=$("[id='"+$(o).attr("equalto")+"']").val());
			},
				EasyCheck.msg["equalto"]);
}

function checkEquallength(o,e){
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !(val.length!=$(o).attr("equallength"));
			},
				EasyCheck.formatMsg(EasyCheck.msg["equallength"],$(o).attr("equallength")));
}

function checkRangeLength(o,e){
	return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val).length<$(o).attr("minlength")||$.trim(val).length>$(o).attr("maxlength"));
			},
			EasyCheck.formatMsg(EasyCheck.msg["minlength][maxlength"],$(o).attr("minlength"),$(o).attr("maxlength")));
}

function checkMinlength(o,e){
	return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val).length<$(o).attr("minlength"));
			},
			EasyCheck.formatMsg(EasyCheck.msg["minlength"],$(o).attr("minlength")));
}



function checkMaxlength(o,e){
	return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !($.trim(val).length>$(o).attr("maxlength"));
			},
		 EasyCheck.formatMsg(EasyCheck.msg["maxlength"],$(o).attr("maxlength")));	
}


function checkRange(o,e){
	return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !(parseFloat($.trim(val))<parseFloat($(o).attr("min"))||parseFloat($.trim(val))>parseFloat($(o).attr("max"))||isNaN(val));
			},
			 EasyCheck.formatMsg(EasyCheck.msg["min][max"],$(o).attr("min"),$(o).attr("max")));	
}
function checkMin(o,e){
	return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !(parseFloat($.trim(val))<parseFloat($(o).attr("min"))||isNaN(val));
			},
				 EasyCheck.formatMsg(EasyCheck.msg["min"],$(o).attr("min")));	
}

function checkMax(o,e){
		return EasyCheck.addChkMethod(o,e,
			 function(o){
				 var val=$(o).val();
				 return !(parseFloat($.trim(val))>parseFloat($(o).attr("max"))||isNaN(val));
			},
			EasyCheck.formatMsg(EasyCheck.msg["min"],$(o).attr("min")));	
}

	/*
	eg. 自定义新验证插件
	*/
	function checkNew(o,e){		
		return EasyCheck.addChkMethod(o,e,
			 function(o){
			//验证实现，返回true或false。true代表验证通过，false代表未通过，将显示msg的消息
			// var val=$(o).val();
			//return $.trim(val)!="";
			},
			"验证失败时的消息字符串");
	}






function chk(o,e,chkFunction){  //回调验证函数

	chkFunction(o,e);
}
/*添加类验证和属性验证
注册的类或属性名称，注册的处理函数
*/
function addChk(chkrule){
	var chkElements=chkrule.chkAttr?"["+chkrule.chkName+"]":"[class~='"+chkrule.chkName+"']";

	$(chkElements).on("blur",function(e){ 
			if(!EasyCheck.easyCheckBlurIgnore[chkrule.chkName]&&(!EasyCheck.easyCheckEleIgnore[e.target.name])){
				EasyCheck.blurChk?chk(this,e,chkrule.chkFunction):'';  //开启失去焦点验证时处理
			}
		}).on("focus",function(e){
				
				  		 EasyCheck.clearError(this);
					
				
		}).on("keyup",function(e){ 
				if(!EasyCheck.easyCheckKeyupIgnore[chkrule.chkName]&&(!EasyCheck.easyCheckEleIgnore[e.target.name])){
			 	EasyCheck.keyupChk?chk(this,e,chkrule.chkFunction):'';  //开启键盘弹起验证时处理
				}
		});
}

/*添加Form类验证
注册的类或属性名称，注册的处理函数，表单对象信息
*/
function addChkForm(chkrule,fromChkInfo){
			var chkElements=chkrule.chkAttr?"["+chkrule.chkName+"]":"[class~='"+chkrule.chkName+"']";
			
			$(fromChkInfo.eleArea+chkElements).each(function(index, element) {
					   if(!fromChkInfo.errorEleArray[$(element).attr("name")]){  //已出错提示元素不再验证
							var flag=chkrule.chkFunction(element);
							if(!flag){  //验证未通过
								fromChkInfo.errorEleArray[$(element).attr("name")]="E"; //加入未通过数组
								fromChkInfo.chkFlag=false;//提交标识为false
							}
					   }else{
					   		fromChkInfo.chkFlag=false;//提交标识为false
					   }
				 }); 	
}



	/*
		页面全局验证注册
	*/
	function easyCheck(){
		//注册的类或属性名称，注册的处理函数
		/*注册系统类验证和属性验证*/
		for(var i=0;i< EasyCheck.chkList.length;i++){
				var chkrule= EasyCheck.chkList[i];
				if(!EasyCheck.easyCheckIgnore[chkrule.chkName]){
					addChk(chkrule);  //回调函数
				}
		}
	}
	


/*
submit时，表单验证注册
*/
function easyCheckForm(eleArea){
				var fromChkInfo={
					"eleArea":"[id='"+$(eleArea).attr("id")+"'] ",  //验证的Form区域
					"chkFlag":true,   //验证成功与否
					"errorEleArray":new Array()//失败元素数组
				};
			

				// 注册的类或属性名称，注册的处理函数，表单对象信息
				/*注册Form类验证*/
				for(var i=0;i< EasyCheck.chkList.length;i++){
					var chkrule= EasyCheck.chkList[i];  
				    addChkForm(chkrule,fromChkInfo);  //回调函数
				}				
			
	
				if(fromChkInfo.chkFlag==true&&EasyCheck['easyCheckSubmitDisable']==true){		
							$(fromChkInfo.eleArea+":submit").attr("disabled","true");
				}else{		
							$(fromChkInfo.eleArea+":submit").removeAttr("disabled");
				}
				 return fromChkInfo.chkFlag;
}


$(function(){
	EasyCheck.loadChk?easyCheck():'';

	for(var i=0;i<EasyCheck.removeDisableBtn.length;i++){
		$("#"+EasyCheck.removeDisableBtn[i]).removeAttr("disabled");
	}

	if(EasyCheck.removeDisable==true){
		$("form :submit").removeAttr("disabled");
	}else{
		for(var i=0;i<EasyCheck.removeDisableForm.length;i++){
			$("[id='"+EasyCheck.removeDisableForm[i]+"'] :submit").removeAttr("disabled");
		}
	}
	

});