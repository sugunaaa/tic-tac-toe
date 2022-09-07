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
    roundWon=false;
    let check_comb;
    for(let i=0;i<=7;i++){
        check_comb=win_comb[i];
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
       // console.log(11);
        scratch(check_comb);
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
function scratch(check_comb)
{
    //console.log(1);
    if(check_comb===win_comb[0])
        {
            document.getElementById('scratch_hor1').style.visibility="visible";
        }
        else if(check_comb===win_comb[1])
        {
            document.getElementById('scratch_hor2').style.visibility="visible";
        }
        else if(check_comb===win_comb[2])
        {
            document.getElementById('scratch_hor3').style.visibility="visible";
        }
        else if(check_comb===win_comb[3])
        {
            document.getElementById('scratch_ver1').style.visibility="visible";
        }
        else if(check_comb===win_comb[4])
        {
            document.getElementById('scratch_ver2').style.visibility="visible";
        }
        else if(check_comb===win_comb[5])
        {
            document.getElementById('scratch_ver3').style.visibility="visible";
        }
        else if(check_comb===win_comb[6])
        {
            document.getElementById('scratch_dig1').style.visibility="visible";
        }
        else if(check_comb===win_comb[7])
        {
            document.getElementById('scratch_dig2').style.visibility="visible";
        }
        return;
}

function gameRestart(){
    gameStatus=true;
    currentPlayer="X";
    boxStatus=["","","","","","","","",""];
    statusDisplay.innerHTML=playerTurn();
    document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML="");
    document.getElementById('scratch_hor1').style.visibility="hidden";
    document.getElementById('scratch_hor2').style.visibility="hidden";
    document.getElementById('scratch_hor3').style.visibility="hidden";
    document.getElementById('scratch_ver1').style.visibility="hidden";
    document.getElementById('scratch_ver2').style.visibility="hidden";
    document.getElementById('scratch_ver3').style.visibility="hidden";
    document.getElementById('scratch_dig1').style.visibility="hidden";
    document.getElementById('scratch_dig2').style.visibility="hidden";
}

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',CellClickedCheck));
document.querySelector('.game_restart').addEventListener('click',gameRestart)

