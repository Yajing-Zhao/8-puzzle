import React from 'react'

export default function Square(props) {
  return (
    <div className='square' onClick={props.handleClick} num={props.num}>
      {props.num}
    </div>
  )
}
