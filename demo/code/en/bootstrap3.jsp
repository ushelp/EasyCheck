<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
  	<meta charset="utf-8">
	<!-- 通知 IE 采用其所支持的最新的模式 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 以上 3 个 meta 必须在 head 最开始，任何其他标签在此之后 -->
    <base href="<%=basePath%>">
    
    <title>EasyCheck Bootstrap 示例 - zh-CN</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<style type="text/css">
	body{margin: 0;padding: 0;}
	.head{background-color:#FD9511;text-align:center; color: #fff;margin: 0;padding: 0; font-size: 48px; font-weight: bold; height: 90px;line-height: 90px;}
	.statement{font-size: 28px;font-weight: bold;text-align: center;margin-top: 30px;}
	.tip{font-style: italic;color:#FB3D18 }
	.red{color:#f00;}
	#regBtn{background-color:#D55C27 ;color: #fff;font-size: 24px;border: 0px; height: 50px;width: 140px;}
	#regBtn:hover{background-color:#E35420 ;color: #fff;font-size: 24px; height: 50px;width: 140px;}
	#regBtn2{background-color:#D55C27 ;color: #fff;font-size: 24px;border: 0px; height: 50px;width: 140px;}
	#regBtn2:hover{background-color:#E35420 ;color: #fff;font-size: 24px; height: 50px;width: 140px;}
	</style>

	<!-- EasyCheck start -->
	<!-- jQuery -->
	<script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
	<!-- EasyCheck & EasyCheck language file -->
	<script type="text/javascript" src="easycheck/easy.easycheck-5.1.1.js"></script>
	<!-- Bootstrap3 plugin -->
	<script type="text/javascript" src="easycheck/plugins/bootstrap3/easy.easycheck-bootstrap3.js"></script>
	<!-- Message i18n -->
	<script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-en.js"></script>
	
	
	<script type="text/javascript">
			// Message content
			EasyCheck.msgs['username']={
				'.required':'User name required!'
				,
				'[reg]':'format is wrong! ^[A-Za-z][A-Za-z0-9]*$'
			};
	</script>
	
	<!-- EasyCheck end -->
	
	
	
	<!-- Bootstrap3 start-->
	<!-- Bootstrap 核心 CSS 文件 -->
	<link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
	<!-- 可选的Bootstrap主题文件（一般不用引入） -->
	<link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap-theme.min.css">
	<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
	<script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<!-- Bootstrap3 end-->
	
  </head>
  
  <body>
	<div >
	<div class="head">EasyCheck Bootstrap3 demo - English</div>
	<div style="text-align: center; margin: 20px auto;"><a style="text-decoration: underline;" href="index.jsp" >Demo home</a></div>
	
	<div class="container" style="width: 960px; margin: 10px auto">
	<form class="form-horizontal" easycheck="true" action="success.jsp"  id="regForm" method="post" >
		<fieldset>
			<!-- Form Name -->
			<legend onclick="EasyCheck.clearAllError('regForm')">Bootstrap3 Demo (Click here, clear all error messages)</legend>
			
			<!-- Text input-->
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="username">Username</label>
			  <div class="col-sm-6">
			     <input id="username" name="username" type="text" placeholder="" class="form-control required exists" reg="^[A-Za-z][A-Za-z0-9]*$">
			  </div>
			</div>
			 
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="usermail">EMail</label>
			  <div class="col-sm-6">
			    <input id="usermail" name="usermail" type="text" placeholder="email..." class="form-control required email">
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="userpwd">Password</label>
			  <div class="col-sm-6">
			    <input id="userpwd" name="userpwd" type="password" placeholder="" class="form-control required " minlength="6" maxlength="12">
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="repwd">Confirm password</label>
			  <div class="col-sm-6">
			    <input id="repwd" name="repwd" type="password" placeholder="" class="form-control required" equalTo="upwd">
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="url">Website</label>
			  <div class="col-sm-6">
			    <input id="url" name="url" type="text" placeholder="" class="form-control url">
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="age">Age</label>
			  <div class="col-sm-2"> 
			    	<input id="age" name="age" type="text" placeholder="" class="form-control integer" min="18" max="45">
			  </div> 
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="sal">Salary</label>
			  <div class="col-sm-2"> 
			   	 	<input id="sal" name="sal" type="text" placeholder="" class="form-control number">
			  </div> 
			</div> 
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="file">File</label>
			  <div class="col-sm-4">
			    	<input id="file" name="file" type="file" placeholder="" class="input-file" extension="html,htm" ecss="no">
			  </div> 
			</div> 
		
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="captcha">CAPTCHA</label>
			  <div class="col-sm-2">
			    	<input id="captcha" name="captcha" type="text" placeholder="" class="form-control"  vc="chkvc.jsp?z1=z1" equallength="4" maxlength="4">
			  </div>      
			    	<img src="vc.jsp?z1=z1" alt="CAPTCHA" onclick="this.src='vc.jsp?z1=z1&r='+new Date()" />
			</div>
			
			<!-- File Button --> 
			<!-- Button (Double) -->
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="doublebutton-0"></label>
			  <div class="col-sm-6">
			    <button id="doublebutton-0" type="submit" name="doublebutton-0" class="btn btn-success btn-lg">Register</button>
			    <button id="doublebutton2-0" type="reset"  name="doublebutton2-0" class="btn btn-danger btn-lg">Reset</button>
			  </div>
			</div>
		</fieldset>
	</form>
	
	
	
	
	<form class="form-horizontal" easycheck="true" action="success.jsp"  id="regForm2" method="post" >
		<fieldset>
			<!-- Form Name -->
			<legend onclick="EasyCheck.clearAllError('regForm2')">Bootstrap3 Demo2 (Click here, clear all error messages)</legend>
			
			<!-- Text input-->
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="username2">Username</label>
			  <div class="col-sm-6">
			     <input id="username2" name="username" type="text" placeholder="" class="form-control required exists" reg="^[A-Za-z][A-Za-z0-9]*$">
			 	    <!-- Optional message  -->
			     <span id="default_username2" class="help-block">required&amp;regexp</span >
			  </div>
			</div>
			 
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="usermail2">EMail</label>
			  <div class="col-sm-6">
			    <input id="usermail2" name="usermail" type="text" placeholder="email..." class="form-control required email">
			         <!-- Optional message  -->
			     <span id="default_usermail2" class="help-block">required&amp;email</span >
				 <span id="correct_usermail2" class="help-block" info="correct"></span> 
				 <span id="error_usermail2" class="help-block" prefix="email"></span>
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="userpwd2">Password</label>
			  <div class="col-sm-6">
			    <input id="userpwd2" name="userpwd" type="password" placeholder="" class="form-control required " minlength="6" maxlength="12">
			    <span  class="help-block" id="default_userpwd2">required&amp;(minlength 6 - maxlength 12)</span >
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="repwd2">Confirm password</label>
			  <div class="col-sm-6">
			    <input id="repwd2" name="repwd" type="password" placeholder="" class="form-control required" equalTo="upwd">
			    <span  class="help-block" id="default_repwd2">required&amp;(equal with pasword)</span >
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="url2">Website</label>
			  <div class="col-sm-6">
			    <input id="url2" name="url" type="text" placeholder="" class="form-control url">
			    <span  class="help-block" id="default_url2">must be a site</span >
			  </div>
			</div>
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="age2">Age</label>
			  <div class="col-sm-7">
			  	<div class="col-xs-3" style="padding-left: 0; margin-right: 0">
			   		 <input id="age2" name="age" type="text" placeholder="" class="form-control integer required" min="18" max="45">
			   	</div>
			   	<div class="col-xs-8">
			    	<span  class="help-block" id="default_age2">integer&(min 18 - max 45)</span >
			    </div> 
			  </div> 
			</div> 
			 
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="sal2">Salary</label>
			  <div class="col-sm-7"> 
			 	<div class="col-xs-3" style="padding-left: 0; margin: 0">
			   	 	<input id="sal2" name="sal" type="text" placeholder="" class="form-control number">
			    </div>
			    <div class="col-xs-8">
			    	<span  class="help-block" id="default_sal2">can include decimal</span >
			    </div> 
			  </div> 
			</div> 
			
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="file2">File</label>
			  <div class="col-sm-4">
			    	<input id="file2" name="file" type="file" placeholder="" class="input-file" extension="html,htm" ecss="no">
			    	<span  class="help-block" id="default_file2">suffix must be html, htm</span >
			  </div> 
			</div>
		
			<div class="form-group">
			   <label class="col-sm-3 control-label" for="captcha">CAPTCHA</label>
			   <div class="col-sm-7"> 
			 	<div class="col-xs-3" style="padding-left: 0; margin: 0">
			   	 	<input id="captcha" name="captcha" type="text" placeholder="" class="form-control"  vc="chkvc.jsp?z1=z1" equallength="4" maxlength="4">
			    </div>
			    <div class="col-xs-8">
			    	<img src="vc.jsp?z1=z1" alt="CAPTCHA" onclick="this.src='vc.jsp?z1=z1&r='+new Date()" />
			    </div> 
			  </div> 
			</div>
			
			<!-- File Button --> 
			<!-- Button (Double) -->
			<div class="form-group">
			  <label class="col-sm-3 control-label" for="doublebutton-02"></label>
			  <div class="col-sm-6">
			    <button id="doublebutton-02" type="submit" name="doublebutton-0" class="btn btn-success btn-lg">Register</button>
			    <button id="doublebutton2-02" type="reset"  name="doublebutton2-0" class="btn btn-danger btn-lg">Reset</button>
			  </div>
			</div>
		
		</fieldset>
	</form>
	
	</div> 
	</div>
	<%@ include file="../footer.jsp" %>
  </body>
</html>
