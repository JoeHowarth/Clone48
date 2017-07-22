import React, { Component } from 'react';
import './styles/App.css';
import Board from './components/board.js';
import Controls from './components/controls.js'
import { reducer, placeVal} from './reducer'



class App extends Component {
  constructor(props) {
    super(props);

    const board = this.makeBoard();

    this.state = {
      board: board,
      gameOver: false,
      score: 0,
    }
    this.handleKey = this.handleKey.bind(this);
    this.reset = this.reset.bind(this);
    window.addEventListener('keydown', this.handleKey);
  }

  makeBoard() {
    let board = [[],[],[],[]];
    for (var x = 0; x < 4; x++){
      for (var y = 0; y < 4; y++){
        board[x][y] = {
          x: x,
          y: y,
          value: 0,
        };
      }
    }
    placeVal(board);
    return board;
  }

  handleKey(e) {
    // console.log(e.key,);
    let dir;
    switch (e.key) {
      default: return;
      case 'ArrowUp': dir = 'U'; break;
      case 'ArrowDown': dir = 'D'; break;
      case 'ArrowLeft': dir = 'L'; break;
      case 'ArrowRight': dir = 'R'; break;
    }
    console.log(dir);
    this.move(dir);
  }

  move(dir) {
    const newState = reducer(this.state, dir);
    if (newState === -1) {
      this.setState({gameOver: true})
      return;
    }
    this.setState(newState); // update board and score
  }

  reset() {
    let board = this.makeBoard();
    this.setState({board: board, gameOver: false})
  }

  render() {
    const {gameOver, board, score} = this.state;
    return (
      <div  className='App' >
        <Board boardState={board}/>
        <Title
          title="Clone 48"
          subtitle={"Game Over"}
          visibility={gameOver}
          score={score}
        />
        <Controls reset={this.reset}/>
      </div>
    );
  }
}



const Title = ({title, subtitle, visibility, score}) => {
  return (
    <div className="title-container">
      <h1 className="Title">{title}</h1>
      <h2 className='subtitle'>Score: {score} <span className={visibility}>   {subtitle}</span></h2>
    </div>
  )
};

export default App;
