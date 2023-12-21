import { useState } from 'react'
import style from './Tetris.module.css'
import { generateFigure, generatePlayfield } from '../utils/tetrisUtils'
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

  return (
    <div className={style.tetris} style={tetrisStyle}>
      {playField.map((fieldRow, indexRow) =>
        fieldRow.map((_, indexColumn) => {
          return <Block key={indexRow + indexColumn} />
        })
      )}
    </div>
  )
}

export default Tetris
