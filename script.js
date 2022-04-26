window.onload = ()=>{
    let sudoku;
    const size=9;
    createGrid();
    const solution = document.querySelector('#solution');
    solution.addEventListener('click',()=>{
        sudoku = getgrid(size)
        console.log(sudoku)
        window.s = sudoku

        const newsudoku = findSolution(sudoku);
        console.log(newsudoku)

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
    try{
        sudoku.forEach( (row,y)=>{
            row.forEach((val,x)=>{
                if(sudoku[y][x]==0){
                    let children = findChildren(newsudoku,y,x);
                    if (children.length==0){
                        console.log('end: ', newsudoku);
                        throw 'Break';
                    } 
                    newsudoku = children[0]
                }
            })
        } )
    } catch(e){
        
    }
    return newsudoku;
    

    
}

function findChildren(sudoku,y,x){
    if (sudoku[y][x]!=0){
        return -1
    }

    const children = [];

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
        if (x == 6 && y ==1){
            console.log(":")
        }
        let sqxstart = 3*Math.floor(x/3);
        let sqystart = 3*Math.floor(y/3);

        for (let sqy=sqystart;sqy<sqystart+3;sqy++){
            // if (flag)break;
            for (let sqx=sqxstart;sqx<sqxstart+3;sqx++){
                if (x == 6 && y ==1){
                    console.log(":",sqy, sqx)
                }
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

window.f = findChildren

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