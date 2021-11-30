function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function hasPosition(arr, pos) {
    return JSON.stringify(arr).includes(JSON.stringify(pos))
}

function Cell(row, col) {
    let cell = {
        id: `${row}_${col}`,
        row: row,
        col: col,
        revealed: false,
        mine: false,
        flagged: false,
        neighborMineCount: 0,
    };
    return cell;
}

function makeBoard(rows, cols, mineCount) {
    let board = [];
    field.style.setProperty('--grid-rows', rows);
    field.style.setProperty('--grid-cols', cols);
    for (let x = 0; x < rows; x++) {
        board[x] = [];
        for (let y = 0; y < cols; y++) {
            board[x][y] = Cell(x, y);
        }
    }
    plantMines(board, mineCount)
    countMines(board)
    return board
}

function generateBoard(board){
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            let block = document.createElement("div");
            block.className = "covered"
            field.appendChild(block).setAttribute("id", board[x][y].id)
        }
    }
    sts = checkStatus(sts, board, flagCount, condition);
}

function plantMines(board, numMines) {
    let minePositions = [];
    while (minePositions.length < numMines) {
        let x = getRandomInt(0, board.length);
        let y = getRandomInt(0, board[0].length);
        let position = [x, y];
        if (!hasPosition(minePositions, position)) {
            minePositions.push(position)
            board[x][y].mine = true;
        }
    }
}

function countMines(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (!board[row][col].mine) {
                let count = 0;
                let neighbors = grabNeighbors(board, row, col);
                for (let i = 0; i < neighbors.length; i++) {
                    if (neighbors[i].mine) {
                        count++
                    }
                }
                board[row][col].neighborMineCount = count;
            }
        }
    }
}

function grabNeighbors(board, x, y) {
    const neighborCells = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        if (board[x + xOffset] !== undefined) {
            for (let yOffset = -1; yOffset <= 1; yOffset++) {
                if (board[x + xOffset][y + yOffset] === board[x][y]) {
                    continue
                } else if (board[x + xOffset][y + yOffset] !== undefined) {
                    neighborCells.push(board[x + xOffset][y + yOffset])
                }
            }
        }
    }
    return neighborCells;
}

