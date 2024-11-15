const Player = (name, marker) => {
    return { name, marker };
  };
  
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        };

    const updateBoard = (index, marker) => {
            if (board[index] === '') {
            board[index] = marker;
            return true;
            }
            return false;
        };
        
        const getBoard = () => board;
        
        return { resetBoard, updateBoard, getBoard };
        })();

const Game = (() => {
    let currentPlayer;
    let player1;
    let player2;
        
    const startGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        Gameboard.resetBoard();
        render();
        };
        
    const playTurn = (index) => {
    if (Gameboard.updateBoard(index, currentPlayer.marker)) {
        if (!checkWinner()) {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            render();
            }
        } else {
            alert("Posizione già occupata!");
            }
    };
        
    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  
            [0, 4, 8], [2, 4, 6]               
            ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                alert(`${board[a]} ha vinto!`);
                return true;
                }
            }
                if (!board.includes('')) {
                    alert("Pareggio!");
                    return true;
                }
                return false;
            };
        
            const render = () => {
                const cells = document.querySelectorAll('.cell');
                const board = Gameboard.getBoard();
                cells.forEach((cell, index) => {
                    cell.textContent = board[index];
                });
            };
        
            const resetGame = () => {
                startGame("Giocatore 1", "Giocatore 2");
            };
        
            return { startGame, playTurn, resetGame };
        })();
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                Game.playTurn(parseInt(cell.dataset.index)); 
            });
        });
        
        document.getElementById('reset').addEventListener('click', () => {
            Game.resetGame();
        });
        
        Game.startGame("Giocatore 1", "Giocatore 2");