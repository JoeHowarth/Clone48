
// actions

export const reducer = ({board, score}, dir) => {
  let rows = arr2row(clone(board), dir);
  let numMoves = 0;
  numMoves += moveTiles(rows);
  score += combineTiles(rows);
  numMoves += moveTiles(rows);
  if (numEmpty(rows) === 0) return -1;
  if (numMoves > 0) rows = placeVal(rows);
  // console.log(numMoves);
  // move tiles left into empty spots
  board = row2arr(rows, dir)
  return {board: board, score: score};
}

export const clone = board => board.map((row) => (
  row.map(tile => Object.assign({}, tile)
)));

export const moveTiles = rows => {
  return (rows.reduce((numMoves, row) => {
    for (let i=0; i<4; i++){
      if (row[i].value ===0) { // if empty
        for (let j=i+1; j<4; j++) {
          if (row[j].value !==0) { // find first non-empty tile
            row[i].value = row[j].value;
            row[j].value = 0;
            numMoves += 1;
            break;
          }
        }
      }
    }
    console.log(numMoves);
    return numMoves;
  }, 0));
}

const combineTiles = rows => rows.reduce((newScore, row) => {
  for (let i=0; i<3; i++) {
    // if non-empty and next cell has same value
    if (row[i].value !==0 && row[i+1].value === row[i].value) {
      row[i].value *= 2;
      row[i+1].value = 0;
      newScore += row[i].value;
      break;
    }
  }
  return newScore;
}, 0);
const numEmpty = board => board.reduce((arr, row) => arr.concat(row)).filter(tile => (
  tile.value === 0
)).length;

function randInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min)) + min;
}

export function placeVal(board) {
  // console.log(numEmpty(board));
  let x,y;
  do {
    [x,y] = randIndex();
    // console.log('indeces: ',x,y);
    // console.log(board[x][y].value, board[x][y].value === 0  )
  } while (board[x][y].value != 0 );
  (Math.random() <= .4) ?  board[x][y].value = 4 : board[x][y].value = 2;
  return board;
}
export function randIndex() {
  return [randInRange(0,4), randInRange(0,4)];
}



const row2arr = (arr, dir) => {
  switch (dir) {
    case 'R':
      return arr2row(arr.map(row => row.reverse()), 'L');
    default:
      return arr2row(arr, dir);
  }
}

export const arr2row = (arr, dir) => {
  switch (dir) {
    case 'U':
      return arr;
    case 'D':
      return arr.map( row => row.reverse());
    case 'L':
      let flipped = [[],[],[],[]];
      for (let y=0; y<4; y++) {
        for (let x=0; x<4; x++){
          flipped[y][x] = arr[x][y];
        }
      }
      return flipped;
    case 'R':
      flipped = [[],[],[],[]];
      for (let y=0; y<4; y++) {
        for (let x=0; x<4; x++){
          flipped[y][x] = arr[x][y];
        }
      }
      return flipped.map( row => row.reverse());
    default:
      // console.log("in default");
      break;
  }
};

// export reducer;
// export arr2row;
