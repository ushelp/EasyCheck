/**
 * jQuery EasyCheck Plugin  - Tooltip plugin file
 * 
 * Version 5.1.0
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
EasyCheck.chkDef={

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
	            if (okDiv.length>0) {
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
	            if (eo.length == 0) {
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
	            if (eo.length>0) {
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

$(function(){
	if(window.EasyCheck){
		EasyCheck.errorMsg='<div class="tooltip-right tooltip">'+
		'<div class="tooltip-content">{0}</div>'+
		'<div class="tooltip-arrow-outer"></div>'+
		'<div class="tooltip-arrow" ></div>'+
		'</div>';
		EasyCheck.correctMsg='<div class="tooltip-right-ok tooltip-ok">'+
		'<div class="tooltip-content-ok">{0}</div>'+
		'<div class="tooltip-arrow-outer-ok"></div>'+
		'<div class="tooltip-arrow-ok" ></div>'+
		'</div>';
		EasyCheck.defMsg='<div class="tooltip-right-def tooltip-def">'+
		'<div class="tooltip-content-def">{0}</div>'+
		'<div class="tooltip-arrow-outer-def"></div>'+
		'<div class="tooltip-arrow-def" ></div>'+
		'</div>';
		
	    //Manually initialize the default message to take effect
		EasyCheck.initDefMsg();
	}
})


