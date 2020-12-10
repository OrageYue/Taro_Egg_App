<!--
 * @Author: yuncheng
 * @Date: 2020-07-30 10:41:31
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-31 16:42:06
 * @FilePath: /booking_system_server/README.md
--> 
## 预约系统服务端 基于egg

>具体系统接口文档地址：
>https://www.yuque.com/marshallei/kvp3ke/qh1wah

### 简介

- 预约付费订阅小程序的后端系统，对接小程序和小程序管理端两个系统

- 开发技术基于egg.js的nodejs框架

- 数据库使用MongoDB

- 集合微信支付等功能
### 系统说明

- router接口分为了restful和通用类型接口

- app/extend/helper.js存放全局通用可抽象的一些函数操作（例如加密，时间处理，全局返回处理）

- app/middleware存放中间件

### 使用说明（以mac为例）

- mkdir 本地创建文件夹

- git clone XXXX  拉取代码

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

