//dung canvas de ve khung tro choi

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
let board = [];
let currentBlock;
let isMove = true;
const listBlock = [
    [
        [1, 1, 1],//khoi T
        [0, 1, 0]
    ],
    [
        [1, 1, 1, 1]//khoi I
    ],
    [
        [1, 1, 0],
        [0, 1, 1]//khoi Z
    ],

    [
        [0, 1, 1],
        [1, 1, 0]//khoi S
    ],

    [
        [1, 1],//khoi O
        [1, 1]
    ],
    [
        [1, 0, 0],//khoi J
        [1, 1, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1]//khoi L
    ]
];
const listColor = ["red", "cyan", "yellow", "gray", "purple", "pink", "green", "black"];//danh sach mau tuong ung voi tung khoi

// console.log(level);

//khoi tao khung tro choi voi mang 2d
for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
        board[i][j] = null;
    }
}
// console.table(blocks);
//ham tao level tro choi
function createBoard(lv) {
    let index = 0;
    switch (lv) {
        case 2:
            //tạo 6 khối vật cản
            while (index <= 6) {
                //tao random vi tri xuat hien cua cac vật cản
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                // các khối vật cản chỉ xuất hiện ở 1 dòng từ dưới lên và không cho xuất hiện 20 khối trong cùng 1 hàng

                if (i > 18 && board[i].reduce((a, b) => a + b, 0) < 10) {
                    console.log(j, i);
                    board[j][i] = 1;
                    index++;
                }
            }
            speed = 350;
            break;
        case 3:
            //tạo 20 khối vật cản
            while (index <= 20) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                // các khối vật cản chỉ xuất hiện ở 4 dòng từ dưới lên và không cho xuất hiện 20 khối trong cùng 1 hàng

                if (i > 16 && board[i].reduce((a, b) => a + b, 0) < 10) {
                    console.log(j, i);
                    board[j][i] = 1;//gắn bằng 1 để vẽ các khối vật cản xuất hiện trên màn chơi
                    index++;
                }
            }
            speed = 320;
            break;
        case 4:
            // các khối vật cản chỉ xuất hiện ở 5 dòng từ dưới lên và không cho xuất hiện 20 khối trong cùng 1 hàng
            //tạo 40 khối vật cản

            while (index <= 40) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 14 && board[i].reduce((a, b) => a + b, 0) < 10) {
                    console.log(j, i);
                    board[j][i] = 1;
                    index++;
                }
            }
            speed = 290;
            break;
        case 5:
            //tạo 50 khối vật cản
            while (index <= 50) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                if (i > 12 && board[i].reduce((a, b) => a + b, 0) < 10) {
                    console.log(j, i);
                    board[j][i] = 1;
                    index++;
                }
            }
            speed = 250;
            break;
        case 6:
            //tạo 60 khối vật cản

            while (index <= 60) {
                const i = Math.floor((Math.random() * row));
                const j = Math.floor((Math.random() * col));
                // các khối vật cản chỉ xuất hiện ở 9 dòng từ dưới lên và không cho xuất hiện 20 khối trong cùng 1 hàng
                if (i > 10 && board[i].reduce((a, b) => a + b, 0) < 10) {
                    board[j][i] = 1;
                    index++;
                }
            }
            speed = 200;
            break;
        default:
            break;
    }
}

//hàm tạo khối ngẫu nhiên
function createBlock() {
    const index = Math.floor((Math.random() * listBlock.length));
    //random vị trí xuất hiện
    const shape = listBlock[index];//lấy khối ở vị trí index
    const color = listColor[index];//lấy màu tương ứng với khối ở vị trí index
    return {
        shape,
        color,
        x: Math.floor(col / 2) - Math.floor(shape[0].length / 2),
        y: 0
    };
    //return trên để điều chỉnh cho các khối khi bắt đầu xuất hiện sẽ luôn ở vị trí chính giữa
}

//hàm vẽ 1  khối sử dụng canvas
function drawBlock(x, y, color) {
    ctx.fillStyle = color;//ve mau cho khối
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);//vẽ hcn với chiều rộng và cao bằng 40, tại vi trí x*40 và y*40
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);// vẽ đường viền cho khối
}

//ham vẽ các khối có giá trị khác 0 trong mảng 2d
function drawBlocks() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (board[i][j]) { //kiểm tra xem tại vi trí i,j giá trị có khác null hay không
                drawBlock(i, j, board[i][j].color);// nếu khác null thì tại i,j sẽ ve màu lên
            }
        }
    }
}

