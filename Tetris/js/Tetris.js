const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const width = 400;
const heiht = 800;
canvas.width = width;
canvas.height = heiht
const blockSize = 40;
const col = width / blockSize;//10 col
const row = heiht / blockSize;//20 row
let score = 0;
let level;
let speed = 400;
let interval;
let blocks = [];
let currentBlock;
let isMove = true;
const shapes = [
    [
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [1, 1, 1, 1]
    ],
    [
        [1, 1, 0],
        [0, 1, 1]
    ],

    [
        [0, 1, 1],
        [1, 1, 0]
    ],

    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 0, 0],
        [1, 1, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1]
    ]
];
const colors = ["red", "cyan", "yellow", "gray", "purple", "pink", "green", "black"];

// console.log(level);
for (let i = 0; i < row; i++) {
    blocks[i] = [];
    for (let j = 0; j < col; j++) {
        blocks[i][j] = null;
    }
}
console.table(blocks);
function createBoard(lv) {
    let index = 0;
    switch (lv) {
        case 2:
            while (index <= 6) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 18 && blocks[i].reduce((a,b)=>a+b,0)<10) {
                    console.log(j, i);
                    blocks[j][i] = 1;
                    drawBlock(j, i, "white");
                    index++;
                }
            }
            speed = 350;
            break;
        case 3:
            while (index <= 20) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 15&& blocks[i].reduce((a,b)=>a+b,0)<10) {
                    console.log(j, i);
                    blocks[j][i] = 1;
                    drawBlock(j, i, "white");
                    index++;
                }
            }
            speed = 320;
            break;
        case 4:
            while (index <= 40) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 12&& blocks[i].reduce((a,b)=>a+b,0)<10) {
                    console.log(j, i);
                    blocks[j][i] = 1;
                    drawBlock(j, i, "white");
                    index++;
                }
            }
            speed = 290;
            break;
        case 5:
            while (index <= 50) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 8&& blocks[i].reduce((a,b)=>a+b,0)<10) {
                    console.log(j, i);
                    blocks[j][i] = 1;
                    drawBlock(j, i, "white");
                    index++;
                }
            }
            speed = 250;
            break;
        case 6:
            while (index <= 60) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 5) {
                    blocks[j][i] = 1;
                    drawBlock(j, i, "white");
                    index++;
                }
            }
            speed = 200;
            break;
        default:
            break;
    }
}

// }

// const i = Math.floor((Math.random() * row));
// const j = Math.floor((Math.random() * col));
// console.table(blocks);

// if (level==2){
//     let index=0;
//     while (index<5){
//         const i = Math.floor((Math.random() * row));
//         const j = Math.floor((Math.random() * col));
//         if(i>15){
//             console.log(i,j);
//             blocks[j][i]=1;
//             drawBlock(j,i,"black");
//             index++;
//         }
//
//     }
// }


function createBlock() {
    const index = Math.floor((Math.random() * shapes.length));
    const shape = shapes[index];
    const color = colors[index];
    return {
        shape,
        color,
        x: Math.floor(col / 2) - Math.floor(shape[0].length / 2),
        y: 0
    };
}


function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}


function drawBlocks() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (blocks[i][j]) {
                drawBlock(i, j, blocks[i][j].color);
            }
        }
    }
}

function drawCurrentBlock() {
    for (let i = 0; i < currentBlock.shape.length; i++) {
        for (let j = 0; j < currentBlock.shape[i].length; j++) {
            if (currentBlock.shape[i][j]) {
                let x = currentBlock.x + j;
                let y = currentBlock.y + i;
                let color = currentBlock.color;
                drawBlock(x, y, color);
            }
        }
    }
}

function canMove(x, y, shape) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j]) {
                const newX = x + j;
                const newY = y + i;
                if (newX < 0 || newX >= col || newY >= row || blocks[newX][newY]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function moveDown() {
    if (!isGameOver()) {
        if (canMove(currentBlock.x, currentBlock.y + 1, currentBlock.shape) && isMove) {
            currentBlock.y++;
        } else {
            for (let i = 0; i < currentBlock.shape.length; i++) {
                for (let j = 0; j < currentBlock.shape[i].length; j++) {
                    if (currentBlock.shape[i][j]) {
                        blocks[currentBlock.x + j][currentBlock.y + i] = currentBlock;
                    }
                }
            }
            currentBlock = createBlock();
        }
    } else {
        isMove = false;
        clearInterval(interval);
        $('#gameover').show();
        $('.btn-play').hide();
        $('.btn-play-again').show();
    }
}


function moveLeft() {
    if (canMove(currentBlock.x - 1, currentBlock.y, currentBlock.shape)) {
        currentBlock.x--;
    }
}

function moveRight() {
    if (canMove(currentBlock.x + 1, currentBlock.y, currentBlock.shape)) {
        currentBlock.x++;
    }
}

function rotate() {
    const newShape = [];
    for (let i = 0; i < currentBlock.shape[0].length; i++) {
        newShape[i] = [];
        for (let j = 0; j < currentBlock.shape.length; j++) {
            newShape[i][j] = currentBlock.shape[currentBlock.shape.length - 1 - j][i];
        }
    }
    if (canMove(currentBlock.x, currentBlock.y, newShape)) {
        currentBlock.shape = newShape;
    }
}

function isGameOver() {
    for (let x = 0; x < col; x++) {
        if (blocks[x][0]) {
            return true;
        }
    }
    return false;
}


function update() {

    moveDown();
    draw();
    checkRow();
    $('#score').text(score);
    checkScore();
    // console.log(blocks.toString())
}

function draw() {
    ctx.clearRect(0, 0, width, heiht);
    drawBlocks();
    drawCurrentBlock();
}

function checkRow() {
    for (let y = row - 1; y >= 0; y--) {
        let isFull = true;
        for (let x = 0; x < col; x++) {
            if (!blocks[x][y]) {
                isFull = false;
                break;
            }
        }

        if (isFull) {
            for (let i = y; i > 0; i--) {
                for (let x = 0; x < col; x++) {
                    blocks[x][i] = blocks[x][i - 1];
                }
            }

            for (let x = 0; x < col; x++) {
                blocks[x][0] = null;
            }

            score += 10;
            $('#gameover>p>span').text(score);

            y++;
        }
    }
}


function startGame() {
    currentBlock = createBlock();
    clearInterval(interval);
    level = parseInt($('#level').val());
    createBoard(level);
    interval = setInterval(update, speed);
    $('#nextLv').text(10 * level);
    $('.btn-play').hide();

}

function resetGame() {
    score = 0;
    isMove = true;
    currentBlock = createBlock();
    for (let i = 0; i < col; i++) {
        blocks[i] = [];
        for (let j = 0; j < row; j++) {
            blocks[i][j] = null;
        }
    }
    $('#gameover').hide();
    $('.btn-play').show();
    $('.btn-nextLevel').hide();
    $('.btn-play-again').hide();
    clearInterval(interval);
    startGame();
    console.log(level);
}

function checkScore() {
    if (score >= 10 * level) {
        isMove=false;
        clearInterval(interval)
        $('.btn-play').hide();
        $('.btn-play-again').show();
        $('.btn-nextLevel').show();

    }
}


document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            rotate();
            break;
        case "ArrowDown":
            moveDown();
            break;
    }

    draw();
});
$('#board').click(function () {
    rotate();
})
$('.btn-play').click(function () {
    console.log(level)
    startGame();
})
$('.btn-play-again').click(function () {
    clearInterval(interval);
    resetGame();
})
$('.btn-nextLevel').click(function () {
    level += 1;
    $('#level').val(level);
    resetGame();

})





