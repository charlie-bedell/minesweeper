# MineSweeper
Play minesweeper on your local, built in React.

## Loading Up
in the project directory you can run `npm start` to run locally (localhost:3000)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Controls
On a loss, "GAME OVER" will display at the top of the board. refresh the webpage
to start a new game.

right click to mark a cell with a flag.

## Todo
- User fields to change the number of mines and size of the board.
give the player the option to change the size of the board, and how many mines
will be on the board
- Retry button
  on loss, quick `retry` to reset the board
- Win condition
  display `You Win!` when all non-mine squares are visible
- flag/bomb count
  display number of flags used/total bomb count
- mine neighbor value color
  assign unique colors to the number of neighboring mines value
- 3x3 hover grid toggle
  give the user a a box around the cursor on square hover, outlining the
  neighboring cells
