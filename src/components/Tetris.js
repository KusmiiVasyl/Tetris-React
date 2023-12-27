import { useEffect, useState } from 'react'
import style from './Tetris.module.css'
import {
  drawPlayField,
  generateFigure,
  generatePlayfield,
  moveFigureDown,
  moveFigureLeft,
  moveFigureRight,
} from '../utils/tetrisUtils'
import Block from './Block'
import {
  PLAYFIELD_ROWS,
  PLAYFIELD_COLUMNS,
} from '../constants/tetrisConstants.js'

const Tetris = () => {
  const [playField, setPlayField] = useState(generatePlayfield())
  const [figure, setFigure] = useState(generateFigure())
  const tetrisStyle = {
    gridTemplateColumns: `repeat(${PLAYFIELD_COLUMNS}, auto)`,
    gridTemplateRows: `repeat(${PLAYFIELD_ROWS}, auto)`,
  }

  useEffect(() => {
    setPlayField(() => drawPlayField(figure))
  }, [figure])

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          setFigure(moveFigureDown(figure))
          break
        case 'ArrowLeft':
          setFigure(moveFigureLeft(figure))
          break
        case 'ArrowRight':
          setFigure(moveFigureRight(figure))
          break
        default:
          setFigure({ ...figure })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [figure, playField])

  return (
    <div className={style.tetris} style={tetrisStyle}>
      {playField.map((fieldRow, indexRow) =>
        fieldRow.map((_, indexColumn) => {
          if (!playField[indexRow][indexColumn]) {
            return <Block key={indexRow + indexColumn} color="" />
          }
          return <Block key={indexRow + indexColumn} color={figure.color} />
        })
      )}
    </div>
  )
}

export default Tetris
