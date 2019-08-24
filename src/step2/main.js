import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Col, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import './main.css';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';


export default class Main extends Component{

  render(){
    // const { memo } = this.state;
    return (
      
                <div id="background">
                    
                    {/* {memo.p2}  */}
                        {/* <Route path="/About" component={About}/> */}
                        {/* <Route path="/step1/Main" component={Main} /> */}
                    <Col id="health" style={{color: "#ff274b", height: "16px",border: "solid 1px #979797", backgroundColor: "#ff274b"}}></Col>
                    <Row className="justify-content-between">
                                <Col xs id="start" lg="4">0s<br /><br /><div id="word">Duration</div></Col>
                                <Col id="time" style={{display: 'flex', 
justifyContent: 'center', alignItems: 'center'}} className="justify-content-md-center text-center">
                                        00:00s
                                </Col>
                                <Col className="justify-content-md-end text-right" id="end">60s</Col>       
                    </Row>
                    <Row className="justify-content-between">
                        <Col xs lg="2"></Col>
                        <Col id="Rectangle1" className="justify-content-md-center text-center" style={{display: 'flex', 
justifyContent: 'center', alignItems: 'center'}}>
                            KEEP IT WORK!
                        </Col>
                        <Col xs lg="2"></Col>
                    </Row>
                    <br/>
                    <Row className="justify-content-between">
                        <Col id="whiteRec"className="justify-content-md-center text-center"> 
                        </Col>
                        <Col  className="justify-content-md-center text-center" ></Col>
                    <Col id="whiteRec2"></Col>
                    </Row>
                    

                </div>
                
       
        
    );
  }
}
