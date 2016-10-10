<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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

<title>EasyCheck tooltip Demo - en</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
* {
	font-family: sans-serif, Verdana, Arial, Helvetica, Tahoma;
	font-size: 18px;
}

body {
	margin: 0;
	padding: 0;
}

.head {
	background-color: #FD9511;
	color: #fff;
	margin: 0;
	padding: 0;
	font-size: 48px;
	font-weight: bold;
	height: 90px;
	line-height: 90px;
}

.statement {
	font-size: 28px;
	font-weight: bold;
	text-align: center;
	margin-top: 30px;
}

.tip {
	font-style: italic;
	color: #FB3D18;
	display: block;
}

.red {
	color: #f00;
}

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
	font-family: sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
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
	font-family: sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
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
	font-family: sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
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
	font-family: sans-serif, Verdana, Arial, Helvetica, Tahoma, "宋体";
	margin-right: 10px;
	width: 325px;
	margin: 0px 0 0 10px;
	letter-spacing: 1px;
	outline: none;
	border: 1px solid #FF0000;
	box-shadow: 0 0 8px rgba(255, 81, 153, 1);
}

tr {
	height: 55px;
}
</style>

	<!-- EasyCheck start -->
	<!-- Tooltip plugin CSS-->
	<link rel="stylesheet" type="text/css" href="easycheck/plugins/tooltip/easycheck-tooltip.css"/>  
	<!-- jQuery -->
	<script type="text/javascript" src="easycheck/jquery-1.12.4.min.js"></script>
	<!-- EasyCheck & EasyCheck language file -->
	<script type="text/javascript" src="easycheck/easy.easycheck-5.1.0.js"></script>
	<!-- Tooltip plugin -->
	<script type="text/javascript" src="easycheck/plugins/tooltip/easy.easycheck-tooltip.js"></script>
	<!-- Message i18n -->
	<script type="text/javascript" src="easycheck/lang/easy.easycheck-lang-zh_CN.js"></script>
	
	<script type="text/javascript">
		EasyCheck.formFocusCss['regForm2'] = "focus2";
		EasyCheck.formErrorCss['regForm2'] = "error2";
		// Message content
		EasyCheck.msgs['uname'] = {
			'.required' : "must Ah！",
			'[reg]' : 'only letter and number,start with letter'
		};
	</script>
	<!-- EasyCheck end -->

</head>

