import React from 'react';
import ReactDOM from 'react-dom'; // these need to be here or npm start will fail
import './index.css'; // brings in css styles

// WHERE I STOPPED: https://facebook.github.io/react/tutorial/tutorial.html#wrapping-up
// TODO: https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html


function Square(props) {
    // backgroundColor is javascript way of referring to background-colour
    return (
           // TODO: find out difference between props.onClick() and props.onClick
            <button className="square" onClick={props.onClick} style={{backgroundColor: props.colour}}>
            {props.value}
            </button>
            );
}

class Board extends React.Component {

    renderSquare(i, light) {
        let colour;
        if (light) {
            colour = "#EE82EE";
        } else {
            colour = "#FFFFFF";
        }
        return(
               <Square
               value={this.props.squares[i]}
               onClick={() => this.props.onClick(i)}
               colour={colour}
               />
        );
    }

    // multiple render's are allowed
    render() {
        let winner = this.props.winner;
        let light = Array(9).fill(false);
        if (winner) {
            for (let i = 0 ; i < 3 ; i ++ ) {
                light[winner[i]] = true;
            }
        }
        const rowClass = "board-row";
        return (
                <div>
                <div className={rowClass}>
                {this.renderSquare(0, light[0])}
                {this.renderSquare(1, light[1])}
                {this.renderSquare(2, light[2])}
                </div>
                <div className={rowClass}>
                {this.renderSquare(3, light[3])}
                {this.renderSquare(4, light[4])}
                {this.renderSquare(5, light[5])}
                </div>
                <div className={rowClass}>
                {this.renderSquare(6, light[6])}
                {this.renderSquare(7, light[7])}
                {this.renderSquare(8, light[8])}

                </div>
                </div>
    
                );
     
    }
}

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
        stepNumber: 0,
        numXs: 0,
        numOs: 0,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({history: history.concat([{squares: squares}]),
                      xIsNext: !this.state.xIsNext,
                      stepNumber: history.length,
                      numXs: this.state.numXs + (this.state.xIsNext ? 1 : 0),
                      numOs: this.state.numOs + (this.state.xIsNext ? 0 : 1),
                      });
        
    }
    jumpTo(step) {
        
        this.setState({
                      stepNumber: step,
                      xIsNext: (step % 2) ? false : true,
                      numOs: Math.floor(step/2),
                      numXs: (step % 2) ? Math.floor(step/2) + 1 : step/2,
                      });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        
        /* TODO: figure out what this JSX code is doing 
         map function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         callback functions:
         1. http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
         2. https://stackoverflow.com/questions/824234/what-is-a-callback-function
         3. https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/Using_js-ctypes/Declaring_and_Using_Callbacks
         */
        /* TODO: chnage colour of li item when it is clicked */
        const moves = history.map((step, move) => {
                                  const now = move ? 'Move #' + move : 'Game start';
                                  return (
                                          <li key={move} onClick={() => this.jumpTo(move)}>
                                          {now}
                                          </li>
                                  )
                                  });
        
        let status;
        if (winner) {
            status = 'Winner is ' + (this.state.xIsNext ? 'O' : 'X');
            return (
                    <div className="game">
                    <div className="game-board">
                    <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winner={winner}
                    />
                    </div>
                    <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    </div>
                    </div>
                    );
        } else if ((this.state.numXs + this.state.numOs) < 9){
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = 'Out of moves! 😣';
        }
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
                        <ol>{moves}</ol>
                    </div>
                </div>
                );
    }
}

ReactDOM.render(
                <Game />,
                document.getElementById('root')
                );

function calculateWinner(squares) {
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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}

/* TODO: challenges at the bottom of the react tutorial */
/* challenge 1: light up squares of winner! */
/* TODO: walk through this, https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript */

