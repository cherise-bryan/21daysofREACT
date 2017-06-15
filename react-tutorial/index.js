import React from 'react';
import ReactDOM from 'react-dom'; // these need to be here or npm start will fail
import './index.css'; // brings in css styles

// WHERE I STOPPED: https://facebook.github.io/react/tutorial/tutorial.html#taking-turns

function Square(props) {
    return (
            /* TODO: find out difference between props.onClick() and props.onClick */
            <button className="square" onClick={props.onClick}>
            {props.value}
            </button>
            );
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        };
    }
    
    renderSquare(i) {
        return(
               <Square
               value={this.state.squares[i]}
               onClick={() => this.handleClick(i)}
               />
        );
    }
    
    handleClick(i) {
        /* TODO: learn about slice() function in js */
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        
        /* TODO: familiarize myself with React.Component */
        
        /* this.setState({squares: squares, xIsNext: false});  <== not correct because it
         does not take into consideration when xIsNext is already false...
         */
        
        // NOTE: setState is inherited from React.Component
        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }
    render() {
        const status = 'Next player: X';
        
        return (
                <div>
                <div className="status">{status}</div>
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

class Game extends React.Component {
    render() {
        return (
                <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
                </div>
                </div>
                );
    }
}

// ========================================
ReactDOM.render(
                <Game />,
                document.getElementById('root')
                );

