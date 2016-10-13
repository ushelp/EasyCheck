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
    
    <title>EasyCheck DIV 示例 - zh-CN</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<style type="text/css">
	*{font-family: "微软雅黑", sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";font-size: 18px;}
	body{margin: 0;padding: 0;}
	.head{background-color:#FD9511;color: #fff;margin: 0;padding: 0; font-size: 48px; font-weight: bold; height: 90px;line-height: 90px;}
	.statement{font-size: 28px;font-weight: bold;text-align: center;margin-top: 30px;}
	.tip{font-style: italic;color:#FB3D18 }
	.red{color:#f00;}
	#regBtn,#regBtn2{background-color:#D55C27 ;color: #fff;font-size: 24px;border: 0px; height: 50px;width: 140px;}
	#regBtn:hover,#regBtn2:hover{background-color:#E35420 ;color: #fff;font-size: 24px; height: 50px;width: 140px;}
	#resetBtn,#resetBtn2{background-color:#848484;color: #fff;font-size: 24px;border: 0px; height: 50px;width: 140px;}
	#resetBtn2:hover,#resetBtn2:hover{background-color:#C6C6C6 ;color: #fff;font-size: 24px; height: 50px;width: 140px;}
/*
* Other test style (Not required for easycheck.css)
*/

.txt {
	height: 38px;
	font-size: 14px;
	text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
	text-indent: inherit;
	font-weight: normal;
	line-height: 38px;
	background: #fff;
	font-family:  sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
	margin-right: 10px;
	width: 325px;
	margin: 0px 0 0 10px;
	letter-spacing: 1px;
	border: 1px solid #cfcfc9;
}
.txt2 {
	height: 38px;
	font-size: 14px;
	text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
	text-indent: inherit;
	font-weight: normal;
	line-height: 38px;
	background: #fff;
	font-family:  sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
	margin-right: 10px;
	width: 325px;
	margin: 0px 0 0 10px;
	letter-spacing: 1px;
	border: 1px solid #DBB311;
}

.focus2 {
	height: 38px;
	font-size: 14px;
	text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
	text-indent: inherit;
	font-weight: normal;
	line-height: 38px;
	background: #fff;
	font-family:  sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
	margin-right: 10px;
	width: 325px;
	margin: 0px 0 0 10px;
	letter-spacing: 1px;
	background-color: #FFFFCC;
	outline: none;
	border: 1px solid #33CC00;
	box-shadow: 0 0 8px rgba(51, 204, 0, 1);
}

.error2 {
	height: 38px;
	font-size: 14px;
	text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
	text-indent: inherit;
	font-weight: normal;
	line-height: 38px;
	background: #fff;
	font-family:  sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
	margin-right: 10px;
	width: 325px;
	margin: 0px 0 0 10px;
	letter-spacing: 1px;
	outline: none;
	border: 1px solid #FF0000;
	box-shadow: 0 0 8px rgba(255, 81, 153, 1);
}

tr{ height: 55px;}
	
	</style>
	
	<!-- EasyCheck start -->
	
	<!-- Div plugin CSS样式 -->
	<link rel="stylesheet" type="text/css" href="easycheck/plugins/div/easycheck-div.css"/>  
	<!-- jQuery -->
	<script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
	<!-- EasyCheck & EasyCheck language file -->
	<script type="text/javascript" src="easycheck/easy.easycheck-5.1.1.js"></script>
	<!-- Div plugin -->
	<script type="text/javascript" src="easycheck/plugins/div/easy.easycheck-div.js"></script>
	<!-- Message i18n --> 
	<script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>

	<script type="text/javascript">
			EasyCheck.formFocusCss['regForm2']="focus2";
			EasyCheck.formErrorCss['regForm2']="error2";
			
			//Message content
			EasyCheck.msgs['uname']={
				'.required':"自定义消息：必须有啊！"
				,
				'[reg]':'只允许字母和数字,字母开头'
			};
	</script> 
	
	<!-- EasyCheck end -->
  </head>
  
  <body>
	<div align="center">
	<div class="head">EasyCheck Div demo - 中文</div>
		<a href="index.jsp">Demo home</a>
	
	<div class="statement" onclick="EasyCheck.clearAllError('regForm')">
	基本功能（单击此处，清除所有错误消息）
	</div>
	<form   action="success.jsp"  onsubmit="return EasyCheck.checkForm(this)" id="regForm" method="post">
	<table width="950" style="margin-top: 15px;" >
		<tr>
			<td width="310" >
			<label class='red'>*</label>用户名<label class="tip">(必填+正则)</label> 
			</td>
			
			<td>
				<input type="text" id="uname"   name="uname" class="txt required exists" reg="^[A-Za-z][A-Za-z0-9]*$"/>
				<span  id="error_uname1"   prefix="用户名" ></span> 
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>邮箱<label class="tip">(必填+邮箱)</label></td>
			<td>
				<input type="text" name="uemail" class="txt required email"/>
				<span  id="error_uemail"  info="邮箱格式不正确！"></span> 
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>密码<label class="tip">(必填+最小长度6+最大长度12)</label></td>
			<td>
				<input type="password" name="upwd" id="upwd" class="txt required " minlength="6" maxlength="12"/>
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>确认密码<label class="tip">(必填+和密码相等)</label></td>
			<td>
				<input type="password" name="reupwd" class="txt required" equalTo="upwd"/>
			</td>
		</tr>
		<tr>
			<td >网站<label class="tip">(必须是网站)</label></td>
			<td>
				<input type="text" name="url" class="txt url"/>
			</td>
		</tr>
		<tr>
			<td >年龄<label class="tip">(整数+最小值18+最大值45)</label></td>
			<td>
				<input type="text" name="uage" class="txt integer" style="width: 80px;" min="18" max="45"/>
			</td>
		</tr>
		<tr>
			<td >薪资<label class="tip">(可包含小数)</label></td>
			<td>
				<input type="text" name="usal" class="txt number" style="width: 80px;"/>
			</td>
		</tr>
		<tr>
			<td >文件<label class="tip">(后缀必须为html,htm)</label></td>
			<td>
				<input type="file" name="upic"  extension="html,htm" ecss="no"/>
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>验证码<label class="tip">(长度4位)</label></td>
			<td>
				<input type="text" name="uvc"  vc="chkvc.jsp?z1=z1" class="txt " style="width: 80px;" equallength="4" maxlength="4"/>
				<img src="vc.jsp?z1=z1" alt="验证码" onclick="this.src='vc.jsp?z1=z1&r='+new Date()" />
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="  注  册   " id="regBtn"/>
				<input type="reset" value="  重  置   " id="resetBtn"  />
			</td>
		</tr>
	</table>
	</form>
	
	
	
		<div class="statement" onclick="EasyCheck.clearAllError('regForm2')">
	带默认提示和成功提示（单击此处，清除所有错误消息）
	</div>
	
		<form action="success.jsp"  onsubmit="return EasyCheck.checkForm(this)" id="regForm2" method="post">
	<table width="950" style="margin-top: 15px;">
		<tr>
			<td width="220" >
			<label class='red'>*</label>用户名
			</td>
			
			<td>
				<input type="text" id="uname2" name="uname" class="txt2 required" reg="^[A-Za-z][A-Za-z0-9]*$"/>
				<span  id="default_uname2"  info="必填，字母开头，只能包含字母和数字"></span> 
				<span  id="correct_uname2"   info="正确"></span> 
				<span  id="error_uname2"  prefix="用户名"  ></span> 
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>邮箱</td>
			<td>
				<input type="text" name="uemail2" class="txt2 required email"/>
				<span  id="default_uemail2"    info="必填，必须是邮箱"></span> 
				<span  id="correct_uemail2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
				<span  id="error_uemail2"   info="邮箱"></span> 
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>密码</td>
			<td>
				<input type="password" name="upwd2" id="upwd2" class="txt2 required " minlength="6" maxlength="12"/>
				<span  id="default_upwd2"  info="必填，6到12位"></span> 
				<span  id="correct_upwd2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
				<span  id="error_upwd2"  info="密码" ></span> 
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>确认密码</td>
			<td>
				<input type="password" name="reupwd2" class="txt2 required" equalTo="upwd2"/>
				<span  id="default_reupwd2"  info="必须与密码一致"></span> 
				<span  id="correct_reupwd2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
				<span  id="error_reupwd2"   info="确认密码"></span> 
			</td>
		</tr>
		<tr>
			<td >网站</td>
			<td>
				<input type="text" name="url2" class="txt2 url"/>
				<span  id="default_url2"  info="个人网站" ></span> 
				<span  id="correct_url2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
				<span  id="error_url2"   info="网站"></span> 
			</td>
		</tr>
		<tr>
			<td >年龄</td>
			<td>
				<input type="text" name="uage2" class="txt2 integer" style="width: 80px;" min="18" max="45"/>
				<span  id="default_uage2"  info="必须为18到45之间的整数" ></span> 
				 <span  id="correct_uage2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
				 <span  id="error_uage2"   info="年龄必须在18到45之间" ></span> 
			</td>
		</tr>
		<tr>
			<td >薪资</td>
			<td>
				<input type="text" name="usal2" class="txt2 number" style="width: 80px;"/>
				<span  id="correct_usal2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
				<span  id="error_usal2"   info="薪资" ></span> 
			</td>
		</tr>
		<tr>
			<td >文件</td>
			<td>
				<input type="file" name="upic2"  extension="gif,jpg,jpeg,png" ecss="no"/>
				<span  id="default_upic2"  info="后缀为gif,jpg,jpeg,png"  ></span> 
				<span  id="correct_upic2" style="background-color: #fff;display: none"><img src="images/ok.png" width="32"></img></span> 
			</td>
		</tr>
		<tr>
			<td ><label class='red'>*</label>验证码</td>
			<td>
				<input type="text" name="uvc" id="uvc2"  vc="chkvc.jsp?z2=z2" ecss="no" class="txt2 " style="width: 80px;" equallength="4" maxlength="4"/>
				<img src="vc.jsp?z2=z2" onclick="this.src='vc.jsp?z2=z2&r='+new Date()" alt="验证码"/>
				<span  id="error_uvc2"  ></span> 
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="  注  册   " id="regBtn2"/>
				<input type="reset" value="  重  置   " id="resetBtn2"  />
			</td>
		</tr>
	</table>
	</form>
		
	</div>
	<%@ include file="../footer.jsp" %>
  </body>
</html>