<body>
	<div align="center">
		<div class="head">EasyCheck Tooltip demo - English</div>
			<a href="index.jsp">Demo home</a>
		<div class="statement" onclick="EasyCheck.clearAllError('regForm')">Basic (Click here, clear all error msg)）</div>
		
		<form action="success.jsp" onsubmit="return EasyCheck.checkForm(this)" id="regForm" method="post">
			<table width="950" style="margin-top: 15px;" cellpadding="10">
				<tr align="left">
					<td width="320"><label class='red'>*</label>Username <label class="tip">
							(Required + regular) </label></td>

					<td><input type="text" name="uname" class="txt required" reg="^[A-Za-z][A-Za-z0-9]*$" />
						 <span  id="error_uname" prefix="Username " ></span> </td>
				</tr>
				<tr>
					<td><label class='red'>*</label> email <label class="tip"> (Required + mail)</label>
					</td>
					<td><input type="text" name="uemail" class="txt required email" />
						 <span id="error_uemail" info="your email please" ></span> </td>
				</tr>
				<tr>
					<td width="320"><label class='red'>*</label> Password <label class="tip">
							(Required minimum length + 6 + Maximum length 12) </label>
					</td>
					<td><input type="password" name="upwd" id="upwd" class="txt required " minlength="6"
						maxlength="12" /></td>
				</tr>
				<tr>
					<td><label class='red'>*</label>Confirm Password <label class="tip"> (Required +
							and password are equal) </label>
					</td>
					<td><input type="password" name="reupwd" class="txt required" equalTo="upwd" /></td>
				</tr>
				<tr>
					<td>Website <label class="tip"> (must be a site)</label>
					</td>
					<td><input type="text" name="uurl" class="txt url" /></td>
				</tr>
				<tr>
					<td>Age <label class="tip"> (integer + min 18 + max 45) </label>
					</td>
					<td><input type="text" name="uage" class="txt integer" style="width: 80px;" min="18"
						max="45" /></td>
				</tr>
				<tr>
					<td>Salary <label class="tip"> (can include decimal) </label>
					</td>
					<td><input type="text" name="usal" class="txt number" style="width: 80px;" /></td>
				</tr>
				<tr>
					<td>File <label class="tip"> (suffix must be html, htm) </label>
					</td>
					<td><input type="file" name="upic" extension="html,htm" ecss="no" /></td>
				</tr>
				<tr>
					<td><label class='red'>*</label>verification code <label class="tip"> (length 4)</label>
					</td>
					<td><input type="text" name="uvc" vc="chkvc.jsp?e1=e1" class="txt " style="width: 80px;"
						equallength="4" maxlength="4" /> <img src="vc.jsp?e1=e1" alt="verification code "
						onclick="this.src='vc.jsp?e1=e1&?r='+new Date()" />
						<span  id="error_uvc" ></span> 	
					</td>
				</tr>
				<tr>
					<td colspan="2">
					<input type="submit" value="  register   " id="regBtn" />
					<input type="reset" value="  Reset  " id="resetBtn"  />
					</td>
				</tr>
			</table>
		</form>



	<div class="statement" onclick="EasyCheck.clearAllError('regForm2')">
	EasyChek Tooltip With the default prompt and successful tips (Click here, clear all error msg)
	</div>

		<form action="success.jsp" onsubmit="return EasyCheck.checkForm(this)" id="regForm2" method="post">
			<table width="950" style="margin-top: 15px;" cellpadding="10">
				<tr>
					<td width="220"><label class='red'>*</label>Username</td>

					<td><input type="text" name="uname2" class="txt required" reg="^[A-Za-z][A-Za-z0-9]*$" />
						 <span id="default_uname2" info="Required, start with letter, only
							letters and numbers"></span> 
						 <span  id="correct_uname2" info="correct"></span> 
						 <span id="error_uname2" info="start with a letter, only letters and numbers"
							></span> </td>
				</tr>
				<tr>
					<td><label class='red'>*</label>Email</td>
					<td><input type="text" name="uemail2" class="txt required email" />
						 <span id="default_uemail2" info="Required, must be a email"></span> 
						 <span id="correct_uemail2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> 
						 <span  id="error_uemail2" info="email " ></span> </td>
				</tr>
				<tr>
					<td><label class='red'>*</label>Password</td>
					<td><input type="password" name="upwd2" id="upwd2" class="txt required " minlength="6"
						maxlength="12" />
						 <span id="default_upwd2" info="quired, 6-12"></span> 
						 <span id="correct_upwd2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> 
						 <span  id="error_upwd2" info="Password "></span> </td>
				</tr>
				<tr>
					<td><label class='red'>*</label>Confirm password</td>
					<td><input type="password" name="reupwd2" class="txt required" equalTo="upwd2" />
						 <span id="default_reupwd2" info="Must be consistent with the password"></span> 
						 <span id="correct_reupwd2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> 
						 <span id="error_reupwd2" info="Confirm password " ></span> </td>
				</tr>
				<tr>
					<td>Website</td>
					<td><input type="text" name="url2" class="txt url" />
						 <span id="default_url2" info="your home page"></span> 
						 <span id="correct_url2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> 
						 <span  id="error_uurl2" ></span> </td>
				</tr>
				<tr>
					<td>Age</td>
					<td><input type="text" name="uage2" class="txt integer" style="width: 80px;" min="18"
						max="45" />
						 <span id="default_uage2"  info="Must be an integer between 18-45"></span> 
						 <span id="correct_uage2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> 
						 <span info="Age" id="error_uage2" ></span> </td>
				</tr>
				<tr>
					<td>Salary</td>
					<td><input type="text" name="usal2" class="txt number" style="width: 80px;" />
						 <span id="correct_usal2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> 
						 <span id="error_usal2"  info="Salary" ></span> </td>
				</tr>
				<tr>
					<td>File</td>
					<td><input type="file" name="upic2" extension="gif,jpg,jpeg,png" ecss="no" />
						 <span id="default_upic2" info="Suffix gif,jpg,jpeg,png"></span> 
						 <span id="correct_upic2" style="background-color: #fff;display: none">
							<img src="images/ok.png" width="32"></img>
						</span> </td>
				</tr>
				<tr>
					<td><label class='red'>*</label>Verification code</td>
					<td><input type="text" name="uvc" id="uvc2" vc="chkvc.jsp?e2=e2" ecss="no" class="txt "
						style="width: 80px;" equallength="4" maxlength="4" /> <img src="vc.jsp?e2=e2"
						alt="Verification code " onclick="this.src='vc.jsp?e2=e2&?r='+new Date()" />
						 <span id="error_uvc2" ></span> </td>
				</tr>
				<tr>
					<td colspan="2">
					<input type="submit" value="  Register   " id="regBtn2" />
					<input type="reset" value="  Reset   " id="resetBtn2"  />
					</td>
				</tr>
			</table>
		</form>
	</div>
	<%@ include file="../footer.jsp" %>
</body>
</html>
