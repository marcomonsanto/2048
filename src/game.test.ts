import { describe, test, expect } from 'vitest'
import {flatten} from 'lodash-es'
import { Game } from './game'

describe("Game Testsuite",  () => {
  test("Loads Game properly with 1 tile with value 1", () => {
    const game = new Game()

    expect(flatten(game.board).filter(x => x !== undefined).length).toBe(1)
  })
})