type Swipe = "left" | "top" | "right" | "bottom";
export type Status = "win" | "inProgress" | "lost";
type Previous = {
  isAvailable: boolean;
  howMany: number;
  tileValue: number | undefined;
};
export type Board = Array<Array<number | undefined>>;
type Callback = (board: Board, status: Status) => void;

const TILE_INITIAL_VALUE = 1;

class Game {
  size: number;
  board: Board;
  emptySquares: string[] = [];
  status: Status = "inProgress";
  callback: Callback;

  constructor(callback: Callback, size: number = 6) {
    this.callback = callback;
    this.size = size;
    this.board = this.generateInitialBoard();
    this.addNumberToBoard(2);
  }

  generateInitialBoard(): Board {
    let initialBoard: Board = [];
    for (let i = 0; i < this.size; i++) {
      initialBoard.push(Array(this.size).fill(undefined));
      for (let j = 0; j < this.size; j++) {
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
    this.callback(this.board, this.status);
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
        for (let i = 0; i <= this.size - 1; i++) {
          let previous: Previous = {
            isAvailable: false,
            howMany: 0,
            tileValue: undefined,
          };
          for (let j = 0; j <= this.size - 1; j++) {
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
              this.board[i][j - previous.howMany - 1] = newValue;
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
            this.board[i][j - previous.howMany] = currentTileValue;
            this.board[i][j] = undefined;

            previous = {
              isAvailable: true,
              howMany: previous.isAvailable ? previous.howMany : 1,
              tileValue: currentTileValue,
            };
          }
        }
        break;
      }
      case "top": {
        for (let i = 0; i <= this.size - 1; i++) {
          let previous: Previous = {
            isAvailable: false,
            howMany: 0,
            tileValue: undefined,
          };
          for (let j = 0; j <= this.size - 1; j++) {
            let currentTileValue = this.board[j][i];
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
              this.board[j - previous.howMany - 1][i] = newValue;
              this.board[j][i] = undefined;

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
            this.board[j - previous.howMany][i] = currentTileValue;
            this.board[j][i] = undefined;

            previous = {
              isAvailable: true,
              howMany: previous.isAvailable ? previous.howMany : 1,
              tileValue: currentTileValue,
            };
          }
        }
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
              tileValue: currentTileValue,
            };
          }
        }
        break;
      }
      case "bottom": {
        for (let i = 0; i <= this.size - 1; i++) {
          let previous: Previous = {
            isAvailable: false,
            howMany: 0,
            tileValue: undefined,
          };
          for (let j = this.size - 1; j >= 0; j--) {
            let currentTileValue = this.board[j][i];
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
              this.board[j + previous.howMany + 1][i] = newValue;
              this.board[j][i] = undefined;

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
            this.board[j + previous.howMany][i] = currentTileValue;
            this.board[j][i] = undefined;

            previous = {
              isAvailable: true,
              howMany: previous.isAvailable ? previous.howMany : 1,
              tileValue: currentTileValue,
            };
          }
        }
        console.log("swipe bottom");
        break;
      }
      default: {
        throw new Error("Not a valid direction");
      }
    }
    this.updateEmptySquares();
    this.addNumberToBoard();
    this.callback(this.board, this.status);
    console.table(this.board);
    console.timeEnd("swipe timming");
  }

  onBoardUpdate() {
    this.callback(this.board, this.status);
  }
}

function rand(size: number): number {
  return Math.floor(Math.random() * (size - 1));
}

export { Game };
