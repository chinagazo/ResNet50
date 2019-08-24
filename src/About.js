import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Col, Row } from 'react-bootstrap';
import './About.css';

class About extends Component{
    render(){
        return(
            <div>
            <Container className="justify-content-between">
                <Row xs lg="2"></Row>
                <Row className="justify-content-md-center text-center">
                    <div class="WHAT-WE-DO">
                        what we do 
                    </div>
                </Row>
                <Row className="justify-content-md-end"></Row>
            </Container>
            <Container className="justify-content-between">
                <Row xs lg="2"></Row>
                <Row className="justify-content-md-center text-center">
                    <div class="We-connect-to-people">
                    We connect to people who want to fight a match to help people to get inspired <br />
workout more often. Through pose estimation technology, <br />
we track your bone <br />
structure and count your movements. <br /> 
                    </div>
                </Row>
                <Row className="justify-content-md-end"></Row>
            </Container>
            </div>
        );
    }
}
export default About;