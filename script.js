window.onload = ()=>{
    let sudoku;
    const size=9;
    createGrid();
    const solution = document.querySelector('#solution');
    solution.addEventListener('click',()=>{
        sudoku = getgrid(size)
        console.log(sudoku)
        findSolution(sudoku)
    })

}

function createGrid(){
    const grid = document.querySelector('#container')

    for (let i=0;i<9*9;i++){
        const block = document.createElement('div')
        const inpt = document.createElement('input')
        block.appendChild(inpt)
        const n = i;
        block.dataset.n = i;
        if (n%3==0 && n%9!=0){
            block.style.borderLeft = '3px solid black'
        }
        const row = Math.floor(n/9)
        if (row%3==0 && row%8!=0){
            block.style.borderTop = '3px solid black'
        }
        grid.append(block)
    }
}

function getgrid(size){
    const sudoku = [
    ];

    const grid = document.querySelectorAll('#container>div>input');
    grid.forEach((el,i) => {
        let x = i%size;
        let y = Math.floor(i/size)
        if (sudoku[y]==undefined){
            sudoku[y] = []
        }
        sudoku[y].push(el.value)
    });
    return sudoku;
}
    
function findSolution(sudoku){

}

function findChildren(sudoku,y,x){
    
}