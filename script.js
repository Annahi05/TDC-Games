const gridDriv=document.getElementById("grid");  //get grid cont from html
const table=document.createElement("table");  //create table element

const gridSize=12;
const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const words=["BJC","LIONPAW","WHITEOUT","HUBROBESON","POLLOCK","CREAMERY","THON","CANVAS","BLUEBAND","LIBRARY","GRADUATE","FOOTBALL"];

const grid=[];
const directions=[
    {row:0, col:1},
    {row:1, col:0},

]


//filling grid with random letters
for(let r=0;r<gridSize;r++){//for every row
    const row=[];  
    for(let c=0;c<gridSize;c++){ //for every column
        row.push("")
    }
    grid.push(row);  //adds item to end of r array
}        

words.forEach(word=>{
    let assigned=false;
    let attempts=0;
    const maxAttempts=100;
    while(!assigned  && attempts < maxAttempts){
        attempts++;
        const direction=directions[Math.floor(Math.random()*directions.length)];
        const startRow=Math.floor(Math.random()*gridSize);
        const startCol=Math.floor(Math.random()*gridSize);

        if(startRow+word.length*direction.row>gridSize||startCol+word.length*direction.col>gridSize){
            continue;
        }
        let issue=false;
        for (let i=0;i<word.length;i++){
            let r=startRow+i*direction.row;
            let c=startCol+i*direction.col;
            if(grid[r][c]!==""&&grid[r][c]!==word[i]){
                issue=true;
                break;
            }
        }
        if(!issue){
            for(let i=0;i<word.length;i++){
            let r=startRow+i*direction.row;
            let c=startCol+i*direction.col;
            grid[r][c]=word[i];
        }
        assigned=true;
    }
}});
for(let r=0; r<gridSize;r++){
    for(let c=0;c<gridSize; c++){
        if(grid[r][c]==""){
            grid[r][c]=letters[Math.floor(Math.random()*letters.length)];
        }
    }
}

for(let r=0;r<gridSize;r++){
    const tr=document.createElement("tr");
    for(let c=0;c<gridSize;c++){
        const td=document.createElement("td");
        td.textContent=grid[r][c];  //putting letter in cell
        tr.appendChild(td);   //add cell to row
    }
    table.appendChild(tr);   //add row to table
}
gridDriv.appendChild(table);

const library=document.getElementById("library");
const listTable=document.createElement("table");
const lwords=[["BJC","LIONPAW","WHITEOUT","HUBROBESON"],["POLLOCK","CREAMERY","THON","CANVAS"],["BLUEBAND","LIBRARY","GRADUATE","FOOTBALL"]];

const rows=3;
const column=4;

for(let r=0;r<rows;r++){
    const tr=document.createElement("tr");
    for(let c=0;c<column;c++){
        const td=document.createElement("td");
        td.textContent=lwords[r][c];
        td.id=lwords[r][c];  
        tr.appendChild(td);  
    }
    listTable.appendChild(tr);   
}
library.appendChild(listTable);

let isDragging=false;
let draggedCells=[];
let draggedWord="";

table.querySelectorAll("td").forEach(cell=>{
    cell.addEventListener("mousedown",()=>{
        isDragging=true;
        draggedCells=[cell];
        draggedWord=cell.textContent;
        cell.classList.add("dragging");
    });
    cell.addEventListener("mouseover",()=>{
        if(isDragging && !draggedCells.includes(cell)){
            draggedCells.push(cell);
            draggedWord+=cell.textContent;
            cell.classList.add("dragging");
        }
    });
});

document.addEventListener("mouseup",()=>{
    if(isDragging){
        isDragging=false;
        if(words.includes(draggedWord)||words.includes(draggedWord.split("").reverse().join(""))){
            draggedCells.forEach(cell=>{
                cell.classList.remove("dragging");
                cell.classList.add("selected");
            });
            let foundWord= words.includes(draggedWord)? draggedWord : draggedWord.split("").reverse().join("");
            const wordCell=document.getElementById(foundWord);
            if(wordCell){
                wordCell.classList.add("found");
                const allFound=words.every(word=>{
                    const cell=document.getElementById(word);
                    return cell && cell.classList.contains("found");
            });
            if(allFound){
                document.getElementById("congrats").style.display = "block";
            }
            }
        }
        else{
            draggedCells.forEach(cell=>cell.classList.remove("dragging"));
        }
        draggedCells=[];
        draggedWord="";
    }
});

