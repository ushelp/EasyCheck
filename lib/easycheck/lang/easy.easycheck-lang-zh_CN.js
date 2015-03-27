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
 * Dependencies: EasyCheck
 * 
 */
$(function(){
	if (EasyCheck) {
		/*
		 * I18N Resources
		 * */
		EasyCheck.msg = {
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
		}
	}
});