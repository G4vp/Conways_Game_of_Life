window.addEventListener("load",()=>{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = 0;
    canvas.width = 0;

    console.table(Matrix(20,20))
});

//Function to create a 2D Array with 1 and 0 in random places 
// 1 = life 
// 0 = Empty Space
function Matrix(x,y){
    mtx = new Array
    for(let row = 0; row < y; row += 1){
        mtx.push([])
        for(let col = 0; col < x; col += 1){
            mtx[row].push(Math.floor(Math.random()*2))
        }
    }
    return mtx
};

