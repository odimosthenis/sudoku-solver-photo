window.onload = ()=>{
    let sudoku;
    const size=9;
    createGrid();
    const solution = document.querySelector('#solution');
    solution.addEventListener('click',()=>{
        sudoku = getgrid(size)
        //sudoku = starter
        console.log(sudoku)

        const newsudoku = findSolution(sudoku);
        console.log(newsudoku)

    })    

}

const starter= [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
]

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
        if (el.value == ''){
            sudoku[y].push(0)
        } else{
            sudoku[y].push(parseInt(el.value))
        }
        
    });
    return sudoku;
}
    
function findSolution(sudoku){
    let newsudoku = copySudoku(sudoku)
    let children = [newsudoku];
    let tempsudoku = children[0]
    while(children.length>0){
        tempsudoku = children.pop();
        let newchildren = findChildren(tempsudoku);
        let zeroIndex=1;
        if(newchildren.length==1){
            zeroIndex=-1;
            for (let p=0;p<9;p++){
                zeroIndex = newchildren[0][p].indexOf(0,0);
                if (zeroIndex!=-1){
                    zeroIndex = 1;
                }
            }
        }
        if (zeroIndex==-1) return newchildren[0]
        children.push(...newchildren)
        console.log(copySudoku(children))
    }

    return tempsudoku;
    
}

function next(sudoku){

}

window.n = next

function findChildren(sudoku){
    let children = [];

    let x=-1,y=-1;
    let zeroIndex=-1;
    for (let p=0;p<9;p++){
        zeroIndex = sudoku[p].indexOf(0,0);
        if (zeroIndex!=-1){
            y=p;x=zeroIndex;
            break;
        }
    }
    if (zeroIndex==-1 ) {
        console.log(sudoku)
        console.log('zeroindex out of index')
        return [sudoku];
    }
    console.log(x,y)
    

    let flag = false;
    for (let i=1;i<=9;i++){
        flag = false;

        // row check
        if (sudoku[y].includes(i)){
            flag = true;
            //continue;
        }

        // column check
        for (let row=0;row<9;row++){
            if (sudoku[row][x]==i){
                flag = true;
               // break;
            }
        }
        // if (flag) continue;

        // square check
        let sqxstart = 3*Math.floor(x/3);
        let sqystart = 3*Math.floor(y/3);

        for (let sqy=sqystart;sqy<sqystart+3;sqy++){
            // if (flag)break;
            for (let sqx=sqxstart;sqx<sqxstart+3;sqx++){

                if (sudoku[sqy][sqx]==i){
                    flag = true;
                }
            }
        }
        if (!flag){
            const newsudoku = copySudoku(sudoku)
            newsudoku[y][x] = i;
            children.push(newsudoku)
        };

    }
    if (children.length==0) console.log('p', y,x)
    return children;
}


function copySudoku(sudoku){
    const newSudoku = []
    sudoku.forEach( (row,y)=>{
        row.forEach((val,x)=>{
            if (newSudoku[y]==undefined){
                newSudoku[y] = []
            };
            newSudoku[y][x] = val;
        })
    } )
    return newSudoku;
}