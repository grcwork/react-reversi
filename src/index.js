import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import { board1 } from './testCases';

class Square extends React.Component {
    render() {
        if (this.props.board[this.props.index] === 'W') {
            return (
                <button className="square" onClick={this.props.onClick}>
                    <svg width="40" height="40">
                        <circle cx="20" cy="20" r="15" fill="white" />
                    </svg>
                </button>
            );
        } else if (this.props.board[this.props.index] === 'B') {
            return (
                <button className="square" onClick={this.props.onClick}>
                    <svg width="40" height="40">
                        <circle cx="20" cy="20" r="15" fill="black" />
                    </svg>
                </button>
            );
        } else if (this.props.validMovesIndices.includes(this.props.index)) {
            return (
                <button className="square" onClick={this.props.onClick}>
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r="8" fill="#ee6941" />
                    </svg>
                </button>
            );
        } else {
            return (
                <button className="square" onClick={this.props.onClick}>

                </button>
            );
        }

    }
}

class Board extends React.Component {
    renderSquare(i, j) {
        return <Square
            validMovesIndices={this.props.validMovesIndices}
            onClick={() => this.props.onClick(j, i)}
            board={this.props.board}
            index={8 * i + j}
            key={8 * i + j}
        />;
    }

    createBoard = () => {
        let board = [];

        for (let i = 0; i < 8; i++) {
            let children = [];
            for (let j = 0; j < 8; j++) {
                children.push(this.renderSquare(i, j));
            }
            board.push(<div className="board-row" key={i}>{children}</div>);
        }
        return board;
    }

