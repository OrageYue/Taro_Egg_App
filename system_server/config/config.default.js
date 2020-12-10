module.exports = appInfo => {
  const config = ( exports = {} )

  config.keys = appInfo.name + '_1513779989145_1674'

  
  //  中间件
  config.middleware = ['errorHandler']

  // 只对 /api 路径生效
  config.errorHandler = {
    match: '/api',
  }

  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error'
      ctx.status = 500
    },
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>error</h3>'
      ctx.status = 500
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' }
      ctx.status = 500
    },

  }

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  (config.multipart = {
    fileExtensions: [
      '.apk',
      '.pptx',
      '.docx',
      '.csv',
      '.doc',
      '.ppt',
      '.pdf',
      '.pages',
      '.wav',
      '.mov'
    ] // 增加对 .apk 扩展名的支持
  }),

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/booking_system',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }
  
  config.cluster = {
    listen: {
      path: '',
      port: 7008,
      hostname: '0.0.0.0'
    }
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, 
    match: '/jwt' 
  }
config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };

  return config
}

