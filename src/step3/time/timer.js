import React, { Component } from "react";
import './timer.css';

class timer extends Component {

    constructor(props){
      super(props);
      this.tick = this.tick.bind(this);
      this.state = {seconds: 60}
    }
  
    componentDidMount(){
      this.timer = setInterval(this.tick, 1000);
    }
  
    tick(){
      if (this.state.seconds > 0) {
        this.setState({seconds: this.state.seconds - 1})
      } else {
        clearInterval(this.timer);
        // window.location.reload();
      }
    }
    render(){
        if(this.state.seconds==0){
            // return <Battle />;
        }
        else{
            return <div style={{width: "100%", textAlign: "center" }}>
                <h1  class="s">{this.state.seconds}s</h1>
            </div>
        }
    }
  }
  
export default timer;