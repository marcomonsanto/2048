type Swipe = 'left' | 'top' | 'right' | 'bottom'

class Game {
  size: number;
  board: Array<Array<number | undefined>> | undefined;
  empty: string[] = [];

  constructor(size: number = 5){
    this.size = size;
    this.board = this.generateInitialBoard()

    this.addNumberToBoard()
    this.addNumberToBoard()
  } 

  generateInitialBoard(): Array<Array<number | undefined>> | undefined {
    let initialBoard: Array<Array<number | undefined>> = [];
    // let initialBoard = Array(this.size).fill(Array(this.size).fill(undefined))
    console.log(JSON.stringify(initialBoard))
    for(let i = 0; i < this.size; i++) {
      initialBoard.push([])
      for (let j = 0; j < this.size; j++) {
        initialBoard[i].push(undefined)
        this.empty.push(`${i}.${j}`) 
      }
    }
   
    return initialBoard; 
  }

  addNumberToBoard() {
    // TODO: Add possible initial value of 4
    if (!this.board) return;

    const random = this.empty.splice(rand(this.empty.length), 1)

    const [row, col] = random[0].split('.'); 
    this.board[Number(row)][Number(col)] = 2
  }

  swipe(dir: Swipe) {
    switch (dir) {
      case 'left': {
        console.log('swipe left')
        break
      }
      case 'top': {
        console.log('swipe top')
        break
      }
      case 'right': {
        console.log('swipe right')
        break
      }
      case 'bottom': {
        console.log('swipe bottom')
        break
      }
      default: {
        throw new Error('Not a valid direction')
      }

    }
  }
  
}

function rand(size: number): number {
  return Math.floor(Math.random()*(size-1));
}


export {
  Game
}