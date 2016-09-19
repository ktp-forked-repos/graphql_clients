import React from 'react';
import Filter from './Filter';
import Results from './Results';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }
  search = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  render() {
    return (
      <div>
        <Filter search={this.search}/>
        <Results name={this.state.name}/>
      </div>
    );
  }
}