import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Col, Row } from 'react-bootstrap';
import './main.css';
import group3 from './group-3.png'
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import TwoBattle from './twobattle/twobattle';

export class choose extends Component{
    render(){
        return(
                <Container className="justify-content-between">
                        <Row>
                            <Col></Col>
                        <Link to="/"><Row id="Rectangle" style={{display:'flex',
                    justifyContent:'center', alignItems:'center'}}>
                            PUMP OR DEATH - THE DEATH OF COMPETITION
                        </Row>
                        </Link>
                        <Col></Col>
                        </Row>
                        <Row>
                        <Col></Col>
                        <Link to="/twobattle/twobattle">
                        <Row id="Rectangle2" style={{display:'flex',
                    justifyContent:'center', alignItems:'center'}}> 
                            SINGLE PLAY
                        </Row>
                        </Link>
                        <Col></Col>
                        </Row>
                        <Row>
                        <Col></Col>
                        <Link to="/">
                        <Row id="Rectangle3" style={{display:'flex',
                    justifyContent:'center', alignItems:'center'}}>
                            BATTLE PLAY
                        </Row>
                        </Link>
                        <Col></Col>
                        </Row>
                        <Row>
                        <Col></Col>
                        <Link to="/">
                        <Row id="Rectangle4" style={{display:'flex',
                    justifyContent:'center', alignItems:'center'}}>
                            CHALLENGE PLAY
                        </Row>
                        </Link>
                        <Col></Col>
                        </Row>
                        <Row style={{display:'flex',
                    justifyContent:'center', alignItems:'center',
                    marginTop:'5%'}}>
                        <img src={group3}></img></Row>
                        
                    </Container>
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

                    </Switch>
                </Router>
            </div>
        );
    }
}
export default Main;