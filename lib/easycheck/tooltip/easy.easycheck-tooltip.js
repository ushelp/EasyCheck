/**
 * jQuery EasyCheck Plugin  - Tooltip file
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

/*
 * EasyCheck Tooltip
 * */
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


