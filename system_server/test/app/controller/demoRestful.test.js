/*
 * @Author: yuncheng
 * @Date: 2020-05-27 14:25:20
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-27 15:07:47
 * @FilePath: /cp_server/test/app/controller/demoRestful.test.js
 */ 
'use strict';


const mock = require('egg-mock');
const assert = require('assert');

describe('test/app/controller/demoRestful.test.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });

  afterEach(mock.restore);

//   it('should GET /api/v2/demoRestful', async function() {
//     app.mockService('demoRestful', 'list', [{
//       content: 'Mock List',
//     }]);
//     const r = await app.httpRequest()
//       .get('/api/v2/demoRestful')
//       .expect(200);

//     assert(Array.isArray(r.body));
//     assert(typeof r.body[0].content === 'string');
//   });

//   it('should GET /api/v2/demoRestful error', async function() {
//     const err = new Error('client error');
//     err.status = 400;
//     app.mockServiceError('demoRestful', 'list', err);
//     await app.httpRequest()
//       .get('/api/v2/demoRestful')
//       .expect(400)
//       .expect({ error: 'client error' });
//   });

//   it('should GET /api/v2/demoRestful/:id 404', async function() {
//     const err = new Error('not found error');
//     err.status = 404;
//     app.mockService('demoRestful', 'show', err);
//     await app.httpRequest()
//       .get('/api/v2/demoRestful/5433d5e4e737cbe96dcef300')
//       .expect(404);
//   });

  it('should POST /api/v2/demoRestful/ 422', async function() {
    app.mockCsrf();
    const err = new Error('validation failed');
    err.status = 422;
    app.mockService('demoRestful', 'create', err);
    await app.httpRequest()
      .post('/api/v2/demoRestful')
      .send({
        accesstoken: '123',
      })
      .expect(200)
      .expect(
          {
            code: 422,
            error: "Validation Failed",
            detail: [
                {
                    "message": "required",
                    "field": "title",
                    "code": "missing_field"
                },
                {
                    "message": "required",
                    "field": "content",
                    "code": "missing_field"
                }
            ]
        }
      );
  });

//   it('should POST /api/v2/demoRestful/ 201', async function() {
//     app.mockCsrf();
//     app.mockService('demoRestful', 'create', 123);
//     await app.httpRequest()
//       .post('/api/v2/demoRestful')
//       .send({
//         accesstoken: '123',
//         title: 'title',
//         content: 'hello',
//       })
//       .expect(201)
//       .expect({
//         topic_id: 123,
//       });
//   });

//   it('should PUT /api/v2/demoRestful/1 204', async function() {
//     app.mockCsrf();
//     app.mockService('demoRestful', 'update', null);
//     await app.httpRequest()
//       .put('/api/v2/demoRestful/1')
//       .send({
//         accesstoken: '123',
//         title: 'title',
//         content: 'hello',
//       })
//       .expect(204);
//   });
});