    render() {
        return (
            <div className="board">
                {this.createBoard()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                board: createStartBoard(),
                turn: 'B',
                blackScore: 2,
                whiteScore: 2,
                winner: null,
                tie: null,
                gameOver: false,
            }],
            singlePlayer: false,
            playerColor: null, //Relevant only if we are in single player mode
            machineColor: null, // Relevant only if we are in single player mode 
        }
    }

    componentDidUpdate() {
        if (this.state.singlePlayer && this.state.history[this.state.history.length - 1].turn === this.state.machineColor) {
            setTimeout(() => {
                this.machineMove();
            }, 1000);
        }
    }

    machineMove() {
        if (this.state.history[this.state.history.length - 1].turn === this.state.machineColor && this.state.history[this.state.history.length - 1].winner === null && this.state.history[this.state.history.length - 1].tie === null) {
            let validMovesList = validMoves(this.state.history[this.state.history.length - 1].board, this.state.history[this.state.history.length - 1].turn);
            let move = validMovesList[Math.floor(Math.random() * validMovesList.length)];
            this.handleClick(move[0], move[1], true);
        }
    }

    singlePlayerMode() {
        this.setState({
            history: [{
                board: createStartBoard(),
                turn: 'B',
                blackScore: 2,
                whiteScore: 2,
                winner: null,
                tie: null,
                gameOver: false,
            }],
            singlePlayer: true,
            playerColor: 'B',
            machineColor: 'W'
        });
        document.getElementById("one-player").disabled = true;
        document.getElementById("two-players").disabled = false;
        document.getElementById("two-players").addEventListener('click', () => {
            this.twoPlayerMode();
        });
    }

    twoPlayerMode() {
        this.setState({
            history: [{
                board: createStartBoard(),
                turn: 'B',
                blackScore: 2,
                whiteScore: 2,
                winner: null,
                tie: null,
                gameOver: false,
            }],
            singlePlayer: false,
            playerColor: null,
            machineColor: null
        });
        document.getElementById("one-player").disabled = false;
        document.getElementById("two-players").disabled = true;
    }

    restart() {
        if (this.state.singlePlayer) {
            this.singlePlayerMode();
        } else {
            this.twoPlayerMode();
        }
    }

    handleClick(x, y, machineMove=false) {
        if (!machineMove && this.state.history[this.state.history.length - 1].turn === this.state.machineColor) {
            return;
        } 

        let board = this.state.history[this.state.history.length - 1].board.slice();

        if (isValidMove(board, this.state.history[this.state.history.length - 1].turn, [x, y])) {
            makeMove(board, this.state.history[this.state.history.length - 1].turn, [x, y]);

            let opponent = this.state.history[this.state.history.length - 1].turn === 'B' ? 'W' : 'B';
            let newTurn = this.state.history[this.state.history.length - 1].turn;
            //If the opponent has no available moves, the turn remains with the current player
            if (validMoves(board, opponent).length > 0) {
                newTurn = opponent;
            }

            let blackScore = countScore(board, 'B');
            let whiteScore = countScore(board, 'W');

            let winner = null;
            let tie = null;
            let gameOver = false;
            if (validMoves(board, opponent).length === 0 && validMoves(board, this.state.history[this.state.history.length - 1].turn).length === 0) {
                gameOver = true;
                if (countScore(board, this.state.history[this.state.history.length - 1].turn) === countScore(board, opponent)) {
                    tie = true;
                    winner = null;
                } else {
                    tie = false;
                    winner = countScore(board, this.state.history[this.state.history.length - 1].turn) > countScore(board, opponent) ? this.state.history[this.state.history.length - 1].turn : opponent;
                }
            }

            this.setState({ history: this.state.history.concat({ board: board, turn: newTurn, blackScore: blackScore, whiteScore: whiteScore, winner: winner, tie: tie, gameOver: gameOver }) });
        }
    }

    moveBack() {
        if (this.state.history.length > 1 && !this.state.singlePlayer) {
            this.setState({ history: this.state.history.slice(0, this.state.history.length - 1) })
        } else if (this.state.history.length > 1 && this.state.singlePlayer) {
            if (!this.state.history[this.state.history.length - 1].gameOver && this.state.history[this.state.history.length - 1].turn === this.state.playerColor) {
                let i;
                let j = 0;
                for (i = this.state.history.length - 1; i >= 0; i--) {
                    if (j === 2) {
                        break;
                    } else if (this.state.history[i].turn === this.state.playerColor) {
                        j++;
                    }
                }
                i++;
                this.setState({ history: this.state.history.slice(0, i + 1) });
            } else if (this.state.history[this.state.history.length - 1].gameOver) {
                let i;
                let j = 0;
                for (i = this.state.history.length - 2; i >= 0; i--) {
                    if (j === 1) {
                        break;
                    } else if (this.state.history[i].turn === this.state.playerColor) {
                        j++;
                    }
                }
                i++;
                this.setState({ history: this.state.history.slice(0, i + 1) });
            }

        }
    }

    render() {
        let turnColor = this.state.history[this.state.history.length - 1].turn === 'B' ? 'black' : 'white';
        let winnerText = "No winner yet"
        if (this.state.history[this.state.history.length - 1].winner !== null) {
            winnerText = this.state.history[this.state.history.length - 1].winner === 'B' ? "Black wins" : "White wins";
        } else if (this.state.history[this.state.history.length - 1].tie === true) {
            winnerText = "Tie In Game"
        }

        return (
            <div>
                <p id="status">Turn
                <svg width="40" height="40">
                        <circle cx="20" cy="20" r="15" fill={turnColor} />
                    </svg>
                </p>
                <p id="winner-status">{winnerText}</p>
                <Board
                    board={this.state.history[this.state.history.length - 1].board}
                    onClick={(x, y) => this.handleClick(x, y)}
                    validMovesIndices={validMoves(this.state.history[this.state.history.length - 1].board, this.state.history[this.state.history.length - 1].turn).map(([x, y]) => { return (8 * y + x); })}
                />
                <div className="select-mode">
                    <button id="one-player" onClick={this.singlePlayerMode.bind(this)}>
                        Single Player
                    </button>
                    <button id="two-players" disabled>
                        Two Players
                    </button>
                    <button id="restart" onClick={this.restart.bind(this)}>
                        Restart
                    </button>
                </div>
                <div className="scores">
                    <div className="black-score">
                        <svg width="40" height="40">
                            <circle cx="20" cy="20" r="15" fill="black" />
                        </svg>
                        <p>{this.state.history[this.state.history.length - 1].blackScore}</p>
                    </div>
                    <div className="white-score">
                        <svg width="40" height="40">
                            <circle cx="20" cy="20" r="15" fill="white" />
                        </svg>
                        <p>{this.state.history[this.state.history.length - 1].whiteScore}</p>
                    </div>
                </div>
                <button id="undo" onClick={this.moveBack.bind(this)}>
                    Undo
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function createStartBoard() {
    let board = Array(64).fill(null);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === 3 && j === 3) {
                board[8 * i + j] = 'W';
            }
            else if (i === 3 && j === 4) {
                board[8 * i + j] = 'B';
            }
            else if (i === 4 && j === 3) {
                board[8 * i + j] = 'B';
            }
            else if (i === 4 && j === 4) {
                board[8 * i + j] = 'W';
            }
        }
    }

    return board;
}

