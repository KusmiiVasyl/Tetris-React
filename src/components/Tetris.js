import { useEffect, useState } from 'react'
import style from './Tetris.module.css'
import {
  drawPlayField,
  generateFigure,
  generatePlayfield,
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
          setFigure(() => {
            return { ...figure, row: (figure.row += 1) }
          })
          break
        case 'ArrowLeft':
          setFigure(() => {
            return { ...figure, column: (figure.column -= 1) }
          })
          break
        case 'ArrowRight':
          setFigure(() => {
            return { ...figure, column: (figure.column += 1) }
          })
          break
        default:
          setFigure(() => {
            return { ...figure }
          })
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
  }, [])

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
