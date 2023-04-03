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

  const game = new Game(setBoard);
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

// TODO: Maybe change to Map
const colorObject: Record<string, string> = {
  0: "#e4e4e7",
  1: "#f87171",
  2: "#fde047",
  4: "#bef264",
  8: "#5eead4",
  16: "#67e8f9",
  32: "#93c5fd",
  64: "#a5b4fc",
  128: "#f0abfc",
  256: "#fda4af",
  512: "#e11d48",
  1024: "#9f1239",
  2048: "#1d4ed8",
};

function boardUI(board: Board) {
  const tile = function (value: number | undefined) {
    return `<div class="tile" style="background-color: ${
      colorObject[value ?? 0]
    }" >${value ?? ""}</div>`;
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
