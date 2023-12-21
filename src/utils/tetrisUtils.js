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