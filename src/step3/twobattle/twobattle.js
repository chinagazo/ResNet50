import { Row, Col } from 'antd';
import React from 'react';
import './twobattle.css';
import Timer from '../time/timer';

const twobattle = () => {
    return (
        <>
            <Row>
                <Col span={8} style={{ paddingBottom: "0.8%", backgroundColor: "#18ffca" }}></Col>
            </Row>

            <Row style={{ overflow: 'hidden' }}>
                <div>
                    <div>
                        <Col span={12} style={{ textAlign: "center", paddingBottom: "99.2%", backgroundColor: "#e5e5e5", overflow: "hidden" }} >
                            <div>
                                <p className='s' style={{ color:'#ffffff' }}><Timer /></p>
                                <p className='sss' style={{ paddingLeft: 90, paddingRight: 90, position: 'absolute', right: '250px', top: '8%' }}>'  SQUAT  SQUAT  SQUAT  '</p>
                                <p className='bottomN'  style={{ color:'#ffffff' }}>22</p>
                                <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid #ffffff' }}></div>
                                <p className='kcal' style={{ position: 'absolute', top : '36%', right: 70, color: '#ffffff' }}>0.234kcal</p>
                                <div style={{ position: 'absolute', paddingLeft: '380px', bottom: '60.5%', right: 70, border: '2px solid #ffffff' }}></div>
                                <p className='counts'  style={{ color:'#ffffff' }}>COUNTS</p>
                                <p className='burned'  style={{ color:'#ffffff' }}>Burned</p>
                                <p className='bottomid'  style={{ color:'#ffffff' }}>USER 12345</p>
                            </div>
                        </Col>
                    </div>
                    <div>
                        <Col span={12} style={{ paddingBottom: "99.2%", backgroundColor: "#000000", overflow: "hidden", fontWeight: 500 }} >
                            <p className='bottomN'  style={{ color:'#ffffff' }}>22</p>
                            <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid #ffffff' }}></div>
                            <p className='counts'  style={{ color:'#ffffff' }}>COUNTS</p>
                            <p className='bottomid'  style={{ color:'#ffffff' }}>USER 12345</p>
                        </Col>
                    </div>
                </div>


            </Row>
        </>
    )
}

export default twobattle;