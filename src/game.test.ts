import { describe, test, expect, beforeEach, vi } from "vitest";
import { flatten } from "lodash-es";
import { Game } from "./game";

const callback = vi.fn();
describe("Game Testsuite", () => {
  beforeEach(() => {
    vi.resetModules();
  }),
    test("Loads the game with a gid of 6x6 by default", () => {
      const game = new Game(callback);

      const numberOfRows = game.board.length;
      const numberOfCols = game.board[0].length;
      const numberOfTiles = flatten(game.board).length;

      expect(numberOfRows).toBe(6);
      expect(numberOfCols).toBe(6);
      expect(numberOfTiles).toBe(36);
    }),
    test("Loads Game properly with 1 tile with value 2", () => {
      const game = new Game(callback);

      const tilesWithValues = flatten(game.board).filter(
        (x) => x !== undefined
      );

      expect(tilesWithValues.length).toBe(1);
      expect(tilesWithValues[0]).toBe(2);
    }),
    test("User can swipe left", () => {
      const game = new Game(callback, 3);
      // TODO: Try to add proper mocking
      game.board = [
        [undefined, 1, undefined],
        [undefined, 1, undefined],
        [undefined, 2, undefined],
      ];

      game.swipe("left");

      expect(game.board[0][0]).toBe(1);
      expect(game.board[1][0]).toBe(1);
      expect(game.board[2][0]).toBe(2);
    }),
    test("User can swipe top", () => {
      const game = new Game(callback, 3);
      // TODO: Try to add proper mocking
      game.board = [
        [undefined, undefined, undefined],
        [1, 1, 2],
        [undefined, 1, 1],
      ];

      game.swipe("top");

      expect(game.board[0][0]).toBe(1);
      expect(game.board[0][1]).toBe(2);
      expect(game.board[0][2]).toBe(2);
      expect(game.board[1][2]).toBe(1);
    }),
    test("User can swipe right", () => {
      const game = new Game(callback, 3);
      // TODO: Try to add proper mocking
      game.board = [
        [undefined, 1, undefined],
        [undefined, 1, undefined],
        [undefined, 2, undefined],
      ];

      game.swipe("right");

      expect(game.board[0][2]).toBe(1);
      expect(game.board[1][2]).toBe(1);
      expect(game.board[2][2]).toBe(2);
    }),
    test("User can swipe bottom", () => {
      const game = new Game(callback, 3);
      // TODO: Try to add proper mocking
      game.board = [
        [undefined, 1, undefined],
        [1, 1, 2],
        [undefined, 1, 1],
      ];

      game.swipe("bottom");

      expect(game.board[2][0]).toBe(1);
      expect(game.board[1][1]).toBe(1);
      expect(game.board[2][1]).toBe(2);
      expect(game.board[1][2]).toBe(2);
      expect(game.board[2][2]).toBe(1);
    }),
    test("It should add a new tile in a free space", () => {
      const game = new Game(callback);

      const tilesWithValues = flatten(game.board).filter(
        (x) => x !== undefined
      );
      expect(tilesWithValues.length).toBe(1);
      expect(tilesWithValues[0]).toBe(2);

      game.swipe("right");

      const tilesWithValuesAfterSwipe = flatten(game.board).filter(
        (x) => x !== undefined
      );
      expect(tilesWithValuesAfterSwipe.length).toBe(2);
      expect(tilesWithValuesAfterSwipe.includes(1)).toBe(true);
      expect(tilesWithValuesAfterSwipe.includes(2)).toBe(true);
    });
  test("It should merge when pushed againts other with same value", () => {
    const game = new Game(callback);
    // TODO: Try to add proper mocking
    game.board = [
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, 2, 2],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
    ];
    callback;
    expect(game.board[1][2]);
    expect(game.board[1][5]).toBe(2);

    game.swipe("right");

    expect(game.board[1][4]).toBe(undefined);
    expect(game.board[1][5]).toBe(4);
  });
  test("If there are 3 values next to each other, e.g. 2 2 2, and the player slides right,the values closest to the wall should merge first resulting in 2 4.", () => {
    // vi.mock('./game', () => {
    //   const Game = vi.fncallback()

    //   Game.prototype.generateInitialBoard = vi.fn().mockReturnValue([[],[]cal
    //   return {
    //     Game
    //   }
    // })
    const game = new Game(callback);
    // TODO: Try to add proper mocking
    game.board = [
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, 2, undefined, 2, 2],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
    ];

    expect(game.board[1][4]).toBe(2);
    expect(game.board[1][5]).toBe(2);

    game.swipe("right");
    expect(game.board[1][4]).toBe(2);
    expect(game.board[1][5]).toBe(4);
  });
  test("If any tile reaches the value 2048 the game is won", () => {
    const game = new Game(callback);
    // TODO: Try to add prcallbackoper mocking
    game.board = [
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, 1024, undefined, undefined, 1024],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
    ];

    expect(game.board[1][1024]);
    expect(game.board[1][5]).toBe(1024);

    game.swipe("right");

    expect(game.board[1][2]).not.toBe(1024);
    expect(game.board[1][4]).not.toBe(1024);
    expect(game.board[1][5]).toBe(2048);
    expect(game.status).toBe("win");
  });
  test("If there is no free space to put the new tile the game is lost", () => {
    const game = new Game(callback, 3);
    // TODO: Try to add propin
    game.board = [
      [32, 16, 32],
      [32, 16, 32],
      [32, 16, 32],
    ];
    game.updateEmptySquares();

    game.swipe("right");

    console.log("gamestatus: ", game.status);

    expect(game.status).toBe("lost");
  });
});
