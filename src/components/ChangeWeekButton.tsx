import { MouseEventHandler } from 'react'
import catLeftImage  from './cat-left.png'
import catRightImage  from './cat-right.png'
import style from './ChangeWeekButton.module.scss'

interface Props {
  direction: Direction
  onClick: MouseEventHandler<HTMLImageElement>
}

export enum Direction { PREVIOUS, NEXT }

export function ChangeWeekButton({direction, onClick}: Props){
  return (
    <img
      alt=""
      src={chooseImageFor(direction)}
      className={style.button} 
      //@ts-ignore
      direction={Direction[direction]}
      onClick={onClick}
    />
  )
}

function chooseImageFor(direction: Direction) {
  switch(direction) {
    case Direction.PREVIOUS: return catLeftImage
    case Direction.NEXT: return catRightImage
  }
}