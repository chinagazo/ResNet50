import { Row, Col } from 'antd';

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
                                <p className='s' style={{ left: 230, top: 30 }}>22:00s</p>
                                <p className='sss' style={{ paddingLeft: 90, paddingRight: 90, position: 'absolute', right: '170px', top: '180px' }}>'  SQUAT  SQUAT  SQUAT  '</p>
                                <p className='bottomN' style={{}}>22</p>
                                <div style={{ position: 'absolute', paddingRight: '190px', bottom: '200px', left: 70, border: '2px solid #ffffff' }}></div>
                                <p className='kcal' style={{ position: 'absolute', bottom: '165px', right: 70, color: '#ffffff' }}>0.234kcal</p>
                                <div style={{ position: 'absolute', paddingLeft: '380px', bottom: '200px', right: 70, border: '2px solid #ffffff' }}></div>
                                <p className='counts'>COUNTS</p>
                                <p className='bottomid' style={{}}>USER 12345</p>
                            </div>
                        </Col>
                    </div>
                    <div>
                        <Col span={12} style={{ paddingBottom: "99.2%", backgroundColor: "#000000", overflow: "hidden", fontWeight: 500 }} >
                            <p className='bottomN' style={{}}>22</p>
                            <div style={{ position: 'absolute', paddingRight: '190px', bottom: '200px', left: 70, border: '2px solid #ffffff' }}></div>
                            <p className='counts'>COUNTS</p>
                            <p className='bottomid' style={{}}>USER 12345</p>
                        </Col>
                    </div>
                </div>

                <style jsx>
                    {`
                                    .s {
                                        position:absolute;
                                        font-family: Anteb;
                                        font-size: 100px;
                                        font-weight: 500;
                    
                                        font-stretch: normal;
                                     
                                        letter-spacing: 4.11px;
                                        color: #ea0707;
                                    }

                                    .sss{
                                        
                                        font-family: OCRAStd;
                                        font-size: 22px;
                                        font-weight: normal;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: normal;
                                        letter-spacing: normal;
                                        color: #00ffc4;
                                        background-color: #3f3f3f;
                                        padding : 30px;
                                    }

                                    .bottomN{
                                         position:absolute;
                                        font-family: Anteb;
                                        font-size: 180px;
                                        font-weight: 500;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: normal;
                                        color: #ffffff;
                                        bottom : 1px;
                                        left : 70px;
                                    }

                                    .kcal {
                                        
                                        font-family: Anteb;
                                        font-size: 45px;
                                        font-weight: 500;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: normal;
                                        letter-spacing: 6.28px;
                                        color: #ffffff;
                                      }

                                      .bottomid{
                                        position:absolute;
                                        
                                        font-family: Anteb;
                                        font-size: 35px;
                                        font-weight: 500;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: normal;
                                        letter-spacing: 4.88px;
                                        color: #ffffff;
                                       bottom : 70px;
                                       left : 70px;
                                   }

                                   .counts{
                                    position:absolute;
                                    bottom : 160px;
                                     left : 70px;
                                    font-family: Anteb;
                                    font-size: 14px;
                                    font-weight: 300;
                                    font-style: normal;
                                    font-stretch: normal;
                                    line-height: normal;
                                    letter-spacing: 1.95px;
                                    color: #ffffff;
                                   }

                                    `}
                </style>

            </Row>
        </>
    )
}

export default twobattle;
