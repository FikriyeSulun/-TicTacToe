let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X'; //sıradaki oyuncu başlangıç: X
let gameEnded = false; //oyun sonlandı mı?

function makeMove(row, col) {
    //oyun sonlanmışsa(gameEnded=true) veya önceden seçilmiş bir hücre seçilmişse 
    if (gameEnded || board[row][col] !== '') { 
        return;
    }

    //sıradaki oyuncunun işlemi gerçekleştirilir
    board[row][col] = currentPlayer;
    document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        document.getElementById('message').innerText = currentPlayer + ' Kazandı!';
        gameEnded = true;
        return;
    }

    if (checkDraw()) {
        document.getElementById('message').innerText = 'Berabere!';
        gameEnded = true;
        return;
    }

    //sıradaki oyuncu oynadığında diğer oyuncuya geçiş yapar
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (
            //satır ve sütun kontrolü
            board[i][0] === player && board[i][1] === player && board[i][2] === player ||
            board[0][i] === player && board[1][i] === player && board[2][i] === player
        ) {
            return true;
        }
    }

    if (
        //çapraz kontrolü
        board[0][0] === player && board[1][1] === player && board[2][2] === player ||
        board[0][2] === player && board[1][1] === player && board[2][0] === player
    ) {
        return true;
    }

    return false;
}

function checkDraw() {
    //boş hücre kalıp kalmadığını kontrol eder - beraberlik için kullanılır
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}