//hàm này để vẽ các khối đang rơi
function drawCurrentBlock() {
    for (let i = 0; i < currentBlock.shape.length; i++) {
        for (let j = 0; j < currentBlock.shape[i].length; j++) {
            if (currentBlock.shape[i][j]) { // nếu giá trị của ô hiện tại trong mảng khác 0, tức là có khối tại ô này
                let x = currentBlock.x + j;// tính toán tọa độ trên canvas của ô hiện tại
                let y = currentBlock.y + i;
                let color = currentBlock.color;
                drawBlock(x, y, color);// vẽ khối tại ô này bằng hàm drawBlock()
            }
        }
    }
}

function canMove(x, y, shape) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            // nếu phần tử hiện tại có giá trị khác 0 tức là có vật cản or khối khác,
            if (shape[i][j]) {
                // tính toán vị trí mới của phần tử hiện tại
                const newX = x + j;
                const newY = y + i;
                // kiểm tra vị trí mới có vượt ra ngoài kích thước trò chơi hoặc trùng với khối đã có sẵn không
                if (newX < 0 || newX >= col || newY >= row || board[newX][newY]) {
                    // nếu có, không thể di chuyển khối đến vị trí mới
                    return false;
                }
            }
        }
    }
    // nếu tất cả các vị trí mới đều hợp lệ, có thể di chuyển khối đến vị trí mới
    return true;
}

function moveDown() {
    if (!isGameOver()) {//kiem tra xem trò chơi đã kêt thúc chưa
        if (canMove(currentBlock.x, currentBlock.y + 1, currentBlock.shape) && isMove === true) {
            currentBlock.y++;// kiểm tra xem khối có thể rơi hay không
        } else {
            // nếu không thể di chuyển được nữa, đặt khối hiện tại vào trong mảng blocks để lưu lại vị trí
            for (let i = 0; i < currentBlock.shape.length; i++) {
                for (let j = 0; j < currentBlock.shape[i].length; j++) {
                    if (currentBlock.shape[i][j]) {
                        board[currentBlock.x + j][currentBlock.y + i] = currentBlock;
                    }
                }
            }
            currentBlock = createBlock();
            // tạo ra khối mới để rơi
        }
    } else {
        // nếu game đã kết thúc, hiển thị thông báo và các nút điều khiển
        isMove = false;
        clearInterval(interval);
        $('#gameover').show();//thong bao
        $('.btn-play').hide();
        $('.btn-pause').hide();
        $('.btn-play-again').show();
    }
}

//tương tự hàm canMove kiểm tra xem có di chuyển sang trái đc không
function moveLeft() {
    if (canMove(currentBlock.x - 1, currentBlock.y, currentBlock.shape)) {
        currentBlock.x--;
    }
}

//tương tự hàm canMove kiểm tra xem có di chuyển sang phải đc không

function moveRight() {
    if (canMove(currentBlock.x + 1, currentBlock.y, currentBlock.shape)) {
        currentBlock.x++;
    }
}

//hàm này giúp các khối có thể xoay
function rotate() {
    //tạo một mảng mới để lưu trữ hình dạng mới sau khi xoay
    const newBlock = [];
    //duyệt qua hàng của hình hiện tại
    for (let i = 0; i < currentBlock.shape[0].length; i++) {
        //tạo một hàng mới trong mảng hình mới
        newBlock[i] = [];
        //duyệt qua cột của hình hiện tại
        for (let j = 0; j < currentBlock.shape.length; j++) {
            //lưu giá trị của ô tại vị trí j,i được xoay 90 độ vào vị trí mới
            newBlock[i][j] = currentBlock.shape[currentBlock.shape.length - 1 - j][i];
        }
    }
    //kiem tra xem hình mới có thể di chuyển hay không, nếu có thì lưu hình mới vào hình hiện tại
    if (canMove(currentBlock.x, currentBlock.y, newBlock)) {
        currentBlock.shape = newBlock;
    }
}

//ham kiem tra xem game đã kêt thúc chưa
//nếu trong cột đó tồn tại một khối ở vị trí đầu tiên (có tọa độ y bằng 0) thì cho rằng trò chơi đã kết thúc và trả về giá trị true.
//nếu không tìm thấy khối nào ở vị trí đầu tiên của bất kỳ cột nào, tức là các khối vẫn chưa chạm đến đỉnh của màn hình, thì trả về giá trị false.
function isGameOver() {
    for (let x = 0; x < col; x++) {
        if (board[x][0]) {
            return true;
        }
    }
    return false;
}


