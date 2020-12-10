![](https://img.shields.io/badge/Author-yun--cheng-green)
## 自习室小程序（商业项目开源）

>具体系统接口文档地址：
>https://www.yuque.com/docs/share/d3938ec0-8d1b-457b-8db8-c2b6f19a6e63?#（密码：dg7c） 

>后端在/system_server文件夹下
>管理端在/system_admin

### 简介

- 预约付费订阅小程序

- 开发技术基于Taro&&小程序

- 完整集合微信登录、授权、订阅消息、客服、支付等基础api


### 系统说明



### 使用说明（以mac为例）

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

- 运行egg后端项目(/system_server)

- cd 项目文件夹根目录  

- npm run dev:weapp 运行项目


- 打开微信开发工具，导入项目（选择项目内的dist文件夹）

- 在开发工具内选择不校验合法域名（否则无法访问接口数据）

- 进行项目开发

