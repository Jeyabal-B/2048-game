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

document.addEventListener("keyup", (e) => {
    if(e.code == 'ArrowLeft'){
        slideLeft();
    } else if(e.code == 'ArrowRight'){
        slideRight();
    } else if(e.code == 'ArrowUp'){
        slideUp();
    } else if(e.code == 'ArrowDown'){
        slideDown();
    }
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


function filterZero(row) {
    return row.filter(num => num != 0);
}

