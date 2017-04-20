/**
 * jQuery EasyCheck Plugin  - Bootstrap plugin file
 * 
 * Version 5.2.0
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
EasyCheck.focusCss="";
EasyCheck.errorCss="";
// 表单元素获得焦点时是否还原为默认提示
EasyCheck.resetOnFocus=false;
// BootStrap3参数
EasyCheck.bootstrap3={
		//  Add feedback icons
		icon:true,
		// Display * after required element
		required:true,
		// * poisition: left(label left), right(label right), after(form element after, only for 'form-horizontal', 'form-inline')
		requiredPosition:'after',
		// Display Dismissible alerts
		alert:true,
		alertMsg:'Validation failed!'
};
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
	            
	            var controlGroup=$(this).parents(".form-group");
            	controlGroup.find('.form-control-feedback').remove();
            	controlGroup.removeClass('has-feedback'); //移除后面图示
            	controlGroup.removeClass('has-error'); // 移除状态
            	controlGroup.removeClass('has-success'); 
	            
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
	            var form=$("#"+param.formId);
	            form.find('.form-control-feedback').remove();
	            form.find('div').removeClass('has-feedback'); //移除后面图示
	            form.find('div').removeClass('has-error'); // 移除状态
	            form.find('div').removeClass('has-success'); 
	        	
	            $(s + "[id^='correct_']").each(function() {
	                var controlGroup=$(this).parents(".form-group");
	            	controlGroup.find('.form-control-feedback').remove();
	            	controlGroup.removeClass('has-feedback'); //移除后面图示
	            	controlGroup.removeClass('has-error'); // 移除状态
	            	controlGroup.removeClass('has-success'); 
	            	
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
	        	  
	        	  var controlGroup=$("#"+oid).parents(".form-group");
	        	  if(EasyCheck.bootstrap3.icon){ 
		            	controlGroup.find('.form-control-feedback').remove();
		            	controlGroup.removeClass('has-feedback'); //移除后面图示
		            	controlGroup.removeClass('has-error'); // 移除状态
		            	controlGroup.removeClass('has-success'); 
		           }
	        	  
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
	        
	       
	         var flag=chkCode(o);
	         if(window.Promise && flag instanceof Promise){
				// ES6 Promise Support
				var p=flag.then(function(data){
					return execute(data);
				},function(){ 
					return execute(false);
				});
				return p;
			}else{
				return execute(flag);
			}
			
	        
	        function execute(res){
	        	var divSuf = $(o).attr("id") || $(o).attr("name");
	        	var de = $("[id='default_" + divSuf + "']");
	        	// 验证未通过
		        if (!res) {
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
		        	// 验证通过
		  
		            EasyCheck.clearError(o);
		            var defaultDiv = $("[id='default_" + divSuf + "']");
		            if (defaultDiv) {
		                defaultDiv.hide();
		            }
		            
		            var okIcon='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
			          
		            var okDiv = $("[id='correct_" + divSuf + "']");
		            
		            var formId = $("form").has(o).attr("id");
		            
		            var controlGroup=$(o).parents(".form-group");
		            controlGroup.removeClass('has-error has-success');
		            controlGroup.addClass('has-success');
		           
		            if(EasyCheck.bootstrap3.icon){ 
		            	controlGroup.addClass('has-feedback'); //增加后面图示
		            	controlGroup.find('.form-control-feedback').remove();
		            	 $(o).after(okIcon);
		            }
		         
		            if (okDiv.length>0) {
		                okDiv.addClass("help-block");
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
	        }
	        
	    },
	    // 显示错误
	    showError: function(o, msg){
	    	 if (typeof o == "string") {
	                o = $("#" + o)[0] || $("[name='" + o + "']")[0];
	            }
	            o=$(o);
	             
	            var controlGroup=o.parents(".form-group");
	            controlGroup.removeClass('has-error has-success');
	            controlGroup.addClass('has-error');
	            
	            var divSuf = o.attr("id") || o.attr("name");
	            $("[id='correct_" + divSuf + "']").hide();
	            $("[id='default_" + divSuf + "']").hide();
	            var eo = $("[id='error_" + divSuf + "']");
	            if (eo.length == 0) {
	            	
	            	var req=o.next('[name="required"]'); 
	            	
	            	if(req.length>0){
	            		 req.after("<span id='error_" + divSuf + "' class='help-block'></span>");
	            	}else{
	            		 o.after("<span id='error_" + divSuf + "' class='help-block'></span>");
	            	}
	               
	                eo = $("[id='error_" + divSuf + "']");
	            }
	            eo.addClass("help-block");
	            var formId = $("form").has(o).attr("id");
	            if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
	                if (!(o.attr("ecss") && o.attr("ecss") != "yes")) {
	                	controlGroup.removeClass('has-error has-success');
	                    if (formId && EasyCheck.formErrorCss[formId]) {
	                        o.addClass(EasyCheck.formErrorCss[formId]);
	                    } else {
	                    	controlGroup.addClass('has-error');
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
	            
	            var errorIcon='<span class="glyphicon glyphicon-remove form-control-feedback"></span>'
	            
	            if(EasyCheck.bootstrap3.icon){ 
	            	controlGroup.addClass('has-feedback'); //增加后面图示
	            	controlGroup.find('.form-control-feedback').remove();
//	            	eo.before(errorIcon);
	            	o.after(errorIcon);
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
            		var nowForm=$("form").has(o);
            		var formId = nowForm.attr("id");
            		var domId=o.attr("id")||o.attr("name");
            		// 为必填元素添加必填符号
            		var req=EasyCheck.bootstrap3.required;
            		if(req){
            			if(chkrule.chkName=='.required'){
            				var pst=EasyCheck.bootstrap3.requiredPosition;
	            			var s='<span name="required" class="text-muted" style="color:#FF9966;">*</span>';
	            			if(pst=='after' && (nowForm.hasClass("form-horizontal") || nowForm.hasClass("form-inline")) ){
	                   			 	o.parent().after(s); 
	            			}else if(pst=='left'){
	            				 var label=$(this).parents(".form-group").find("label:first");
	            				 label.prepend(s);
	            			}else if(pst=='right'){
		           				 var label=$(this).parents(".form-group").find("label:first");
		        				 label.append(s);
		        			}
            			}
            		}  
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
        },
        complete:function(formId,result){
	    	 if(EasyCheck.bootstrap3.alert){
	    	    	if($("#alert_"+formId).length==0){
	    	    		var submit=$("#"+formId).find(':submit:last');
	    	    		if(submit.length>0){
	    	    			submit.before('<div style="display:none" id="alert_'+formId+'" class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+EasyCheck.bootstrap3.alertMsg+'</div>');
	    	    		}
	    	    	}
	    	    	if(result){
	    	    		$("#alert_"+formId).hide(); 	
	    		    }else{
	    		    	$("#alert_"+formId).show(); 	
	    		    }
	    	    }
	    },
	    restoreAllComplete:function(formId){
	    	$("#alert_"+formId).hide(); 
	    },
	    clearAllErrorComplete:function(formId){
	    	$("#alert_"+formId).hide(); 
	    }
}
$(function(){
    EasyCheck.initDefMsg();  
})


