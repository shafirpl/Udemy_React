import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

/*
* So basically we have two 2d array/matrix
* in one we are keeping track of boolean values
* the other one is for actually rendering/displaying the 
* board. 
* The function createBoard() creates the boolean matrix
* whereas later down the path we use the values from boolean
* matrix to populate the board. Every cell has a property 
* called isLit and a true or false value means its either 
* lit or off
*/

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    /*
    * So we are first in the outer loop creating a 
    * row. Then based on chance value we are creating 
    * true or false value and pushing it to the row
    * At the end, we are pushing the row to the board
    */
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let y = 0; y < this.props.nrows ; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        //so that statement will create a true or false value
        // so we are pushing a boolean true or false value 
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);

    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("Flipping", coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      // so basically it flips the value, sets true to false
      // and vice versa
      //the checking is just to make sure the coord is 
      // on the board
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    //flip initial cell
    flipCell(y,x); 
    // flip left
    flipCell(y, x-1);
    // flip right
    flipCell(y, x+1);
    // flip bottom
    flipCell(y-1, x);
    // flip top
    flipCell(y+1, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won

    /*
    * So in general, whenever we deal with 2d or 3d array, we try to imagine the entire array as 1d array.
    * So if we imagine the board as an 1d array, then it would consist only of rows. And in reality,
    * It is like that: so it will look something like
    * table[
    * row: cell cell
    * row: bunch of cells
    * ...]
    * So when we are doing every on the board, we are taking every row, and then every row 
    * has bunch of cells, and then we are checking if it is true or false.
    * Now in order for hasWon to be true, all the cells should be false, the opposite of that
    * is true, so all the cells are false, which by negation returns true, which in turn 
    * makes the hasWon value to be true
    */
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board:board, hasWon:hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    if(this.state.hasWon) {
      return (       
         <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>

        </div>
        )
    }
    let tblBoard = [];
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        /*
        * Now for key, we would like to give row-col value
        * so for example the first cell at first col would
        * have a key 0-0. So we are string interpolating it
        * like this
        */
        let coord = `${y}-${x}`
        row.push(<Cell 
          //this is a bad practice
          flipCellsAroundMe = {() => this.flipCellsAround(coord)}
          isLit = {this.state.board[y][x]}
          key={coord}/>);
      }
      tblBoard.push(<tr key = {y}>{row}</tr>);
    }
    return(
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>

    );
  }
}


export default Board;
