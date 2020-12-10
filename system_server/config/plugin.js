/*
 * @Author: yuncheng
 * @Date: 2020-06-28 11:21:37
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-06-28 11:36:07
 * @FilePath: /booking_system_server/config/plugin.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-05-27 10:45:18
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-27 16:03:30
 * @FilePath: /cp_server/config/plugin.js
 */ 
'use strict';

/** @type Egg.EggPlugin */

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql',
// };

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}

exports.cors = {
  enable: true,
  package: 'egg-cors',
}

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

