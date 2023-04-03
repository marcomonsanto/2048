import { Board, Game, Status } from "./game";

export function setupBoard(element: HTMLDivElement) {
  const setBoard = (board: Board, status: Status) => {
    switch (status) {
      case "win": {
        element.innerHTML = "victory";
        break;
      }
      case "lost": {
        element.innerHTML = "defeat";
        break;
      }
      case "inProgress": {
        element.innerHTML = boardUI(board);
      }
    }
    // counter = count;
    // element.innerHTML = JSON.stringify(board);
  };
  // element.addEventListener("click", () => setCounter(counter + 1));

  const game = new Game(setBoard, 2);
  document
    .querySelector("#swipeLeft")
    ?.addEventListener("click", () => game.swipe("left"));
  document
    .querySelector("#swipeTop")
    ?.addEventListener("click", () => game.swipe("top"));
  document
    .querySelector("#swipeRight")
    ?.addEventListener("click", () => game.swipe("right"));
  document
    .querySelector("#swipeBottom")
    ?.addEventListener("click", () => game.swipe("bottom"));
}

function boardUI(board: Board) {
  const tile = function (value: number | undefined) {
    return `<div class="tile">${value ?? "x"}</div>`;
  };

  const row = function (elements: Array<number | undefined>) {
    let rowHTML = "";
    for (let i = 0; i < elements.length; i++) {
      rowHTML += tile(elements[i]);
    }
    return `<div class="row">${rowHTML}</div>`;
  };

  let boardUI = "";

  for (let i = 0; i < board.length; i++) {
    boardUI += row(board[i]);
  }

  const container = `
    <div class="container">${boardUI}</div>
  `;

  return container;
}
