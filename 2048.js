var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classlist first
    tile.classList.add("tile");

    if(num>0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("t"+num.toString());
        }else{
            tile.classList.add("t8192");
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
}


function setTwo() {

    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //random function for row and column
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("t2");
            found = true;
        }
    }
}


document.addEventListener("keyup", (e) => {
    if(e.code == 'ArrowLeft'){
        slideLeft();
        setTwo();
    } else if(e.code == 'ArrowRight'){
        slideRight();
        setTwo();
    } else if(e.code == 'ArrowUp'){
        slideUp();
        setTwo();
    } else if(e.code == 'ArrowDown'){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function slideLeft() {
    for (let i = 0; i<rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;

        for (let j=0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile,num);
        }
    }
}

function slideRight() {
    for (let i = 0; i<rows; i++){
        let row = board[i];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[i] = row;

        for (let j=0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile,num);
        }
    }
}

function slideUp() {
    for (let j = 0; j<columns; j++){
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row = slide(row);
        // board[0][j] = row[0];
        // board[1][j] = row[1];
        // board[2][j] = row[2];
        // board[3][j] = row[3];

        for (let i=0; i < rows; i++){
            board[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile,num);
        }
    }
}

function slideDown() {
    for (let j = 0; j<columns; j++){
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let i=0; i < rows; i++){
            board[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile,num);
        }
    }
}

function slide(row) {
    row = filterZero(row);

    //slide and merge
    for(let i=0; i<row.length-1; i++){
        //check every 2
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
            // 2,2 -> 4
        }
    }

    row = filterZero(row); // [4,2]

    while(row.length < columns) {
        row.push(0);
    }

    return row;
}

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}