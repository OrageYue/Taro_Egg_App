##自动生成页面模板脚本

>用于自动生成页面（组件）脚手架

>生成带dva的通用配置页面

>包含（page.js/scss.js/config.js/service.js/model.js）

>使用npm命令自动构建

>以Taro为例，其余可以参考

### 一、说明

我们每次添加一个页面或者创建一个组件的时候，通常步骤如下：

- 创建一个pages/pageName 文件夹

- 在文件夹内编写 pageName.jsx 作为view组件

- 在文件夹内创建 pageName.scss 存放样式

- 在文件夹内创建 models.js 存放redux(dva)模型

- 在文件夹内创建 service.js 存放相关业务service(如请求处理，登录等)

- 在文件夹内创建 config.js 个性化配置



**可以看出，上方步骤冗余，重复较多，每次页面都要重复进行很多的工作 所以通过脚本的形式统一构建页面组件，可以降低错误率，提高效率。**

### 二、步骤

- 第一步：创建脚本

	- 在根目录下创建scripts文件夹，用于存放执行脚本

	- 创建template_js，用于生成js相关页面

	- 创建templat_ts,用于生成ts相关页面

	- 创建component.js,生成组件

- 第二步：编写组件生成脚本

	##### scripts/template_js
>默认函数式组件，可以自定义

``` javascript
/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}

//页面模板 jsx
const indexTep = `
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
import './${dirName}.scss'
// import { } from '../../components'

function ${capPirName} () {

    return (
      <View className='${dirName}-wrap'>
          
      </View>
    )
}
${capPirName}.config={
     navigationBarTitleText: '标题自定义'
}
export default  connect(({ ${dirName} }) => ({
    ...${dirName},
 }))(${capPirName})
`

// scss文件模版
const scssTep = `
${dirName}-wrap {
    width: 100%;
    min-height: 100vh;
}
`

// config 接口地址配置模板
const configTep = `
export default {
  test: '/wechat/perfect-info', //xxx接口
}
`
// 接口请求模板
const serviceTep = `
import Api from '../../utils/request'

export const testApi = data => Api.test(
  data
)
`

//model模板(dva)

const modelTep = `
// import Taro from '@tarojs/taro';
import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {
  },

  effects: {},

  reducers: {}

}
`



fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.jsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('config.js', configTep); // config
fs.writeFileSync('service.js', serviceTep); // service
fs.writeFileSync('model.js', modelTep); // model
process.exit(0);
```

##### scripts/template_ts
>class组件

```javascript
/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}

//页面模板
const indexTep = `
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
import './${dirName}.scss'
// import { } from '../../components'

// @connect(({ ${dirName} }) => ({
//     ...${dirName},
// }))

class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View className='${dirName}-wrap'>
          
      </View>
    )
  }
}

export default ${capPirName}
`

// scss文件模版
const scssTep = `
${dirName}-wrap {
    width: 100%;
    min-height: 100vh;
}
`

// config 接口地址配置模板
const configTep = `
export default {
  test: '/wechat/perfect-info', //xxx接口
}
`
// 接口请求模板
const serviceTep = `
import Api from '../../utils/request'

export const testApi = data => Api.test(
  data
)
`

//model模板

const modelTep = `
// import Taro from '@tarojs/taro';
import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {
  },

  effects: {},

  reducers: {}

}
`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('config.ts', configTep); // config
fs.writeFileSync('service.ts', serviceTep); // service
fs.writeFileSync('model.ts', modelTep); // model
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);
```

##### scripts/component.js
>默认ts


```javascript
/**
 * pages页面快速生成脚本 
 * 用法：npm run com `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0,1).toUpperCase() + dirName.substring(1);
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run com test');
  process.exit(0);
}

//页面模板
const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
import './${dirName}.scss'

class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
  constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps:${capPirName}Props = {}

  render() {
    return (
      <View className='fx-${dirName}-wrap'>

      </View>
    )
  }
}

export default ${capPirName}
`

// scss文件模版
const scssTep = `
${dirName}-wrap {
    width: 100%;
 }
`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/components/${dirName}`); // mkdir $1
process.chdir(`./src/components/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface


```

- 第三步：定义npm命令

在package.json-scripts字段定义模板生成命令

```
    "tepts": "node scripts/template_ts",
    "tepjs": "node scripts/template_js",
    "com": "node scripts/component"
    
```

- 第四步：执行命令，生成页面/组件

```
执行npm run tepjs home 

pages文件夹下自动生成home文件夹

并且自动生成jsx，scss，model.js，config.js,service.js文件
```


