import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    let now  = new Date();
    let formattedString = this.formatTime(now);

    this.state = {
      formattedTime: formattedString
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    if(this.timerID) {
      clearInterval(this.timerID);
    }
  }

  tick() {
    let now  = new Date();
    let formattedString = this.formatTime(now);

    this.setState({
      formattedTime: formattedString
    });
  }

  formatTime(time) {
    const is24HourTime = this.props.time_24Hour;
    let formattedString = '';
    if (is24HourTime) {
      formattedString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    } else {
      formattedString = time.toLocaleTimeString();
    }
    return formattedString;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>It is {this.state.formattedTime}.</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
