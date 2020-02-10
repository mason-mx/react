import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      support24Hour: this.props.support24Hour,
      formattedTime: ""
    };

    this.handleChange = this.handleChange.bind(this);
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
    const support24Hour = this.state.support24Hour;
    let formattedString = '';
    if (support24Hour) {
      formattedString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    } else {
      formattedString = time.toLocaleTimeString();
    }
    return formattedString;
  }

  handleChange(event) {
    this.setState({support24Hour: !this.state.support24Hour});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div style={this.state.background}>
            <h2 className={this.state.class}>{this.state.formattedTime}</h2>
          </div>
        </div>
        <label className="form-switch">
          24-Hour Time:
          <input type="checkbox"
            checked={this.state.support24Hour}
            onChange={this.handleChange}
          />
          <i></i>
        </label>
      </div>
    );
  }
}

export default App;
