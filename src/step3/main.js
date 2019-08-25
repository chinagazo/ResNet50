import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Col, Row } from 'react-bootstrap';
import './main.css';
import group3 from './group-3.png'
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import TwoBattle from './twobattle/twobattle';
import ThreeBattle from './threebattle/threebattle';

export class choose extends Component{
    render(){
        return(
                <div id="backgroundDiv">
                        <Row className="justify-content-between">
                                <Col xs lg="1"></Col>
                                <Col><Link to="/">
                                <div id="Rectangle" style={{display: 'flex', 
                            justifyContent: 'center', alignItems: 'center'}}>
                                PUMP OR DEATH - THE DEATH OF COMPETITION
                                </div> 
                                </Link>
                                </Col>
                                
                                <Col xs lg="1"></Col>
                        </Row>
                        <Row className="justify-content-between">
                                <Col xs lg="1"></Col>
                                <Col > <Link to="/twobattle/twobattle">
                            <div id="Rectangle2" style={{display: 'flex', 
                            justifyContent: 'center', alignItems: 'center'}}>
                                SINGLE PLAY
                                </div> 
                                </Link>
                                </Col>
                                
                                <Col xs lg="1"></Col>
                        </Row>
                        <Row className="justify-content-between">
                                <Col xs lg="1"></Col>
                                <Col ><Link to="/threebattle/threebattle">
                            <div id="Rectangle3" style={{display: 'flex', 
                            justifyContent: 'center', alignItems: 'center'}}>
                                BATTLE PLAY
                                </div> 
                                </Link>
                                </Col>
                                <Col xs lg="1"></Col>
                        </Row>
                        <Row className="justify-content-between">
                                <Col xs lg="1"></Col>
                                <Col ><Link to="/">
                            <div id="Rectangle4" style={{display: 'flex', 
                            justifyContent: 'center', alignItems: 'center'}}>
                                CHALLENGE PLAY
                                </div>
                                </Link> 
                                </Col>
                                
                                <Col xs lg="1"></Col>
                        </Row>    
                         
                        <Row id="button1" style={{display:'flex',
                    justifyContent:'center', alignItems:'center',
                    marginTop:'5%'}}>
                        <img src={group3}></img></Row>
                        
                    </div>
        );
    }
}


class Main extends Component{
    render(){
        return(
            <div id="bodyPalette">
                <Router>
                    <Switch>
                        <Route exact path="/step3/Main" component={choose} />
                        <Route path="/twobattle/twobattle" component={TwoBattle} />
                        <Route path="/threebattle/threebattle" component={ThreeBattle} />
                        
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default Main;