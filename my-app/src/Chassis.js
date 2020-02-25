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
          Show hidden blade
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
      showHidden: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleshowHiddenChange = this.handleshowHiddenChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleshowHiddenChange(showHidden) {
    this.setState({
      showHidden: showHidden
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          showHidden={this.state.showHidden}
          onFilterTextChange={this.handleFilterTextChange}
          onshowHiddenChange={this.handleshowHiddenChange}
        />
        <BladeTable
          blades={this.props.blades}
          filterText={this.state.filterText}
          showHidden={this.state.showHidden}
        />
      </div>
    );
  }
}

export default Chassis;
