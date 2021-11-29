const field = document.getElementById("container");
const condition = document.getElementById("condition");
const score = document.getElementById("tracker");
let wins = 0;
let losses = 0;
let height;
let width;
let mines;
let sts = "playing";
let flagCount = 0;


function newGame() {
    //STATE
    height = parseInt(document.getElementById("customRow").value);
    width = parseInt(document.getElementById("customCol").value);
    mines = parseInt(document.getElementById("customMines").value);
    
    if (!height) {
        height = 9;
    } else if (height > 99) {
        height = 99;
    }
    document.getElementById("customRow").value = height

    if (!width) {
        width = 9;
    } else if (width > 99){
        width = 99;
    }
    document.getElementById("customCol").value = width

    if (!mines) {
        mines = Math.floor((height * width)/2);
    } else if (mines > (height * width)) {
        mines = Math.floor((height * width)/2);
    }
    document.getElementById("customMines").value = mines

    sts = "playing"
    field.innerHTML = ""
    flagCount = 0;
    gameBoard = makeBoard(height, width, mines)

    //RENDERS/VIEW
    generateBoard(gameBoard)
}


//EVENTS / CONTROLLERS
field.addEventListener("contextmenu", clickEvent => {
    clickEvent.preventDefault();
})

field.addEventListener("mouseup", clickEvent => {
    if (sts === "playing") {
        if (typeof clickEvent === 'object') {
            let id = clickEvent.target.id;
            let coordinate = id.split("_");
            let x = Number(coordinate[0]);
            let y = Number(coordinate[1]);
            let cell = gameBoard[x][y];
            let htmlCell = document.getElementById(id);

            switch (clickEvent.button) {
                case 0:
                    if (htmlCell.className === "flagged") {
                        break;
                    } else if (htmlCell.className === "covered") {
                        if (cell.mine) {
                            sts = "lose";
                        } else {
                            reveal(gameBoard, x, y)
                        };
                    };
                    break;
                case 2:
                    htmlCell.classList.toggle("flagged")
                    if (!cell.revealed) {
                        cell.flagged = !cell.flagged
                        if (cell.flagged) {
                            flagCount++
                        } else {
                            flagCount--
                        }
                    }
                    break;
            };
        }
        updateBoard(gameBoard)
    }
})

newGame();








