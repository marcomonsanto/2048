import { Board, Game } from "./game";

export function setupBoard(element: HTMLDivElement) {
  const setBoard = (board: Board) => {
    // counter = count;
    element.innerHTML = JSON.stringify(board);
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
