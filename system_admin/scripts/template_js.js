/*
 * @Author: yuncheng
 * @Date: 2020-06-03 15:58:39
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-05 21:31:37
 * @FilePath: /booking_system_admin/scripts/template_js.js
 */ 
const fs = require( "fs" )

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}

//页面模板 jsx
const indexTep = `
import React, { useEffect } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { connect } from 'umi';
import './index.less'
// import { } from '../../components'

function ${capPirName} () {

    return (
      <Card className='${dirName}-wrap'>
          
      </Card>
    )
}

export default  connect(({ ${dirName},loading  }) => ({
    ...${dirName},
     loading: loading.models.${dirName},
 }))(${capPirName})
`

// less文件模版
const lessTep = `
@import '~antd/es/style/themes/default.less';

a.listItemMetaTitle {
  color: @heading-color;
}
.listItemExtra {
  width: 272px;
  height: 1px;
}
.selfTrigger {
  margin-left: 12px;
}

@media screen and (max-width: @screen-xs) {
  .selfTrigger {
    display: block;
    margin-left: 0;
  }
}
@media screen and (max-width: @screen-md) {
  .selfTrigger {
    display: block;
    margin-left: 0;
  }
}
@media screen and (max-width: @screen-lg) {
  .listItemExtra {
    width: 0;
    height: 1px;
  }
}

`

// mocck 接口地址配置模板
const mockTep = `
// eslint-disable-next-line import/no-extraneous-dependencies
const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

function fakeList(count) {
  const list = [];
}

function getFakeList(req, res) {
  const params = req.query;
  const count = params.count * 1 || 20;
  const result = fakeList(count);
  return res.json(result);
}

export default {
  'GET  /api/fake_list': getFakeList,
};

`
// 接口请求模板
const serviceTep = `
import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

`

//model模板(dva)

const modelTep = `
import { queryFakeList } from './service';

const Model = {
  namespace: '${dirName}',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    appendList(state, action) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
`



fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync( `index.jsx`, indexTep ); //tsx

fs.writeFileSync(`index.less`, lessTep); // scss
fs.writeFileSync('_mock.js', mockTep); // config
fs.writeFileSync('service.js', serviceTep); // service
fs.writeFileSync('model.js', modelTep); // model
process.exit(0);