/**
 * jQuery EasyCheck Plugin
 * 
 * Version 5.1.0
 * 
 * http://easyproject.cn
 * https://github.com/ushelp/EasyCheck
 * 
 * Author: Ray [ inthinkcolor@gmail.com ]
 * Since: 2011
 * 
 * Dependencies: jQuery
 * 
 */
(function(window) {
    var addChkForm = function(chkrule, fromChkInfo) {
        var chkElements = EasyCheck.getMatches(chkrule.chkName);
        $(fromChkInfo.eleArea + chkElements).each(function(index, element) {
            var divStuf = $(element).attr("id") || $(element).attr("name");
            if (!fromChkInfo.errorEleArray[divStuf]) {
                var flag = chkrule.chkFunction(element);
                if (!flag) {
                    fromChkInfo.errorEleArray[divStuf] = "E";
                    fromChkInfo.chkFlag = false;
                }
            } else {
                fromChkInfo.chkFlag = false;
            }
        });
    },checkVc = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[vc]", o, e, function(o) {
            var val = $(o).val();
            var res = false;
            $.ajaxSetup({
                async:false
            });
            $.post($(o).attr("vc"), $(o).attr("name") + "=" + val + "&n=" + new Date(), function(d) {
                res = d.replace(/\r\n/g, "");
            }, "text");
            return res == "true";
        }, EasyCheck.msg["vc"]);
    }, checkRegExp = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[reg]", o, e, function(o) {
            var val = $(o).val();
            var reg = new RegExp("^(?:" + $(o).attr("reg") + ")$");
            return !($.trim(val) != "" && !reg.test(val));
        }, EasyCheck.msg["regexp"]);
    }, checkExtension = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[extension]", o, e, function(o) {
            var ex = $(o).attr("extension");
            var val = $(o).val();
            var extensionList = ex != "" ? ex.replace(/,/g, "|") :"png|jpe?g|gif";
            return !($.trim(val) != "" && !val.match(new RegExp(".(" + extensionList + ")$", "i")));
        }, EasyCheck.formatMsg(EasyCheck.msg["extension"], $(o).attr("extension")));
    }, checkRequired = function(o, e) {
        return EasyCheck.chkDef.addChkMethod(".required", o, e, function(o) {
            var val = $(o).val();
            return $.trim(val) != "";
        }, EasyCheck.msg["required"]);
    }, checkEmail = function(o, e) {
        return EasyCheck.chkDef.addChkMethod(".email", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.email.test(val));
        }, EasyCheck.msg["email"]);
    }, checkUrl = function(o, e) {
        return EasyCheck.chkDef.addChkMethod(".url", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.url.test(val));
        }, EasyCheck.msg["url"]);
    }, checkNumber = function(o, e) {
        return EasyCheck.chkDef.addChkMethod(".number", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.number.test(val));
        }, EasyCheck.msg["number"]);
    }, checkInteger = function(o, e) {
        return EasyCheck.chkDef.addChkMethod(".integer", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.integer.test(val));
        }, EasyCheck.msg["integer"]);
    }, checkEqualto = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[equalto]", o, e, function(o) {
            var val = $(o).val();
            return val == $("[id='" + $(o).attr("equalto") + "']").val();
        }, EasyCheck.msg["equalto"]);
    }, checkEquallength = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[equallength]", o, e, function(o) {
            var val = $(o).val();
            return !(val.length != $(o).attr("equallength"));
        }, EasyCheck.formatMsg(EasyCheck.msg["equallength"], $(o).attr("equallength")));
    }, checkRangeLength = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[minlength][maxlength]", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val).length < $(o).attr("minlength") || $.trim(val).length > $(o).attr("maxlength"));
        }, EasyCheck.formatMsg(EasyCheck.msg["lengthrange"], $(o).attr("minlength"), $(o).attr("maxlength")));
    }, checkMinlength = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[minlength]", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val).length < $(o).attr("minlength"));
        }, EasyCheck.formatMsg(EasyCheck.msg["minlength"], $(o).attr("minlength")));
    }, checkMaxlength = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[maxlength]", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val).length > $(o).attr("maxlength"));
        }, EasyCheck.formatMsg(EasyCheck.msg["maxlength"], $(o).attr("maxlength")));
    }, checkRange = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[min][max]", o, e, function(o) {
            var val = $(o).val();
            return !(parseFloat($.trim(val)) < parseFloat($(o).attr("min")) || parseFloat($.trim(val)) > parseFloat($(o).attr("max")) || isNaN(val));
        }, EasyCheck.formatMsg(EasyCheck.msg["numberrange"], $(o).attr("min"), $(o).attr("max")));
    }, checkMin = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[min]", o, e, function(o) {
            var val = $(o).val();
            return !(parseFloat($.trim(val)) < parseFloat($(o).attr("min")) || isNaN(val));
        }, EasyCheck.formatMsg(EasyCheck.msg["min"], $(o).attr("min")));
    }, checkMax = function(o, e) {
        return EasyCheck.chkDef.addChkMethod("[max]", o, e, function(o) {
            var val = $(o).val();
            return !(parseFloat($.trim(val)) > parseFloat($(o).attr("max")) || isNaN(val));
        }, EasyCheck.formatMsg(EasyCheck.msg["max"], $(o).attr("max")));
    };
    
    
    var EasyCheck = {
        chkList:"",
        msg:{},
        msgs:{},
        msgMark:"{0}",
        errorMsg:"{0}",
        correctMsg:"{0}",
        defMsg:"{0}",
        errorMsgs:{},
        correctMsgs:{},
        defMsgs:{},
        cacheCorrectMsg:{},
        cacheDefMsg:{},
        cacheErrorMsg:{},
        // 表单元素获得焦点时是否还原为默认提示
        resetOnFocus:true,
        validator:{
            email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
            integer:/^-?^\d+$/,
            English:/^[A-Za-z]+$/,
            Chinese:/^[\u0391-\uFFE5]+$/,
            Zip:/^[1-9]\d{5}$/,
            Currency:/^\d+(\.\d+)?$/,
            Require:/.+/,
            ipv4:/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i,
            ipv6:/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/
        },
        easyCheckIgnore:{},
        easyCheckBlurIgnore:{},
        easyCheckKeyupIgnore:{},
        easyCheckEleIgnore:{},
        easyCheckEleBlurIgnore:{},
        easyCheckEleKeyupIgnore:{},
        easyCheckSubmitDisable:true,
        removeDisableBtn:[],
        removeDisableForm:[],
        removeDisable:false,
        ecss:"yes",
        formEcss:{},
        focusCss:"easycheck_focusInput",
        errorCss:"easycheck_errorInput",
        formFocusCss:{},
        formErrorCss:{},  
        txtClass:{},
        loadChk:true,
        blurChk:true,
        keyupChk:true,
        formatMsg:function() {
            var ary = [];
            for (var i = 1; i < arguments.length; i++) {
                ary.push(arguments[i]);
            }
            
            return arguments[0].replace(/\{(\d+)\}/g, function(m, i) {
                return ary[i];
            });
        },
        getMatches:function(chkName) {
            var regAttr = /(\[[A-Za-z0-9]+\])/g;
            var regClass = /(\.[A-Za-z0-9]+)/g;
            var chkElements = "";
            var matches = chkName.match(regAttr);
            if (matches != null) {
                $.each(matches, function(i, e) {
                    chkElements += e;
                });
            }
            matches = chkName.match(regClass);
            if (matches != null) {
                $.each(matches, function(i, e) {
                    chkElements += "[class~='" + e.substring(1) + "']";
                });
            }
            return chkElements;
        },
        clearAllError:function(formId) {
        	EasyCheck.chkDef.errorManger({
                formId:formId
            });
        	if(EasyCheck.chkDef.clearAllErrorComplete){
        		EasyCheck.chkDef.clearAllErrorComplete(formId);
        	}
        },
        restoreAll:function(formId) {
        	EasyCheck.chkDef.errorManger({
                formId:formId,
                restore:true
            });
        	if(EasyCheck.chkDef.restoreAllComplete){
        		EasyCheck.chkDef.restoreAllComplete(formId);
        	}
        },
        showError:function(o, msg) {
           EasyCheck.chkDef.showError(o,msg);
        },
        clearError:function(o, msg) {
        	EasyCheck.chkDef.clearError(o,msg);
        },
        chk:function(o, e, chkFunction) {
            chkFunction(o, e);
        },
        initDefMsg:function(){
        	 for (var i = 0; i < EasyCheck.chkList.length; i++) {
                 var chkrule = EasyCheck.chkList[i];
                 if (!EasyCheck.easyCheckIgnore[chkrule.chkName]) {
                	 var chkElements = EasyCheck.getMatches(chkrule.chkName);
                     $(chkElements).each(function(){
                     		var o=$(this);
                     		var formId = $("form").has(o).attr("id");
                     		var domId=o.attr("id")||o.attr("name");
                     		var defDiv = $("[id='default_" + domId + "']");
                     		if(defDiv.length>0){
                     			EasyCheck.chkDef.showDef(defDiv,formId,domId ); 
                     		}
                     });
                 }
             }
        },
        initChk:function(chkrule) {
        	EasyCheck.chkDef.initChk(chkrule);
        },
        addChk:function(vName, vFn, msgFn) {
            var newChk = function(o, e) {
                return EasyCheck.chkDef.addChkMethod(vName, o, e, vFn, typeof msgFn == "string" ? msgFn :msgFn(o));
            };
            var chkRule = new EasyCheck.ChkRule(vName, newChk);
            EasyCheck.chkList.push(chkRule);
            EasyCheck.initChk(chkRule);
        },
        ChkRule:function(chkName, chkFunction) {
            this.chkName = chkName;
            this.chkFunction = chkFunction;
        },
        checkForm:function(eleArea) {
        	if(typeof eleArea=="string"){
        		eleArea=$(eleArea);
        	} 
        	var formId=$(eleArea).attr("id");
            var fromChkInfo = {
                eleArea:"[id='" + formId + "'] ",
                chkFlag:true,
                errorEleArray:new Array()
            };
            for (var i = 0; i < EasyCheck.chkList.length; i++) {
                var chkrule = EasyCheck.chkList[i];
                addChkForm(chkrule, fromChkInfo);
            }
            if (fromChkInfo.chkFlag == true && EasyCheck["easyCheckSubmitDisable"] == true) {
                $(":submit", $(fromChkInfo.eleArea)).attr("disabled", "true");
            } else {
                $(":submit", $(fromChkInfo.eleArea)).removeAttr("disabled");
            }
            
            // 验证完成回调
            if(EasyCheck.chkDef.complete){
            	EasyCheck.chkDef.complete(formId, fromChkInfo.chkFlag);
            }            
            return fromChkInfo.chkFlag;
        },
        // plugins 可覆盖扩展的默认检查配置
    	chkDef:{
    		// 错误消息清除管理
			errorManger : function(param) {},
			// 默认状态管理
		    showDef:function(defDiv,formId,oid){},
		    // 添加检测方法管理
		    addChkMethod : function(rule, o, e, chkCode, msg){},
		   // 显示错误
		    showError: function(o, msg){},
		   // 清除错误
		    clearError:function(o, msg){},
		   // 初始化Chk框
		    initChk:function(chkrule){},
		    // 验证完成后的回调函数(formId,验证结果true|false)
		    complete:function(formId,result){},
		    // restoreAll 完成后的回调函数
		    restoreAllComplete:function(formId){},
		    // clearAllError 完成后的回调函数
		    clearAllErrorComplete:function(formId){}
    	}
    };
    
    EasyCheck.chkList = [ new EasyCheck.ChkRule(".required", checkRequired), new EasyCheck.ChkRule(".email", checkEmail), new EasyCheck.ChkRule(".url", checkUrl), new EasyCheck.ChkRule(".number", checkNumber), new EasyCheck.ChkRule(".integer", checkInteger), new EasyCheck.ChkRule("[equalto]", checkEqualto), new EasyCheck.ChkRule("[equallength]", checkEquallength), new EasyCheck.ChkRule("[minlength][maxlength]", checkRangeLength), new EasyCheck.ChkRule("[minlength]", checkMinlength), new EasyCheck.ChkRule("[maxlength]", checkMaxlength), new EasyCheck.ChkRule("[min][max]", checkRange), new EasyCheck.ChkRule("[min]", checkMin), new EasyCheck.ChkRule("[max]", checkMax), new EasyCheck.ChkRule("[reg]", checkRegExp), new EasyCheck.ChkRule("[extension]", checkExtension), new EasyCheck.ChkRule("[vc]", checkVc) ];
    EasyCheck.easyCheckIgnore["[vc]"] = true;
    window.EasyCheck = EasyCheck;
})(window);

