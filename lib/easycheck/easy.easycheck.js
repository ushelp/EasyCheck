/**
 * jQuery EasyCheck Plugin
 * 
 * Version 4.0.0
 * 
 * http://easyproject.cn
 * https://github.com/ushelp/EasyCheck
 * 
 * Copyright 2014 Ray [ inthinkcolor@gmail.com ]
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
    }, errorManger = function(param) {
        var s = "";
        if (param.formId) {
            s = "[id='" + param.formId + "'] ";
        }
        $(s + "[id^='error_']").each(function() {
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
        if (param.restore) {
            $(s + "[id^='ok_']").each(function() {
                $(this).hide();
            });
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
    }, checkExtension = function(o, e) {
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
            return !($.trim(val) != "" && !EasyCheck.validator.email.test(val));
        }, EasyCheck.msg["email"]);
    }, checkUrl = function(o, e) {
        return addChkMethod(".url", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.url.test(val));
        }, EasyCheck.msg["url"]);
    }, checkNumber = function(o, e) {
        return addChkMethod(".number", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.number.test(val));
        }, EasyCheck.msg["number"]);
    }, checkInteger = function(o, e) {
        return addChkMethod(".integer", o, e, function(o) {
            var val = $(o).val();
            return !($.trim(val) != "" && !EasyCheck.validator.integer.test(val));
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
    }, addChkMethod = function(rule, o, e, chkCode, msg) {
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
            var okDiv = $("[id='ok_" + divSuf + "']");
            if (okDiv) {
                okDiv.addClass("easycheck_okInfo");
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
    };
    var EasyCheck = {
        chkList:"",
        msg:{},
        msgs:{},
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
            errorManger({
                formId:formId
            });
        },
        restoreAll:function(formId) {
            errorManger({
                formId:formId,
                restore:true
            });
        },
        showError:function(o, msg) {
            if (typeof o == "string") {
                o = $("#" + o)[0] || $("[name='" + o + "']")[0];
            }
            o=$(o);
            var divSuf = o.attr("id") || o.attr("name");
            $("[id='ok_" + divSuf + "']").hide();
            $("[id='default_" + divSuf + "']").hide();
            var eo = $("[id='error_" + divSuf + "']");
            if (eo.size() == 0) {
                o.after("\r\n<div id='error_" + divSuf + "'></div>");
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
            var prefix = eo.attr("prefix");
            if (prefix) {
                eo.html(prefix + msg);
            } else {
                prefix = "";
                eo.html(msg);
            }
            var info = eo.attr("info");
            if (info) {
                eo.html(prefix + info);
            }
            eo.show();
        },
        clearError:function(o, msg) {
            if (typeof o == "string") {
                o = $("#" + o)[0] || $("[name='" + o + "']")[0];
            }
            o=$(o);
            var divSuf = o.attr("id") || o.attr("name");
            var eo = $("[id='error_" + divSuf + "']");
            var formId = $("form").has(o).attr("id");
            if (eo) {
//                eo.removeClass();
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
                $("[id='default_" + divSuf + "']").show();
            }
            o.removeClass(EasyCheck.focusCss);
            if (formId && EasyCheck.formFocusCss[formId]) {
                o.removeClass(EasyCheck.formFocusCss[formId]);
            }
            
            var domId=o.attr("id")||o.attr("name");
      		var oid=formId+"_"+domId;
            o.addClass(EasyCheck.txtClass[oid+"_class"]);
        
        },
        chk:function(o, e, chkFunction) {
            chkFunction(o, e);
        },
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
            $(chkElements).on("blur", function(e) {
                if (!EasyCheck.easyCheckBlurIgnore[chkrule.chkName] && !EasyCheck.easyCheckEleIgnore[e.target.id || e.target.name]) {
                    if (!EasyCheck.easyCheckEleBlurIgnore[e.target.id || e.target.name]) {
                        EasyCheck.blurChk ? EasyCheck.chk(this, e, chkrule.chkFunction) :"";
                    }
                }
            }).on("focus", function(e) {
                EasyCheck.clearError(this);
                var o = $(this);
                var domId = o.attr("id") || o.attr("name");
                var okDiv = $("[id='ok_" + domId + "']");
                if (okDiv.length > 0) {
                    if (okDiv.filter(":hidden").length > 0) {
                        var defaultDiv = $("[id='default_" + domId + "']");
                        if (defaultDiv) {
                            defaultDiv.show();
                        }
                    }
                } else {
                    var defaultDiv = $("[id='default_" + domId + "']");
                    if (defaultDiv) {
                        defaultDiv.show();
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
        addChk:function(vName, vFn, msgFn) {
            var newChk = function(o, e) {
                return addChkMethod(vName, o, e, vFn, typeof msgFn == "string" ? msgFn :msgFn(o));
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
    $("[id*='ok_']").hide();
    $("[id*='error_']").html("");
    $("[easycheck='true']").on("submit",function(){
    	return EasyCheck.checkForm(this);
    });
});