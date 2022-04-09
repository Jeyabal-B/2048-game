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
        [4,0,0,0],
        [0,0,16,0],
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
    }
})

function slideLeft() {
    for (let i = 0; i<rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;
    }
}

function slide() {
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

    while(row.length < column) {
        row.push(0);
    }

    return row;
}


function filterZero() {
    return row.filter(num => num != 0);
}