$(function() {
    function easyCheck() {
        for (var i = 0; i < EasyCheck.chkList.length; i++) {
            var chkrule = EasyCheck.chkList[i];
            if (!EasyCheck.easyCheckIgnore[chkrule.chkName]) {
                EasyCheck.initChk(chkrule);
            }
        }
    }
    
    EasyCheck.loadChk ? "" :(EasyCheck.blurChk = false, EasyCheck.keyupChk = false);
    easyCheck();
    for (var i = 0; i < EasyCheck.removeDisableBtn.length; i++) {
        $("#" + EasyCheck.removeDisableBtn[i]).removeAttr("disabled");
    }
    if (EasyCheck.removeDisable == true) {
        $("form :submit").removeAttr("disabled");
    } else {
        for (var i = 0; i < EasyCheck.removeDisableForm.length; i++) {
            $(":submit", $("#" + EasyCheck.removeDisableForm[i])).removeAttr("disabled");
        }
    }
    $("[id*='correct_']").hide();
    $("[id*='error_']").hide();
    // 取消html默认验证提示
    $("form").attr( "novalidate", "novalidate" ); 
    
    var ecs=$("[easycheck='true']");
    
    ecs.on("submit",function(){
    	return EasyCheck.checkForm(this); 
    });
    // 自动注册重置操作
    ecs.find(":reset").on("click",function(){
    	var form=$(this).parents("form");
    	if(form){
    		var formId=form.attr("id");
    		if(formId){EasyCheck.restoreAll(formId);}
    	}
    })
}); 