# How to run it

I used pnpm, but feel free to use what feels more confortable.
Also added a .nvmrc file to make sure the right node version is used.

Node version:

```
18.15.0
```

Install dependecies:

```
pnpm install
```

Start dev server:

```
pnpm run dev
```

Build:

```
pnpm run build
```

Test:

```
pnpm run test
```

# Stack decision

This is a vite project with Typescript and no framework.

Why:
I wanted to totally decouple game logic from the framework. Didn't want to spend time around other problems other than the intent of the challenge.

This way there is a clear separation between the game and the UI that powers it.

Any framework can be used, and they just have to do 1 thing:

- send a callback when initializing a game.
- connect the swipe/button logic to the `swipe` method

This way the game will use the callback to inform changes in the board and status of the game.

# Test

This project contains `vitest` to run all the tests on top of the `Game` class.

All acceptance criteria have a test, to ensure that improvements/refactors would have at least a bit of a safe guard, allowing me to move fast but also preparing it for future updates.

PS: Some tests could be better, a bug appeared at some poing and tests were green :p, so there is space for improvement for sure.

# Additional remark

## The Swipe

Probably the hardest part in terms of logic, could benefit from some refactor to make it more readable and maintainable.

There is a pattern where I feel I could do better, as most of the changes between `left` `top` `right` and `bottom` would be on the `for`'s and the logic when we merge values.

## Lack of an actual swipe

I decided to add buttons instead of swipes because I felt that it would not be as important as going through the logic and features. I feel that a few lines of code could have given that feature(theoretically), or even a small library, but as it says in the document, balance between time and output.

## Lodash as dev dependency

Added lodash flatten to support in testing, having a matix, flattening really helps to test what is available in the grid.

## Typescript

I'm a big fan of typescript and feel that is the most resonable choice to use in a project, specially a new project. A lot easier to maintain and the developer experience and velocity are better mid/long term, especially when working in teams.
