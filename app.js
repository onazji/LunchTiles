// refering to classes in index.html with square as an empty box to place emojis
const grid = document.querySelector(".grid")
const points = document.querySelector(".points")
const squares = []

//Win + .
function getCandy(){
    return ["🍜","🌯","🍛","🍔"] [Math.floor(Math.random()*4)]
}

// loop until all ids in square are filled with emoji or until game is over 
for( index = 0; index<9;index++){

    const square = document.createElement("div")
    square.setAttribute("draggable",true)
    square.setAttribute("id",index)
    square.textContent=getCandy()
    grid.appendChild(square)
    squares.push(square)
}

let candyDragged, candyReplaced, idDragged, idReplaced

// function to track when a player is dragging a emoji
squares.forEach((square)=> {
        square.addEventListener("dragstart",dragStart)
        square.addEventListener("drop",dragDrop)
        square.addEventListener("dragover",e=>e.preventDefault())
})

// when emoji is dragged, maintain same emoji with parent id connected to the emoji with THIS
function dragStart(){
    candyDragged = this.textContent;
    idDragged = parseInt(this.id);
}
// changing the id of the emoji with what was dropped onto it 
function dragDrop(){
candyReplaced = this.textContent
idReplaced = parseInt(this.id)
this.textContent = candyDragged
squares[idDragged].textContent = candyReplaced;
// testing for matches, looping when 2 or more emojis are the same in a column
    for( index1 = 0;index1 <=2;index1++){
        if(squares[index1].textContent== squares[index1+3].textContent&&
            squares[index1].textContent==squares[index1+6].textContent ){
            // if this is true the emojis will loop and find the connecting emojis in the 3x3 box using 2d array from first index to result in same emoji 3 in a row 
            points.textContent = parseInt(points.textContent)+1
            for( index2=0;index2<=6;index2+=3){
                squares[index1+index2].textContent = getCandy();
            }
        }
    }
}
