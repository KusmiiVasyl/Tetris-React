import style from './Block.module.css'

const Block = ({color}) => {
  return <div className={style.block} style={{backgroundColor: color}}></div>
}

export default Block
