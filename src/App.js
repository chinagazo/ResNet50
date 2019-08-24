import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import React, {Component} from 'react'

// import { fire, getFireDB } from './Firebase';

// 

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

 
  render(){
    // const { memo } = this.state;
    return (
      <>
        <Navbar bg="light" variant="light" className="justify-content-between">
          <Navbar.Brand href="#home">PUMPETITION</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="#about">ABOUT</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Navbar.Collapse>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
        </Navbar>
          {/* {memo.p2}  */}
        
      </>  
        
    );
  }
}