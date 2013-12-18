// jQuery EasyCheck Plugin
//
// Version 3.0.0
//
// Copy By RAY
// inthinkcolor@gmail.com
// 2012
//
// http://plugins.jquery.com/EasyCheck/
//
(function(window) {
  var // 添加Form类验证
  addChkForm = function(chkrule, fromChkInfo) {
    var chkElements = EasyCheck.getMatches(chkrule.chkName);
    $(fromChkInfo.eleArea + chkElements).each(function(index, element) {
      var divStuf = $(element).attr("id") || $(element).attr("name");
      if (!fromChkInfo.errorEleArray[divStuf]) {
        // 已出错提示元素不再验证
        var flag = chkrule.chkFunction(element);
        if (!flag) {
          // 验证未通过
          fromChkInfo.errorEleArray[divStuf] = "E";
          // 加入未通过数组
          fromChkInfo.chkFlag = false;
        }
      } else {
        fromChkInfo.chkFlag = false;
      }
    });
  }, errorManger = function(param) { 
    var s = "";
    if (param.formId) {
      s = "[id='" + param.formId + "'] ";
    }	
   
    $(s + "[id^='error_']").each(function() {
      var oNameOrId = $(this).attr("id").replace("error_", "");
      var n=null;
      if( $(s + "[id='" + oNameOrId + "']").length>0){
    	  n = $(s + "[id='" + oNameOrId + "']");
      }else{
    	  n = $(s + "[name='" + oNameOrId + "']");
      }
      
      var formId = $("form").has(n).attr("id");
      if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
        if (!(n.attr("ecss") && n.attr("ecss") != "yes")) {
          // 禁用错误提示时文本框改变样式——EasyCheck.errorCss
          n.removeClass(EasyCheck.errorCss);
          if (formId && EasyCheck.formErrorCss[formId]) {
          	  n.removeClass(EasyCheck.formErrorCss[formId]);
            } 
          if (formId && EasyCheck.formDefaultCss[formId]) {
            n.addClass(EasyCheck.formDefaultCss[formId]);
          } else {
            n.addClass(EasyCheck.defaultCss);
          }
        }
      }
      $(s + "[id^='error_']").hide();
    });
    if (param.restore) {
      $(s + "[id^='ok_']").each(function() {
        $(this).hide();
      });
      // 清楚后显示默认提示
      $(s + "[id^='default_']").each(function() {
        $(this).show();
      });
    }
  }, checkVc = function(o, e) {
    return addChkMethod("[vc]", o, e, function(o) {
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
    return addChkMethod("[reg]", o, e, function(o) {
      var val = $(o).val();
      var reg = new RegExp("^(?:" + $(o).attr("reg") + ")$");
      return !($.trim(val) != "" && !reg.test(val));
    }, EasyCheck.msg["regexp"]);
  }, // 验证扩展名，多个扩展名使用英文逗号分隔
  checkExtension = function(o, e) {
    return addChkMethod("[extension]", o, e, function(o) {
      var ex = $(o).attr("extension");
      var val = $(o).val();
      var extensionList = ex != "" ? ex.replace(/,/g, "|") :"png|jpe?g|gif";
      return !($.trim(val) != "" && !val.match(new RegExp(".(" + extensionList + ")$", "i")));
    }, EasyCheck.formatMsg(EasyCheck.msg["extension"], $(o).attr("extension")));
  }, checkRequired = function(o, e) {
    return addChkMethod(".required", o, e, function(o) {
      var val = $(o).val();
      return $.trim(val) != "";
    }, EasyCheck.msg["required"]);
  }, checkEmail = function(o, e) {
    return addChkMethod(".email", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val) != "" && !EasyCheck.Validator.email.test(val));
    }, EasyCheck.msg["email"]);
  }, checkUrl = function(o, e) {
    return addChkMethod(".url", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val) != "" && !EasyCheck.Validator.url.test(val));
    }, EasyCheck.msg["url"]);
  }, checkNumber = function(o, e) {
    return addChkMethod(".number", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val) != "" && !EasyCheck.Validator.number.test(val));
    }, EasyCheck.msg["number"]);
  }, checkInteger = function(o, e) {
    return addChkMethod(".integer", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val) != "" && !EasyCheck.Validator.integer.test(val));
    }, EasyCheck.msg["integer"]);
  }, checkEqualto = function(o, e) {
    return addChkMethod("[equalto]", o, e, function(o) {
      var val = $(o).val();
      return val == $("[id='" + $(o).attr("equalto") + "']").val();
    }, EasyCheck.msg["equalto"]);
  }, checkEquallength = function(o, e) {
    return addChkMethod("[equallength]", o, e, function(o) {
      var val = $(o).val();
      return !(val.length != $(o).attr("equallength"));
    }, EasyCheck.formatMsg(EasyCheck.msg["equallength"], $(o).attr("equallength")));
  }, checkRangeLength = function(o, e) {
    return addChkMethod("[minlength][maxlength]", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val).length < $(o).attr("minlength") || $.trim(val).length > $(o).attr("maxlength"));
    }, EasyCheck.formatMsg(EasyCheck.msg["lengthrange"], $(o).attr("minlength"), $(o).attr("maxlength")));
  }, checkMinlength = function(o, e) {
    return addChkMethod("[minlength]", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val).length < $(o).attr("minlength"));
    }, EasyCheck.formatMsg(EasyCheck.msg["minlength"], $(o).attr("minlength")));
  }, checkMaxlength = function(o, e) {
    return addChkMethod("[maxlength]", o, e, function(o) {
      var val = $(o).val();
      return !($.trim(val).length > $(o).attr("maxlength"));
    }, EasyCheck.formatMsg(EasyCheck.msg["maxlength"], $(o).attr("maxlength")));
  }, checkRange = function(o, e) {
    return addChkMethod("[min][max]", o, e, function(o) {
      var val = $(o).val();
      return !(parseFloat($.trim(val)) < parseFloat($(o).attr("min")) || parseFloat($.trim(val)) > parseFloat($(o).attr("max")) || isNaN(val));
    }, EasyCheck.formatMsg(EasyCheck.msg["numberrange"], $(o).attr("min"), $(o).attr("max")));
  }, checkMin = function(o, e) {
    return addChkMethod("[min]", o, e, function(o) {
      var val = $(o).val();
      return !(parseFloat($.trim(val)) < parseFloat($(o).attr("min")) || isNaN(val));
    }, EasyCheck.formatMsg(EasyCheck.msg["min"], $(o).attr("min")));
  }, checkMax = function(o, e) {
    return addChkMethod("[max]", o, e, function(o) {
      var val = $(o).val();
      return !(parseFloat($.trim(val)) > parseFloat($(o).attr("max")) || isNaN(val));
    }, EasyCheck.formatMsg(EasyCheck.msg["max"], $(o).attr("max")));
  }, // 自定义新验证插件函数，调用addChkMethod(o,e,chkCode,msg)实现向系统注册新验证插件
  // o 触发事件的元素
  // e 事件对象
  // chkCode 验证回调函数
  // msg 提示消息
  addChkMethod = function(rule, o, e, chkCode, msg) {

    var divSuf = $(o).attr("id") || $(o).attr("name");
    var de = $("[id='default_" + divSuf + "']");
    if (de) {
      // 默认提示隐藏
      de.hide();
    }
    if (!chkCode(o)) {
      // 验证未通过
      var de = $("[id='default_" + divSuf + "']");
      if (de) {
        // 默认提示显示
        de.hide();
      }
      //获得对象和规则对应的指定消息
      if (EasyCheck.msgs[divSuf] && EasyCheck.msgs[divSuf][rule]) {
        msg = typeof EasyCheck.msgs[divSuf][rule] == "string" ? EasyCheck.msgs[divSuf][rule] :EasyCheck.msgs[divSuf][rule]($(o));
      }
      EasyCheck.showError(o, msg, true);
      if (e) {
        e.stopImmediatePropagation();
      }
      return false;
    } else {
      // 验证通过
      EasyCheck.clearError(o);
      var defaultDiv = $("[id='default_" + divSuf + "']");
      if (defaultDiv) {
        // 默认提示显示
        defaultDiv.hide();
      }
      var okDiv = $("[id='ok_" + divSuf + "']");
      if (okDiv) {
        // 存在ok提示
        okDiv.addClass("easycheck_okInfo");
        okDiv.show();
      }
	  if(e){
		  if(e.type=='keyup'){
			  $(o).removeClass(EasyCheck.errorCss);
			  var nowForm=$("form").has(o);
			  if (nowForm.length>0&&EasyCheck.formErrorCss[nowForm.attr("id")]) {
	          	  $(o).removeClass(EasyCheck.formErrorCss[nowForm.attr("id")]);
	           } 
			  
			
			  if(nowForm.length>0&&EasyCheck.formFocusCss[nowForm.attr("id")]){
				  $(o).addClass(EasyCheck.formFocusCss[nowForm.attr("id")]);
				  
			  }else{
				  $(o).addClass(EasyCheck.focusCss);
			  }
		  }
	  }
      return true;
    }
  };
  var EasyCheck = {
    chkList:"",
    // 验证列表
    msg:{
      required:"不能为空",
      email:"邮箱格式不正确",
      url:"网址有误",
      number:"必须为数字",
      integer:"必须为整数",
      equalto:"输入不一致",
      equallength:"长度必须为{0}位",
      lengthrange:"长度必须在{0}到{1}之间",
      minlength:"长度不能小于{0}",
      maxlength:"长度不能大于{0}",
      numberrange:"值必须在{0}和{1}之间",
      min:"不能小于{0}",
      max:"不能大于{0}",
      regexp:"格式有误",
      extension:"文件后缀只能为{0}",
      vc:"输入有误"
    },
    msgs:{},
    Validator:{
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
    // 指定忽略验证的规则，设置后同时忽略失去焦点事件和键盘弹起事件的验证（只对提交表单验证）
    easyCheckBlurIgnore:{},
    // 焦点事件忽略进行验证的列表，（只对键盘弹起和表单验证），适合只在提交表单时验证的对象，如验证码
    easyCheckKeyupIgnore:{},
    // 指定键盘弹起事件忽略验证的规则（只对失去焦点和表单验证）
    easyCheckEleIgnore:{},
    // 键盘弹起和失去焦点时忽略验证的DOM元素Id或name（只对提交表单有效）
    easyCheckEleBlurIgnore:{},
    // 键盘弹起和失去焦点时忽略验证的DOM元素Id或name（只对提交表单有效）
    easyCheckEleKeyupIgnore:{},
    // 键盘弹起和失去焦点时忽略验证的DOM元素Id或name（只对提交表单有效）
    easyCheckSubmitDisable:true,
    // 默认开启客户端防重复提交功能
    removeDisableBtn:[],
    // Firefox下恢复禁用的按钮
    removeDisableForm:[],
    // firefox下恢复禁用按钮的表单
    removeDisable:false,
    // 是否移除页面表单中所有禁用的submit按钮，默认为不移除
    ecss:"yes",
    //为不同表单指定不同ecss
    formEcss:{},
    //文本框三种状态样式
    defaultCss:"easycheck_defaultInput",
    focusCss:"easycheck_focusInput",
    errorCss:"easycheck_errorInput",
    //为不同表单指定不同defaultCss
    formDefaultCss:{},
    formFocusCss:{},
    formErrorCss:{},
    loadChk:true,
    // 页面加载完后是否立即开启验证规则（否则仅在提交表单时验证，如果设置为false，blurChk和keyupChk无效），默认为true
    blurChk:true,
    // 开启失去焦点时验证，false禁用，默认为true
    keyupChk:true,
    // 开启键盘弹起时验证，false禁用，默认为true
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
      var regAorC = /(\.[A-Za-z0-9]+)|(\[[A-Za-z0-9]+\])/g;
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
    //仅清除错误提示
    clearAllError:function(formId) {
      errorManger({
        formId:formId
      });
    },
    //清除错误提示，并清除正确提示，显示默认提示
    restoreAll:function(formId) {
      errorManger({
        formId:formId,
        restore:true
      });
    },
    showError:function(o, msg, inner) {
      // 错误提示
      if (typeof o == "string") {
        o = $("#" + o)[0];
      }
      var divSuf = $(o).attr("id") || $(o).attr("name");
      $("[id='ok_" + divSuf + "']").hide();
      // 存在ok提示
      $("[id='default_" + divSuf + "']").hide();
      // 存在default提示
      var eo = $("[id='error_" + divSuf + "']");
      if (eo.size() == 0) {
        $(o).after("\r\n<div id='error_" + divSuf + "'></div>");
        // 创建消息div
        eo = $("[id='error_" + divSuf + "']");
      }
      eo.removeClass();
      eo.addClass("easycheck_errorInfo");
      var formId = $("form").has(o).attr("id");
      if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
        if (!($(o).attr("ecss") && $(o).attr("ecss") != "yes")) {
          // 禁用错误提示时文本框改变样式——EasyCheck.errorCss
          if (formId && EasyCheck.formDefaultCss[formId]) {
            $(o).removeClass(EasyCheck.formDefaultCss[formId]);
          } else {
            $(o).removeClass(EasyCheck.defaultCss);
          }
          
          if (formId && EasyCheck.formErrorCss[formId]) {
        	  $(o).addClass(EasyCheck.formErrorCss[formId]);
          } else {
        	  $(o).addClass(EasyCheck.errorCss);
          }
          
          
        
        }
      }
      if (inner) {
        // 如果是内部消息检测（非用户指定MSG）
        var prefix = eo.attr("prefix");
        // 信息前缀
        if (prefix) {
          eo.html(prefix + msg);
        } else {
          prefix = "";
          eo.html(msg);
        }
        var info = eo.attr("info");
        // 自定义提示信息内容
        if (info) {
          eo.html(prefix + info);
        }
      } else {
        eo.html(msg);
      }
      eo.show();
      
      
      $(o).removeClass(EasyCheck.focusCss);
      if (formId && EasyCheck.formFocusCss[formId]) {
          $(o).removeClass(EasyCheck.formFocusCss[formId]);
       }
      
      $(o).addClass(EasyCheck.defaultCss);
    },
    clearError:function(o, msg) {
      // OK提示
      if (typeof o == "string") {
        o = $("#" + o)[0];
      }
      var divSuf = $(o).attr("id") || $(o).attr("name");
      var eo = $("[id='error_" + divSuf + "']");
      var formId = $("form").has(o).attr("id");
      if (eo) {
        eo.removeClass();
        if (EasyCheck.ecss != "no" && EasyCheck.formEcss[formId] != "no") {
          if (!($(o).attr("ecss") && $(o).attr("ecss") != "yes")) {
            // 禁用错误提示时文本框改变样式——EasyCheck.errorCss
            $(o).removeClass(EasyCheck.errorCss);
            
            if (formId && EasyCheck.formErrorCss[formId]) {
          	  $(o).removeClass(EasyCheck.formErrorCss[formId]);
            } 
            
            if (formId && EasyCheck.formDefaultCss[formId]) {
              $(o).addClass(EasyCheck.formDefaultCss[formId]);
            } else {
              $(o).addClass(EasyCheck.defaultCss);
            }
          }
        }
        eo.addClass("easycheck_okInfo");
        if (msg) {
          eo.html(msg);
        } else {
          eo.html("");
        }
        eo.hide();
        $("[id='default_" + divSuf + "']").show();
      }
      $(o).removeClass(EasyCheck.focusCss);
      
      if (formId && EasyCheck.formFocusCss[formId]) {
          $(o).removeClass(EasyCheck.formFocusCss[formId]);
       }
      
      $(o).addClass(EasyCheck.defaultCss);
    },
    chk:function(o, e, chkFunction) {
      // 回调验证函数
      chkFunction(o, e);
    },
    initChk:function(chkrule) {
      var chkElements = EasyCheck.getMatches(chkrule.chkName);
      $(chkElements).on("blur", function(e) {
        if (!EasyCheck.easyCheckBlurIgnore[chkrule.chkName] && !EasyCheck.easyCheckEleIgnore[e.target.id || e.target.name]) {
          if (!EasyCheck.easyCheckEleBlurIgnore[e.target.id || e.target.name]) {
            EasyCheck.blurChk ? EasyCheck.chk(this, e, chkrule.chkFunction) :"";
          }
        }
    
      }).on("focus", function(e) {
        EasyCheck.clearError(this);
        var o = $(this);
        var divSuf = o.attr("id") || o.attr("name");
        var okDiv = $("[id='ok_" + divSuf + "']");
        if (okDiv.length > 0) {
          // 存在OK提示
          if (okDiv.filter(":hidden").length > 0) {
            // 隐藏中，未成功
            // 如果不存在提示信息则显示默认
            var defaultDiv = $("[id='default_" + divSuf + "']");
            if (defaultDiv) {
              defaultDiv.show();
            }
          }
        } else {
          // 如果不存在提示信息则显示默认
          var defaultDiv = $("[id='default_" + divSuf + "']");
          if (defaultDiv) {
            defaultDiv.show();
          }
        }
        
        o.removeClass(EasyCheck.defaultCss);
        
        if(EasyCheck.defaultCss){
        	o.removeClass(EasyCheck.defaultCss);
        }
        var nowForm=$("form").has(o);
        if(nowForm.length>0){
        	
        	if(EasyCheck.formDefaultCss[nowForm.attr("id")]){
        		o.removeClass(EasyCheck.formDefaultCss[nowForm.attr("id")]);
        	}
        	
        }
        
        
        
        
        var formId=nowForm.attr("id");
        

        if (formId && EasyCheck.formFocusCss[formId]) {
            o.addClass(EasyCheck.formFocusCss[formId]);
         }else{
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
    addChk:function(vName, vFn, msgFn) {
      var newChk = function(o, e) {
        return addChkMethod(vName, o, e, vFn, typeof msgFn == "string" ? msgFn :msgFn(o));
      };
      var chkRule = new EasyCheck.ChkRule(vName, newChk);
      //注册验证器
      EasyCheck.chkList.push(chkRule);
      EasyCheck.initChk(chkRule);
    },
    // 验证规则对象
    // 定义的类或属性名称，定义的验证处理函数，[是否是属性验证,true代表是]
    ChkRule:function(chkName, chkFunction) {
      this.chkName = chkName;
      this.chkFunction = chkFunction;
    },
    /*
		 * submit时，表单验证注册
		 */
    checkForm:function(eleArea) {
      var fromChkInfo = {
        eleArea:"[id='" + $(eleArea).attr("id") + "'] ",
        // 验证的Form区域
        chkFlag:true,
        // 验证成功与否
        errorEleArray:new Array()
      };
      // 注册的类或属性名称，注册的处理函数，表单对象信息
      /* 注册Form类验证 */
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
    }
  };
  /*
	 * 验证规则对象列表 有新的验证函数需要在此进行注册
	 */
  EasyCheck.chkList = [ new EasyCheck.ChkRule(".required", checkRequired), new EasyCheck.ChkRule(".email", checkEmail), new EasyCheck.ChkRule(".url", checkUrl), new EasyCheck.ChkRule(".number", checkNumber), new EasyCheck.ChkRule(".integer", checkInteger), new EasyCheck.ChkRule("[equalto]", checkEqualto), new EasyCheck.ChkRule("[equallength]", checkEquallength), new EasyCheck.ChkRule("[minlength][maxlength]", checkRangeLength), new EasyCheck.ChkRule("[minlength]", checkMinlength), new EasyCheck.ChkRule("[maxlength]", checkMaxlength), new EasyCheck.ChkRule("[min][max]", checkRange), new EasyCheck.ChkRule("[min]", checkMin), new EasyCheck.ChkRule("[max]", checkMax), new EasyCheck.ChkRule("[reg]", checkRegExp), new EasyCheck.ChkRule("[extension]", checkExtension), new EasyCheck.ChkRule("[vc]", checkVc) ];
  /*
	 * 忽略注册的规则列表
	 */
  // vc验证码规则，键盘弹起和失去焦点时不验证，只在表单提交时验证
  EasyCheck.easyCheckIgnore["vc"] = true;
  // 如果元素名称为uservc，则只在提交表单时验证
  window.EasyCheck = EasyCheck;
})(window);

$(function() {
  // 页面全局验证注册
  function easyCheck() {
    // 注册的类或属性名称，注册的处理函数
    // 注册系统类验证和属性验证
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
  $("[id*='ok_']").hide();
  $("[id*='error_']").html("");
});