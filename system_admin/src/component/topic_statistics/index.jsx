import React from 'react';
import { Row, Col, Divider } from 'antd';

function TopicStatistics ( props ) {
    return (
        <Row gutter={ 24 }>
            { props.topicColumn.length > 0 && props.topicColumn.map( v => {
                console.log( Math.floor( 24 / ( props.topicColumn.length ) ) );
                return (

                    <Col span={ Math.floor( 24 / ( props.topicColumn.length ) ) } >
                        <div style={ { float: "left", padding: "0 30%", width: "90%" } }>
                            <div style={ { textAlign: "center" } }>
                                <h1>{ v.title }</h1>
                            </div>
                            <div style={ { textAlign: "center", fontSize: "30px" } }>
                                { v.data }

                            </div>
                        </div>
                        <div style={ { float: "right" } }>
                            <Divider type="vertical" style={ { height: "100px" } }></Divider>
                        </div>
                    </Col>


                );
            } ) }
        </Row>
    );
}

export default TopicStatistics;