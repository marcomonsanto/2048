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
        element.innerHTML = JSON.stringify(board);
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
