import React from 'react';
import ReactDOM from 'react-dom'; // these need to be here or npm start will fail
import './index.css'; // brings in css styles

// WHERE I STOPPED: https://facebook.github.io/react/tutorial/tutorial.html#showing-the-moves
// TODO: https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html

function Square(props) {
    return (
            /* TODO: find out difference between props.onClick() and props.onClick */
            <button className="square" onClick={props.onClick}>
            {props.value}
            </button>
            );
}

class Board extends React.Component {

    renderSquare(i) {
        return(
               <Square
               value={this.props.squares[i]}
               onClick={() => this.props.onClick(i)}
               />
        );
    }

    // multiple render's are allowed
    render() {
        return (
                <div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
                </div>
                );
     
    }
}

// moved state up from Board -> Game to keep track of the history of the state of the Board
class Game extends React.Component {
    // constructor is needed to save states
    // only one constructor is allowed
    constructor() {
        super();
        this.state = {
        history: [{
                  squares: Array(9).fill(null),
                  }],
        xIsNext: true,
        gameOver: false,
        numXs: 0,
        numOs: 0,
        };
    }
    handleClick(i) {
        /* TODO: learn about slice() function in js */
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        let validMove = false;
        
        if (!squares[i] && !this.state.gameOver) {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            validMove = true;
        }
        /* TODO: familiarize myself with React.Component */
        
        /* this.setState({squares: squares, xIsNext: false});  <== not correct because it
         does not take into consideration when xIsNext is already false...
         */
        
        // NOTE: setState is inherited from React.Component
        if (validMove) {
            this.setState({history: history.concat([{squares: squares}]),
                          xIsNext: !this.state.xIsNext,
                          numXs: this.state.numXs + (this.state.xIsNext ? 0 : 1),
                          numOs: this.state.numOs + (this.state.xIsNext ? 1 : 0),
                          gameOver: this.state.gameOver,
                          });
        }
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares,
                                       this.state.numOs,
                                       this.state.numXs); // const cannot be updated
        
        let status; // let can be updated (both block scope rather than function scope)
        if (winner) {
            status = 'Winner is ' + winner;
            this.setState({history: history,
                          xIsNext: this.state.xIsNext,
                          numXs: this.state.numXs,
                          numOs: this.state.numOs,
                          gameOver: true,
                          });
        } else if ((this.state.numXs + this.state.numOs) < 9){
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = 'Out of moves! 😣';
        }
        // just <div>status</status> displays the literal text status
        return (
                <div className="game">
                <div className="game-board">
                <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{/* TODO */}</ol>
                </div>
                </div>
                );
    }
}

ReactDOM.render(
                <Game />,
                document.getElementById('root')
                );

function calculateWinner(squares, numOs, numXs) {
    const lines = [
                   [0, 1, 2],
                   [3, 4, 5],
                   [6, 7, 8],
                   [0, 3, 6],
                   [1, 4, 7],
                   [2, 5, 8],
                   [0, 4, 8],
                   [2, 4, 6],
                   ];
    if ((numOs >= 3) || (numXs >= 3)) {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
    }
    return null;
}

