import React from 'react';
import '../styles/controls.css';

export default class Controls extends React.Component {

  render() {
    return (
      <div className="controls-list">
        <button onClick={this.props.reset} className="controls reset" >Reset</button>
        <button className="controls left" > &#8592;</button>
        <button className="controls right"> &#8594;</button>
        <button className="controls up"   > &#8593;</button>
        <button className="controls down" > &#8595;</button>
      </div>
    );
  }
}