function isValidMove(board, turn, [x, y]) {
    if (!(0 <= x <= 7) || !(0 <= y <= 7) || board[8 * y + x] !== null) {
        return false;
    }
    //delta = (x, y); starting from the upper left corner
    // right, left, up, down, right-up, left-down, left-up, right-down
    let deltas = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, -1], [-1, 1], [-1, -1], [1, 1]];
    let isValid = false;
    let opponent = turn === 'B' ? 'W' : 'B';

    for (let delta of deltas) {
        let xDelta = delta[0];
        let yDelta = delta[1];

        if ((0 <= (x + xDelta)) && ((x + xDelta) <= 7) && (0 <= (y + yDelta)) && ((y + yDelta) <= 7) && board[8 * (y + yDelta) + (x + xDelta)] === opponent) {
            let m = 2;

            while ((0 <= (x + xDelta * m)) && ((x + xDelta * m) <= 7) && (0 <= (y + yDelta * m)) && ((y + yDelta * m) <= 7)) {
                let nextSquareIndex = 8 * (y + yDelta * m) + (x + xDelta * m);

                if (board[nextSquareIndex] === opponent) {
                    m++;
                    continue;
                }
                else if (board[nextSquareIndex] === turn) {
                    isValid = true;
                    break;
                }
                else if (board[nextSquareIndex] === null) {
                    break;
                }
            }
        }

        if (isValid) {
            return isValid;
        }
    }
    return isValid;
}

function validMoves(board, turn) {
    let validMovesList = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isValidMove(board, turn, [j, i])) {
                validMovesList.push([j, i]);
            }
        }
    }
    return validMovesList;
}

function makeMove(board, turn, [x, y]) {
    if (isValidMove(board, turn, [x, y])) {
        let deltas = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, -1], [-1, 1], [-1, -1], [1, 1]];
        let opponent = turn === 'B' ? 'W' : 'B';

        for (let delta of deltas) {
            let xDelta = delta[0];
            let yDelta = delta[1];
            let squaresToChangeIndices = [];

            if ((0 <= (x + xDelta)) && ((x + xDelta) <= 7) && (0 <= (y + yDelta)) && ((y + yDelta) <= 7) && board[8 * (y + yDelta) + (x + xDelta)] === opponent) {
                squaresToChangeIndices.push(8 * (y + yDelta) + (x + xDelta));
                let m = 2;

                while ((0 <= (x + xDelta * m)) && ((x + xDelta * m) <= 7) && (0 <= (y + yDelta * m)) && ((y + yDelta * m) <= 7)) {
                    let nextSquareIndex = 8 * (y + yDelta * m) + (x + xDelta * m);

                    if (board[nextSquareIndex] === opponent) {
                        squaresToChangeIndices.push(nextSquareIndex);
                        m++;
                        continue;
                    }
                    else if (board[nextSquareIndex] === turn) {
                        board[8 * y + x] = turn;
                        for (let index of squaresToChangeIndices) {
                            board[index] = turn;
                        }
                        break;
                    }
                    else if (board[nextSquareIndex] === null) {
                        break;
                    }
                }
            }
        }

    }
}

function countScore(board, player) {
    let total = 0;
    for (let square of board) {
        if (square === player) {
            total += 1;
        }
    }
    return total;
}

