import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Col, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import Main from './step1/main';
import round from './round.png';
// import { fire, getFireDB } from './Firebase';

// 

// function ButtonStart(){
//   return <Button>Start</Button>;
// }

export default class App extends Component{

  // constructor(){
  //   super();
  //   this.state = {
  //     memo: []
  //   };
  //   fire();
  // }

  // componentDidMount() {
  //   getFireDB()
  //     .then(res => {
  //       this.setState({
  //         memo : res.val().battle
  //       })
  //     });
  // }
  componentDidMount(){
    var canvas = document.getElementById('balls');
    console.log(canvas);
    var width = canvas.width = 1800;
    var height = canvas.height = 1000;
    
    function random(min,max){
      return Math.floor(Math.random() * (max - min + 1))+min;
    }
    
    if(canvas.getContext){
      var theSurface = canvas.getContext('2d');
      
      function Ball(x,y,color,velX,velY,size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
       this.color = color;
        this.size = size;
        this.draw = function(){
          theSurface.beginPath();
          theSurface.arc(this.x,this.y,50,12,Math.PI*2,true);
          theSurface.fillStyle = this.color;
          theSurface.fill();
        }
        this.update = function(){
          if((this.x + this.size) >= width ){
             this.velX = -(this.velX);
             }
          
          if((this.x - this.size) <= 0 ){
             this.velX = -(this.velX);
             }
          
          if((this.y + this.size) >= height ){
             this.velY = -(this.velY);
             }
          if((this.y - this.size) <= 0 ){
             this.velY = -(this.velY);
             }
          
          this.x += this.velX;
          this.y += this.velY;
          // theSurface.bezierCurveTo();
        }
        
        
      }
      var balls = [];
      
      function loop(){
        theSurface.fillStyle = 'rgba(255, 255, 255, 0.02)';
        theSurface.fillRect(0,0,width,height);
        
        while(balls.length < 20){
        var myBall = new Ball(random(0,width),random(0,height),'rgb('+/*random(0,255)*/0+','+/*random(0,255)*/0+','+/*random(0,255)*/0+')',random(-7,7),random(-7,7),random(10,20));
        balls.push(myBall);
      }
        
        for(var j = 0; j < balls.length;j++){
          balls[j].draw();
          balls[j].update();
        }
        
        requestAnimationFrame(loop); 
        
      }
      loop();
      
    }
  }

  render(){
    // const { memo } = this.state;
    return (
      <>
        <Router>
        <Navbar bg="light" variant="light" className="justify-content-between">
          <Navbar.Brand href="#home" className="FontExtra">PUMPETITION</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end FontExtra">
            <Nav.Link href="#about" style={{color:'black'}}>ABOUT</Nav.Link>
            <Link to="/step1/Main" id="Ready" style={{display: 'flex', 
  justifyContent: 'center', alignItems: 'center'}}>Ready?</Link>

            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Navbar.Collapse>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
        </Navbar>
          {/* {memo.p2}  */}
          <canvas id="balls"></canvas>
          <Container className="justify-content-between">
              <Row xs lg="2"></Row>
              <Row className="justify-content-md-center text-center">
                  <div id="Rectangle">
                  PUMP OR DEATH - THE DEATH OF COMPETITION
                  </div>
                  
              </Row>
              <Row className="justify-content-md-end"><img src={round}
               srcset="round@2x.png 2x,
                round@3x.png 3x"
              class="round"></img></Row>
          </Container>
          <Container className="justify-content-between">
              <Row xs lg="2"></Row>
              <Row className="justify-content-md-center text-center">
                  <div id="track">
                  We track your poses.<br />
                  Inspire yourself while working out with people.
                  </div>
                  
              </Row>
              <Row className="justify-content-md-end"></Row>
          </Container>

          <Container className="justify-content-between">
              <Row xs lg="2"></Row>
              <Row className="justify-content-md-center text-center">
                  <div id="box" style={{display: 'flex', 
  justifyContent: 'center', alignItems: 'center'}}>
                      WHATTT
                  </div>
                  
              </Row>
              <Row className="justify-content-md-end"></Row>
          </Container>

          <Route exact path="/step1/Main" component={Main} />
          </Router>
      </>  
        
    );
  }
}