


window.addEventListener("load",()=>{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const height = 300;
    const width = 300
    let area = 50;
    let cols = Math.floor(width/area);
    let rows = Math.floor(height/area);
    let pvMtx = RandomGrid(cols,rows);

    canvas.height = height;
    canvas.width = width;

    pvMtx = [[0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
    CanvasGrid(ctx,pvMtx,area,cols,rows);
    Main(pvMtx,area,cols,rows,ctx,width,height)

});


function Main(pvMtx,area,cols,rows,ctx,w,h){ 
    let i = 0
    const a = setInterval(() => {
        let nwMtx = Grid(pvMtx,cols,rows);
        ctx.clearRect(0,0,w,h)
        CanvasGrid(ctx,nwMtx,area,cols,rows);
        pvMtx = nwMtx
        console.table(pvMtx)
        i ++
        if(i == 3) clearInterval(a)
    },500)
};

//Function to create a 2D Array of numbers in random places 
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

// Count the neighbors of a cell. 
function CountNeighbors(mtx,r,c,cols,rows){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            if((r+i,c+j) == (r,c)) continue;
            sum += mtx[((r+i)+rows)%rows][((c+j)+cols)%cols];
        };
    };
    return sum;
};

function Grid(mtx,cols,rows){
    let newMtx = new Array;
    for(let r = 0; r < rows; r++){
        newMtx.push([]);
        for(let c = 0; c < cols; c++){
            neighbors = CountNeighbors(mtx,r,c,cols,rows);
            if(neighbors >= 2 && neighbors <= 3) newMtx[r].push(1);
            else newMtx[r].push(0);
        };
    };
    return newMtx
};


// Function to draw a grid in the canvas
// if Matrix[ i ][ j ] == 1 == life (Filled Square) 
// Otherwise = Empty Space (Square not filled)

function CanvasGrid(ctx,mtx,area,cols,rows){
    for(let col = 0; col < cols;col++){
        for(let row = 0; row < rows; row++){
            if(mtx[row][col] == 1) ctx.fillRect(col*area,row*area,area,area);
            else ctx.strokeRect(col*area,row*area,area,area);
        };
    };
};


