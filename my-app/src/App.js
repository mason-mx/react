import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const support24Hour = this.props.support24Hour;
    let formattedString = '12-Hour Time';
    if (support24Hour) {
      formattedString = '24-Hour Time';
    }

    this.state = {
      formattedTime: formattedString,
      isToggleOn: true
    };

    if (support24Hour) {
      this.handleClick = this.handleClick.bind(this);
    }    
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

    this.setState(state => ({
      formattedTime: formattedString
    }));
  }

  formatTime(time) {
    const support24Hour = this.props.support24Hour;
    let formattedString = '';
    if (support24Hour) {
      if(this.state.isToggleOn) {
        formattedString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
      } else {
        formattedString = time.toLocaleTimeString();
      }
    } else {
      formattedString = time.toLocaleTimeString();
    }
    return formattedString;
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    const support24Hour = this.props.support24Hour;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
          {support24Hour ? (
            <button onClick={this.handleClick}>
              {this.state.formattedTime}
            </button>
          ) : (
            <h2>{this.state.formattedTime}</h2>
          )
          }
          </div>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
