![](https://img.shields.io/badge/Author-yun--cheng-green)
## 自习室小程序（商业项目开源）
>使用效果请扫描或者搜索小程序(**Dayin自习室**)

<img src="https://cloud-print-oss.oss-cn-beijing.aliyuncs.com/icon/2691606990168_.pic_hd.jpg" width="40%" height="40%">

>具体系统接口文档地址：
>https://www.yuque.com/docs/share/d3938ec0-8d1b-457b-8db8-c2b6f19a6e63?#（密码：dg7c） 
>后端在/system_server文件夹下
>管理端在/system_admin

### 简介

- 预约自习室小程序

- 开发技术基于Taro&&小程序

- 完整集合微信登录、授权、订阅消息、客服、支付等基础api


### 开发使用说明（以mac为例）

#### 小程序运行

- mkdir 本地创建文件夹

- git clone XXXX  拉取代码

- 本地安装 node 

- 本地安装 Taro 环境（https://taro.jd.com/）

- 修改代码project.config.js内配置，把appid替换为自己的小程序appid。如果没有的话可以在微信公众平台可以自己注册个人小程序（https://mp.weixin.qq.com/）

``` Json
{
  "miniprogramRoot": "./dist",
  "projectname": "cp_taro",
  "description": "",
  "appid": "换成自己的appid",
  "setting": {
    "urlCheck": true,
    "es6": false,
    "postcss": false,
    "minified": false
  },
  "compileType": "miniprogram"
}

```

- npm run dev:weapp 运行项目


- 打开微信开发工具，导入项目（选择项目内的dist文件夹）

- 在开发工具内选择不校验合法域名（否则无法访问接口数据）

- 进行项目开发

#### 后端启动（预约系统服务端 基于egg）

- 进入后端目录(/system_server)

>具体系统接口文档地址：
>https://www.yuque.com/marshallei/kvp3ke/qh1wah
> 预约付费订阅小程序的后端系统，对接小程序和小程序管理端两个系统
>开发技术基于egg.js的nodejs框架
>数据库使用MongoDB
>集合微信支付等功能

- 本地安装 MongoDB，并且创建自己的数据库（可以自定义名称）

- 本地安装 node 

- 修改代码config/config.default.js内MongoDB的配置，把数据库名称改为自己的，例如

``` JavaScript
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/自定义数据库名称',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }
```

- cd 项目文件夹根目录  

- npm run dev 运行项目

- 便可以看到项目运行在7008端口，按照app/router.js下的路由访问便可以调用接口







