import React, { Component } from 'react';
import BladeTable from './Blade';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleshowHiddenChange = this.handleshowHiddenChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleshowHiddenChange(e) {
    this.props.onshowHiddenChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.showHidden}
            onChange={this.handleshowHiddenChange}
          />
          {' '}
          Show empty slot
        </p>
      </form>
    );
  }
}

class Chassis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      showEmptySlot: false,
      error: null,
      isLoaded: false,
      chassisMode: "SINGLE",
      blades: []
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleshowHiddenChange = this.handleshowHiddenChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:2222")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blades: result.chassis[0].blades,
            chassisMode: result.chassis_mode
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleshowHiddenChange(showEmptySlot) {
    this.setState({
      showEmptySlot: showEmptySlot
    })
  }

  render() {
    const { error, isLoaded, blades } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            showEmptySlot={this.state.showEmptySlot}
            onFilterTextChange={this.handleFilterTextChange}
            onshowHiddenChange={this.handleshowHiddenChange}
          />
          <BladeTable
            blades={blades}
            filterText={this.state.filterText}
            showEmptySlot={this.state.showEmptySlot}
          />
        </div>
      );
    }
  }
}

export default Chassis;
