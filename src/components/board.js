import React, { Component } from 'react';
import '../styles/board.css';
import '../styles/tilebackground.css';


export default class Board extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     board: props.boardState,
  //   };
  // }


  render() {
    const boardState = this.props.boardState;
    let tiles = boardState.map((row, y) => row.map(({x,y,empty,value}, s) => {
      return <Tile key={x+"_"+y} value={value} pos={[x,y]}/>
    }));

    return (
      <div className="board">
        {tiles}
        {/* <Tile value={12} pos={[1,2]}/> */}
      </div>
    );
  }
}


const Tile = ({value, pos:[x, y]}) => {
  const gridString = "a"  + (x+1) + (y+1);
  const style = {
    gridArea: gridString,
  };
  return (
    <div  className={"tile v" + value} style={style}> <p>{value}</p> </div>
  );
};
//