function update() {
    moveDown();//gọi hàm này để cho các khối rơi xuống
    draw();//vẽ các khối
    checkRow();//kiểm tra các hàng xem có full chưa nếu full thì sẽ biến mất và cộng điểm
    $('#score').text(score);//hiển thị điểm lên cho người chơi
    checkScore();// kiểm tra điểm có đủ để qua level tiếp theo không
    // console.log(blocks.toString())
}

//hàm vẽ khối
function draw() {
    ctx.clearRect(0, 0, width, heiht);
    drawBlocks();
    drawCurrentBlock();
}

// hàm này để kiểm tra xem hàng nào đó đã full hay chưa
// nếu full sẽ biến mất và cộng 10 điểm cho mỗi hàng biến mất
function checkRow() {
// kiểm tra từng hàng trên bảng chơi
    for (let y = row - 1; y >= 0; y--) {
// giả sử hàng đầy
        let isFull = true;
// kiểm tra từng ô trên hàng hiện tại
        for (let x = 0; x < col; x++) {
// nếu ô này chưa được điền thì không đầy
            if (!board[x][y]) {
                isFull = false;
                break;
            }
        }

// nếu hàng đầy, di chuyển các hàng từ hàng hiện tại trở xuống phía dưới
        if (isFull) {
            // di chuyển các hàng từ hàng hiện tại trở xuống phía dưới
            for (let i = y; i > 0; i--) {
                for (let x = 0; x < col; x++) {
                    board[x][i] = board[x][i - 1];
                }
            }

            // gán giá trị null cho các ô trong hàng đầu tiên
            for (let x = 0; x < col; x++) {
                board[x][0] = null;
            }

            // cộng thêm 10 điểm cho người chơi và hiển thị điểm số mới trên màn hình
            score += 10;
            $('#gameover>p>span').text(score);

            // vì các hàng bị di chuyển xuống phía dưới, kiểm tra lại hàng này bằng cách tăng giá trị của y lên 1
            y++;
        }
    }
}


function startGame() {
// tạo khối mới
    currentBlock = createBlock();
    clearInterval(interval);//dừng setInterval
// lấy giá trị độ khó từ ô đầu vào "level" và chuyển đổi sang kiểu số nguyên
    level = parseInt($('#level').val());
// đặt lại bảng chơi với kích thước và độ khó tương ứng với biến level
    createBoard(level);
    interval = setInterval(update, speed);//bắt đầu cho khối rơi
// hiển thị điểm số cần đạt để lên cấp tiếp theo trên màn hình
    $('#nextLv').text(20 * level);
// ẩn nút "Play" và hiển thị nút "Pause"
    $('.btn-play').hide();
    $('.btn-pause').show();
    $('.btn-play-again').show();
    $('.btn-newGame').show();
}
//hàm này đê cho người chơi chơi lại
function resetGame() {
    score = 0;
    isMove = true;
    currentBlock = createBlock();
    for (let i = 0; i < col; i++) {
        board[i] = [];
        for (let j = 0; j < row; j++) {
            board[i][j] = null;
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
// hàm kiểm tra xem đủ diểm qua level
function checkScore() {
    if (score >= 20 * level) {
        isMove = false;
        clearInterval(interval)
        $('.btn-play').hide();
        $('.btn-play-again').show();
        $('.btn-nextLevel').show();
        $('.btn-pause').hide();

    }
}

//sự kiện cho các nút mũi tên, khi nhấn mũi tên thì sẽ xoay các khối
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
//khi ấn chuột thì các khối sẽ xoay
$('#board').click(function () {
    rotate();
})
//nhấn nút play để chơi
$('.btn-play').click(function () {
    // console.log(level)
    startGame();
})
$('.btn-newGame').click(function () {
    location.reload();
})
//chơi lại game
$('.btn-play-again').click(function () {
    clearInterval(interval);
    resetGame();
})
//tạm dừng game
$('.btn-pause').click(function () {
    clearInterval(interval);
    isMove = false;
    $('.btn-resume').show();
    $('.btn-pause').hide();
})
//tiếp tục game
$('.btn-resume').click(function () {
    clearInterval(interval);
    interval = setInterval(update, speed);
    isMove = true;
    $('.btn-resume').hide();
    $('.btn-pause').show();
})
//nhấn để qua level tiêps theo
$('.btn-nextLevel').click(function () {
    level += 1;
    $('#level').val(level);
    resetGame();

})





