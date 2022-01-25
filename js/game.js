const height = 500;
const width = 500;
let scale = 10;
let cols = Math.floor(width/scale);
let rows = Math.floor(height/scale);
let isPaused = false
let prev_Grid = RandomGrid(cols,rows);
let ctx = null

window.addEventListener("load",()=>{
const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvas.height = height;
canvas.width = width;

UpdateDisplay(prev_Grid,scale,cols,rows,ctx,width,height);
});

/*
    A function that clear the previous grid and draw a new one.
 */
function UpdateDisplay(prev_Grid,scale,cols,rows,ctx,w,h){ 
    const interval = setInterval(() => {
        let new_Grid = Grid(prev_Grid,cols,rows);
        ctx.clearRect(0,0,w,h);
        CanvasGrid(ctx,new_Grid,scale,cols,rows);
        if(isPaused) {
            clearInterval(interval)
            console.log('asd')
        };
        prev_Grid = new_Grid;
    },20)
};

/*
A function that generates a 2D Array with 1 or 0 in random indices.
Ex:
[
[1,0,0,0,1]
[0,0,1,1,0]
[0,1,1,0,1]
[0,0,1,0,0]
[1,0,0,1,0]
]
*/
function RandomGrid(cols,rows){
    let mtx = new Array;
    for(let row = 0; row < rows; row += 1){
        mtx.push([]);
        for(let col = 0; col < cols; col += 1){
            mtx[row].push(Math.floor((Math.random()*2)));
        };
    };
    return mtx;
};

/* 
    A function that receives the indices of a cell and count all the neighbors

    Ex:
    -  0 1 2 3 4
    0 [0,0,1,0,0]
    1 [0,1,1,1,0]
    2 [0,0,1,0,0]

    2DArray[1][2] have 4 neighbors 
*/
function CountNeighbors(mtx,r,c,cols,rows,state){
    let sum = 0;
    if(state) sum--;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            sum += mtx[((r+i)+rows)%rows][((c+j)+cols)%cols];
        };
    };
    return sum;
};

/*
    A function that generates a new 2D array after check the previous 2D Array using
    the Conway's game life rules.

    - Each cell with one or no neighbors dies, as if by solitude.
    - Each cell with four or more neighbors dies, as if by overpopulation.
    - Each cell with two or three neighbors survives.
    - (If the cell is death) Each cell with two or three neighbors survives.

    Ex: 
    Previous grid:           New grid:
    [                       [
    [1,0,0,0,1]              [0,0,0,1,0]
    [0,0,1,1,0]              [0,0,1,0,1]
    [0,1,1,0,1]              [0,1,0,0,0]
    [0,0,1,0,0]              [0,0,1,0,0]
    [1,0,0,1,0]              [0,0,0,0,0]
    ]                       ]
*/
function Grid(mtx,cols,rows){
    let new_Grid = new Array;
    for(let r = 0; r < rows; r++){
        new_Grid.push([]);
        for(let c = 0; c < cols; c++){
            state = mtx[r][c];
            neighbors = CountNeighbors(mtx,r,c,cols,rows,state);
            if(state == 0 && neighbors == 3) new_Grid[r].push(1);
            else if(state == 1 && (neighbors == 2 || neighbors == 3)) new_Grid[r].push(1);
            else new_Grid[r].push(0);
        };
    };
    return new_Grid;
};

/*  
    A function to draw each cell in the grid.
    if Matrix[ i ][ j ] == 1 == life (Filled Square) 
    Otherwise = Empty Space (Square not filled)
*/
function CanvasGrid(ctx,mtx,scale,cols,rows){
    for(let col = 0; col < cols;col++){
        for(let row = 0; row < rows; row++){
            if(mtx[row][col] == 1){
                ctx.fillStyle = "rgba(0, 0, 0)";
                ctx.fillRect(col*scale,row*scale,scale,scale);
            }
            else {
                ctx.fillStyle = "rgba(255,255,255)";
                ctx.fillRect(col*scale,row*scale,scale,scale);
            };
        };
    };
};



function Pause(){
    isPaused = true
}
function Play(){
    isPaused = false
    UpdateDisplay(prev_Grid,scale,cols,rows,ctx,width,height);
}