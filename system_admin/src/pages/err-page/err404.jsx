import React from 'react';
import { Result, Button } from 'antd';
function Error404 () {
    return (
        <Result
            status="404"
            title="404"
            subTitle="页面丢失了"
            extra={ <Button type="primary" onClick={ () => window.location.assign( '/' ) }>返回首页</Button> }
        />
    );
}

export default Error404;