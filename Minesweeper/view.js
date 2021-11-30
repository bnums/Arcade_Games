function updateBoard(board) {
    sts = checkStatus(sts, board, flagCount, condition);
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            let currentCell = board[x][y];
            let selected = document.getElementById(board[x][y].id)
            if (currentCell.mine && currentCell.revealed) {
                selected.className = "bomb";
            } else if (currentCell.neighborMineCount && currentCell.revealed) {
                selected.className = "opened"
                revealHint(selected, currentCell);
            } else if (currentCell.revealed) {
                selected.className = "opened";
            }
        }
    }
}

function checkStatus(sts, board, flags, condition) {
    if (sts === "lose") {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col].mine) {
                    board[row][col].revealed = true
                }
            }
        }
        condition.innerText = "You Lose"
        losses++;
        tracker.innerText = `Wins:${wins} Losses:${losses}`
        return
    }

    let checkOut = 0;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col].revealed && !board[row][col].mine) {
                checkOut++
            }
        }
    }

    if (checkOut === (height * width - mines)) {
        condition.innerText = "You Win!"
        wins++;
        tracker.innerText = `Wins:${wins} Losses:${losses}`
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col].mine) {
                    document.getElementById(board[row][col].id).className = "flagged"
                }
            }
        }
        sts = "win"
        return sts
    }

    condition.innerText = `# of mines left ${mines - flags}`
    return sts
}


function reveal(board, x, y) {
    let cell = board[x][y];
    let emptyCells = [];
    if (cell.neighborMineCount === 0) {
        cell.revealed = true; // reveal the cell
        let neighborCells = grabNeighbors(board, cell.row, cell.col) // grab neighbors
        for (i = 0; i < neighborCells.length; i++) {
            if (!neighborCells[i].mine && !neighborCells[i].flagged && neighborCells[i].neighborMineCount !== 0) {
                neighborCells[i].revealed = true
            } else if (!neighborCells[i].mine && !neighborCells[i].flagged && neighborCells[i].neighborMineCount === 0 && !neighborCells[i].revealed)
                emptyCells.push(neighborCells[i])
        }
        while (emptyCells.length != 0) {
            let lastIndx = emptyCells.length - 1;
            reveal(board, emptyCells[lastIndx].row, emptyCells[lastIndx].col)
            emptyCells.pop();
        }
    } else {
        cell.revealed = true
    }
}

function revealHint(el, cell) {
    el.innerText = cell.neighborMineCount;
}


