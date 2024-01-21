//Accessing all buttons and boxes to add corresponding functionality
let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newgamebtn=document.querySelector("#newgame");
let wincontainer=document.querySelector(".wincontainer");
let winmsg=document.querySelector("#winmsg");
let whoturn=document.querySelector("#turn");
//Creating variable to track turn and draw case
let turno=false;
let count=0;
//Stroing all winning patterns
const win=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
//adding clickinng functionality by adding eventlistners 
boxes.forEach((box)=>{
    box.addEventListener("click", () => {

        if(turno){          //player O turn
            whoturn.innerText="Player X turn next";
            box.innerText="O";
            turno=false;
        }
        else{               //player X turn
            whoturn.innerText="Player O turn next ";
            box.innerText="X";
            turno=true;
        }
        count=count+1;
        box.disabled=true;
        //checking draw case
        let winner=checkwinner();
        if(count ===9 && !winner){
            gamedraw();
        }
    });
});
// function to tackle a draw 
const gamedraw=()=>{
    winmsg.innerText=`Game was a DRAW `;
    wincontainer.classList.remove("hide");
    disable();
};
//Function to print and display winning message
const showwinner=(winner)=>{
    winmsg.innerText=`Winner is Player ${winner}`;
    wincontainer.classList.remove("hide");
    disable();
};
//Function to disable all boxes after winner is found
const disable=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
//To enable boxes after game is restarted
const enable=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
//algorithm to check if winner is found or not
const checkwinner=()=>{
    for(let i of win){
        let one=boxes[i[0]].innerText;
        let two=boxes[i[1]].innerText;
        let three=boxes[i[2]].innerText;
        if(one !="" && two !="" && three !=""){
            if(one === two && two===three){
                showwinner(one);
                return true;
            }
        }
    }
};
//function to clear all boxes while new game or restart
const reset=()=>{
    count=0;
    turno=false;
    enable();
    wincontainer.classList.add("hide");
    whoturn.innerText="Press any box to start the game with 'X'";
}
//adding eventlistners to new game and reset buttons
newgamebtn.addEventListener("click",reset);
resetbtn.addEventListener("click",reset);