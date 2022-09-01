const statusDisplay=document.querySelector('.game_status');

let currentPlayer="X";
let gameStatus=true;
let boxStatus=["","","","","","","","",""];

const playerWon=()=>`Player ${currentPlayer} has won`;
const drawGame=()=>`The game ended in a draw`;
const playerTurn=()=>`It is ${currentPlayer}'s turn`;

const win_comb=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function CellClickedCheck(cellClickedEvent){
    const cellClicked = cellClickedEvent.target;
    console.log(cellClicked);
    const cellClickedIndex = parseInt(cellClicked.getAttribute("data-cell-index"));

    if(boxStatus[cellClickedIndex]!=='' || gameStatus!=true)
    {
        return;
    }
        CellCLickedDisplay(cellClicked,cellClickedIndex);
        verifyWin();
}

function CellCLickedDisplay(cellClicked,cellClickedIndex){
    boxStatus[cellClickedIndex]=currentPlayer;
    cellClicked.innerHTML=currentPlayer;
}

function PlayerChange(){
    currentPlayer=currentPlayer==='X'?'O':'X';
    statusDisplay.innerHTML=playerTurn();
}

function verifyWin(){
    console.log(1)
    roundWon=false;
    for(let i=0;i<=7;i++){
        let check_comb=win_comb[i];
        let a = boxStatus[check_comb[0]];
        let b = boxStatus[check_comb[1]];
        let c = boxStatus[check_comb[2]];
        if(a===''||b===''||c==='')
            continue;
        else if(a===b && b===c)
        {
            roundWon=true;
            break;
        }
    }
    if(roundWon)
    {
        statusDisplay.innerHTML=playerWon();
        if(check_comb==win_comb[0]||check_comb==win_comb[1]||check_comb==win_comb[2])
        {
            document.querySelector('.scratch_hor');
        }
        else if(check_comb==win_comb[3]||check_comb==win_comb[4]||check_comb==win_comb[5])
        {
            document.querySelector('.scratch_ver');
        }
        else if(check_comb==win_comb[6]||check_comb==win_comb[7])
        {
            document.querySelector('.scratch_dig');
        }
        gameStatus=false;
        return;
    }
    let roundDraw=!boxStatus.includes("");
    if(roundDraw)
    {
        statusDisplay.innerHTML=drawGame();
        gameStatus=false;
        return;
    }
    PlayerChange();
}

function gameRestart(){
    gameStatus=true;
    currentPlayer="X";
    boxStatus=["","","","","","","","",""];
    statusDisplay.innerHTML=playerTurn();
    document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML="");
}

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',CellClickedCheck));
document.querySelector('.game_restart').addEventListener('click',gameRestart);

