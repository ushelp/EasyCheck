/**
 * jQuery EasyCheck Tooltip plugin all in one file
 * 
 * Version 5.0.0
 * 
 * http://easyproject.cn
 * https://github.com/ushelp/EasyCheck
 * 
 * Author: Ray [ inthinkcolor@gmail.com ]
 * Since: 2011
 * 
 * Dependencies: EasyCheck
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
    }, checkVc = function(o, e) {
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
        errorMsg:'<div class="tooltip-right tooltip">'+
		'<div class="tooltip-content">{0}</div>'+
		'<div class="tooltip-arrow-outer"></div>'+
		'<div class="tooltip-arrow" ></div>'+
		'</div>',
		correctMsg:'<div class="tooltip-right-ok tooltip-ok">'+
		'<div class="tooltip-content-ok">{0}</div>'+
		'<div class="tooltip-arrow-outer-ok"></div>'+
		'<div class="tooltip-arrow-ok" ></div>'+
		'</div>',
		defMsg:'<div class="tooltip-right-def tooltip-def">'+
		'<div class="tooltip-content-def">{0}</div>'+
		'<div class="tooltip-arrow-outer-def"></div>'+
		'<div class="tooltip-arrow-def" ></div>'+
		'</div>',
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
        },
        restoreAll:function(formId) {
        	EasyCheck.chkDef.errorManger({
                formId:formId,
                restore:true
            });
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
                     		if(defDiv.size()>0){
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
   
            var fromChkInfo = {
                eleArea:"[id='" + $(eleArea).attr("id") + "'] ",
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
   
            return fromChkInfo.chkFlag;
        },
        // plugins 可覆盖扩展的默认检查配置
    	chkDef:{
    		// 错误消息清除管理
    		errorManger : function(param) {
    	        var s = "";
    	        if (param.formId) {
    	            s = "[id='" + param.formId + "'] ";
    	        }
    	        // clearAllError
    	        $(s + "[id^='error_']:visible").each(function() {
    	            var oNameOrId = $(this).attr("id").replace("error_", "");
    	            var n = null;
    	            if ($(s + "[id='" + oNameOrId + "']").length > 0) {
    	                n = $(s + "[id='" + oNameOrId + "']");
    	            } else {
    	                n = $(s + "[name='" + oNameOrId + "']");
    	            }
    	            var formId = $("form").has(n).attr("id");
    	            if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
    	                if (!(n.attr("ecss") && n.attr("ecss") != "yes")) {
    	                    n.removeClass(EasyCheck.errorCss);
    	                    if (formId && EasyCheck.formErrorCss[formId]) {
    	                        n.removeClass(EasyCheck.formErrorCss[formId]);
    	                    }
    	                		var domId=n.attr("id")||n.attr("name");
    	                		var oid=formId+"_"+domId;
    	                        n.addClass(EasyCheck.txtClass[oid+"_class"]);
    	                }
    	            }
    	            $(s + "[id^='error_']").hide();
    	        });
    	        
    	        //restoreAll
    	        if (param.restore) {
    	            $(s + "[id^='correct_']").each(function() {
    	                $(this).hide();
    	            });
    	            $(s + "[id^='default_']").each(function() {
    	            	 var nowForm=$("form").has(this);
    	            	 var defDiv=$(this);
    	            	 if(nowForm){
    	                	 var formId=nowForm.attr("id");
    	                     var oid=defDiv.attr("id").substr("default_".length);
    	                     EasyCheck.chkDef.showDef(defDiv,formId,oid ); 
    	            	 }else{
    	            		 EasyCheck.chkDef.showDef(defDiv); 
    	            	 }
    	            	
    	            });
    	        }
    	    },
    	    // 默认状态管理
    	    showDef:function(defDiv,formId,oid){
    	        if(formId){
    	        	  var defMsg=defDiv.html();
    	        	  
    	              if(EasyCheck.cacheDefMsg[formId+"_"+oid]!=undefined){
    	            	  defMsg=EasyCheck.cacheDefMsg[formId+"_"+oid];
    	              }else{
    	            	  if(defDiv.attr("info")){
    	            		  defMsg=defDiv.attr("info");
    	                   }
    	              	EasyCheck.cacheDefMsg[formId+"_"+oid]=defMsg;
    	              }
    	             
    	              if(EasyCheck.defMsgs[oid]){
    	            	  defDiv.html(EasyCheck.defMsgs[oid].replace(EasyCheck.msgMark,defMsg));
    	              }else if(EasyCheck.defMsgs[formId]){
    	            	  defDiv.html(EasyCheck.defMsgs[formId].replace(EasyCheck.msgMark,defMsg));
    	              }else{ 
    	            	  defDiv.html(EasyCheck.defMsg.replace(EasyCheck.msgMark,defMsg));
    	              }
    	      	}
    	    	defDiv.show();
    	    }, 
    	    // 添加检测方法管理
    	    addChkMethod : function(rule, o, e, chkCode, msg) {
    	        var divSuf = $(o).attr("id") || $(o).attr("name");
    	        var de = $("[id='default_" + divSuf + "']");
    	        if (de) {
    	            de.hide();
    	        }
    	        if (!chkCode(o)) {
    	            var de = $("[id='default_" + divSuf + "']");
    	            if (de) {
    	                de.hide();
    	            }
    	            if (EasyCheck.msgs[divSuf] && EasyCheck.msgs[divSuf][rule]) {
    	                msg = typeof EasyCheck.msgs[divSuf][rule] == "string" ? EasyCheck.msgs[divSuf][rule] :EasyCheck.msgs[divSuf][rule]($(o));
    	            }
    	            EasyCheck.showError(o, msg);
    	            if (e) {
    	                e.stopImmediatePropagation();
    	            }
    	            return false;
    	        } else {
    	            EasyCheck.clearError(o);
    	            var defaultDiv = $("[id='default_" + divSuf + "']");
    	            if (defaultDiv) {
    	                defaultDiv.hide();
    	            }
    	            var okDiv = $("[id='correct_" + divSuf + "']");
    	            var formId = $("form").has(o).attr("id");
    	            if (okDiv) {
    	                okDiv.addClass("easycheck_okInfo");
    	                
    	                var correctMsg=okDiv.html();
    	                if(EasyCheck.cacheCorrectMsg[formId+"_"+divSuf]!=undefined){
    	                	correctMsg=EasyCheck.cacheCorrectMsg[formId+"_"+divSuf];
    	                }else{
    	            	  if(okDiv.attr("info")){
    	            		  correctMsg=okDiv.attr("info");
    	                   }
    	                	EasyCheck.cacheCorrectMsg[formId+"_"+divSuf]=correctMsg;
    	                }
    	                
    	                if(EasyCheck.correctMsgs[divSuf]){
    	                	okDiv.html(EasyCheck.correctMsgs[divSuf].replace(EasyCheck.msgMark,correctMsg));
    	                }else if(EasyCheck.correctMsgs[formId]){
    	                	okDiv.html(EasyCheck.correctMsgs[formId].replace(EasyCheck.msgMark,correctMsg));
    	                }else{
    	                	okDiv.html(EasyCheck.correctMsg.replace(EasyCheck.msgMark,correctMsg));
    	                }
    	                
    	                okDiv.show();
    	            }
    	            if (e) {
    	                if (e.type == "keyup") {
    	                    $(o).removeClass(EasyCheck.errorCss);
    	                    var nowForm = $("form").has(o);
    	                    if (nowForm.length > 0 && EasyCheck.formErrorCss[nowForm.attr("id")]) {
    	                        $(o).removeClass(EasyCheck.formErrorCss[nowForm.attr("id")]);
    	                    }
    	                    if (nowForm.length > 0 && EasyCheck.formFocusCss[nowForm.attr("id")]) {
    	                        $(o).addClass(EasyCheck.formFocusCss[nowForm.attr("id")]);
    	                    } else {
    	                        $(o).addClass(EasyCheck.focusCss);
    	                    }
    	                }
    	            }
    	            return true;
    	        }
    	    },
    	    // 显示错误
    	    showError: function(o, msg){
    	    	 if (typeof o == "string") {
    	                o = $("#" + o)[0] || $("[name='" + o + "']")[0];
    	            }
    	            o=$(o);
    	            var divSuf = o.attr("id") || o.attr("name");
    	            $("[id='correct_" + divSuf + "']").hide();
    	            $("[id='default_" + divSuf + "']").hide();
    	            var eo = $("[id='error_" + divSuf + "']");
    	            if (eo.size() == 0) {
    	                o.after("<div id='error_" + divSuf + "'></div>");
    	                eo = $("[id='error_" + divSuf + "']");
    	            }
    	            eo.removeClass();
    	            eo.addClass("easycheck_errorInfo");
    	            var formId = $("form").has(o).attr("id");
    	           
    	            o.removeClass(EasyCheck.focusCss);
    	            if (formId && EasyCheck.formFocusCss[formId]) {
    	               o.removeClass(EasyCheck.formFocusCss[formId]);
    	            }
    	            if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
    	                if (!(o.attr("ecss") && o.attr("ecss") != "yes")) {
    	                    if (formId && EasyCheck.formErrorCss[formId]) {
    	                        o.addClass(EasyCheck.formErrorCss[formId]);
    	                    } else {
    	                        o.addClass(EasyCheck.errorCss);
    	                    }
    	                }
    	            }
    	            
    	            
    	            var errorMsg="";
    	            var prefix = eo.attr("prefix");
    	            if (prefix) {
    	            	errorMsg=prefix + msg;
    	            } else {
    	                prefix = "";
    	                errorMsg=msg;
    	            }
    	            
    	            
    	            var info=eo.html();
    	            if(EasyCheck.cacheErrorMsg[formId+"_"+divSuf]!=undefined){
    	            	info=EasyCheck.cacheErrorMsg[formId+"_"+divSuf];
    	            }else{
    	            	 if(eo.attr("info")){
    	                 	info=eo.attr("info");
    	                 }
    	            	EasyCheck.cacheErrorMsg[formId+"_"+divSuf]=info;
    	            }
    	            
    	            if (info) {
    	            	errorMsg=prefix + info;
    	            }
    	            if(EasyCheck.errorMsgs[divSuf]){
    	            	eo.html(EasyCheck.errorMsgs[divSuf].replace(EasyCheck.msgMark,errorMsg));
    	            }else if(EasyCheck.errorMsgs[formId]){
    	            	eo.html(EasyCheck.errorMsgs[formId].replace(EasyCheck.msgMark,errorMsg));
    	            }else{
    	            	eo.html(EasyCheck.errorMsg.replace(EasyCheck.msgMark,errorMsg));
    	            }
    	            eo.show();
    	    },
    	    // 清除错误
    	    clearError:function(o, msg){
    	    	 if (typeof o == "string") {
    	                o = $("#" + o)[0] || $("[name='" + o + "']")[0];
    	            }
    	            o=$(o);
    	            var divSuf = o.attr("id") || o.attr("name");
    	            var eo = $("[id='error_" + divSuf + "']");
    	          
    	            var formId = $("form").has(o).attr("id");
    	            if (eo) {
//    			                eo.removeClass();
    	                if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
    	                    if (!(o.attr("ecss") && o.attr("ecss") != "yes")) {
    	                        o.removeClass(EasyCheck.errorCss);
    	                        if (formId && EasyCheck.formErrorCss[formId]) {
    	                            o.removeClass(EasyCheck.formErrorCss[formId]);
    	                        }
    	                      		var domId=o.attr("id")||o.attr("name");
    	                      		var oid=formId+"_"+domId;
    	                            o.addClass(EasyCheck.txtClass[oid+"_class"]);
    	                        	
    	                    }
    	                }
    	                eo.addClass("easycheck_okInfo");
    	                if (msg) {
    	                    eo.html(msg);
    	                } else {
    	                    eo.html("");
    	                }
    	                eo.hide();
    	                
    	                
    	                var defDiv=$("[id='default_" + divSuf + "']");
    	                $("[id='correct_" + divSuf + "']").hide();
    	                EasyCheck.chkDef.showDef(defDiv,formId,divSuf ); 
    	                
    	            }
    	            o.removeClass(EasyCheck.focusCss);
    	            if (formId && EasyCheck.formFocusCss[formId]) {
    	                o.removeClass(EasyCheck.formFocusCss[formId]);
    	            }
    	            
    	            var domId=o.attr("id")||o.attr("name");
    	      		var oid=formId+"_"+domId;
    	            o.addClass(EasyCheck.txtClass[oid+"_class"]);
    	    },
    	    // 初始化Chk框
    	    initChk:function(chkrule) {
                var chkElements = EasyCheck.getMatches(chkrule.chkName);
                $(chkElements).each(function(){
                		var o=$(this);
                		var formId = $("form").has(o).attr("id");
                		var domId=o.attr("id")||o.attr("name");
                		var oid=formId+"_"+domId;
                		EasyCheck.txtClass[oid+"_class"]=$(this).attr("class");
                		EasyCheck.txtClass[oid+"_style"]=$(this).attr("style");
                });
               
                
                $(chkElements).on("blur change", function(e) {
                    if (!EasyCheck.easyCheckBlurIgnore[chkrule.chkName] && !EasyCheck.easyCheckEleIgnore[e.target.id || e.target.name]) {
                        if (!EasyCheck.easyCheckEleBlurIgnore[e.target.id || e.target.name]) {
                            EasyCheck.blurChk ? EasyCheck.chk(this, e, chkrule.chkFunction) :"";
                        }
                    }
                }).on("focus", function(e) {
                	if(!EasyCheck.resetOnFocus){
                		return;
                	}
                    EasyCheck.clearError(this);
                    var o = $(this);
                    var domId = o.attr("id") || o.attr("name");
                    var okDiv = $("[id='correct_" + domId + "']");
                    if (okDiv.length > 0) {
                        if (okDiv.filter(":hidden").length > 0) {
                            var defDiv = $("[id='default_" + domId + "']");
                            if (defDiv) {
                            	  $("[id='correct_" + domId + "']").hide();
                            	  EasyCheck.chkDef.showDef(defDiv,$("form").has($(domId)).attr("id"),domId ); 
                            	
                            }
                        }
                    } else {
                        var defDiv = $("[id='default_" + domId + "']");
                        if (defDiv) {
                        	  $("[id='correct_" + domId + "']").hide();
                        	  EasyCheck.chkDef.showDef(defDiv,$("form").has($(domId)).attr("id"),domId ); 
                        }
                    }
                    var nowForm = $("form").has(o);
            		var formId = nowForm.attr("id");
                    
                    var formId = nowForm.attr("id");
                    if (formId && EasyCheck.formFocusCss[formId]) {
                        o.addClass(EasyCheck.formFocusCss[formId]);
                    } else {
                        o.addClass(EasyCheck.focusCss);
                    }
                }).on("keyup", function(e) {
                    if (!EasyCheck.easyCheckKeyupIgnore[chkrule.chkName] && !EasyCheck.easyCheckEleIgnore[e.target.id || e.target.name]) {
                        if (!EasyCheck.easyCheckEleKeyupIgnore[e.target.id || e.target.name]) {
                            EasyCheck.keyupChk ? EasyCheck.chk(this, e, chkrule.chkFunction) :"";
                        }
                    }
                });
            }
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
    $("[easycheck='true']").on("submit",function(){
    	return EasyCheck.checkForm(this); 
    });
    EasyCheck.initDefMsg();
}); 