# EasyCheck validation framework

---------------

EasyCheck，是一个基于 jQuery 的前端 JavaScript 表单验证框架，无需编程通过 HTML 增强即可完成表单验证工作，简化前端开发工作，并保持统一验证风格，提高效率。并提供灵活的自定义接口，支持基于验证引擎的插件扩展。

EasyCheck (Echeck), is a jQuery based front-end JavaScript forms authentication framework, without programming through HTML enhanced form validation work, simplifying the front-end development work, and maintain a unified style, improve efficiency. Custom interface, and provides a flexible support plug-in extension based on validation engine.

最新版本/latest version:  `5.2.0-RELEASE`

## Feature/功能 

###  中文
**主要特点：**

1. 轻量级，无需 JS 编程

2. 支持基于类、基于属性和组合验证器，内置能满足日常开发的十多种常用验证器

3. 文本框验证样式自动切换

4. 默认、错误和正确三种提示消息内容，提示消息位置的自定义

5. 客户端防止重复提交功能

6. 异步验证支持，支持 `ES6 Promise` 编程（验证码在不支持 `Promise` 的环境时，自动回退到同步验证）

7. 服务器验证消息处理，手动添加和清除验证消息（如页面提交到服务器校验转发回的消息，`Ajax` 的消息...）

8. 扩展性，支持用户开发注册新验证器
 
9. 插件支持，已支持验证提示插件：**DIV**, **ToolTip**, **Bootstrap3**


**兼容性**：
- 浏览器：完全兼容IE6及以上版本、Firefox、Chrome、Safari、Opera等各内核（Trident、Gecko、Webkit、Presto）浏览器，并兼容多平台及系统（PC，TabletPC，Mobile）。 
- jQuery: `1.9+`, `2.X`, `3.X`
> Bootstrap 验证插件的兼容性与 Bootstrap 最低兼容要求一致

**已支持插件：**
- DIV
- ToolTip
- Bootstrap3


### English

**Main features:**
1. Lightweight, No JavaScript programming

2. Support class-based, based on a combination of property and validators, Built to meet the daily development of a dozen popular validator

3. Verify that the text box to automatically switch styles

4. By default, errors and correct three kinds of message content, custom message location

5. Anti-client resubmit function

6. Asynchronous validation support, support for `ES6 Promise` programming (validation code automatically fallback to sync verification when the environment is not supported for `Promise`)

7. Server-side validation message, according to manually add and remove validation messages (such as the page to submit to the server check forwarding back to news, the news of the Ajax...)

8. scalability, support for registered users to develop new validator

9. Engine framework extension plugins, now support plug-ins: **DIV**, **ToolTip**, **Bootstrap3** 

**Compatibility:**
- Browser: fully compatible with IE6 or later, Firefox, Chrome, Safari, Opera, and other kernel (Trident, Gecko, Webkit, Presto) browser, and is compatible with multiple platforms and systems (PC, TabletPC, Mobile).
- jQuery: `1.9+`, `2.X`, `3.X`
> That the bootstrap validation plugin is compatible with Bootstrap minimum compatibility requirements

**Already support plugins:**
- DIV
- ToolTip
- Bootstrap3


## Architecture/架构 

![EasyCheck Functions](doc/images/easycheck.png)

![EasyCheck Engine](doc/images/easycheck-engine.png)


## Demo&Support plugins/示例和插件

[Demo - 中文](http://www.easyproject.cn/easycheck/zh-cn/index.jsp#demo 'Demo - 中文]')

[Demo - English](http://www.easyproject.cn/easycheck/zh-cn/index.jsp#demo 'Demo - English]')

- **DIV**
![DIV demo](doc/images/div.png)

- **ToolTip**
![DIV demo](doc/images/tooltip.png)

- **Bootstrap3**
![DIV demo](doc/images/bootstrap3.png)
![DIV demo](doc/images/bootstrap3_2.png)


## Document/文档

### 中文

[中文说明文档](doc/readme_zh_CN.md)

[官方主页](http://www.easyproject.cn/easycheck/zh-cn/index.jsp '官方主页')

[留言评论](http://www.easyproject.cn/easycheck/zh-cn/index.jsp#donation '留言评论')

如果您有更好意见，建议或想法，请联系我。

### English

[English Readme](doc/readme_en.md)

[The official home page](http://www.easyproject.cn/easycheck/en/index.jsp 'The official home page')

[Comments](http://www.easyproject.cn/easycheck/en/index.jsp#donation 'Comments')

If you have more comments, suggestions or ideas, please contact me.

## End

Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")


**支付宝钱包扫一扫捐助：**

我们相信，每个人的点滴贡献，都将是推动产生更多、更好免费开源产品的一大步。

**感谢慷慨捐助，以支持服务器运行和鼓励更多社区成员。**

<img alt="支付宝钱包扫一扫捐助" src="http://www.easyproject.cn/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>



We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")

