import React, { Component } from 'react';

class BladeCategoryRow extends Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class BladeRow extends Component {
  render() {
    const blade = this.props.blade;
    const name = blade.present ?
      blade.name :
      <span style={{color: 'red'}}>
        {blade.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{blade.modelNum}</td>
      </tr>
    );
  }
}

class BladeTable extends Component {
  render() {
    const filterText = this.props.filterText;
    const showHidden = this.props.showHidden;

    const rows = [];
    let lastCategory = null;

    this.props.blades.forEach((blade) => {
      if (blade.name.indexOf(filterText) === -1) {
        return;
      }
      if (!showHidden && !blade.present) {
        return;
      }
      if (blade.category !== lastCategory) {
        rows.push(
          <BladeCategoryRow
            category={blade.category}
            key={blade.category} />
        );
      }
      rows.push(
        <BladeRow
          blade={blade}
          key={blade.name}
        />
      );
      lastCategory = blade.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Model Number</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

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
