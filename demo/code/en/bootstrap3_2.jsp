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
	<div class="head" onclick="EasyCheck.clearAllError('form');">EasyCheck Bootstrap3 demo2 - English</div>
	<div style="text-align: center; margin: 20px auto;"><a style="text-decoration: underline;" href="index.jsp" >Demo home</a></div>

	<div class="container" style="width:500px">
      <form action="success.jsp" method="post"  role="form" id="form" easycheck="true">
        <h2 class="form-signin-heading">Login </h2>
		  	
     	<div class="form-group"> 
        	<input type="text"  class="form-control required" name="username"  >
       	</div>
        <div class="form-group">
       		 <input type="password" class="form-control required  form-inline" name="userpwd" placeholder="Password">
       	</div> 
        <div class="form-group  form-inline">
        	<input type="text" required-message="验证码不能为空"  class="form-control required" name="captcha" style="width: 120px;"> 
       		 <img alt="验证码" id="captchaImg" src="vc.jsp" onclick="this.src='vc.jsp?r='+new Date()"> <a href="#" onclick="$('#captchaImg')[0].src='vc.jsp?r='+new Date();return false">看不清，换一张</a>
       		<span class="text-muted" id="error_captcha"></span>
       	</div>
       	
       	 
        <div class="form-group checkbox" style="margin-left: 30px">
            <input type="checkbox" name="remeberMe" value="remember-me"> Remember me
        </div>  
        
         <div class="form-group" style="padding: 10px 0; text-align:center;">
	       	 <input type="submit" value="Login" class="btn btn-lg btn-primary btn-block" style="margin-right: 20px"/>
	         <input type="reset"  value="Reset" class="btn btn-lg btn btn-default  btn-block"/>
       	</div> 
      </form>
      
      
      
      
       <form action="success.jsp" method="post" class="form-horizontal" role="form" id="form2" easycheck="true">
        <h2 class="form-signin-heading">Login - form-horizontal</h2>
		
       	<div class="form-group">
		  <label class="col-sm-3 control-label" for="username2">Username</label>
		  <div class="col-sm-6">
		     <input id="username2" name="username2" type="text" placeholder="" class="form-control required exists" reg="^[A-Za-z][A-Za-z0-9]*$">
		  </div>
		</div>
       
       	<div class="form-group">
		  <label class="col-sm-3 control-label" for="userpwd2">password</label>
		  <div class="col-sm-6">
		    <input type="password" class="form-control required  form-inline" id="userpwd2" name="userpwd2" placeholder="Password">
		  </div>
		</div>
       
       	<div class="form-group">
		  <label class="col-sm-3 control-label" for="captcha2">VC</label>
		  <div class="col-sm-3"  >
			<input type="text" required-message="验证码不能为空"  class="form-control required" name="captcha2">
		  </div> 
		  <img alt="验证码" id="captchaImg2" src="vc.jsp" onclick="this.src='vc.jsp?r='+new Date()"> <a href="#" onclick="$('#captchaImg2')[0].src='vc.jsp?r='+new Date();return false">看不清，换一张</a>
		  
		</div>
       
         <div class="form-group" style="padding: 10px 0; text-align:center;">
	       	 <input type="submit" value="Login" class="btn btn-lg btn-primary btn-block" style="margin-right: 20px"/>
	         <input type="reset"  value="Reset" class="btn btn-lg btn btn-default  btn-block"/>
       	</div> 
        
      </form>
   </div> 

    
    <div class="container" style="width:800px"> 
     
      <form class="form-inline" action="success.jsp" method="post"  role="form" id="form3" easycheck="true">
        <h2 class="form-signin-heading">Login - form-inline</h2>
		  	
     	<div class="form-group"  style="height: 80px"> 
     		<label for="username3" class="sr-only">Username:</label>
        	<input type="text"  class="form-control required" name="username3" placeholder="Account" >
       	</div>
        <div class="form-group"  style="height: 80px"> 
        	<label for="userpwd3" class="sr-only">Password:</label>
       		 <input type="password" class="form-control required  form-inline" name="userpwd3" placeholder="Password">
       	</div> 
        <div class="form-group"  style="height: 80px">
       		 <label for="captcha3" class="sr-only">CAPTCHA</label>
        	<input type="text"  class="form-control required" name="captcha3" style="width: 80px;" placeholder="cpatcha">
	    </div>
	    <div class="form-group" style="height: 80px">
 			<label>
				<img alt="CAPTCHA" id="captchaImg3" src="vc.jsp" onclick="this.src='vc.jsp?r='+new Date()"> <a href="#" onclick="$('#captchaImg3')[0].src='vc.jsp?r='+new Date();return false">看不清，换一张</a>
			</label> 
 		</div>
	    <div> 
	   		 <input type="submit" value="Login" class="btn btn-lg btn-primary "/>
	         <input type="reset"  value="Reset" class="btn btn-lg btn btn-default  "/>
	     </div>
      </form>
  	</div>
	</div>
	<%@ include file="../footer.jsp" %>
  </body>
</html>
