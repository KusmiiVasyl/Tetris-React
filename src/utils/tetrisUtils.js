import {
  PLAYFIELD_ROWS,
  PLAYFIELD_COLUMNS,
  FIGURES_NAMES,
  FIGURES,
} from '../constants/tetrisConstants.js'

export const generatePlayfield = () => {
  return new Array(PLAYFIELD_ROWS)
    .fill(0)
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0))
}

export const generateFigure = () => {
  const nameTetro = FIGURES_NAMES[getRandomTetrominoNamesIndex()]
  const matrixTetro = FIGURES[nameTetro]
  const columnTetro = Math.floor(
    PLAYFIELD_COLUMNS / 2 - FIGURES[nameTetro].length / 2
  )
  const rowTetro = 0

  return {
    name: nameTetro,
    matrix: matrixTetro,
    column: columnTetro,
    row: rowTetro,
    color: generateRandomColorRGB(),
  }
}

export const drawPlayField = (figure) => {
  const figureMatrixSize = figure.matrix.length
  const playField = generatePlayfield()

  for (let row = 0; row < figureMatrixSize; row++) {
    for (let col = 0; col < figureMatrixSize; col++) {
      if (!figure.matrix[row][col]) continue
      playField[row + figure.row][col + figure.column] = figure.matrix[row][col]
    }
  }
  return playField
}

export const moveFigureDown = (figure) => {
  figure.row += 1
  isValid(figure) && (figure.row -= 1)
  return { ...figure }
}

export const moveFigureLeft = (figure) => {
  figure.column -= 1
  isValid(figure) && (figure.column += 1)
  return { ...figure }
}

export const moveFigureRight = (figure) => {
  figure.column += 1
  isValid(figure) && (figure.column -= 1)
  return { ...figure }
}

// ----------------------

function getRandomTetrominoNamesIndex() {
  return Math.floor(Math.random() * FIGURES_NAMES.length)
}

function generateRandomColorRGB() {
  let red, green, blue

  do {
    red = Math.floor(Math.random() * 256)
    green = Math.floor(Math.random() * 256)
    blue = Math.floor(Math.random() * 256)
  } while (red === 73 && green === 37 && blue === 2) // Background play field RGB

  return `rgb(${red}, ${green}, ${blue})`
}

function isValid(figure) {
  const matrixSize = figure.matrix.length
  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      if (!figure.matrix[row][col]) continue
      if (
        figure.column + col >= PLAYFIELD_COLUMNS ||
        figure.column + col < 0 ||
        figure.row + row >= PLAYFIELD_ROWS
      ) {
        return true
      }
    }
  }
  return false
}
