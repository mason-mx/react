import React, { Component } from 'react';
import BladeTable from './Blade';
import {getData} from './Fetch'

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
      isLoaded: props.isLoaded,
      chassisMode: "SINGLE",
      blades: props.blades
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleshowHiddenChange = this.handleshowHiddenChange.bind(this);
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
    // postData('https://jsonplaceholder.typicode.com/posts', {
    //   title: 'foo',
    //   body: 'bar',
    //   userId: 1
    // });
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
