type Swipe = "left" | "top" | "right" | "bottom";
type Status = "win" | "inProgress" | "lost";
type Previous = {
  isAvailable: boolean;
  howMany: number;
  tileValue: number | undefined;
};
const TILE_INITIAL_VALUE = 1;

class Game {
  size: number;
  board: Array<Array<number | undefined>>;
  emptySquares: string[] = [];
  status: Status = "inProgress";

  constructor(size: number = 6) {
    this.size = size;
    this.board = this.generateInitialBoard();
    this.addNumberToBoard(2);
  }

  generateInitialBoard(): Array<Array<number | undefined>> {
    let initialBoard: Array<Array<number | undefined>> = [];
    for (let i = 0; i < this.size; i++) {
      initialBoard.push([]);
      for (let j = 0; j < this.size; j++) {
        initialBoard[i].push(undefined);
        this.emptySquares.push(`${i}.${j}`);
      }
    }

    return initialBoard;
  }

  addNumberToBoard(value: number = TILE_INITIAL_VALUE) {
    if (!this.board || this.status !== "inProgress") return;

    const random = this.emptySquares.splice(rand(this.emptySquares.length), 1);

    const [row, col] = random[0].split(".");
    this.board[Number(row)][Number(col)] = value;
  }

  updateEmptySquares(): void {
    const emptySquares = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j]) continue;
        emptySquares.push(`${i}.${j}`);
      }
    }
    this.emptySquares = emptySquares;
    if (emptySquares.length === 0) {
      this.status = "lost";
    }
  }

  swipe(dir: Swipe) {
    if (this.status !== "inProgress") return;

    console.time("swipe timming");
    switch (dir) {
      case "left": {
        console.log("swipe left");
        break;
      }
      case "top": {
        console.log("swipe top");
        break;
      }
      case "right": {
        for (let i = 0; i <= this.size - 1; i++) {
          let previous: Previous = {
            isAvailable: false,
            howMany: 0,
            tileValue: undefined,
          };
          for (let j = this.size - 1; j >= 0; j--) {
            let currentTileValue = this.board[i][j];
            // No value in current tile
            if (!currentTileValue) {
              previous = {
                isAvailable: true,
                howMany: previous.isAvailable ? previous.howMany + 1 : 1,
                tileValue: previous.tileValue,
              };
              continue;
            }

            // Value in current tile, but no space before and values are different
            if (
              !previous.isAvailable &&
              previous.tileValue !== currentTileValue
            ) {
              previous = {
                isAvailable: false,
                howMany: 0,
                tileValue: currentTileValue,
              };
              continue;
            }

            // MERGE: Value in current tile, no space before but values ARE equal
            if (
              // !previous.isAvailable &&
              previous.tileValue === currentTileValue
            ) {
              const newValue = previous.tileValue + currentTileValue;
              this.board[i][j + previous.howMany + 1] = newValue;
              this.board[i][j] = undefined;

              previous = {
                isAvailable: true,
                howMany: 1 + previous.howMany,
                tileValue: undefined,
              };
              if (newValue === 2048) {
                this.status = "win";
                break;
              }
              continue;
            }

            // if value in tile and space before
            this.board[i][j + previous.howMany] = currentTileValue;
            this.board[i][j] = undefined;

            previous = {
              isAvailable: true,
              howMany: previous.isAvailable ? previous.howMany : 1,
              tileValue: undefined,
            };
          }
        }
        break;
      }
      case "bottom": {
        console.log("swipe bottom");
        break;
      }
      default: {
        throw new Error("Not a valid direction");
      }
    }
    this.updateEmptySquares();
    this.addNumberToBoard();
    console.table(this.board);
    console.timeEnd("swipe timming");
  }
}

function rand(size: number): number {
  return Math.floor(Math.random() * (size - 1));
}

export { Game };
