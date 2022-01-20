window.addEventListener("load",()=>{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 500;
    area = 50;

    mtx = Matrix(Math.floor(canvas.width/area),Math.floor(canvas.height/area));
    console.table(mtx);
    Grid(ctx,mtx,area);
    
});

//Function to create a 2D Array of numbers in random places 

function Matrix(x,y){
    mtx = new Array;
    for(let row = 0; row < y; row += 1){
        mtx.push([]);
        for(let col = 0; col < x; col += 1){
            mtx[row].push(Math.floor(Math.random()*5));
        };
    };
    return mtx;
};

// Function to draw a grid in the canvas
// if Matrix[ i ][ j ] == 1 == life (Filled Square) 
// Otherwise = Empty Space (Square not filled)

function Grid(ctx,mtx,area){
    for(let col = 0; col < mtx[0].length;col++){
        for(let row = 0; row < mtx.length; row++){
            if(mtx[row][col] == 1) ctx.fillRect(col*area,row*area,area,area);
            else ctx.strokeRect(col*area,row*area,area,area);
        };
    };
};

