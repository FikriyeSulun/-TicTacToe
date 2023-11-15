let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameEnded = false;

// const cells = document.querySelectorAll('.cell');
// cells.forEach(cell => {
//     cell.addEventListener('click', () => {
//         const row = parseInt(cell.dataset.row);
//         const col = parseInt(cell.dataset.col);
//         makeMove(row, col);
//     });
// });

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    //index her hücrede dolaşır, o anki hücrenin indexi
    cell.addEventListener('click', () => {
        const row = Math.floor(index / 3); //hücre satırını öğrenmek için
        const col = index % 3; //hücre sütununu öğrenmek için
        makeMove(row, col);
    });
});

function makeMove(row, col) {
    if (gameEnded || board[row][col] !== '') {
        return;
    }

    board[row][col] = currentPlayer;
    // cells[row * 3 + col].innerText = currentPlayer;
    const cell = cells[row * 3 + col];
    cell.innerText = currentPlayer;
    cell.setAttribute('data-player', currentPlayer);

    if (checkWin(currentPlayer)) {
        document.querySelector('#message').innerHTML = `${currentPlayer} Kazandı!`;
        gameEnded = true;
        return;
    }

    if (checkDraw()) {
        document.querySelector('#message').innerText = 'Berabere!';
        gameEnded = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // PC'nin hamle yapmasını sağlayalım (Oyuncu X, Bilgisayar O)
    if (currentPlayer === 'O') {
        setTimeout(makeComputerMove, 500); // 500ms sonra bilgisayar hamle yapacak
    }
}

//PC hamlesi
function makeComputerMove() {
    let emptyCells = []; //boş hücreleri listeler
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length === 0) {
        return; // Boş hücre kalmadı, yapacak bir hamle yok.
    }

    // Rastgele bir boş hücre seç
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let { row, col } = emptyCells[randomIndex];

    makeMove(row, col);
}

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === player && board[i][1] === player && board[i][2] === player ||
            board[0][i] === player && board[1][i] === player && board[2][i] === player
        ) {
            return true;
        }
    }

    if (
        board[0][0] === player && board[1][1] === player && board[2][2] === player ||
        board[0][2] === player && board[1][1] === player && board[2][0] === player
    ) {
        return true;
    }

    return false;
}

function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}