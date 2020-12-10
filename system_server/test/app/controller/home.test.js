/*
 * @Author: yuncheng
 * @Date: 2020-05-27 10:45:18
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-27 14:21:59
 * @FilePath: /cp_server/test/app/controller/home.test.js
 */ 
'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  // it('should assert', () => {
  //   const pkg = require('../../../package.json');
  //   assert(app.config.keys.startsWith(pkg.name));

  //   // const ctx = app.mockContext({});
  //   // yield ctx.service.xx();
  // });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });
});
