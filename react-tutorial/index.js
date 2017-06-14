import React from 'react';
import ReactDOM from 'react-dom'; // these need to be here or npm start will fail
import './index.css'; // brings in css styles

// WHERE I STOPPED: https://facebook.github.io/react/tutorial/tutorial.html#lifting-state-up

class Square extends React.Component {
    constructor() {
	super();
	this.state = {value: null, }; // value: null gives double slashes...
    }
    // displaying prop value passed by: renderSquare
    // do not put comments within braces of render... 
    render() {
	return (
		<button className="square" onClick={() => this.setState({value: 'X'})}>
		{this.state.value}
		</button>
	 );
    }
}

class Board extends React.Component {
	  renderSquare(i) {
	      return <Square value={i}/>; // passing a "value prop" to square
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

