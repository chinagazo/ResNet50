import { Row, Col } from 'antd';
import React from 'react';
import './threebattle.css';
import Timer from '../time/timer';
import MainJs from '../../step1/main';

const threebattle = () => {
    return (
        <>
            <Row>
                <Col span={8} style={{ paddingBottom: "0.8%", backgroundColor: "#18ffca" }}></Col>
            </Row>

            <Row style={{ overflow: 'hidden' }}>
                <div>
                    <MainJs/>
                    {/* <div>
                        <Col span={8} style={{ textAlign: "center", paddingBottom: "99.2%", backgroundColor: "#ffffff", overflow: "hidden" }} >
                            <div>
                                <p className='s' style={{ left: 300, top: 1 }}><Timer /></p>
                                <p className='sss' style={{ paddingLeft: 90, paddingRight: 90, position: 'absolute', right: '250px', top: '8%' }}>'  SQUAT  SQUAT  SQUAT  '</p>
                                <p className='bottomN' style={{}}>22</p>
                                <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid' }}></div>
                                <p className='kcal' style={{ position: 'absolute', top : '36%', right: 70 }}>0.234kcal</p>
                                <div style={{ position: 'absolute', paddingLeft: '380px', bottom: '60.5%', right: 70, border: '2px solid' }}></div>
                                <p className='counts'>COUNTS</p>
                                <p className='burned'>Burned</p>
                                <p className='bottomid' style={{}}>USER 12345</p>
                            </div>
                        </Col>
                    </div>
                    <div>
                        <Col className='backgra' span={8} style={{ paddingBottom: "99.2%",  overflow: "hidden", fontWeight: 500 }} >
                            <p className='bottomN' style={{}}>22</p>
                            <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid'  }}></div>
                            <p className='counts'>COUNTS</p>
                            <p className='bottomid' style={{}}>USER 12345</p>
                        </Col>
                    </div>
                    <div>
                        <Col className='backgrb' span={8} style={{ paddingBottom: "99.2%",  overflow: "hidden", fontWeight: 500 }} >
                            <p className='bottomN' style={{}}>22</p>
                            <div style={{ position: 'absolute', paddingRight: '170px', bottom: '60.5%', left: 70, border: '2px solid' }}></div>
                            <p className='counts'>COUNTS</p>
                            <p className='bottomid' style={{}}>USER 12345</p>
                        </Col>
                    </div> */}
                </div>


            </Row>
        </>
    )
}

export default threebattle;